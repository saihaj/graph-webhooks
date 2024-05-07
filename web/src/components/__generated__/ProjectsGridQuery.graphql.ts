/**
 * @generated SignedSource<<ac95b269d35c0eb08c7a2450f0eac9df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProjectsGridQuery$variables = {
  cursor?: string | null | undefined;
  first?: number | null | undefined;
};
export type ProjectsGridQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectsGrid">;
};
export type ProjectsGridQuery = {
  response: ProjectsGridQuery$data;
  variables: ProjectsGridQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": 9,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectsGridQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "projects_ProjectsGrid"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectsGridQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ProjectsGrid_projects",
        "kind": "LinkedHandle",
        "name": "projects"
      }
    ]
  },
  "params": {
    "cacheID": "ecf3ff253b306ee8366aa9a559875125",
    "id": null,
    "metadata": {},
    "name": "ProjectsGridQuery",
    "operationKind": "query",
    "text": "query ProjectsGridQuery(\n  $cursor: String\n  $first: Int = 9\n) {\n  ...projects_ProjectsGrid_19XkED\n}\n\nfragment projects_ProjectCard on Project {\n  name\n  chain\n}\n\nfragment projects_ProjectsGrid_19XkED on Query {\n  projects(after: $cursor, first: $first) {\n    edges {\n      node {\n        id\n        ...projects_ProjectCard\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4112654fbbafaf0dbd30c88721a51a79";

export default node;
