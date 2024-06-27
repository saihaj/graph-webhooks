import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./utils.mjs";
import { type Logger } from "pino";
import { bullMqRedis } from "./prometheus.mjs";

const clientCommandMessageReg = /ERR unknown command ['`]\s*client\s*['`]/;

export async function createRedis({
  appId,
  logger,
}: {
  appId: string;
  logger: Logger;
}) {
  function onError(source: string) {
    return (error: Error) => {
      logger.error({ error }, `onError called from ${source}`);
    };
  }
  const redisConnection = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    connectionName: `webhook-listener-${appId}`,
    retryStrategy(times) {
      return Math.min(times * 500, 2000);
    },
    reconnectOnError(error) {
      onError("redis:reconnectOnError")(error);
      if (clientCommandMessageReg.test(error.message)) {
        return false;
      }
      return 1;
    },
    db: 0,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

  redisConnection.on("error", (err) => {
    onError("redis:error")(err);
    bullMqRedis.inc({ status: "error" }, 1);
  });

  redisConnection.on("connect", () => {
    logger.info("Redis connection established");
    bullMqRedis.inc({ status: "connect" }, 1);
  });

  redisConnection.on("ready", async () => {
    logger.info("Redis connection ready");
    bullMqRedis.inc({ status: "ready" }, 1);
  });

  redisConnection.on("close", () => {
    logger.info("Redis connection closed");
    bullMqRedis.inc({ status: "close" }, 1);
  });

  redisConnection.on("reconnecting", (timeToReconnect?: number) => {
    logger.info("Redis reconnecting in %s", timeToReconnect);
    bullMqRedis.inc({ status: "reconnecting" }, 1);
  });

  redisConnection.on("end", async () => {
    logger.info("Redis ended - no more reconnections will be made");
    bullMqRedis.inc({ status: "end" }, 1);
  });

  return redisConnection;
}
