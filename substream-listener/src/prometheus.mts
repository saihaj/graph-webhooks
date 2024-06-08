import type { Clock } from "@substreams/core/proto";
import type { BlockEmitter } from "@substreams/node";
import client, {
  Counter,
  Gauge,
  Summary,
  Histogram,
  type CounterConfiguration,
  type GaugeConfiguration,
  type SummaryConfiguration,
  type HistogramConfiguration,
} from "prom-client";
import { logger } from "./logger.mjs";

// Prometheus Exporter
export const registry = new client.Registry();

export function registerCounter(
  name: string,
  help = "help",
  labelNames: string[] = [],
  config?: CounterConfiguration<string>,
): Counter | undefined {
  try {
    const metric = registry.getSingleMetric(name);
    if (metric) {
      return metric as Counter;
    }
    registry.registerMetric(new Counter({ name, help, labelNames, ...config }));
    return registry.getSingleMetric(name) as Counter;
  } catch (e) {
    logger.error(e);
  }
}

export function registerGauge(
  name: string,
  help = "help",
  labelNames: string[] = [],
  config?: GaugeConfiguration<string>,
): Gauge | undefined {
  try {
    const metric = registry.getSingleMetric(name);
    if (metric) {
      console.log("metric", metric);
      return metric as Gauge;
    }
    registry.registerMetric(new Gauge({ name, help, labelNames, ...config }));
    return registry.getSingleMetric(name) as Gauge;
  } catch (e) {
    console.error(e);
    logger.error(e);
  }
}

export function registerSummary(
  name: string,
  help = "help",
  labelNames: string[] = [],
  config?: SummaryConfiguration<string>,
): Summary | undefined {
  try {
    const metric = registry.getSingleMetric(name);
    if (metric) {
      return metric as Summary;
    }
    registry.registerMetric(new Summary({ name, help, labelNames, ...config }));
    return registry.getSingleMetric(name) as Summary;
  } catch (e) {
    logger.error(e);
  }
}

export function registerHistogram(
  name: string,
  help = "help",
  labelNames: string[] = [],
  config?: HistogramConfiguration<string>,
): Histogram | undefined {
  try {
    const metric = registry.getSingleMetric(name);
    if (metric) {
      return metric as Histogram;
    }

    registry.registerMetric(
      new Histogram({ name, help, labelNames, ...config }),
    );
    return registry.getSingleMetric(name) as Histogram;
  } catch (e) {
    logger.error(e);
  }
}

/**
 * Default label names for all metrics
 */
const DEFAULT_LABEL_NAMES = [
  "module_hash",
  "contract_address",
  "output_module",
];

function calculateHeadBlockTimeDrift(clock: Clock) {
  const seconds = Number(clock.timestamp?.seconds);
  return Math.round(new Date().valueOf() / 1000 - seconds);
}

// Counters
export const substreams_sink_progress_message = registerCounter(
  "substreams_sink_progress_message",
  "The number of progress message received",
  ["module", ...DEFAULT_LABEL_NAMES],
);

const substreams_sink_data_message = registerCounter(
  "substreams_sink_data_message",
  "The number of data message received",
  DEFAULT_LABEL_NAMES,
);

const substreams_sink_data_message_size_bytes = registerCounter(
  "substreams_sink_data_message_size_bytes",
  "The total size of in bytes of all data message received",
  DEFAULT_LABEL_NAMES,
);

const substreams_sink_undo_message = registerCounter(
  "substreams_sink_undo_message",
  "The number of block undo message received",
  DEFAULT_LABEL_NAMES,
);

// ------------------------------------------------------------------

// Gauges

const substreams_sink_backprocessing_completion = registerGauge(
  "substreams_sink_backprocessing_completion",
  "Determines if backprocessing is completed, which is if we receive a first data message",
  DEFAULT_LABEL_NAMES,
);

const head_block_number = registerGauge(
  "head_block_number",
  "Last processed block number",
  DEFAULT_LABEL_NAMES,
);

const head_block_time_drift = registerGauge(
  "head_block_time_drift",
  "Head block time drift in seconds",
  DEFAULT_LABEL_NAMES,
);

const head_block_timestamp = registerGauge(
  "head_block_timestamp",
  "Head block timestamp",
  DEFAULT_LABEL_NAMES,
);

const manifest = registerGauge(
  "manifest",
  "Register the manifest for the substreams sink",
  [
    "substreams_endpoint",
    "start_block_num",
    "stop_block_num",
    "final_blocks_only",
    ...DEFAULT_LABEL_NAMES,
  ],
);

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
    const sessionGauge = registerGauge("session", "Substreams Session", [
      "trace_id",
      "resolved_start_block",
      "linear_handoff_block",
      "max_parallel_workers",
      ...DEFAULT_LABEL_NAMES,
    ]);

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
