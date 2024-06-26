/**
 * @generated SignedSource<<5c8d48b1ca216f8d5343d6695e8c24c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Chain = "ETH_MAINNET" | "%future added value";
export type IdProjectQuery$variables = {
  id: string;
};
export type IdProjectQuery$data = {
  readonly project: {
    readonly chain: Chain;
    readonly endpoint: any;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"messages_ProjectMessage">;
  };
};
export type IdProjectQuery = {
  response: IdProjectQuery$data;
  variables: IdProjectQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
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
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "chain",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "endpoint",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v5 = [
      {
        kind: "Literal",
        name: "first",
        value: 10,
      },
    ],
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "IdProjectQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Project",
          kind: "LinkedField",
          name: "project",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
            {
              args: null,
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
      name: "IdProjectQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Project",
          kind: "LinkedField",
          name: "project",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
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
                        v6 /*: any*/,
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
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "__typename",
                          storageKey: null,
                        },
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
              storageKey: "messages(first:10)",
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
            v6 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "37298a809c7dbec81eb1b83ad54e7ef8",
      id: null,
      metadata: {},
      name: "IdProjectQuery",
      operationKind: "query",
      text: "query IdProjectQuery(\n  $id: String!\n) {\n  project(id: $id) {\n    chain\n    endpoint\n    name\n    ...messages_ProjectMessage\n    id\n  }\n}\n\nfragment messages_ProjectMessage on Project {\n  messages(first: 10) {\n    edges {\n      node {\n        id\n        eventType\n        timestamp\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n",
    },
  };
})();

(node as any).hash = "e85d2c518503b5f7f117049ee3b0a544";

export default node;
