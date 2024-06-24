/**
 * @generated SignedSource<<c18fea9efc591ce6685dac832402f543>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
export type Chain = "ETH_MAINNET" | "%future added value";
export type IdProjectQuery$variables = {
  id: string;
};
export type IdProjectQuery$data = {
  readonly project: {
    readonly chain: Chain;
    readonly endpoint: any;
    readonly name: string;
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
          selections: [v2 /*: any*/, v3 /*: any*/, v4 /*: any*/],
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
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "09595c7c39f4c6da8c73a0303104fc89",
      id: null,
      metadata: {},
      name: "IdProjectQuery",
      operationKind: "query",
      text: "query IdProjectQuery(\n  $id: String!\n) {\n  project(id: $id) {\n    chain\n    endpoint\n    name\n    id\n  }\n}\n",
    },
  };
})();

(node as any).hash = "d5e5da56ce0568d68c2338dc9a3bc801";

export default node;
