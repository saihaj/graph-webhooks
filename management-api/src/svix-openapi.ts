export default {
  components: {
    schemas: {
      ApplicationIn: {
        properties: {
          name: {
            example: "My first application",
            title: "Name",
            type: "string",
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          uid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
        },
        required: ["name"],
        title: "ApplicationIn",
        type: "object",
      },
      ApplicationOut: {
        properties: {
          createdAt: {
            format: "date-time",
            title: "Createdat",
            type: "string",
          },
          id: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          name: {
            example: "My first application",
            title: "Name",
            type: "string",
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          uid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
          updatedAt: {
            format: "date-time",
            title: "Updatedat",
            type: "string",
          },
        },
        required: ["name", "id", "createdAt", "updatedAt"],
        title: "ApplicationOut",
        type: "object",
      },
      DashboardAccessOut: {
        properties: {
          token: {
            example: "appsk_kV3ts5tKPNJN4Dl25cMTfUNdmabxbX0O",
            title: "Token",
            type: "string",
          },
          url: {
            example:
              "https://app.svix.com/login#key=eyJhcHBJZCI6ICJhcHBfMXRSdFl",
            format: "uri",
            maxLength: 65536,
            minLength: 1,
            title: "Url",
            type: "string",
          },
        },
        required: ["url", "token"],
        title: "DashboardAccessOut",
        type: "object",
      },
      EndpointCreatedEvent: {
        description: "Sent when an endpoint is created.",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
          },
          type: "endpoint.created",
        },
        properties: {
          data: { $ref: "#/components/schemas/EndpointCreatedEventData" },
          type: {
            default: "endpoint.created",
            enum: ["endpoint.created"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "EndpointCreatedEvent",
        type: "object",
      },
      EndpointCreatedEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
        },
        required: ["appId", "endpointId"],
        title: "EndpointCreatedEventData",
        type: "object",
      },
      EndpointDeletedEvent: {
        description: "Sent when an endpoint is deleted.",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
          },
          type: "endpoint.deleted",
        },
        properties: {
          data: { $ref: "#/components/schemas/EndpointDeletedEventData" },
          type: {
            default: "endpoint.deleted",
            enum: ["endpoint.deleted"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "EndpointDeletedEvent",
        type: "object",
      },
      EndpointDeletedEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
        },
        required: ["appId", "endpointId"],
        title: "EndpointDeletedEventData",
        type: "object",
      },
      EndpointDisabledEvent: {
        description:
          "Sent when an endpoint has been automatically disabled after continuous failures.",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            failSince: "1970-01-01T00:00:00",
          },
          type: "endpoint.disabled",
        },
        properties: {
          data: { $ref: "#/components/schemas/EndpointDisabledEventData" },
          type: {
            default: "endpoint.disabled",
            enum: ["endpoint.disabled"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "EndpointDisabledEvent",
        type: "object",
      },
      EndpointDisabledEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
          failSince: {
            format: "date-time",
            title: "Failsince",
            type: "string",
          },
        },
        required: ["appId", "endpointId", "failSince"],
        title: "EndpointDisabledEventData",
        type: "object",
      },
      EndpointHeadersIn: {
        properties: {
          headers: {
            additionalProperties: { type: "string" },
            example: { "X-Example": "123", "X-Foobar": "Bar" },
            title: "Headers",
            type: "object",
          },
        },
        required: ["headers"],
        title: "EndpointHeadersIn",
        type: "object",
      },
      EndpointHeadersOut: {
        description:
          "The value of the headers is returned in the `headers` field.\n\nSensitive headers that have been redacted are returned in the sensitive field.",
        properties: {
          headers: {
            additionalProperties: { type: "string" },
            example: { "X-Example": "123", "X-Foobar": "Bar" },
            title: "Headers",
            type: "object",
          },
          sensitive: {
            example: ["Authorization"],
            items: { example: "X-Foobar", type: "string" },
            title: "Sensitive",
            type: "array",
            uniqueItems: true,
          },
        },
        required: ["headers", "sensitive"],
        title: "EndpointHeadersOut",
        type: "object",
      },
      EndpointHeadersPatchIn: {
        properties: {
          headers: {
            additionalProperties: { type: "string" },
            example: { "X-Example": "123", "X-Foobar": "Bar" },
            title: "Headers",
            type: "object",
          },
        },
        required: ["headers"],
        title: "EndpointHeadersPatchIn",
        type: "object",
      },
      EndpointIn: {
        properties: {
          channels: {
            description:
              "List of message channels this endpoint listens to (omit for all)",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 10,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          description: {
            default: "",
            example: "An example endpoint name",
            title: "Description",
            type: "string",
          },
          disabled: {
            default: false,
            example: false,
            title: "Disabled",
            type: "boolean",
          },
          filterTypes: {
            example: ["user.signup", "user.deleted"],
            items: { type: "string" },
            minItems: 1,
            title: "Filtertypes",
            type: "array",
            uniqueItems: true,
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          secret: {
            description:
              "The endpoint's verification secret. If `null` is passed, a secret is automatically generated.",
            example: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD",
            pattern: "^whsec_[a-zA-Z0-9+/]{32}$",
            title: "Secret",
            type: "string",
          },
          uid: {
            description: "Optional unique identifier for the endpoint",
            example: "unique-endpoint-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
          url: {
            example: "https://example.com/webhook/",
            format: "uri",
            maxLength: 65536,
            minLength: 1,
            title: "Url",
            type: "string",
          },
          version: {
            example: 1,
            exclusiveMinimum: 0.0,
            title: "Version",
            type: "integer",
          },
        },
        required: ["url", "version"],
        title: "EndpointIn",
        type: "object",
      },
      EndpointMessageOut: {
        properties: {
          channels: {
            description:
              "List of free-form identifiers that endpoints can filter by",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 5,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          eventId: {
            description: "Optional unique identifier for the message",
            example: "evt_pNZKtWg8Azow",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventid",
            type: "string",
          },
          eventType: {
            example: "user.signup",
            maxLength: 256,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventtype",
            type: "string",
          },
          id: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          nextAttempt: {
            format: "date-time",
            title: "Nextattempt",
            type: "string",
          },
          payload: {
            example: { email: "test@example.com", username: "test_user" },
            title: "Payload",
            type: "object",
          },
          status: { $ref: "#/components/schemas/MessageStatus" },
          timestamp: {
            format: "date-time",
            title: "Timestamp",
            type: "string",
          },
        },
        required: ["eventType", "payload", "id", "timestamp", "status"],
        title: "EndpointMessageOut",
        type: "object",
      },
      EndpointOut: {
        properties: {
          channels: {
            description:
              "List of message channels this endpoint listens to (omit for all)",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 10,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          createdAt: {
            format: "date-time",
            title: "Createdat",
            type: "string",
          },
          description: {
            default: "",
            example: "An example endpoint name",
            title: "Description",
            type: "string",
          },
          disabled: {
            default: false,
            example: false,
            title: "Disabled",
            type: "boolean",
          },
          filterTypes: {
            example: ["user.signup", "user.deleted"],
            items: { type: "string" },
            minItems: 1,
            title: "Filtertypes",
            type: "array",
            uniqueItems: true,
          },
          id: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          uid: {
            description: "Optional unique identifier for the endpoint",
            example: "unique-endpoint-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
          updatedAt: {
            format: "date-time",
            title: "Updatedat",
            type: "string",
          },
          url: {
            example: "https://example.com/webhook/",
            format: "uri",
            maxLength: 65536,
            minLength: 1,
            title: "Url",
            type: "string",
          },
          version: {
            example: 1,
            exclusiveMinimum: 0.0,
            title: "Version",
            type: "integer",
          },
        },
        required: ["url", "version", "id", "createdAt", "updatedAt"],
        title: "EndpointOut",
        type: "object",
      },
      EndpointSecretOut: {
        properties: {
          key: {
            description:
              "The endpoint's verification secret. If `null` is passed, a secret is automatically generated.",
            example: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD",
            pattern: "^whsec_[a-zA-Z0-9+/]{32}$",
            title: "Key",
            type: "string",
          },
        },
        required: ["key"],
        title: "EndpointSecretOut",
        type: "object",
      },
      EndpointSecretRotateIn: {
        properties: {
          key: {
            description:
              "The endpoint's verification secret. If `null` is passed, a secret is automatically generated.",
            example: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD",
            pattern: "^whsec_[a-zA-Z0-9+/]{32}$",
            title: "Key",
            type: "string",
          },
        },
        title: "EndpointSecretRotateIn",
        type: "object",
      },
      EndpointUpdate: {
        properties: {
          channels: {
            description:
              "List of message channels this endpoint listens to (omit for all)",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 10,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          description: {
            default: "",
            example: "An example endpoint name",
            title: "Description",
            type: "string",
          },
          disabled: {
            default: false,
            example: false,
            title: "Disabled",
            type: "boolean",
          },
          filterTypes: {
            example: ["user.signup", "user.deleted"],
            items: { type: "string" },
            minItems: 1,
            title: "Filtertypes",
            type: "array",
            uniqueItems: true,
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          uid: {
            description: "Optional unique identifier for the endpoint",
            example: "unique-endpoint-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
          url: {
            example: "https://example.com/webhook/",
            format: "uri",
            maxLength: 65536,
            minLength: 1,
            title: "Url",
            type: "string",
          },
          version: {
            example: 1,
            exclusiveMinimum: 0.0,
            title: "Version",
            type: "integer",
          },
        },
        required: ["url", "version"],
        title: "EndpointUpdate",
        type: "object",
      },
      EndpointUpdatedEvent: {
        description: "Sent when an endpoint is updated.",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
          },
          type: "endpoint.updated",
        },
        properties: {
          data: { $ref: "#/components/schemas/EndpointUpdatedEventData" },
          type: {
            default: "endpoint.updated",
            enum: ["endpoint.updated"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "EndpointUpdatedEvent",
        type: "object",
      },
      EndpointUpdatedEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
        },
        required: ["appId", "endpointId"],
        title: "EndpointUpdatedEventData",
        type: "object",
      },
      EventTypeIn: {
        properties: {
          archived: {
            default: false,
            example: false,
            title: "Archived",
            type: "boolean",
          },
          description: {
            example: "A user has signed up",
            title: "Description",
            type: "string",
          },
          name: {
            example: "user.signup",
            maxLength: 256,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Name",
            type: "string",
          },
          schemas: {
            additionalProperties: {
              example: {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
              type: "object",
            },
            description:
              "The schema for the event type for a specific version as a JSON schema.",
            example: {
              "1": {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
            },
            title: "Schemas",
            type: "object",
          },
        },
        required: ["description", "name"],
        title: "EventTypeIn",
        type: "object",
      },
      EventTypeOut: {
        properties: {
          archived: {
            default: false,
            example: false,
            title: "Archived",
            type: "boolean",
          },
          createdAt: {
            format: "date-time",
            title: "Createdat",
            type: "string",
          },
          description: {
            example: "A user has signed up",
            title: "Description",
            type: "string",
          },
          name: {
            example: "user.signup",
            maxLength: 256,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Name",
            type: "string",
          },
          schemas: {
            additionalProperties: {
              example: {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
              type: "object",
            },
            description:
              "The schema for the event type for a specific version as a JSON schema.",
            example: {
              "1": {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
            },
            title: "Schemas",
            type: "object",
          },
          updatedAt: {
            format: "date-time",
            title: "Updatedat",
            type: "string",
          },
        },
        required: ["description", "name", "createdAt", "updatedAt"],
        title: "EventTypeOut",
        type: "object",
      },
      EventTypeUpdate: {
        properties: {
          archived: {
            default: false,
            example: false,
            title: "Archived",
            type: "boolean",
          },
          description: {
            example: "A user has signed up",
            title: "Description",
            type: "string",
          },
          schemas: {
            additionalProperties: {
              example: {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
              type: "object",
            },
            description:
              "The schema for the event type for a specific version as a JSON schema.",
            example: {
              "1": {
                description: "An invoice was paid by a user",
                properties: {
                  invoiceId: {
                    description: "The invoice id",
                    type: "string",
                  },
                  userId: { description: "The user id", type: "string" },
                },
                required: ["invoiceId", "userId"],
                title: "Invoice Paid Event",
                type: "object",
              },
            },
            title: "Schemas",
            type: "object",
          },
        },
        required: ["description"],
        title: "EventTypeUpdate",
        type: "object",
      },
      HTTPValidationError: {
        properties: {
          detail: {
            items: { $ref: "#/components/schemas/ValidationError" },
            title: "Detail",
            type: "array",
          },
        },
        title: "HTTPValidationError",
        type: "object",
      },
      HttpErrorOut: {
        properties: {
          code: { title: "Code", type: "string" },
          detail: { title: "Detail", type: "string" },
        },
        required: ["code", "detail"],
        title: "HttpError",
        type: "object",
      },
      IntegrationIn: {
        properties: {
          name: {
            example: "Example Integration",
            title: "Name",
            type: "string",
          },
        },
        required: ["name"],
        title: "IntegrationIn",
        type: "object",
      },
      IntegrationKeyOut: {
        properties: {
          key: {
            example: "integsk_kV3ts5tKPNJN4Dl25cMTfUNdmabxbX0O",
            title: "Key",
            type: "string",
          },
        },
        required: ["key"],
        title: "IntegrationKeyOut",
        type: "object",
      },
      IntegrationOut: {
        properties: {
          createdAt: {
            format: "date-time",
            title: "Createdat",
            type: "string",
          },
          id: {
            example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          name: {
            example: "Example Integration",
            title: "Name",
            type: "string",
          },
          updatedAt: {
            format: "date-time",
            title: "Updatedat",
            type: "string",
          },
        },
        required: ["name", "id", "createdAt", "updatedAt"],
        title: "IntegrationOut",
        type: "object",
      },
      IntegrationUpdate: {
        properties: {
          name: {
            example: "Example Integration",
            title: "Name",
            type: "string",
          },
        },
        required: ["name"],
        title: "IntegrationUpdate",
        type: "object",
      },
      ListResponse_ApplicationOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/ApplicationOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[ApplicationOut]",
        type: "object",
      },
      ListResponse_EndpointMessageOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/EndpointMessageOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
          prevIterator: {
            example: "-iterator",
            title: "Previterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[EndpointMessageOut]",
        type: "object",
      },
      ListResponse_EndpointOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/EndpointOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[EndpointOut]",
        type: "object",
      },
      ListResponse_EventTypeOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/EventTypeOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[EventTypeOut]",
        type: "object",
      },
      ListResponse_IntegrationOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/IntegrationOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[IntegrationOut]",
        type: "object",
      },
      ListResponse_MessageAttemptEndpointOut_: {
        properties: {
          data: {
            items: {
              $ref: "#/components/schemas/MessageAttemptEndpointOut",
            },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
          prevIterator: {
            example: "-iterator",
            title: "Previterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[MessageAttemptEndpointOut]",
        type: "object",
      },
      ListResponse_MessageAttemptOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/MessageAttemptOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
          prevIterator: {
            example: "-iterator",
            title: "Previterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[MessageAttemptOut]",
        type: "object",
      },
      ListResponse_MessageEndpointOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/MessageEndpointOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[MessageEndpointOut]",
        type: "object",
      },
      ListResponse_MessageOut_: {
        properties: {
          data: {
            items: { $ref: "#/components/schemas/MessageOut" },
            title: "Data",
            type: "array",
          },
          done: { title: "Done", type: "boolean" },
          iterator: {
            example: "iterator",
            title: "Iterator",
            type: "string",
          },
          prevIterator: {
            example: "-iterator",
            title: "Previterator",
            type: "string",
          },
        },
        required: ["data", "done"],
        title: "ListResponse[MessageOut]",
        type: "object",
      },
      MessageAttemptEndpointOut: {
        properties: {
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
          id: {
            example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          msgId: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Msgid",
            type: "string",
          },
          response: {
            example: "{}",
            title: "Response",
            type: "string",
          },
          responseStatusCode: {
            example: 200,
            title: "Responsestatuscode",
            type: "integer",
          },
          status: { $ref: "#/components/schemas/MessageStatus" },
          timestamp: {
            format: "date-time",
            title: "Timestamp",
            type: "string",
          },
          triggerType: {
            $ref: "#/components/schemas/MessageAttemptTriggerType",
          },
        },
        required: [
          "id",
          "msgId",
          "endpointId",
          "response",
          "responseStatusCode",
          "timestamp",
          "status",
          "triggerType",
        ],
        title: "MessageAttemptEndpointOut",
        type: "object",
      },
      MessageAttemptExhaustedEvent: {
        description:
          "Sent when a message delivery has failed (all of the retry attempts have been exhausted).",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            lastAttempt: {
              id: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              responseStatusCode: 500,
              timestamp: "1970-01-01T00:00:00",
            },
            msgId: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
          },
          type: "message.attempt.exhausted",
        },
        properties: {
          data: {
            $ref: "#/components/schemas/MessageAttemptExhaustedEventData",
          },
          type: {
            default: "message.attempt.exhausted",
            enum: ["message.attempt.exhausted"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "MessageAttemptExhaustedEvent",
        type: "object",
      },
      MessageAttemptExhaustedEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
          lastAttempt: {
            $ref: "#/components/schemas/MessageAttemptFailedData",
          },
          msgId: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Msgid",
            type: "string",
          },
        },
        required: ["appId", "msgId", "endpointId", "lastAttempt"],
        title: "MessageAttemptExhaustedEventData",
        type: "object",
      },
      MessageAttemptFailedData: {
        properties: {
          id: {
            example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          responseStatusCode: {
            example: 500,
            title: "Responsestatuscode",
            type: "integer",
          },
          timestamp: {
            format: "date-time",
            title: "Timestamp",
            type: "string",
          },
        },
        required: ["id", "responseStatusCode", "timestamp"],
        title: "MessageAttemptFailedData",
        type: "object",
      },
      MessageAttemptFailingEvent: {
        description:
          "Sent after a message has been failing for a few times.\nIt's sent on the fourth failure. It complements `message.attempt.exhausted` which is sent after the last failure.",
        example: {
          data: {
            appId: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            appUid: "unique-app-identifier",
            endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            lastAttempt: {
              id: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              responseStatusCode: 500,
              timestamp: "1970-01-01T00:00:00",
            },
            msgId: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
          },
          type: "message.attempt.failing",
        },
        properties: {
          data: {
            $ref: "#/components/schemas/MessageAttemptFailingEventData",
          },
          type: {
            default: "message.attempt.failing",
            enum: ["message.attempt.failing"],
            title: "Type",
            type: "string",
          },
        },
        required: ["data"],
        title: "MessageAttemptFailingEvent",
        type: "object",
      },
      MessageAttemptFailingEventData: {
        properties: {
          appId: {
            example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Appid",
            type: "string",
          },
          appUid: {
            description: "Optional unique identifier for the application",
            example: "unique-app-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Appuid",
            type: "string",
          },
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
          lastAttempt: {
            $ref: "#/components/schemas/MessageAttemptFailedData",
          },
          msgId: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Msgid",
            type: "string",
          },
        },
        required: ["appId", "msgId", "endpointId", "lastAttempt"],
        title: "MessageAttemptFailingEventData",
        type: "object",
      },
      MessageAttemptOut: {
        properties: {
          endpointId: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Endpointid",
            type: "string",
          },
          id: {
            example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          msgId: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Msgid",
            type: "string",
          },
          response: {
            example: "{}",
            title: "Response",
            type: "string",
          },
          responseStatusCode: {
            example: 200,
            title: "Responsestatuscode",
            type: "integer",
          },
          status: { $ref: "#/components/schemas/MessageStatus" },
          timestamp: {
            format: "date-time",
            title: "Timestamp",
            type: "string",
          },
          triggerType: {
            $ref: "#/components/schemas/MessageAttemptTriggerType",
          },
        },
        required: [
          "id",
          "msgId",
          "endpointId",
          "response",
          "responseStatusCode",
          "timestamp",
          "status",
          "triggerType",
        ],
        title: "MessageAttemptOut",
        type: "object",
      },
      MessageAttemptTriggerType: {
        description:
          "The reason an attempt was made:\n- Scheduled = 0\n- Manual = 1",
        enum: [0, 1],
        title: "MessageAttemptTriggerType",
        type: "integer",
        "x-enum-varnames": ["Scheduled", "Manual"],
      },
      MessageEndpointOut: {
        properties: {
          channels: {
            description:
              "List of message channels this endpoint listens to (omit for all)",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 10,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          createdAt: {
            format: "date-time",
            title: "Createdat",
            type: "string",
          },
          description: {
            default: "",
            example: "An example endpoint name",
            title: "Description",
            type: "string",
          },
          disabled: {
            default: false,
            example: false,
            title: "Disabled",
            type: "boolean",
          },
          filterTypes: {
            example: ["user.signup", "user.deleted"],
            items: { type: "string" },
            minItems: 1,
            title: "Filtertypes",
            type: "array",
            uniqueItems: true,
          },
          id: {
            example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          nextAttempt: {
            format: "date-time",
            title: "Nextattempt",
            type: "string",
          },
          rateLimit: {
            example: 1000,
            exclusiveMinimum: 0.0,
            title: "Ratelimit",
            type: "integer",
          },
          status: { $ref: "#/components/schemas/MessageStatus" },
          uid: {
            description: "Optional unique identifier for the endpoint",
            example: "unique-endpoint-identifier",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Uid",
            type: "string",
          },
          url: {
            example: "https://example.com/webhook/",
            format: "uri",
            maxLength: 65536,
            minLength: 1,
            title: "Url",
            type: "string",
          },
          version: {
            example: 1,
            exclusiveMinimum: 0.0,
            title: "Version",
            type: "integer",
          },
        },
        required: ["url", "version", "id", "createdAt", "status"],
        title: "MessageEndpointOut",
        type: "object",
      },
      MessageIn: {
        properties: {
          channels: {
            description:
              "List of free-form identifiers that endpoints can filter by",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 5,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          eventId: {
            description: "Optional unique identifier for the message",
            example: "evt_pNZKtWg8Azow",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventid",
            type: "string",
          },
          eventType: {
            example: "user.signup",
            maxLength: 256,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventtype",
            type: "string",
          },
          payload: {
            example: { email: "test@example.com", username: "test_user" },
            title: "Payload",
            type: "object",
          },
          payloadRetentionPeriod: {
            default: 90,
            description: "The retention period for the payload (in days).",
            example: 90,
            maximum: 90.0,
            minimum: 5.0,
            title: "Payloadretentionperiod",
            type: "integer",
          },
        },
        required: ["eventType", "payload"],
        title: "MessageIn",
        type: "object",
      },
      MessageOut: {
        properties: {
          channels: {
            description:
              "List of free-form identifiers that endpoints can filter by",
            example: ["project_123", "group_2"],
            items: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              type: "string",
            },
            maxItems: 5,
            minItems: 1,
            title: "Channels",
            type: "array",
            uniqueItems: true,
          },
          eventId: {
            description: "Optional unique identifier for the message",
            example: "evt_pNZKtWg8Azow",
            maxLength: 256,
            minLength: 1,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventid",
            type: "string",
          },
          eventType: {
            example: "user.signup",
            maxLength: 256,
            pattern: "^[a-zA-Z0-9\\-_.]+$",
            title: "Eventtype",
            type: "string",
          },
          id: {
            example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
            title: "Id",
            type: "string",
          },
          payload: {
            example: { email: "test@example.com", username: "test_user" },
            title: "Payload",
            type: "object",
          },
          timestamp: {
            format: "date-time",
            title: "Timestamp",
            type: "string",
          },
        },
        required: ["eventType", "payload", "id", "timestamp"],
        title: "MessageOut",
        type: "object",
      },
      MessageStatus: {
        description:
          "The sending status of the message:\n- Success = 0\n- Pending = 1\n- Fail = 2\n- Sending = 3",
        enum: [0, 1, 2, 3],
        title: "MessageStatus",
        type: "integer",
        "x-enum-varnames": ["Success", "Pending", "Fail", "Sending"],
      },
      RecoverIn: {
        properties: {
          since: { format: "date-time", title: "Since", type: "string" },
        },
        required: ["since"],
        title: "RecoverIn",
        type: "object",
      },
      RecoverOut: {
        properties: {},
        title: "RecoverOut",
        type: "object",
      },
      StatusCodeClass: {
        description:
          "The different classes of HTTP status codes:\n- CodeNone = 0\n- Code1xx = 100\n- Code2xx = 200\n- Code3xx = 300\n- Code4xx = 400\n- Code5xx = 500",
        enum: [0, 100, 200, 300, 400, 500],
        title: "StatusCodeClass",
        type: "integer",
        "x-enum-varnames": [
          "CodeNone",
          "Code1xx",
          "Code2xx",
          "Code3xx",
          "Code4xx",
          "Code5xx",
        ],
      },
      ValidationError: {
        properties: {
          loc: {
            items: { type: "string" },
            title: "Location",
            type: "array",
          },
          msg: { title: "Message", type: "string" },
          type: { title: "Error Type", type: "string" },
        },
        required: ["loc", "msg", "type"],
        title: "ValidationError",
        type: "object",
      },
      WebhookTypes: {
        description: "All of the webhook types that we support",
        properties: {
          a: { $ref: "#/components/schemas/EndpointDisabledEvent" },
          a1: { $ref: "#/components/schemas/MessageAttemptFailingEvent" },
          b: { $ref: "#/components/schemas/EndpointCreatedEvent" },
          c: { $ref: "#/components/schemas/EndpointUpdatedEvent" },
          d: { $ref: "#/components/schemas/EndpointDeletedEvent" },
          e: { $ref: "#/components/schemas/MessageAttemptExhaustedEvent" },
        },
        required: ["a", "b", "c", "d", "e", "a1"],
        title: "WebhookTypes",
        type: "object",
      },
    },
    securitySchemes: { HTTPBearer: { scheme: "bearer", type: "http" } },
  },
  info: {
    description:
      "Welcome to the Svix API documentation!\n\nUseful links: [Homepage](https://www.svix.com) | [Support email](mailto:support+docs@svix.com) | [Blog](https://www.svix.com/blog/) | [Slack Community](https://www.svix.com/slack/)\n\n# Introduction\n\nThis is the reference documentation and schemas for the [Svix webhook service](https://www.svix.com) API. For tutorials and other documentation please refer to [the documentation](https://docs.svix.com).\n\n## Main concepts\n\nIn Svix you have four important entities you will be interacting with:\n\n- `messages`: these are the webhooks being sent. They can have contents and a few other properties.\n- `application`: this is where `messages` are sent to. Usually you want to create one application for each user on your platform.\n- `endpoint`: endpoints are the URLs messages will be sent to. Each application can have multiple `endpoints` and each message sent to that application will be sent to all of them (unless they are not subscribed to the sent event type).\n- `event-type`: event types are identifiers denoting the type of the message being sent. Event types are primarily used to decide which events are sent to which endpoint.\n\n\n## Authentication\n\nGet your authentication token (`AUTH_TOKEN`) from the [Svix dashboard](https://dashboard.svix.com) and use it as part of the `Authorization` header as such: `Authorization: Bearer ${AUTH_TOKEN}`.\n\n<SecurityDefinitions />\n\n\n## Code samples\n\nThe code samples assume you already have the respective libraries installed and you know how to use them. For the latest information on how to do that, please refer to [the documentation](https://docs.svix.com/).\n\n\n## Idempotency\n\nSvix supports [idempotency](https://en.wikipedia.org/wiki/Idempotence) for safely retrying requests without accidentally performing the same operation twice. This is useful when an API call is disrupted in transit and you do not receive a response.\n\nTo perform an idempotent request, pass the idempotency key in the `Idempotency-Key` header to the request. The idempotency key should be a unique value generated by the client. You can create the key in however way you like, though we suggest using UUID v4, or any other string with enough entropy to avoid collisions.\n\nSvix's idempotency works by saving the resulting status code and body of the first request made for any given idempotency key for any successful request. Subsequent requests with the same key return the same result.\n\nPlease note that idempotency is only supported for `POST` requests.\n\n\n## Cross-Origin Resource Sharing\n\nThis API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). And that allows cross-domain communication from the browser. All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.\n",
    title: "Svix API",
    version: "1.4",
    "x-logo": {
      altText: "Svix Logo",
      url: "https://www.svix.com/static/img/brand-padded.svg",
    },
  },
  openapi: "3.0.2",
  paths: {
    "/api/v1/app/": {
      get: {
        description: "List of all the organization's applications.",
        operationId: "list_applications_api_v1_app__get",
        parameters: [
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_ApplicationOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Applications",
        tags: ["Application"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseApplicationOut = await svix.application.list();",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseApplicationOut = await svix.application.list();",
          },
          {
            label: "Python",
            lang: "Python",
            source: "list_response_application_out = svix.application.list()",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_application_out = await svix.application.list()",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              "listResponseApplicationOut, err := svixClient.Application.List(nil)",
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseApplicationOut = svix.application.list(FetchOptions())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseApplicationOut listResponseApplicationOut = svix.getApplication().list(new FetchOptions())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "list_response_application_out = svix.application.list",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              "let list_response_application_out = svix.application().list(None).await?;",
          },
          {
            label: "C#",
            lang: "C#",
            source:
              "var listResponseApplicationOut = await svix.Application.ListAsync()",
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix application list ",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      post: {
        description: "Create a new application.",
        operationId: "create_application_api_v1_app__post",
        parameters: [
          {
            description:
              "Get an existing application, or create a new one if doesn't exist. It's two separate functions in the libs.",
            in: "query",
            name: "get_if_exists",
            required: false,
            schema: {
              default: false,
              description:
                "Get an existing application, or create a new one if doesn't exist. It's two separate functions in the libs.",
              title: "Get If Exists",
              type: "boolean",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApplicationIn" },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApplicationOut" },
              },
            },
            description: "OK",
          },
          "201": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApplicationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Create Application",
        tags: ["Application"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const applicationOut = await svix.application.create({\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})\n// Or \nconst applicationOut = await svix.application.getOrCreate({\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const applicationOut = await svix.application.create({\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})\n// Or \nconst applicationOut = await svix.application.getOrCreate({\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              'application_out = svix.application.create(ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))\n# Or \napplication_out = svix.application.get_or_create(ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))',
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              'application_out = await svix.application.create(ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))\n# Or \napplication_out = await svix.application.get_or_create(ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))',
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'applicationOut, err := svixClient.Application.Create(&svix.ApplicationIn{\n    Uid: "unique-app-identifier",\n    Name: "My first application",\n    RateLimit: 1000\n})\n// Or \napplicationOut, err := svixClient.Application.GetOrCreate(&svix.ApplicationIn{\n    Uid: "unique-app-identifier",\n    Name: "My first application",\n    RateLimit: 1000\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val applicationOut = svix.application.create(ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)\n// Or \nval applicationOut = svix.application.getOrCreate(ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'ApplicationOut applicationOut = svix.getApplication().create(new ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)\n// Or \nApplicationOut applicationOut = svix.getApplication().getOrCreate(new ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'application_out = svix.application.create(Svix::ApplicationIn.new({\n    "uid": "unique-app-identifier",\n    "name": "My first application",\n    "rate_limit": 1000\n}))\n# Or \napplication_out = svix.application.get_or_create(Svix::ApplicationIn.new({\n    "uid": "unique-app-identifier",\n    "name": "My first application",\n    "rate_limit": 1000\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let application_out = svix.application().create(ApplicationIn {\n    uid: "unique-app-identifier".to_string(),\n    name: "My first application".to_string(),\n    rate_limit: 1000\n}).await?;\n// Or \nlet application_out = svix.application().get_or_create(ApplicationIn {\n    uid: "unique-app-identifier".to_string(),\n    name: "My first application".to_string(),\n    rate_limit: 1000\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var applicationOut = await svix.Application.CreateAsync(new ApplicationIn{\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix application create \'{\n    "uid": "unique-app-identifier",\n    "name": "My first application",\n    "rateLimit": 1000\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"uid\": \"unique-app-identifier\",\n    \"name\": \"My first application\",\n    \"rateLimit\": 1000\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/": {
      delete: {
        description: "Delete an application.",
        operationId: "delete_application_api_v1_app__app_id___delete",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Delete Application",
        tags: ["Application"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source: "await svix.application.delete('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source: "await svix.application.delete('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "svix.application.delete('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "await svix.application.delete('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source: 'err := svixClient.Application.Delete("app_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "svix.application.delete('app_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source: "svix.getApplication().delete('app_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "svix.application.delete('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source: 'svix.application().delete("app_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source: 'await svix.Application.DeleteAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix application delete 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'DELETE' \\\n  'https://api.svix.com/api/v1/app/{app_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      get: {
        description: "Get an application.",
        operationId: "get_application_api_v1_app__app_id___get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApplicationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Application",
        tags: ["Application"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const applicationOut = await svix.application.get('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const applicationOut = await svix.application.get('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "application_out = svix.application.get('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "application_out = await svix.application.get('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'applicationOut, err := svixClient.Application.Get("app_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "val applicationOut = svix.application.get('app_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ApplicationOut applicationOut = svix.getApplication().get('app_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "application_out = svix.application.get('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let application_out = svix.application().get("app_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var applicationOut = await svix.Application.GetAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix application get 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      put: {
        description: "Update an application.",
        operationId: "update_application_api_v1_app__app_id___put",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApplicationIn" },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApplicationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Update Application",
        tags: ["Application"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const applicationOut = await svix.application.update(\'app_id\', {\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const applicationOut = await svix.application.update(\'app_id\', {\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              'application_out = svix.application.update(\'app_id\', ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))',
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              'application_out = await svix.application.update(\'app_id\', ApplicationIn(\n    uid="unique-app-identifier",\n    name="My first application",\n    rate_limit=1000\n))',
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'applicationOut, err := svixClient.Application.Update("app_id", &svix.ApplicationIn{\n    Uid: "unique-app-identifier",\n    Name: "My first application",\n    RateLimit: 1000\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val applicationOut = svix.application.update(\'app_id\', ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'ApplicationOut applicationOut = svix.getApplication().update(\'app_id\', new ApplicationIn()\n    .uid("unique-app-identifier"),\n    .name("My first application"),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'application_out = svix.application.update(\'app_id\', Svix::ApplicationIn.new({\n    "uid": "unique-app-identifier",\n    "name": "My first application",\n    "rate_limit": 1000\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let application_out = svix.application().update("app_id", ApplicationIn {\n    uid: "unique-app-identifier".to_string(),\n    name: "My first application".to_string(),\n    rate_limit: 1000\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var applicationOut = await svix.Application.UpdateAsync("app_id", new ApplicationIn{\n    uid: "unique-app-identifier",\n    name: "My first application",\n    rateLimit: 1000\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix application update \'app_id\' \'{\n    "uid": "unique-app-identifier",\n    "name": "My first application",\n    "rateLimit": 1000\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'PUT' \\\n  'https://api.svix.com/api/v1/app/{app_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"uid\": \"unique-app-identifier\",\n    \"name\": \"My first application\",\n    \"rateLimit\": 1000\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}/": {
      get: {
        description: "List attempts by endpoint id",
        operationId:
          "list_attempts_by_endpoint_api_v1_app__app_id__attempt_endpoint__endpoint_id___get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "status",
            required: false,
            schema: { $ref: "#/components/schemas/MessageStatus" },
          },
          {
            in: "query",
            name: "status_code_class",
            required: false,
            schema: { $ref: "#/components/schemas/StatusCodeClass" },
          },
          {
            in: "query",
            name: "event_types",
            required: false,
            schema: {
              items: {
                example: "user.signup",
                maxLength: 256,
                pattern: "^[a-zA-Z0-9\\-_.]+$",
                type: "string",
              },
              title: "Event Types",
              type: "array",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageAttemptOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempts By Endpoint",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.listByEndpoint('app_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.listByEndpoint('app_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list_by_endpoint('app_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_message_attempt_out = await svix.message_attempt.list_by_endpoint('app_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseMessageAttemptOut, err := svixClient.MessageAttempt.ListByEndpoint("app_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseMessageAttemptOut = svix.messageAttempt.listByEndpoint('app_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseMessageAttemptOut listResponseMessageAttemptOut = svix.getMessageAttempt().listByEndpoint('app_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list_by_endpoint('app_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_message_attempt_out = svix.message_attempt().list_by_endpoint("app_id", "endpoint_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseMessageAttemptOut = await svix.MessageAttempt.ListByEndpointAsync("app_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix message-attempt list-by-endpoint 'app_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/attempt/msg/{msg_id}/": {
      get: {
        description: "List attempts by message id",
        operationId:
          "list_attempts_by_msg_api_v1_app__app_id__attempt_msg__msg_id___get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "endpoint_id",
            required: false,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "status",
            required: false,
            schema: { $ref: "#/components/schemas/MessageStatus" },
          },
          {
            in: "query",
            name: "status_code_class",
            required: false,
            schema: { $ref: "#/components/schemas/StatusCodeClass" },
          },
          {
            in: "query",
            name: "event_types",
            required: false,
            schema: {
              items: {
                example: "user.signup",
                maxLength: 256,
                pattern: "^[a-zA-Z0-9\\-_.]+$",
                type: "string",
              },
              title: "Event Types",
              type: "array",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageAttemptOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempts By Msg",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.listByMsg('app_id', 'msg_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.listByMsg('app_id', 'msg_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list_by_msg('app_id', 'msg_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_message_attempt_out = await svix.message_attempt.list_by_msg('app_id', 'msg_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseMessageAttemptOut, err := svixClient.MessageAttempt.ListByMsg("app_id", "msg_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseMessageAttemptOut = svix.messageAttempt.listByMsg('app_id', 'msg_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseMessageAttemptOut listResponseMessageAttemptOut = svix.getMessageAttempt().listByMsg('app_id', 'msg_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list_by_msg('app_id', 'msg_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_message_attempt_out = svix.message_attempt().list_by_msg("app_id", "msg_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseMessageAttemptOut = await svix.MessageAttempt.ListByMsgAsync("app_id", "msg_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix message-attempt list-by-msg 'app_id' 'msg_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/attempt/msg/{msg_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/": {
      get: {
        description: "List the application's endpoints.",
        operationId: "list_endpoints_api_v1_app__app_id__endpoint__get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_EndpointOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Endpoints",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseEndpointOut = await svix.endpoint.list('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseEndpointOut = await svix.endpoint.list('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "list_response_endpoint_out = svix.endpoint.list('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_endpoint_out = await svix.endpoint.list('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseEndpointOut, err := svixClient.Endpoint.List("app_id", nil)',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseEndpointOut = svix.endpoint.list('app_id', FetchOptions())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseEndpointOut listResponseEndpointOut = svix.getEndpoint().list('app_id', new FetchOptions())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "list_response_endpoint_out = svix.endpoint.list('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_endpoint_out = svix.endpoint().list("app_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseEndpointOut = await svix.Endpoint.ListAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix endpoint list 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      post: {
        description:
          "Create a new endpoint for the application.\n\nWhen `secret` is `null` the secret is automatically generated (recommended)",
        operationId: "create_endpoint_api_v1_app__app_id__endpoint__post",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointIn" },
            },
          },
          required: true,
        },
        responses: {
          "201": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EndpointOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Create Endpoint",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const endpointOut = await svix.endpoint.create(\'app_id\', {\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: [\n        "user.signup",\n        "user.deleted"\n    ],\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    disabled: false,\n    rateLimit: 1000,\n    secret: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const endpointOut = await svix.endpoint.create(\'app_id\', {\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: [\n        "user.signup",\n        "user.deleted"\n    ],\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    disabled: false,\n    rateLimit: 1000,\n    secret: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "endpoint_out = svix.endpoint.create('app_id', EndpointIn(\n    uid=\"unique-endpoint-identifier\",\n    url=\"https://example.com/webhook/\",\n    version=1,\n    description=\"An example endpoint name\",\n    filter_types=['user.signup', 'user.deleted'],\n    channels=['project_123', 'group_2'],\n    disabled=False,\n    rate_limit=1000,\n    secret=\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "endpoint_out = await svix.endpoint.create('app_id', EndpointIn(\n    uid=\"unique-endpoint-identifier\",\n    url=\"https://example.com/webhook/\",\n    version=1,\n    description=\"An example endpoint name\",\n    filter_types=['user.signup', 'user.deleted'],\n    channels=['project_123', 'group_2'],\n    disabled=False,\n    rate_limit=1000,\n    secret=\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'endpointOut, err := svixClient.Endpoint.Create("app_id", &svix.EndpointIn{\n    Uid: "unique-endpoint-identifier",\n    Url: "https://example.com/webhook/",\n    Version: 1,\n    Description: "An example endpoint name",\n    FilterTypes: [...]string{"user.signup", "user.deleted"},\n    Channels: [...]string{"project_123", "group_2"},\n    Disabled: False,\n    RateLimit: 1000,\n    Secret: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val endpointOut = svix.endpoint.create(\'app_id\', EndpointIn()\n    .uid("unique-endpoint-identifier"),\n    .url("https://example.com/webhook/"),\n    .version(1),\n    .description("An example endpoint name"),\n    .filterTypes(arrayOf("user.signup", "user.deleted")),\n    .channels(arrayOf("project_123", "group_2")),\n    .disabled(False),\n    .rateLimit(1000),\n    .secret("whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD")\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'EndpointOut endpointOut = svix.getEndpoint().create(\'app_id\', new EndpointIn()\n    .uid("unique-endpoint-identifier"),\n    .url("https://example.com/webhook/"),\n    .version(1),\n    .description("An example endpoint name"),\n    .filterTypes(new String[]{"user.signup", "user.deleted"}),\n    .channels(new String[]{"project_123", "group_2"}),\n    .disabled(False),\n    .rateLimit(1000),\n    .secret("whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD")\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'endpoint_out = svix.endpoint.create(\'app_id\', Svix::EndpointIn.new({\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filter_types": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rate_limit": 1000,\n    "secret": "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let endpoint_out = svix.endpoint().create("app_id", EndpointIn {\n    uid: "unique-endpoint-identifier".to_string(),\n    url: "https://example.com/webhook/".to_string(),\n    version: 1,\n    description: "An example endpoint name".to_string(),\n    filter_types: vec!["user.signup".to_string(), "user.deleted".to_string()],\n    channels: vec!["project_123".to_string(), "group_2".to_string()],\n    disabled: False,\n    rate_limit: 1000,\n    secret: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var endpointOut = await svix.Endpoint.CreateAsync("app_id", new EndpointIn{\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: new string[] {"user.signup", "user.deleted"},\n    channels: new string[] {"project_123", "group_2"},\n    disabled: false,\n    rateLimit: 1000,\n    secret: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix endpoint create \'app_id\' \'{\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filterTypes": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rateLimit": 1000,\n    "secret": "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              'curl -X \'POST\' \\\n  \'https://api.svix.com/api/v1/app/{app_id}/endpoint/\' \\\n  -H \'Authorization: Bearer AUTH_TOKEN\' \\\n  -H \'accept: application/json\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filterTypes": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rateLimit": 1000,\n    "secret": "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n}\'',
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/": {
      delete: {
        description: "Delete an endpoint.",
        operationId:
          "delete_endpoint_api_v1_app__app_id__endpoint__endpoint_id___delete",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Delete Endpoint",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source: "await svix.endpoint.delete('app_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source: "await svix.endpoint.delete('app_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "svix.endpoint.delete('app_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "await svix.endpoint.delete('app_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.Endpoint.Delete("app_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "svix.endpoint.delete('app_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source: "svix.getEndpoint().delete('app_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "svix.endpoint.delete('app_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source: 'svix.endpoint().delete("app_id", "endpoint_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source: 'await svix.Endpoint.DeleteAsync("app_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix endpoint delete 'app_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'DELETE' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      get: {
        description: "Get an application.",
        operationId:
          "get_endpoint_api_v1_app__app_id__endpoint__endpoint_id___get",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EndpointOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Endpoint",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const endpointOut = await svix.endpoint.get('app_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const endpointOut = await svix.endpoint.get('app_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "endpoint_out = svix.endpoint.get('app_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "endpoint_out = await svix.endpoint.get('app_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'endpointOut, err := svixClient.Endpoint.Get("app_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val endpointOut = svix.endpoint.get('app_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "EndpointOut endpointOut = svix.getEndpoint().get('app_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "endpoint_out = svix.endpoint.get('app_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let endpoint_out = svix.endpoint().get("app_id", "endpoint_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var endpointOut = await svix.Endpoint.GetAsync("app_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix endpoint get 'app_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      put: {
        description: "Update an endpoint.",
        operationId:
          "update_endpoint_api_v1_app__app_id__endpoint__endpoint_id___put",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointUpdate" },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EndpointOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Update Endpoint",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const endpointOut = await svix.endpoint.update(\'app_id\', \'endpoint_id\', {\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: [\n        "user.signup",\n        "user.deleted"\n    ],\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    disabled: false,\n    rateLimit: 1000\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const endpointOut = await svix.endpoint.update(\'app_id\', \'endpoint_id\', {\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: [\n        "user.signup",\n        "user.deleted"\n    ],\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    disabled: false,\n    rateLimit: 1000\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "endpoint_out = svix.endpoint.update('app_id', 'endpoint_id', EndpointUpdate(\n    uid=\"unique-endpoint-identifier\",\n    url=\"https://example.com/webhook/\",\n    version=1,\n    description=\"An example endpoint name\",\n    filter_types=['user.signup', 'user.deleted'],\n    channels=['project_123', 'group_2'],\n    disabled=False,\n    rate_limit=1000\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "endpoint_out = await svix.endpoint.update('app_id', 'endpoint_id', EndpointUpdate(\n    uid=\"unique-endpoint-identifier\",\n    url=\"https://example.com/webhook/\",\n    version=1,\n    description=\"An example endpoint name\",\n    filter_types=['user.signup', 'user.deleted'],\n    channels=['project_123', 'group_2'],\n    disabled=False,\n    rate_limit=1000\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'endpointOut, err := svixClient.Endpoint.Update("app_id", "endpoint_id", &svix.EndpointUpdate{\n    Uid: "unique-endpoint-identifier",\n    Url: "https://example.com/webhook/",\n    Version: 1,\n    Description: "An example endpoint name",\n    FilterTypes: [...]string{"user.signup", "user.deleted"},\n    Channels: [...]string{"project_123", "group_2"},\n    Disabled: False,\n    RateLimit: 1000\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val endpointOut = svix.endpoint.update(\'app_id\', \'endpoint_id\', EndpointUpdate()\n    .uid("unique-endpoint-identifier"),\n    .url("https://example.com/webhook/"),\n    .version(1),\n    .description("An example endpoint name"),\n    .filterTypes(arrayOf("user.signup", "user.deleted")),\n    .channels(arrayOf("project_123", "group_2")),\n    .disabled(False),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'EndpointOut endpointOut = svix.getEndpoint().update(\'app_id\', \'endpoint_id\', new EndpointUpdate()\n    .uid("unique-endpoint-identifier"),\n    .url("https://example.com/webhook/"),\n    .version(1),\n    .description("An example endpoint name"),\n    .filterTypes(new String[]{"user.signup", "user.deleted"}),\n    .channels(new String[]{"project_123", "group_2"}),\n    .disabled(False),\n    .rateLimit(1000)\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'endpoint_out = svix.endpoint.update(\'app_id\', \'endpoint_id\', Svix::EndpointUpdate.new({\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filter_types": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rate_limit": 1000\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let endpoint_out = svix.endpoint().update("app_id", "endpoint_id", EndpointUpdate {\n    uid: "unique-endpoint-identifier".to_string(),\n    url: "https://example.com/webhook/".to_string(),\n    version: 1,\n    description: "An example endpoint name".to_string(),\n    filter_types: vec!["user.signup".to_string(), "user.deleted".to_string()],\n    channels: vec!["project_123".to_string(), "group_2".to_string()],\n    disabled: False,\n    rate_limit: 1000\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var endpointOut = await svix.Endpoint.UpdateAsync("app_id", "endpoint_id", new EndpointUpdate{\n    uid: "unique-endpoint-identifier",\n    url: "https://example.com/webhook/",\n    version: 1,\n    description: "An example endpoint name",\n    filterTypes: new string[] {"user.signup", "user.deleted"},\n    channels: new string[] {"project_123", "group_2"},\n    disabled: false,\n    rateLimit: 1000\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix endpoint update \'app_id\' \'endpoint_id\' \'{\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filterTypes": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rateLimit": 1000\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              'curl -X \'PUT\' \\\n  \'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/\' \\\n  -H \'Authorization: Bearer AUTH_TOKEN\' \\\n  -H \'accept: application/json\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "uid": "unique-endpoint-identifier",\n    "url": "https://example.com/webhook/",\n    "version": 1,\n    "description": "An example endpoint name",\n    "filterTypes": [\n        "user.signup",\n        "user.deleted"\n    ],\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "disabled": false,\n    "rateLimit": 1000\n}\'',
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers/": {
      get: {
        description: "Get the additional headers to be sent with the webhook",
        operationId:
          "get_endpoint_headers_api_v1_app__app_id__endpoint__endpoint_id__headers__get",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EndpointHeadersOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Endpoint Headers",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const endpointHeadersOut = await svix.endpoint.getHeaders('app_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const endpointHeadersOut = await svix.endpoint.getHeaders('app_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "endpoint_headers_out = svix.endpoint.get_headers('app_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "endpoint_headers_out = await svix.endpoint.get_headers('app_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'endpointHeadersOut, err := svixClient.Endpoint.GetHeaders("app_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val endpointHeadersOut = svix.endpoint.getHeaders('app_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "EndpointHeadersOut endpointHeadersOut = svix.getEndpoint().getHeaders('app_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "endpoint_headers_out = svix.endpoint.get_headers('app_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let endpoint_headers_out = svix.endpoint().get_headers("app_id", "endpoint_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var endpointHeadersOut = await svix.Endpoint.GetHeadersAsync("app_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix endpoint get-headers 'app_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      patch: {
        description:
          "Partially set the additional headers to be sent with the webhook",
        operationId:
          "patch_endpoint_headers_api_v1_app__app_id__endpoint__endpoint_id__headers__patch",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EndpointHeadersPatchIn",
              },
            },
          },
          required: true,
        },
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Patch Endpoint Headers",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'await svix.endpoint.patchHeaders(\'app_id\', \'endpoint_id\', {\n    headers: {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'await svix.endpoint.patchHeaders(\'app_id\', \'endpoint_id\', {\n    headers: {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "svix.endpoint.patch_headers('app_id', 'endpoint_id', EndpointHeadersPatchIn(\n    headers={'X-Foobar': 'Bar', 'X-Example': '123'}\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "await svix.endpoint.patch_headers('app_id', 'endpoint_id', EndpointHeadersPatchIn(\n    headers={'X-Foobar': 'Bar', 'X-Example': '123'}\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.Endpoint.PatchHeaders("app_id", "endpoint_id", &svix.EndpointHeadersPatchIn{\n    Headers: map[string]string{\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'svix.endpoint.patchHeaders(\'app_id\', \'endpoint_id\', EndpointHeadersPatchIn()\n    .headers("""{\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }""")\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'svix.getEndpoint().patchHeaders(\'app_id\', \'endpoint_id\', new EndpointHeadersPatchIn()\n    .headers("{" +\n        "\\"X-Foobar\\": \\"Bar\\"," +\n        "\\"X-Example\\": \\"123\\"" +\n    "}")\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'svix.endpoint.patch_headers(\'app_id\', \'endpoint_id\', Svix::EndpointHeadersPatchIn.new({\n    "headers": {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'svix.endpoint().patch_headers("app_id", "endpoint_id", EndpointHeadersPatchIn {\n    headers: HashMap::from([\n        ("X-Foobar."to_string(), "Bar".to_string()),\n        ("X-Example."to_string(), "123".to_string())\n    ])\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'await svix.Endpoint.PatchHeadersAsync("app_id", "endpoint_id", new EndpointHeadersPatchIn{\n    headers: new {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix endpoint patch-headers \'app_id\' \'endpoint_id\' \'{\n    "headers": {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'PATCH' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"headers\": {\n        \"X-Foobar\": \"Bar\",\n        \"X-Example\": \"123\"\n    }\n}'",
          },
        ],
      },
      put: {
        description: "Set the additional headers to be sent with the webhook",
        operationId:
          "update_endpoint_headers_api_v1_app__app_id__endpoint__endpoint_id__headers__put",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointHeadersIn" },
            },
          },
          required: true,
        },
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Update Endpoint Headers",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'await svix.endpoint.updateHeaders(\'app_id\', \'endpoint_id\', {\n    headers: {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'await svix.endpoint.updateHeaders(\'app_id\', \'endpoint_id\', {\n    headers: {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "svix.endpoint.update_headers('app_id', 'endpoint_id', EndpointHeadersIn(\n    headers={'X-Foobar': 'Bar', 'X-Example': '123'}\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "await svix.endpoint.update_headers('app_id', 'endpoint_id', EndpointHeadersIn(\n    headers={'X-Foobar': 'Bar', 'X-Example': '123'}\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.Endpoint.UpdateHeaders("app_id", "endpoint_id", &svix.EndpointHeadersIn{\n    Headers: map[string]string{\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'svix.endpoint.updateHeaders(\'app_id\', \'endpoint_id\', EndpointHeadersIn()\n    .headers("""{\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }""")\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'svix.getEndpoint().updateHeaders(\'app_id\', \'endpoint_id\', new EndpointHeadersIn()\n    .headers("{" +\n        "\\"X-Foobar\\": \\"Bar\\"," +\n        "\\"X-Example\\": \\"123\\"" +\n    "}")\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'svix.endpoint.update_headers(\'app_id\', \'endpoint_id\', Svix::EndpointHeadersIn.new({\n    "headers": {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'svix.endpoint().update_headers("app_id", "endpoint_id", EndpointHeadersIn {\n    headers: HashMap::from([\n        ("X-Foobar."to_string(), "Bar".to_string()),\n        ("X-Example."to_string(), "123".to_string())\n    ])\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'await svix.Endpoint.UpdateHeadersAsync("app_id", "endpoint_id", new EndpointHeadersIn{\n    headers: new {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix endpoint update-headers \'app_id\' \'endpoint_id\' \'{\n    "headers": {\n        "X-Foobar": "Bar",\n        "X-Example": "123"\n    }\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'PUT' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"headers\": {\n        \"X-Foobar\": \"Bar\",\n        \"X-Example\": \"123\"\n    }\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg/": {
      get: {
        description:
          "List messages for a particular endpoint. Additionally includes metadata about the latest message attempt.\n\nThe `before` parameter lets you filter all items created before a certain date and is ignored if an iterator is passed.",
        operationId:
          "list_attempted_messages_api_v1_app__app_id__endpoint__endpoint_id__msg__get",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "status",
            required: false,
            schema: { $ref: "#/components/schemas/MessageStatus" },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_EndpointMessageOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempted Messages",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover/": {
      post: {
        description: "Resend all failed messages since a given time.",
        operationId:
          "recover_failed_webhooks_api_v1_app__app_id__endpoint__endpoint_id__recover__post",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RecoverIn" },
            },
          },
          required: true,
        },
        responses: {
          "202": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RecoverOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Recover Failed Webhooks",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const recoverOut = await svix.endpoint.recover('app_id', 'endpoint_id', {\n    since: new Date(\"2019-08-24T14:15:22Z\")\n});",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const recoverOut = await svix.endpoint.recover('app_id', 'endpoint_id', {\n    since: new Date(\"2019-08-24T14:15:22Z\")\n});",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "recover_out = svix.endpoint.recover('app_id', 'endpoint_id', RecoverIn(\n    since=datetime.datetime(2019, 8, 24, 14, 15, 22, timezone.utc)\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "recover_out = await svix.endpoint.recover('app_id', 'endpoint_id', RecoverIn(\n    since=datetime.datetime(2019, 8, 24, 14, 15, 22, timezone.utc)\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'recoverOut, err := svixClient.Endpoint.Recover("app_id", "endpoint_id", &svix.RecoverIn{\n    Since: "2019-08-24T14:15:22Z"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val recoverOut = svix.endpoint.recover('app_id', 'endpoint_id', RecoverIn()\n    .since(\"2019-08-24T14:15:22Z\")\n)",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "RecoverOut recoverOut = svix.getEndpoint().recover('app_id', 'endpoint_id', new RecoverIn()\n    .since(\"2019-08-24T14:15:22Z\")\n)",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "recover_out = svix.endpoint.recover('app_id', 'endpoint_id', Svix::RecoverIn.new({\n    \"since\": \"2019-08-24T14:15:22Z\"\n}))",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let recover_out = svix.endpoint().recover("app_id", "endpoint_id", RecoverIn {\n    since: "2019-08-24T14:15:22Z".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var recoverOut = await svix.Endpoint.RecoverAsync("app_id", "endpoint_id", new RecoverIn{\n    since: "2019-08-24T14:15:22Z"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix endpoint recover 'app_id' 'endpoint_id' '{\n    \"since\": \"2019-08-24T14:15:22Z\"\n}'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"since\": \"2019-08-24T14:15:22Z\"\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/": {
      get: {
        description:
          "Get the endpoint's signing secret.\n\nThis is used to verify the authenticity of the webhook.\nFor more information please refer to [the consuming webhooks docs](https://docs.svix.com/consuming-webhooks/).",
        operationId:
          "get_endpoint_secret_api_v1_app__app_id__endpoint__endpoint_id__secret__get",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EndpointSecretOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Endpoint Secret",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const endpointSecretOut = await svix.endpoint.getSecret('app_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const endpointSecretOut = await svix.endpoint.getSecret('app_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "endpoint_secret_out = svix.endpoint.get_secret('app_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "endpoint_secret_out = await svix.endpoint.get_secret('app_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'endpointSecretOut, err := svixClient.Endpoint.GetSecret("app_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val endpointSecretOut = svix.endpoint.getSecret('app_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "EndpointSecretOut endpointSecretOut = svix.getEndpoint().getSecret('app_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "endpoint_secret_out = svix.endpoint.get_secret('app_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let endpoint_secret_out = svix.endpoint().get_secret("app_id", "endpoint_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var endpointSecretOut = await svix.Endpoint.GetSecretAsync("app_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix endpoint get-secret 'app_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate/": {
      post: {
        description:
          "Rotates the endpoint's signing secret.  The previous secret will be valid for the next 24 hours.",
        operationId:
          "rotate_endpoint_secret_api_v1_app__app_id__endpoint__endpoint_id__secret_rotate__post",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EndpointSecretRotateIn",
              },
            },
          },
          required: true,
        },
        responses: {
          "204": { description: "Successful Response" },
          "400": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Bad Request",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Rotate Endpoint Secret",
        tags: ["Endpoint"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "await svix.endpoint.rotateSecret('app_id', 'endpoint_id', {\n    key: \"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n});",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "await svix.endpoint.rotateSecret('app_id', 'endpoint_id', {\n    key: \"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n});",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "svix.endpoint.rotate_secret('app_id', 'endpoint_id', EndpointSecretRotateIn(\n    key=\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "await svix.endpoint.rotate_secret('app_id', 'endpoint_id', EndpointSecretRotateIn(\n    key=\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.Endpoint.RotateSecret("app_id", "endpoint_id", &svix.EndpointSecretRotateIn{\n    Key: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "svix.endpoint.rotateSecret('app_id', 'endpoint_id', EndpointSecretRotateIn()\n    .key(\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\")\n)",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "svix.getEndpoint().rotateSecret('app_id', 'endpoint_id', new EndpointSecretRotateIn()\n    .key(\"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\")\n)",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "svix.endpoint.rotate_secret('app_id', 'endpoint_id', Svix::EndpointSecretRotateIn.new({\n    \"key\": \"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n}))",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'svix.endpoint().rotate_secret("app_id", "endpoint_id", EndpointSecretRotateIn {\n    key: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'await svix.Endpoint.RotateSecretAsync("app_id", "endpoint_id", new EndpointSecretRotateIn{\n    key: "whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix endpoint rotate-secret 'app_id' 'endpoint_id' '{\n    \"key\": \"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n}'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"key\": \"whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD\"\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/integration/": {
      get: {
        description: "List the application's integrations.",
        operationId: "list_integrations_api_v1_app__app_id__integration__get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: { default: 50, title: "Limit", type: "integer" },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_IntegrationOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Integrations",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseIntegrationOut = await svix.integration.list('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseIntegrationOut = await svix.integration.list('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "list_response_integration_out = svix.integration.list('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_integration_out = await svix.integration.list('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseIntegrationOut, err := svixClient.Integration.List("app_id", nil)',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseIntegrationOut = svix.integration.list('app_id', FetchOptions())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseIntegrationOut listResponseIntegrationOut = svix.getIntegration().list('app_id', new FetchOptions())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "list_response_integration_out = svix.integration.list('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_integration_out = svix.integration().list("app_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseIntegrationOut = await svix.Integration.ListAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix integration list 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      post: {
        description: "Create an integration.",
        operationId: "create_integration_api_v1_app__app_id__integration__post",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/IntegrationIn" },
            },
          },
          required: true,
        },
        responses: {
          "201": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IntegrationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Create Integration",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.create('app_id', {\n    name: \"Example Integration\"\n});",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.create('app_id', {\n    name: \"Example Integration\"\n});",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "integration_out = svix.integration.create('app_id', IntegrationIn(\n    name=\"Example Integration\"\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "integration_out = await svix.integration.create('app_id', IntegrationIn(\n    name=\"Example Integration\"\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'integrationOut, err := svixClient.Integration.Create("app_id", &svix.IntegrationIn{\n    Name: "Example Integration"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val integrationOut = svix.integration.create('app_id', IntegrationIn()\n    .name(\"Example Integration\")\n)",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "IntegrationOut integrationOut = svix.getIntegration().create('app_id', new IntegrationIn()\n    .name(\"Example Integration\")\n)",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'integration_out = svix.integration.create(\'app_id\', Svix::IntegrationIn.new({\n    "name": "Example Integration"\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let integration_out = svix.integration().create("app_id", IntegrationIn {\n    name: "Example Integration".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var integrationOut = await svix.Integration.CreateAsync("app_id", new IntegrationIn{\n    name: "Example Integration"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix integration create 'app_id' '{\n    \"name\": \"Example Integration\"\n}'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"name\": \"Example Integration\"\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/integration/{integ_id}/": {
      delete: {
        description: "Delete an integration and revoke it's key.",
        operationId:
          "delete_integration_api_v1_app__app_id__integration__integ_id___delete",
        parameters: [
          {
            in: "path",
            name: "integ_id",
            required: true,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Integ Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Delete Integration",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source: "await svix.integration.delete('app_id', 'integ_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source: "await svix.integration.delete('app_id', 'integ_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "svix.integration.delete('app_id', 'integ_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "await svix.integration.delete('app_id', 'integ_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.Integration.Delete("app_id", "integ_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "svix.integration.delete('app_id', 'integ_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source: "svix.getIntegration().delete('app_id', 'integ_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "svix.integration.delete('app_id', 'integ_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source: 'svix.integration().delete("app_id", "integ_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source: 'await svix.Integration.DeleteAsync("app_id", "integ_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix integration delete 'app_id' 'integ_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'DELETE' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/{integ_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      get: {
        description: "Get an integration.",
        operationId:
          "get_integration_api_v1_app__app_id__integration__integ_id___get",
        parameters: [
          {
            in: "path",
            name: "integ_id",
            required: true,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Integ Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IntegrationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Integration",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.get('app_id', 'integ_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.get('app_id', 'integ_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "integration_out = svix.integration.get('app_id', 'integ_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "integration_out = await svix.integration.get('app_id', 'integ_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'integrationOut, err := svixClient.Integration.Get("app_id", "integ_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val integrationOut = svix.integration.get('app_id', 'integ_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "IntegrationOut integrationOut = svix.getIntegration().get('app_id', 'integ_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "integration_out = svix.integration.get('app_id', 'integ_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let integration_out = svix.integration().get("app_id", "integ_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var integrationOut = await svix.Integration.GetAsync("app_id", "integ_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix integration get 'app_id' 'integ_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/{integ_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      put: {
        description: "Update an integration.",
        operationId:
          "update_integration_api_v1_app__app_id__integration__integ_id___put",
        parameters: [
          {
            in: "path",
            name: "integ_id",
            required: true,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Integ Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/IntegrationUpdate" },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IntegrationOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Update Integration",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.update('app_id', 'integ_id', {\n    name: \"Example Integration\"\n});",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const integrationOut = await svix.integration.update('app_id', 'integ_id', {\n    name: \"Example Integration\"\n});",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "integration_out = svix.integration.update('app_id', 'integ_id', IntegrationUpdate(\n    name=\"Example Integration\"\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "integration_out = await svix.integration.update('app_id', 'integ_id', IntegrationUpdate(\n    name=\"Example Integration\"\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'integrationOut, err := svixClient.Integration.Update("app_id", "integ_id", &svix.IntegrationUpdate{\n    Name: "Example Integration"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val integrationOut = svix.integration.update('app_id', 'integ_id', IntegrationUpdate()\n    .name(\"Example Integration\")\n)",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "IntegrationOut integrationOut = svix.getIntegration().update('app_id', 'integ_id', new IntegrationUpdate()\n    .name(\"Example Integration\")\n)",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "integration_out = svix.integration.update('app_id', 'integ_id', Svix::IntegrationUpdate.new({\n    \"name\": \"Example Integration\"\n}))",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let integration_out = svix.integration().update("app_id", "integ_id", IntegrationUpdate {\n    name: "Example Integration".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var integrationOut = await svix.Integration.UpdateAsync("app_id", "integ_id", new IntegrationUpdate{\n    name: "Example Integration"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix integration update 'app_id' 'integ_id' '{\n    \"name\": \"Example Integration\"\n}'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'PUT' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/{integ_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"name\": \"Example Integration\"\n}'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/integration/{integ_id}/key/": {
      get: {
        description: "Get an integration's key.",
        operationId:
          "get_integration_key_api_v1_app__app_id__integration__integ_id__key__get",
        parameters: [
          {
            in: "path",
            name: "integ_id",
            required: true,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Integ Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IntegrationKeyOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Integration Key",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const integrationKeyOut = await svix.integration.getKey('app_id', 'integ_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const integrationKeyOut = await svix.integration.getKey('app_id', 'integ_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "integration_key_out = svix.integration.get_key('app_id', 'integ_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "integration_key_out = await svix.integration.get_key('app_id', 'integ_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'integrationKeyOut, err := svixClient.Integration.GetKey("app_id", "integ_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val integrationKeyOut = svix.integration.getKey('app_id', 'integ_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "IntegrationKeyOut integrationKeyOut = svix.getIntegration().getKey('app_id', 'integ_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "integration_key_out = svix.integration.get_key('app_id', 'integ_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let integration_key_out = svix.integration().get_key("app_id", "integ_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var integrationKeyOut = await svix.Integration.GetKeyAsync("app_id", "integ_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix integration get-key 'app_id' 'integ_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/{integ_id}/key/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/integration/{integ_id}/key/rotate/": {
      post: {
        description:
          "Rotate the integration's key. The previous key will be immediately revoked.",
        operationId:
          "rotate_integration_key_api_v1_app__app_id__integration__integ_id__key_rotate__post",
        parameters: [
          {
            in: "path",
            name: "integ_id",
            required: true,
            schema: {
              example: "integ_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Integ Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IntegrationKeyOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Rotate Integration Key",
        tags: ["Integration"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const integrationKeyOut = await svix.integration.rotateKey('app_id', 'integ_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const integrationKeyOut = await svix.integration.rotateKey('app_id', 'integ_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "integration_key_out = svix.integration.rotate_key('app_id', 'integ_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "integration_key_out = await svix.integration.rotate_key('app_id', 'integ_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'integrationKeyOut, err := svixClient.Integration.RotateKey("app_id", "integ_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val integrationKeyOut = svix.integration.rotateKey('app_id', 'integ_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "IntegrationKeyOut integrationKeyOut = svix.getIntegration().rotateKey('app_id', 'integ_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "integration_key_out = svix.integration.rotate_key('app_id', 'integ_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let integration_key_out = svix.integration().rotate_key("app_id", "integ_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var integrationKeyOut = await svix.Integration.RotateKeyAsync("app_id", "integ_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix integration rotate-key 'app_id' 'integ_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/{app_id}/integration/{integ_id}/key/rotate/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/": {
      get: {
        description:
          "List all of the application's messages.\n\nThe `before` parameter lets you filter all items created before a certain date and is ignored if an iterator is passed.\nThe `after` parameter lets you filter all items created after a certain date and is ignored if an iterator is passed.\n`before` and `after` cannot be used simultaneously.",
        operationId: "list_messages_api_v1_app__app_id__msg__get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "event_types",
            required: false,
            schema: {
              items: {
                example: "user.signup",
                maxLength: 256,
                pattern: "^[a-zA-Z0-9\\-_.]+$",
                type: "string",
              },
              title: "Event Types",
              type: "array",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Messages",
        tags: ["Message"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageOut = await svix.message.list('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageOut = await svix.message.list('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "list_response_message_out = svix.message.list('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_message_out = await svix.message.list('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseMessageOut, err := svixClient.Message.List("app_id", nil)',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseMessageOut = svix.message.list('app_id', FetchOptions())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseMessageOut listResponseMessageOut = svix.getMessage().list('app_id', new FetchOptions())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "list_response_message_out = svix.message.list('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_message_out = svix.message().list("app_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseMessageOut = await svix.Message.ListAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix message list 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      post: {
        description:
          "Creates a new message and dispatches it to all of the application's endpoints.\n\nThe `eventId` is an optional custom unique ID. It's verified to be unique only up to a day, after that no verification will be made.\nIf a message with the same `eventId` already exists for any application in your environment, a 409 conflict error will be returned.\n\nThe `eventType` indicates the type and schema of the event. All messages of a certain `eventType` are expected to have the same schema. Endpoints can choose to only listen to specific event types.\nMessages can also have `channels`, which similar to event types let endpoints filter by them. Unlike event types, messages can have multiple channels, and channels don't imply a specific message content or schema.\n\nThe `payload' property is the webhook's body (the actual webhook message).",
        operationId: "create_message_api_v1_app__app_id__msg__post",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "with_content",
            required: false,
            schema: {
              default: true,
              title: "With Content",
              type: "boolean",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageIn" },
            },
          },
          required: true,
        },
        responses: {
          "202": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "413": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Request Entity Too Large",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Create Message",
        tags: ["Message"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const messageOut = await svix.message.create(\'app_id\', {\n    eventType: "user.signup",\n    eventId: "evt_pNZKtWg8Azow",\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    payload: {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    payloadRetentionPeriod: 90\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const messageOut = await svix.message.create(\'app_id\', {\n    eventType: "user.signup",\n    eventId: "evt_pNZKtWg8Azow",\n    channels: [\n        "project_123",\n        "group_2"\n    ],\n    payload: {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    payloadRetentionPeriod: 90\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "message_out = svix.message.create('app_id', MessageIn(\n    event_type=\"user.signup\",\n    event_id=\"evt_pNZKtWg8Azow\",\n    channels=['project_123', 'group_2'],\n    payload={'username': 'test_user', 'email': 'test@example.com'},\n    payload_retention_period=90\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "message_out = await svix.message.create('app_id', MessageIn(\n    event_type=\"user.signup\",\n    event_id=\"evt_pNZKtWg8Azow\",\n    channels=['project_123', 'group_2'],\n    payload={'username': 'test_user', 'email': 'test@example.com'},\n    payload_retention_period=90\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'messageOut, err := svixClient.Message.Create("app_id", &svix.MessageIn{\n    EventType: "user.signup",\n    EventId: "evt_pNZKtWg8Azow",\n    Channels: [...]string{"project_123", "group_2"},\n    Payload: map[string]interface{}{\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    PayloadRetentionPeriod: 90\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val messageOut = svix.message.create(\'app_id\', MessageIn()\n    .eventType("user.signup"),\n    .eventId("evt_pNZKtWg8Azow"),\n    .channels(arrayOf("project_123", "group_2")),\n    .payload("""{\n        "username": "test_user",\n        "email": "test@example.com"\n    }"""),\n    .payloadRetentionPeriod(90)\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'MessageOut messageOut = svix.getMessage().create(\'app_id\', new MessageIn()\n    .eventType("user.signup"),\n    .eventId("evt_pNZKtWg8Azow"),\n    .channels(new String[]{"project_123", "group_2"}),\n    .payload("{" +\n        "\\"username\\": \\"test_user\\"," +\n        "\\"email\\": \\"test@example.com\\"" +\n    "}"),\n    .payloadRetentionPeriod(90)\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'message_out = svix.message.create(\'app_id\', Svix::MessageIn.new({\n    "event_type": "user.signup",\n    "event_id": "evt_pNZKtWg8Azow",\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "payload": {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    "payload_retention_period": 90\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let message_out = svix.message().create("app_id", MessageIn {\n    event_type: "user.signup".to_string(),\n    event_id: "evt_pNZKtWg8Azow".to_string(),\n    channels: vec!["project_123".to_string(), "group_2".to_string()],\n    payload: json!({\n        "username": "test_user",\n        "email": "test@example.com"\n    }),\n    payload_retention_period: 90\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var messageOut = await svix.Message.CreateAsync("app_id", new MessageIn{\n    eventType: "user.signup",\n    eventId: "evt_pNZKtWg8Azow",\n    channels: new string[] {"project_123", "group_2"},\n    payload: new {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    payloadRetentionPeriod: 90\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix message create \'app_id\' \'{\n    "eventType": "user.signup",\n    "eventId": "evt_pNZKtWg8Azow",\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "payload": {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    "payloadRetentionPeriod": 90\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              'curl -X \'POST\' \\\n  \'https://api.svix.com/api/v1/app/{app_id}/msg/\' \\\n  -H \'Authorization: Bearer AUTH_TOKEN\' \\\n  -H \'accept: application/json\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "eventType": "user.signup",\n    "eventId": "evt_pNZKtWg8Azow",\n    "channels": [\n        "project_123",\n        "group_2"\n    ],\n    "payload": {\n        "username": "test_user",\n        "email": "test@example.com"\n    },\n    "payloadRetentionPeriod": 90\n}\'',
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/": {
      get: {
        description: "Get a message by its ID or eventID.",
        operationId: "get_message_api_v1_app__app_id__msg__msg_id___get",
        parameters: [
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Message",
        tags: ["Message"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const messageOut = await svix.message.get('app_id', 'msg_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const messageOut = await svix.message.get('app_id', 'msg_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "message_out = svix.message.get('app_id', 'msg_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "message_out = await svix.message.get('app_id', 'msg_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'messageOut, err := svixClient.Message.Get("app_id", "msg_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "val messageOut = svix.message.get('app_id', 'msg_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "MessageOut messageOut = svix.getMessage().get('app_id', 'msg_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "message_out = svix.message.get('app_id', 'msg_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let message_out = svix.message().get("app_id", "msg_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var messageOut = await svix.Message.GetAsync("app_id", "msg_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix message get 'app_id' 'msg_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/attempt/": {
      get: {
        deprecated: true,
        description:
          'Deprecated: Please use "List Attempts by Endpoint" and "List Attempts by Msg" instead.\n\n`msg_id`: Use a message id or a message `eventId`',
        operationId:
          "list_attempts_api_v1_app__app_id__msg__msg_id__attempt__get",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "endpoint_id",
            required: false,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "event_types",
            required: false,
            schema: {
              items: {
                example: "user.signup",
                maxLength: 256,
                pattern: "^[a-zA-Z0-9\\-_.]+$",
                type: "string",
              },
              title: "Event Types",
              type: "array",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "status",
            required: false,
            schema: { $ref: "#/components/schemas/MessageStatus" },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageAttemptOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempts",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.list('app_id', 'msg_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseMessageAttemptOut = await svix.messageAttempt.list('app_id', 'msg_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list('app_id', 'msg_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_message_attempt_out = await svix.message_attempt.list('app_id', 'msg_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'listResponseMessageAttemptOut, err := svixClient.MessageAttempt.List("app_id", "msg_id", nil)',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseMessageAttemptOut = svix.messageAttempt.list('app_id', 'msg_id', FetchOptionsMessageAttempt())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseMessageAttemptOut listResponseMessageAttemptOut = svix.getMessageAttempt().list('app_id', 'msg_id', new FetchOptionsMessageAttempt())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "list_response_message_attempt_out = svix.message_attempt.list('app_id', 'msg_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let list_response_message_attempt_out = svix.message_attempt().list("app_id", "msg_id", None).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var listResponseMessageAttemptOut = await svix.MessageAttempt.ListAsync("app_id", "msg_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix message-attempt list 'app_id' 'msg_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/attempt/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/": {
      get: {
        description: "`msg_id`: Use a message id or a message `eventId`",
        operationId:
          "get_attempt_api_v1_app__app_id__msg__msg_id__attempt__attempt_id___get",
        parameters: [
          {
            in: "path",
            name: "attempt_id",
            required: true,
            schema: {
              example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Attempt Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageAttemptOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Attempt",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const messageAttemptOut = await svix.messageAttempt.get('app_id', 'msg_id', 'attempt_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const messageAttemptOut = await svix.messageAttempt.get('app_id', 'msg_id', 'attempt_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "message_attempt_out = svix.message_attempt.get('app_id', 'msg_id', 'attempt_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "message_attempt_out = await svix.message_attempt.get('app_id', 'msg_id', 'attempt_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'messageAttemptOut, err := svixClient.MessageAttempt.Get("app_id", "msg_id", "attempt_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val messageAttemptOut = svix.messageAttempt.get('app_id', 'msg_id', 'attempt_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "MessageAttemptOut messageAttemptOut = svix.getMessageAttempt().get('app_id', 'msg_id', 'attempt_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "message_attempt_out = svix.message_attempt.get('app_id', 'msg_id', 'attempt_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let message_attempt_out = svix.message_attempt().get("app_id", "msg_id", "attempt_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var messageAttemptOut = await svix.MessageAttempt.GetAsync("app_id", "msg_id", "attempt_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix message-attempt get 'app_id' 'msg_id' 'attempt_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/": {
      get: {
        description: "`msg_id`: Use a message id or a message `eventId`",
        operationId:
          "list_attempted_destinations_api_v1_app__app_id__msg__msg_id__endpoint__get",
        parameters: [
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "msgep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageEndpointOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempted Destinations",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/endpoint/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/attempt/": {
      get: {
        deprecated: true,
        description:
          "DEPRECATED: please use list_attempts with endpoint_id as a query parameter instead.\n\nList the message attempts for a particular endpoint.\n\nReturning the endpoint.\n\nThe `before` parameter lets you filter all items created before a certain date and is ignored if an iterator is passed.",
        operationId:
          "list_attempts_for_endpoint_api_v1_app__app_id__msg__msg_id__endpoint__endpoint_id__attempt__get",
        parameters: [
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "event_types",
            required: false,
            schema: {
              items: {
                example: "user.signup",
                maxLength: 256,
                pattern: "^[a-zA-Z0-9\\-_.]+$",
                type: "string",
              },
              title: "Event Types",
              type: "array",
            },
          },
          {
            in: "query",
            name: "channel",
            required: false,
            schema: {
              example: "project_1337",
              maxLength: 128,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Channel",
              type: "string",
            },
          },
          {
            in: "query",
            name: "status",
            required: false,
            schema: { $ref: "#/components/schemas/MessageStatus" },
          },
          {
            in: "query",
            name: "before",
            required: false,
            schema: {
              format: "date-time",
              title: "Before",
              type: "string",
            },
          },
          {
            in: "query",
            name: "after",
            required: false,
            schema: {
              format: "date-time",
              title: "After",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_MessageAttemptEndpointOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Attempts For Endpoint",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/attempt/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend/": {
      post: {
        description: "Resend a message to the specified endpoint.",
        operationId:
          "resend_webhook_api_v1_app__app_id__msg__msg_id__endpoint__endpoint_id__resend__post",
        parameters: [
          {
            in: "path",
            name: "endpoint_id",
            required: true,
            schema: {
              description: "The endpoint's ID or UID",
              example: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Endpoint Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "msg_id",
            required: true,
            schema: {
              description: "The message's ID or eventID",
              example: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Msg Id",
              type: "string",
            },
          },
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "202": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Resend Webhook",
        tags: ["Message Attempt"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "await svix.messageAttempt.resend('app_id', 'msg_id', 'endpoint_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "await svix.messageAttempt.resend('app_id', 'msg_id', 'endpoint_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "svix.message_attempt.resend('app_id', 'msg_id', 'endpoint_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "await svix.message_attempt.resend('app_id', 'msg_id', 'endpoint_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'err := svixClient.MessageAttempt.Resend("app_id", "msg_id", "endpoint_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "svix.messageAttempt.resend('app_id', 'msg_id', 'endpoint_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "svix.getMessageAttempt().resend('app_id', 'msg_id', 'endpoint_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "svix.message_attempt.resend('app_id', 'msg_id', 'endpoint_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'svix.message_attempt().resend("app_id", "msg_id", "endpoint_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'await svix.MessageAttempt.ResendAsync("app_id", "msg_id", "endpoint_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              "svix message-attempt resend 'app_id' 'msg_id' 'endpoint_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/auth/dashboard-access/{app_id}/": {
      post: {
        description:
          "Use this function to get magic links (and authentication codes) for connecting your users to the Application Portal.",
        operationId:
          "get_dashboard_access_api_v1_auth_dashboard_access__app_id___post",
        parameters: [
          {
            in: "path",
            name: "app_id",
            required: true,
            schema: {
              description: "The application's ID or UID",
              example: "app_1srOrx2ZWZBpBUvZwXKQmoEYga2",
              maxLength: 256,
              minLength: 1,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "App Id",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DashboardAccessOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get App Portal Access",
        tags: ["Authentication"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const dashboardAccessOut = await svix.authentication.dashboardAccess('app_id');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const dashboardAccessOut = await svix.authentication.dashboardAccess('app_id');",
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "dashboard_access_out = svix.authentication.dashboard_access('app_id')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "dashboard_access_out = await svix.authentication.dashboard_access('app_id')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'dashboardAccessOut, err := svixClient.Authentication.DashboardAccess("app_id")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val dashboardAccessOut = svix.authentication.dashboardAccess('app_id')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "DashboardAccessOut dashboardAccessOut = svix.getAuthentication().dashboardAccess('app_id')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              "dashboard_access_out = svix.authentication.dashboard_access('app_id')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let dashboard_access_out = svix.authentication().dashboard_access("app_id").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var dashboardAccessOut = await svix.Authentication.DashboardAccessAsync("app_id")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix authentication dashboard-access 'app_id'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/auth/dashboard-access/{app_id}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/auth/logout/": {
      post: {
        description:
          "Logout an app token.\n\nTrying to log out other tokens will fail.",
        operationId: "logout_api_v1_auth_logout__post",
        parameters: [
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Logout",
        tags: ["Authentication"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source: "await svix.authentication.logout();",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source: "await svix.authentication.logout();",
          },
          {
            label: "Python",
            lang: "Python",
            source: "svix.authentication.logout()",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "await svix.authentication.logout()",
          },
          {
            label: "Go",
            lang: "Go",
            source: "err := svixClient.Authentication.Logout()",
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "svix.authentication.logout()",
          },
          {
            label: "Java",
            lang: "Java",
            source: "svix.getAuthentication().logout()",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "svix.authentication.logout",
          },
          {
            label: "Rust",
            lang: "Rust",
            source: "svix.authentication().logout().await?;",
          },
          {
            label: "C#",
            lang: "C#",
            source: "await svix.Authentication.LogoutAsync()",
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix authentication logout ",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'POST' \\\n  'https://api.svix.com/api/v1/auth/logout/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
    "/api/v1/event-type/": {
      get: {
        description: "Return the list of event types.",
        operationId: "list_event_types_api_v1_event_type__get",
        parameters: [
          {
            in: "query",
            name: "iterator",
            required: false,
            schema: {
              example: "user.signup",
              maxLength: 256,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Iterator",
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: {
              default: 50,
              maximum: 250.0,
              title: "Limit",
              type: "integer",
            },
          },
          {
            in: "query",
            name: "with_content",
            required: false,
            schema: {
              default: false,
              title: "With Content",
              type: "boolean",
            },
          },
          {
            in: "query",
            name: "include_archived",
            required: false,
            schema: {
              default: false,
              title: "Include Archived",
              type: "boolean",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListResponse_EventTypeOut_",
                },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "List Event Types",
        tags: ["Event Type"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const listResponseEventTypeOut = await svix.eventType.list();",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const listResponseEventTypeOut = await svix.eventType.list();",
          },
          {
            label: "Python",
            lang: "Python",
            source: "list_response_event_type_out = svix.event_type.list()",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "list_response_event_type_out = await svix.event_type.list()",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              "listResponseEventTypeOut, err := svixClient.EventType.List(nil)",
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              "val listResponseEventTypeOut = svix.eventType.list(FetchOptions())",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "ListResponseEventTypeOut listResponseEventTypeOut = svix.getEventType().list(new FetchOptions())",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "list_response_event_type_out = svix.event_type.list",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              "let list_response_event_type_out = svix.event_type().list(None).await?;",
          },
          {
            label: "C#",
            lang: "C#",
            source:
              "var listResponseEventTypeOut = await svix.EventType.ListAsync()",
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix event-type list ",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/event-type/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      post: {
        description:
          "Create new or unarchive existing event type.\n\nUnarchiving an event type will allow endpoints to filter on it and messages to be sent with it.\nEndpoints filtering on the event type before archival will continue to filter on it.\nThis operation does not preserve the description and schemas.",
        operationId: "create_event_type_api_v1_event_type__post",
        parameters: [
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EventTypeIn" },
            },
          },
          required: true,
        },
        responses: {
          "201": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventTypeOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Create Event Type",
        tags: ["Event Type"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const eventTypeOut = await svix.eventType.create({\n    description: "A user has signed up",\n    schemas: {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false,\n    name: "user.signup"\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const eventTypeOut = await svix.eventType.create({\n    description: "A user has signed up",\n    schemas: {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false,\n    name: "user.signup"\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "event_type_out = svix.event_type.create(EventTypeIn(\n    description=\"A user has signed up\",\n    schemas={'1': {'title': 'Invoice Paid Event', 'description': 'An invoice was paid by a user', 'type': 'object', 'properties': {'invoiceId': {'description': 'The invoice id', 'type': 'string'}, 'userId': {'description': 'The user id', 'type': 'string'}}, 'required': ['invoiceId', 'userId']}},\n    archived=False,\n    name=\"user.signup\"\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "event_type_out = await svix.event_type.create(EventTypeIn(\n    description=\"A user has signed up\",\n    schemas={'1': {'title': 'Invoice Paid Event', 'description': 'An invoice was paid by a user', 'type': 'object', 'properties': {'invoiceId': {'description': 'The invoice id', 'type': 'string'}, 'userId': {'description': 'The user id', 'type': 'string'}}, 'required': ['invoiceId', 'userId']}},\n    archived=False,\n    name=\"user.signup\"\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'eventTypeOut, err := svixClient.EventType.Create(&svix.EventTypeIn{\n    Description: "A user has signed up",\n    Schemas: map[string]interface{}{\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    Archived: False,\n    Name: "user.signup"\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val eventTypeOut = svix.eventType.create(EventTypeIn()\n    .description("A user has signed up"),\n    .schemas("""{\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    }"""),\n    .archived(False),\n    .name("user.signup")\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'EventTypeOut eventTypeOut = svix.getEventType().create(new EventTypeIn()\n    .description("A user has signed up"),\n    .schemas("{" +\n        "\\"1\\": {" +\n                "\\"title\\": \\"Invoice Paid Event\\"," +\n                "\\"description\\": \\"An invoice was paid by a user\\"," +\n                "\\"type\\": \\"object\\"," +\n                "\\"properties\\": {" +\n                        "\\"invoiceId\\": {" +\n                                "\\"description\\": \\"The invoice id\\"," +\n                                "\\"type\\": \\"string\\"" +\n                        "}," +\n                        "\\"userId\\": {" +\n                                "\\"description\\": \\"The user id\\"," +\n                                "\\"type\\": \\"string\\"" +\n                        "}" +\n                "}," +\n                "\\"required\\": [" +\n                        "\\"invoiceId\\"," +\n                        "\\"userId\\"" +\n                "]" +\n        "}" +\n    "}"),\n    .archived(False),\n    .name("user.signup")\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'event_type_out = svix.event_type.create(Svix::EventTypeIn.new({\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false,\n    "name": "user.signup"\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let event_type_out = svix.event_type().create(EventTypeIn {\n    description: "A user has signed up".to_string(),\n    schemas: json!({\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    }),\n    archived: False,\n    name: "user.signup".to_string()\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var eventTypeOut = await svix.EventType.CreateAsync(new EventTypeIn{\n    description: "A user has signed up",\n    schemas: new {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false,\n    name: "user.signup"\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix event-type create \'{\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false,\n    "name": "user.signup"\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              'curl -X \'POST\' \\\n  \'https://api.svix.com/api/v1/event-type/\' \\\n  -H \'Authorization: Bearer AUTH_TOKEN\' \\\n  -H \'accept: application/json\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false,\n    "name": "user.signup"\n}\'',
          },
        ],
      },
    },
    "/api/v1/event-type/{event_type_name}/": {
      delete: {
        description:
          "Archive an event type.\n\nEndpoints already configured to filter on an event type will continue to do so after archival.\nHowever, new messages can not be sent with it and endpoints can not filter on it.\nAn event type can be unarchived with the\n[create operation](#operation/create_event_type_api_v1_event_type__post).",
        operationId:
          "delete_event_type_api_v1_event_type__event_type_name___delete",
        parameters: [
          {
            in: "path",
            name: "event_type_name",
            required: true,
            schema: {
              example: "user.signup",
              maxLength: 256,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Event Type Name",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Archive Event Type",
        tags: ["Event Type"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source: "await svix.eventType.delete('event_type_name');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source: "await svix.eventType.delete('event_type_name');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "svix.event_type.delete('event_type_name')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source: "await svix.event_type.delete('event_type_name')",
          },
          {
            label: "Go",
            lang: "Go",
            source: 'err := svixClient.EventType.Delete("event_type_name")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "svix.eventType.delete('event_type_name')",
          },
          {
            label: "Java",
            lang: "Java",
            source: "svix.getEventType().delete('event_type_name')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "svix.event_type.delete('event_type_name')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source: 'svix.event_type().delete("event_type_name").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source: 'await svix.EventType.DeleteAsync("event_type_name")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix event-type delete 'event_type_name'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'DELETE' \\\n  'https://api.svix.com/api/v1/event-type/{event_type_name}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      get: {
        description: "Get an event type.",
        operationId: "get_event_type_api_v1_event_type__event_type_name___get",
        parameters: [
          {
            in: "path",
            name: "event_type_name",
            required: true,
            schema: {
              example: "user.signup",
              maxLength: 256,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Event Type Name",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventTypeOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Get Event Type",
        tags: ["Event Type"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              "const eventTypeOut = await svix.eventType.get('event_type_name');",
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              "const eventTypeOut = await svix.eventType.get('event_type_name');",
          },
          {
            label: "Python",
            lang: "Python",
            source: "event_type_out = svix.event_type.get('event_type_name')",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "event_type_out = await svix.event_type.get('event_type_name')",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'eventTypeOut, err := svixClient.EventType.Get("event_type_name")',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source: "val eventTypeOut = svix.eventType.get('event_type_name')",
          },
          {
            label: "Java",
            lang: "Java",
            source:
              "EventTypeOut eventTypeOut = svix.getEventType().get('event_type_name')",
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source: "event_type_out = svix.event_type.get('event_type_name')",
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let event_type_out = svix.event_type().get("event_type_name").await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var eventTypeOut = await svix.EventType.GetAsync("event_type_name")',
          },
          {
            label: "CLI",
            lang: "Shell",
            source: "svix event-type get 'event_type_name'",
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/event-type/{event_type_name}/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      put: {
        description: "Update an event type.",
        operationId:
          "update_event_type_api_v1_event_type__event_type_name___put",
        parameters: [
          {
            in: "path",
            name: "event_type_name",
            required: true,
            schema: {
              example: "user.signup",
              maxLength: 256,
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              title: "Event Type Name",
              type: "string",
            },
          },
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EventTypeUpdate" },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventTypeOut" },
              },
            },
            description: "Successful Response",
          },
          "401": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Unauthorized",
          },
          "403": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Forbidden",
          },
          "404": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Not Found",
          },
          "409": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Conflict",
          },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
          "429": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpErrorOut" },
              },
            },
            description: "Too Many Requests",
          },
        },
        security: [{ HTTPBearer: [] }],
        summary: "Update Event Type",
        tags: ["Event Type"],
        "x-codeSamples": [
          {
            label: "JavaScript",
            lang: "JavaScript",
            source:
              'const eventTypeOut = await svix.eventType.update(\'event_type_name\', {\n    description: "A user has signed up",\n    schemas: {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false\n});',
          },
          {
            label: "TypeScript",
            lang: "JavaScript",
            source:
              'const eventTypeOut = await svix.eventType.update(\'event_type_name\', {\n    description: "A user has signed up",\n    schemas: {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false\n});',
          },
          {
            label: "Python",
            lang: "Python",
            source:
              "event_type_out = svix.event_type.update('event_type_name', EventTypeUpdate(\n    description=\"A user has signed up\",\n    schemas={'1': {'title': 'Invoice Paid Event', 'description': 'An invoice was paid by a user', 'type': 'object', 'properties': {'invoiceId': {'description': 'The invoice id', 'type': 'string'}, 'userId': {'description': 'The user id', 'type': 'string'}}, 'required': ['invoiceId', 'userId']}},\n    archived=False\n))",
          },
          {
            label: "Python (Async)",
            lang: "Python",
            source:
              "event_type_out = await svix.event_type.update('event_type_name', EventTypeUpdate(\n    description=\"A user has signed up\",\n    schemas={'1': {'title': 'Invoice Paid Event', 'description': 'An invoice was paid by a user', 'type': 'object', 'properties': {'invoiceId': {'description': 'The invoice id', 'type': 'string'}, 'userId': {'description': 'The user id', 'type': 'string'}}, 'required': ['invoiceId', 'userId']}},\n    archived=False\n))",
          },
          {
            label: "Go",
            lang: "Go",
            source:
              'eventTypeOut, err := svixClient.EventType.Update("event_type_name", &svix.EventTypeUpdate{\n    Description: "A user has signed up",\n    Schemas: map[string]interface{}{\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    Archived: False\n})',
          },
          {
            label: "Kotlin",
            lang: "Kotlin",
            source:
              'val eventTypeOut = svix.eventType.update(\'event_type_name\', EventTypeUpdate()\n    .description("A user has signed up"),\n    .schemas("""{\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    }"""),\n    .archived(False)\n)',
          },
          {
            label: "Java",
            lang: "Java",
            source:
              'EventTypeOut eventTypeOut = svix.getEventType().update(\'event_type_name\', new EventTypeUpdate()\n    .description("A user has signed up"),\n    .schemas("{" +\n        "\\"1\\": {" +\n                "\\"title\\": \\"Invoice Paid Event\\"," +\n                "\\"description\\": \\"An invoice was paid by a user\\"," +\n                "\\"type\\": \\"object\\"," +\n                "\\"properties\\": {" +\n                        "\\"invoiceId\\": {" +\n                                "\\"description\\": \\"The invoice id\\"," +\n                                "\\"type\\": \\"string\\"" +\n                        "}," +\n                        "\\"userId\\": {" +\n                                "\\"description\\": \\"The user id\\"," +\n                                "\\"type\\": \\"string\\"" +\n                        "}" +\n                "}," +\n                "\\"required\\": [" +\n                        "\\"invoiceId\\"," +\n                        "\\"userId\\"" +\n                "]" +\n        "}" +\n    "}"),\n    .archived(False)\n)',
          },
          {
            label: "Ruby",
            lang: "Ruby",
            source:
              'event_type_out = svix.event_type.update(\'event_type_name\', Svix::EventTypeUpdate.new({\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false\n}))',
          },
          {
            label: "Rust",
            lang: "Rust",
            source:
              'let event_type_out = svix.event_type().update("event_type_name", EventTypeUpdate {\n    description: "A user has signed up".to_string(),\n    schemas: json!({\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    }),\n    archived: False\n}).await?;',
          },
          {
            label: "C#",
            lang: "C#",
            source:
              'var eventTypeOut = await svix.EventType.UpdateAsync("event_type_name", new EventTypeUpdate{\n    description: "A user has signed up",\n    schemas: new {\n        "1": {\n                "title": "Invoice Paid Event",\n                "description": "An invoice was paid by a user",\n                "type": "object",\n                "properties": {\n                        "invoiceId": {\n                                "description": "The invoice id",\n                                "type": "string"\n                        },\n                        "userId": {\n                                "description": "The user id",\n                                "type": "string"\n                        }\n                },\n                "required": [\n                        "invoiceId",\n                        "userId"\n                ]\n        }\n    },\n    archived: false\n})',
          },
          {
            label: "CLI",
            lang: "Shell",
            source:
              'svix event-type update \'event_type_name\' \'{\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false\n}\'',
          },
          {
            label: "cURL",
            lang: "Shell",
            source:
              'curl -X \'PUT\' \\\n  \'https://api.svix.com/api/v1/event-type/{event_type_name}/\' \\\n  -H \'Authorization: Bearer AUTH_TOKEN\' \\\n  -H \'accept: application/json\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{\n    "description": "A user has signed up",\n    "schemas": {\n        "1": {\n            "title": "Invoice Paid Event",\n            "description": "An invoice was paid by a user",\n            "type": "object",\n            "properties": {\n                "invoiceId": {\n                    "description": "The invoice id",\n                    "type": "string"\n                },\n                "userId": {\n                    "description": "The user id",\n                    "type": "string"\n                }\n            },\n            "required": [\n                "invoiceId",\n                "userId"\n            ]\n        }\n    },\n    "archived": false\n}\'',
          },
        ],
      },
    },
    "/api/v1/health/": {
      get: {
        description: "Verify the API server is up and running.",
        operationId: "health_api_v1_health__get",
        parameters: [
          {
            description: "The request's idempotency key",
            in: "header",
            name: "idempotency-key",
            required: false,
            schema: {
              description: "The request's idempotency key",
              title: "Idempotency-Key",
              type: "string",
            },
          },
        ],
        responses: {
          "204": { description: "Successful Response" },
          "422": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HTTPValidationError" },
              },
            },
            description: "Validation Error",
          },
        },
        summary: "Health",
        tags: ["Health"],
        "x-codeSamples": [
          {
            label: "cURL",
            lang: "Shell",
            source:
              "curl -X 'GET' \\\n  'https://api.svix.com/api/v1/health/' \\\n  -H 'Authorization: Bearer AUTH_TOKEN' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
    },
  },
  tags: [
    {
      description:
        "Applications are where messages are sent to. In most cases you would wantto have one application for each of your users.",
      name: "Application",
    },
    {
      description: "Messages are the webhook events being sent.",
      name: "Message",
    },
    {
      description: "Attempts to deliver `Message`s to `Endpoint`s.",
      name: "Message Attempt",
    },
    {
      description:
        "Endpoints are the URLs messages will be sent to. Each application can have multiple endpoints and each message sent to that application will be sent to all of them (unless they are not subscribed to the sent event type).",
      name: "Endpoint",
    },
    {
      description:
        "Integrations are services your users connect an application to. An integration can manage the application and it's endpoints.",
      name: "Integration",
    },
    {
      description:
        "Event types are identifiers denoting the type of message being sent. Event types are primarily used to decide which events are sent to which endpoint.",
      name: "Event Type",
    },
    {
      description:
        "Easily give your users access to our pre-built management UI.",
      name: "Authentication",
    },
    { description: "Health checks for the API.", name: "Health" },
    {
      description:
        "The webhooks the Svix service sends to notify you of events.",
      name: "Webhooks",
    },
  ],
  "x-tagGroups": [
    { name: "General", tags: ["Application", "Event Type"] },
    {
      name: "Application specific",
      tags: [
        "Authentication",
        "Endpoint",
        "Message",
        "Message Attempt",
        "Integration",
      ],
    },
    { name: "Utility", tags: ["Health"] },
    { name: "Webhooks", tags: ["Webhooks"] },
  ],
  "x-webhooks": {
    EndpointCreatedEvent: {
      post: {
        description: "Sent when an endpoint is created.",
        operationId: "EndpointCreatedEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointCreatedEvent" },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "EndpointCreatedEvent",
        tags: ["Webhooks"],
      },
    },
    EndpointDeletedEvent: {
      post: {
        description: "Sent when an endpoint is deleted.",
        operationId: "EndpointDeletedEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointDeletedEvent" },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "EndpointDeletedEvent",
        tags: ["Webhooks"],
      },
    },
    EndpointDisabledEvent: {
      post: {
        description:
          "Sent when an endpoint has been automatically disabled after continuous failures.",
        operationId: "EndpointDisabledEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointDisabledEvent" },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "EndpointDisabledEvent",
        tags: ["Webhooks"],
      },
    },
    EndpointUpdatedEvent: {
      post: {
        description: "Sent when an endpoint is updated.",
        operationId: "EndpointUpdatedEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EndpointUpdatedEvent" },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "EndpointUpdatedEvent",
        tags: ["Webhooks"],
      },
    },
    MessageAttemptExhaustedEvent: {
      post: {
        description:
          "Sent when a message delivery has failed (all of the retry attempts have been exhausted).",
        operationId: "MessageAttemptExhaustedEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MessageAttemptExhaustedEvent",
              },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "MessageAttemptExhaustedEvent",
        tags: ["Webhooks"],
      },
    },
    MessageAttemptFailingEvent: {
      post: {
        description:
          "Sent after a message has been failing for a few times.\nIt's sent on the fourth failure. It complements `message.attempt.exhausted` which is sent after the last failure.",
        operationId: "MessageAttemptFailingEvent",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MessageAttemptFailingEvent",
              },
            },
          },
        },
        responses: {
          "2XX": {
            description:
              "Return any 2XX status to indicate that the data was received successfully",
          },
        },
        summary: "MessageAttemptFailingEvent",
        tags: ["Webhooks"],
      },
    },
  },
} as const;
