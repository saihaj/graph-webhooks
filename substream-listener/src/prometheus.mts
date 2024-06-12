import type { Clock } from "@substreams/core/proto";
import type { BlockEmitter } from "@substreams/node";
import promClient from "prom-client";

// Prometheus Exporter
export const registry = promClient.register;

/**
 * Default label names for all metrics
 */
const DEFAULT_LABEL_NAMES = [
  "module_hash",
  "contract_address",
  "output_module",
] as const;

function calculateHeadBlockTimeDrift(clock: Clock) {
  const seconds = Number(clock.timestamp?.seconds);
  return Math.round(new Date().valueOf() / 1000 - seconds);
}

// Counters

export const invalidHttpRequests = new promClient.Counter({
  name: "http_invalid_request",
  help: "The number of invalid HTTP requests received",
});

export const successfulHttpRequests = new promClient.Counter({
  name: "http_successful_request",
  help: "The number of successful HTTP requests received",
});

export const substreams_sink_progress_message = new promClient.Counter({
  name: "substreams_sink_progress_message",
  help: "The number of progress message received",
  labelNames: ["module", ...DEFAULT_LABEL_NAMES],
});

const substreams_sink_data_message = new promClient.Counter({
  name: "substreams_sink_data_message",
  help: "The number of data message received",
  labelNames: DEFAULT_LABEL_NAMES,
});

const substreams_sink_data_message_size_bytes = new promClient.Counter({
  name: "substreams_sink_data_message_size_bytes",
  help: "The total size of in bytes of all data message received",
  labelNames: DEFAULT_LABEL_NAMES,
});

const substreams_sink_undo_message = new promClient.Counter({
  name: "substreams_sink_undo_message",
  help: "The number of block undo message received",
  labelNames: DEFAULT_LABEL_NAMES,
});

export const bullMqRedis = new promClient.Counter({
  name: "bullmq_redis_connection",
  help: "The number of successful and failed connection to Redis",
  labelNames: ["status"],
});

// ------------------------------------------------------------------

// Gauges

const substreams_sink_backprocessing_completion = new promClient.Gauge({
  name: "substreams_sink_backprocessing_completion",
  help: "Determines if backprocessing is completed, which is if we receive a first data message",
  labelNames: DEFAULT_LABEL_NAMES,
});

const head_block_number = new promClient.Gauge({
  name: "head_block_number",
  help: "Last processed block number",
  labelNames: DEFAULT_LABEL_NAMES,
});

const head_block_time_drift = new promClient.Gauge({
  name: "head_block_time_drift",
  help: "Head block time drift in seconds",
  labelNames: DEFAULT_LABEL_NAMES,
});

const head_block_timestamp = new promClient.Gauge({
  name: "head_block_timestamp",
  help: "Head block timestamp",
  labelNames: DEFAULT_LABEL_NAMES,
});

const manifest = new promClient.Gauge({
  name: "manifest",
  help: "Register the manifest for the substreams sink",
  labelNames: [
    "substreams_endpoint",
    "start_block_num",
    "stop_block_num",
    "final_blocks_only",
    ...DEFAULT_LABEL_NAMES,
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
    ...DEFAULT_LABEL_NAMES,
  ],
});

// ------------------------------------------------------------------

export function onPrometheusMetrics(
  emitter: BlockEmitter,
  options: {
    substreamsEndpoint: string;
    contractAddress: string;
    moduleHash: string;
  },
) {
  manifest?.set(
    {
      substreams_endpoint: options.substreamsEndpoint,
      start_block_num: String(emitter.request.startBlockNum),
      stop_block_num: String(emitter.request.stopBlockNum),
      final_blocks_only: String(emitter.request.finalBlocksOnly),
      module_hash: options.moduleHash,
      contract_address: options.contractAddress,
      output_module: emitter.request.outputModule,
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
        module_hash: options.moduleHash,
        contract_address: options.contractAddress,
        output_module: emitter.request.outputModule,
      },
      1,
    );
  });

  emitter.on("undo", () =>
    substreams_sink_undo_message
      ?.labels({
        module_hash: options.moduleHash,
        contract_address: options.contractAddress,
        output_module: emitter.request.outputModule,
      })
      .inc(1),
  );

  emitter.on("block", (block) => {
    substreams_sink_data_message
      ?.labels({
        module_hash: options.moduleHash,
        contract_address: options.contractAddress,
        output_module: emitter.request.outputModule,
      })
      .inc(1);

    substreams_sink_data_message_size_bytes
      ?.labels({
        module_hash: options.moduleHash,
        contract_address: options.contractAddress,
        output_module: emitter.request.outputModule,
      })
      ?.inc(block.toBinary().byteLength);

    substreams_sink_backprocessing_completion?.set(
      {
        module_hash: options.moduleHash,
        contract_address: options.contractAddress,
        output_module: emitter.request.outputModule,
      },
      1,
    );

    if (block.clock) {
      head_block_number?.set(
        {
          module_hash: options.moduleHash,
          contract_address: options.contractAddress,
          output_module: emitter.request.outputModule,
        },
        Number(block.clock.number),
      );

      head_block_time_drift?.set(
        {
          module_hash: options.moduleHash,
          contract_address: options.contractAddress,
          output_module: emitter.request.outputModule,
        },
        calculateHeadBlockTimeDrift(block.clock),
      );

      head_block_timestamp?.set(
        {
          module_hash: options.moduleHash,
          contract_address: options.contractAddress,
          output_module: emitter.request.outputModule,
        },
        Number(block.clock.timestamp?.seconds),
      );
    }
  });
}
