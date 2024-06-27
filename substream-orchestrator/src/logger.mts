import pino from "pino";

export const logger = pino.default({
  level: "trace",
  name: "substream-orchestrator",
});
