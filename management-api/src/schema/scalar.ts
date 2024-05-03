import { ValidationError } from "../errors";
import { GraphQLScalarType, Kind } from "graphql";
import { isAddress } from "viem/utils";

export const EthAddressScalar = new GraphQLScalarType({
  name: "EthAddress",
  description: "Ethereum address",
  parseValue(value) {
    if (typeof value !== "string") throw new ValidationError("Invalid type");
    if (!isAddress(value)) throw new ValidationError("Invalid address");
    return value.toLowerCase();
  },
  serialize(value): string {
    if (typeof value !== "string") throw new ValidationError("Invalid type");
    if (!isAddress(value)) throw new ValidationError("Invalid address");
    return value.toLowerCase();
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error("Invalid type");
    }
    if (!isAddress(ast.value)) throw new ValidationError("Invalid address");
    return ast.value.toLowerCase();
  },
});
