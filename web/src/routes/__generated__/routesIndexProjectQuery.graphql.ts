/**
 * @generated SignedSource<<395dcf455e1d905f64f4215fb21f51ce>>
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
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectsGrid">;
};
export type routesIndexProjectQuery = {
  response: routesIndexProjectQuery$data;
  variables: routesIndexProjectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 9
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routesIndexProjectQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "projects_ProjectsGrid"
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
        "args": (v0/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "chain",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "projects(first:9)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ProjectsGrid_projects",
        "kind": "LinkedHandle",
        "name": "projects"
      }
    ]
  },
  "params": {
    "cacheID": "848993ebfcfab5c162ef1aa7b0ac82c0",
    "id": null,
    "metadata": {},
    "name": "routesIndexProjectQuery",
    "operationKind": "query",
    "text": "query routesIndexProjectQuery {\n  ...projects_ProjectsGrid\n}\n\nfragment projects_ProjectCard on Project {\n  name\n  chain\n}\n\nfragment projects_ProjectsGrid on Query {\n  projects(first: 9) {\n    edges {\n      node {\n        id\n        ...projects_ProjectCard\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f3c429ac29cdc048bc4c90402bb209d";

export default node;
