/**
 * @generated SignedSource<<c0772bf6252dc48a373fd382b26a086d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Project_messages$variables = {
  cursor?: string | null | undefined;
  first?: number | null | undefined;
  id: string;
};
export type Project_messages$data = {
  readonly node:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"messages_ProjectMessage">;
      }
    | null
    | undefined;
};
export type Project_messages = {
  response: Project_messages$data;
  variables: Project_messages$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "cursor",
      },
      {
        defaultValue: 10,
        kind: "LocalArgument",
        name: "first",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v2 = {
      kind: "Variable",
      name: "first",
      variableName: "first",
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v5 = [
      {
        kind: "Variable",
        name: "after",
        variableName: "cursor",
      },
      v2 /*: any*/,
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "Project_messages",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              args: [
                {
                  kind: "Variable",
                  name: "cursor",
                  variableName: "cursor",
                },
                v2 /*: any*/,
              ],
              kind: "FragmentSpread",
              name: "messages_ProjectMessage",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "Project_messages",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            v3 /*: any*/,
            v4 /*: any*/,
            {
              kind: "InlineFragment",
              selections: [
                {
                  alias: null,
                  args: v5 /*: any*/,
                  concreteType: "ProjectMessagesConnection",
                  kind: "LinkedField",
                  name: "messages",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "ProjectMessagesConnectionEdge",
                      kind: "LinkedField",
                      name: "edges",
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: "ProjectWebhookMessage",
                          kind: "LinkedField",
                          name: "node",
                          plural: false,
                          selections: [
                            v4 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "eventType",
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "timestamp",
                              storageKey: null,
                            },
                            v3 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "cursor",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "PageInfo",
                      kind: "LinkedField",
                      name: "pageInfo",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "endCursor",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "hasNextPage",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v5 /*: any*/,
                  filters: null,
                  handle: "connection",
                  key: "ProjectMessage_messages",
                  kind: "LinkedHandle",
                  name: "messages",
                },
              ],
              type: "Project",
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "6c1996140268bba671b4d7d932fa867f",
      id: null,
      metadata: {},
      name: "Project_messages",
      operationKind: "query",
      text: "query Project_messages(\n  $cursor: String\n  $first: Int = 10\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...messages_ProjectMessage_19XkED\n    id\n  }\n}\n\nfragment messages_ProjectMessage_19XkED on Project {\n  messages(after: $cursor, first: $first) {\n    edges {\n      node {\n        id\n        eventType\n        timestamp\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n",
    },
  };
})();

(node as any).hash = "19f23c4298bbddb943fe9d0513e1bc3a";

export default node;
