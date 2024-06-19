import { GraphQLError, GraphQLErrorOptions } from "graphql";
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";
import { proxy } from "valtio";

export const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;
if (!GRAPHQL_ENDPOINT) {
  throw new Error("VITE_GRAPHQL_ENDPOINT is not defined");
}

export const GraphQLClientHeader = proxy<{
  "content-type": string;
  "x-webhooks-client-platform": string;
  Authorization?: string;
}>({
  "content-type": "application/json; charset=utf-8",
  "x-webhooks-client-platform": "web",
});

export const environment = new Environment({
  store: new Store(new RecordSource()),
  network: Network.create((operation, variables) => {
    return Observable.create((sink) => {
      const ctrl = new AbortController();

      (async () => {
        const res = await fetch(
          // include the `operation.operationKind` and `operation.name` because its easier to navigate through the GraphQL requests in the DevTools
          `${import.meta.env.VITE_GRAPHQL_ENDPOINT}?${operation.operationKind}=${operation.name}`,
          {
            signal: ctrl.signal,
            method: "POST",
            credentials: "include",
            headers: {
              ...GraphQLClientHeader,
            },
            body: JSON.stringify({
              operationName: operation.name,
              query: operation.text || "",
              variables,
            }),
          },
        );

        if (!res.ok) {
          const err = new Error((await res.text()) || res.statusText);
          err.name = "GraphQLRequestError";
          throw err;
        }

        const data = await res.json();

        if (data.errors) {
          const errs = data.errors.map(
            ({
              message,
              ...opts
            }: GraphQLErrorOptions & { message: string }) => {
              return new GraphQLError(message, opts);
            },
          );
          if (errs.length === 1) {
            throw errs[0];
          }
          const aggErr = new AggregateError(errs);
          aggErr.name = "GraphQLAggregateError";
          aggErr.toString = () =>
            `${aggErr.name}: ${aggErr.errors.map((err) => err.message).join(", ")}`;
          throw aggErr;
        }

        return data;
      })()
        .then(sink.next)
        .then(sink.complete)
        .catch(sink.error);

      return () => {
        ctrl.abort();
      };
    });
  }),
});

if (import.meta.env.DEV) {
  // @ts-expect-error for debugging purposes
  window.relayEnvironment = environment;
}
