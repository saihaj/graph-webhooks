/**
 * @generated SignedSource<<514f17f1e0e8f5d653e387b823d78754>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type projectsQuery$variables = Record<PropertyKey, never>;
export type projectsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectsGrid">;
};
export type projectsQuery = {
  response: projectsQuery$data;
  variables: projectsQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: "Literal",
      name: "first",
      value: 9,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "projectsQuery",
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "projects_ProjectsGrid",
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "projectsQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "QueryProjectsConnection",
          kind: "LinkedField",
          name: "projects",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "QueryProjectsConnectionEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Project",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "id",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "name",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "chain",
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
          storageKey: "projects(first:9)",
        },
        {
          alias: null,
          args: v0 /*: any*/,
          filters: null,
          handle: "connection",
          key: "ProjectsGrid_projects",
          kind: "LinkedHandle",
          name: "projects",
        },
      ],
    },
    params: {
      cacheID: "fc303fb63230487c4295871733a2b597",
      id: null,
      metadata: {},
      name: "projectsQuery",
      operationKind: "query",
      text: "query projectsQuery {\n  ...projects_ProjectsGrid\n}\n\nfragment projects_ProjectCard on Project {\n  name\n  chain\n}\n\nfragment projects_ProjectsGrid on Query {\n  projects(first: 9) {\n    edges {\n      node {\n        id\n        ...projects_ProjectCard\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "93773e623e5efe3a5f2c35655a736310";

export default node;
