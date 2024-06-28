import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./utils.mjs";
import { type Logger } from "pino";
import { redis } from "./prometheus.mjs";

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
    redis.inc({ status: "error", app_id: appId }, 1);
  });

  redisConnection.on("connect", () => {
    logger.info("Redis connection established");
    redis.inc({ status: "connect", app_id: appId }, 1);
  });

  redisConnection.on("ready", async () => {
    logger.info("Redis connection ready");
    redis.inc({ status: "ready", app_id: appId }, 1);
  });

  redisConnection.on("close", () => {
    logger.info("Redis connection closed");
    redis.inc({ status: "close", app_id: appId }, 1);
  });

  redisConnection.on("reconnecting", (timeToReconnect?: number) => {
    logger.info("Redis reconnecting in %s", timeToReconnect);
    redis.inc({ status: "reconnecting", app_id: appId }, 1);
  });

  redisConnection.on("end", async () => {
    logger.info("Redis ended - no more reconnections will be made");
    redis.inc({ status: "end", app_id: appId }, 1);
  });

  return redisConnection;
}
