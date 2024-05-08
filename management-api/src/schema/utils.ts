import SchemaBuilder from "@pothos/core";
import WithInputPlugin from "@pothos/plugin-with-input";
import { ValidationError } from "../errors";
import { EthAddressScalar } from "./scalar";
import { URLResolver } from "graphql-scalars";
import RelayPlugin from "@pothos/plugin-relay";
import { Context } from "../context";

export const builder = new SchemaBuilder<{
  Context: Context;
  Scalars: {
    EthAddress: {
      Input: string;
      Output: string;
    };
    URL: {
      Input: URL;
      Output: string | URL;
    };
  };
}>({
  plugins: [WithInputPlugin, RelayPlugin],
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
