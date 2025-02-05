import type { Clock } from "@substreams/core/proto";
import type { BlockEmitter } from "@substreams/node";
import promClient from "prom-client";

// Prometheus Exporter
export const registry = promClient.register;

function calculateHeadBlockTimeDrift(clock: Clock) {
  const seconds = Number(clock.timestamp?.seconds);
  return Math.round(new Date().valueOf() / 1000 - seconds);
}

// Counters
export const substreams_sink_progress_message = new promClient.Counter({
  name: "substreams_sink_progress_message",
  help: "The number of progress message received",
  labelNames: ["module", "app_id"],
});

const substreams_sink_data_message = new promClient.Counter({
  name: "substreams_sink_data_message",
  help: "The number of data message received",
  labelNames: ["app_id"],
});

const substreams_sink_data_message_size_bytes = new promClient.Counter({
  name: "substreams_sink_data_message_size_bytes",
  help: "The total size of in bytes of all data message received",
  labelNames: ["app_id"],
});

const substreams_sink_undo_message = new promClient.Counter({
  name: "substreams_sink_undo_message",
  help: "The number of block undo message received",
  labelNames: ["app_id"],
});

export const redis = new promClient.Counter({
  name: "substream_listener_redis_connection",
  help: "The number of successful and failed connection to Redis",
  labelNames: ["status", "app_id"],
});

export const substream_emitter = new promClient.Counter({
  name: "substream_listener_emitter",
  help: "The number of progress message received",
  labelNames: ["status", "app_id"],
});

// ------------------------------------------------------------------

// Gauges

const substreams_sink_backprocessing_completion = new promClient.Gauge({
  name: "substreams_sink_backprocessing_completion",
  help: "Determines if backprocessing is completed, which is if we receive a first data message",
  labelNames: ["app_id"],
});

const head_block_number = new promClient.Gauge({
  name: "head_block_number",
  help: "Last processed block number",
  labelNames: ["app_id"],
});

const head_block_time_drift = new promClient.Gauge({
  name: "head_block_time_drift",
  help: "Head block time drift in seconds",
  labelNames: ["app_id"],
});

const head_block_timestamp = new promClient.Gauge({
  name: "head_block_timestamp",
  help: "Head block timestamp",
  labelNames: ["app_id"],
});

const manifest = new promClient.Gauge({
  name: "manifest",
  help: "Register the manifest for the substreams sink",
  labelNames: [
    "substreams_endpoint",
    "start_block_num",
    "stop_block_num",
    "final_blocks_only",
    "app_id",
  ],
});

const sessionGauge = new promClient.Gauge({
  name: "session",
  help: "Substreams Session",
  labelNames: [
    "trace_id",
    "resolved_start_block",
    "linear_handoff_block",
    "max_parallel_workers",
    "app_id",
  ],
});

export const substream_listener_processed_messages = new promClient.Gauge({
  name: "substream_listener_processed_messages",
  help: "The number of messages processed by the emitter",
  labelNames: ["app_id", "status"],
});

// ------------------------------------------------------------------

export function onPrometheusMetrics(
  emitter: BlockEmitter,
  options: {
    substreamsEndpoint: string;
    contractAddress: string;
    moduleHash: string;
    appId: string;
  },
) {
  manifest?.set(
    {
      substreams_endpoint: options.substreamsEndpoint,
      start_block_num: String(emitter.request.startBlockNum),
      stop_block_num: String(emitter.request.stopBlockNum),
      final_blocks_only: String(emitter.request.finalBlocksOnly),
      app_id: options.appId,
    },
    1,
  );

  emitter.on("session", (session) => {
    sessionGauge?.set(
      {
        trace_id: String(session.traceId),
        resolved_start_block: String(session.resolvedStartBlock),
        linear_handoff_block: String(session.linearHandoffBlock),
        max_parallel_workers: String(session.maxParallelWorkers),
        app_id: options.appId,
      },
      1,
    );
  });

  emitter.on("undo", () =>
    substreams_sink_undo_message
      ?.labels({
        app_id: options.appId,
      })
      .inc(1),
  );

  emitter.on("block", (block) => {
    substreams_sink_data_message
      ?.labels({
        app_id: options.appId,
      })
      .inc(1);

    substreams_sink_data_message_size_bytes
      ?.labels({
        app_id: options.appId,
      })
      ?.inc(block.toBinary().byteLength);

    substreams_sink_backprocessing_completion?.set(
      {
        app_id: options.appId,
      },
      1,
    );

    if (block.clock) {
      head_block_number?.set(
        {
          app_id: options.appId,
        },
        Number(block.clock.number),
      );

      head_block_time_drift?.set(
        {
          app_id: options.appId,
        },
        calculateHeadBlockTimeDrift(block.clock),
      );

      head_block_timestamp?.set(
        {
          app_id: options.appId,
        },
        Number(block.clock.timestamp?.seconds),
      );
    }
  });
}

export { promClient };
