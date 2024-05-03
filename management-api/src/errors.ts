import { GraphQLError } from "graphql";

// Use this Error class whenever you want to include the error in the resolver return type
class GraphWebhookBaseError extends GraphQLError {}

export class ValidationError extends GraphWebhookBaseError {
  constructor(message: string) {
    super(message);
  }
}
