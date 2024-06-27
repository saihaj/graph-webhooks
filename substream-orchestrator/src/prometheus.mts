import promClient from "prom-client";

// Prometheus Exporter
export const registry = promClient.register;
// Counters

export const invalidHttpRequests = new promClient.Counter({
  name: "http_invalid_request",
  help: "The number of invalid HTTP requests received",
});

export const successfulHttpRequests = new promClient.Counter({
  name: "http_successful_request",
  help: "The number of successful HTTP requests received",
});

export { promClient };
