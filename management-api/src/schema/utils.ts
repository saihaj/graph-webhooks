import SchemaBuilder from "@pothos/core";
import WithInputPlugin from "@pothos/plugin-with-input";
import { ValidationError } from "../errors";
import { EthAddressScalar } from "./scalar";
import { URLResolver, JSONResolver, TimestampResolver } from "graphql-scalars";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { Context } from "../context";

export function isObject(value: unknown): value is object {
  return typeof value === "object" && value != null;
}

export const builder = new SchemaBuilder<{
  Context: Context;
  Scalars: {
    JSON: {
      Input: object;
      Output: object;
    };
    Timestamp: {
      Input: Date;
      Output: Date;
    };
    EthAddress: {
      Input: string;
      Output: string;
    };
    URL: {
      Input: URL;
      Output: string | URL;
    };
  };
  AuthScopes: {
    isAuthenticated: boolean;
  };
}>({
  plugins: [ScopeAuthPlugin, WithInputPlugin, RelayPlugin],
  authScopes: (context) => {
    return {
      isAuthenticated: !!context.authUserId,
    };
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    edgesFieldOptions: {
      nullable: {
        list: false,
        // @ts-expect-error We don't want nullability here
        items: false,
      },
    },
  },
});

builder.addScalarType("EthAddress", EthAddressScalar, {});
builder.addScalarType("URL", URLResolver, {});
builder.addScalarType("JSON", JSONResolver, {});
builder.addScalarType("Timestamp", TimestampResolver, {});

const ErrorInterface = builder
  .interfaceRef<{ message: string }>("Error")
  .implement({
    description: "Base Error",
    fields: (t) => ({
      message: t.exposeString("message", {
        description: "Descriptive message of error",
      }),
    }),
  });

builder.objectType(ValidationError, {
  name: "ValidationError",
  description: "Returned when a validation error occurs.",
  interfaces: [ErrorInterface],
});

export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => {
  return value !== null && value !== undefined;
};
