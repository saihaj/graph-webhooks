import { lexicographicSortSchema, printSchema } from "graphql";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { schema } from "../src/schema";

const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFile(join(__dirname, "..", "schema.graphql"), schemaAsString);
