/**
 * @generated SignedSource<<54e33d2cc19e2b51abf2dcbb10d489c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routesIndexProjectQuery$variables = Record<PropertyKey, never>;
export type routesIndexProjectQuery$data = {
  readonly projects: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"routesProjectCard">;
      };
    }>;
  };
};
export type routesIndexProjectQuery = {
  response: routesIndexProjectQuery$data;
  variables: routesIndexProjectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routesIndexProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryProjectsConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryProjectsConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "routesProjectCard"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routesIndexProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryProjectsConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryProjectsConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "259c250c01c06ea1e599fd7828e37081",
    "id": null,
    "metadata": {},
    "name": "routesIndexProjectQuery",
    "operationKind": "query",
    "text": "query routesIndexProjectQuery {\n  projects {\n    edges {\n      node {\n        id\n        ...routesProjectCard\n      }\n    }\n  }\n}\n\nfragment routesProjectCard on Project {\n  name\n}\n"
  }
};
})();

(node as any).hash = "33e54e0c80bbbda3427f9f5a271d91ac";

export default node;
