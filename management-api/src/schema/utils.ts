import SchemaBuilder from "@pothos/core";
import WithInputPlugin from "@pothos/plugin-with-input";
import { ValidationError } from "../errors";
import { EthAddressScalar } from "./scalar";
import { URLResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
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
  plugins: [WithInputPlugin],
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
