/**
 * @generated SignedSource<<18b30e5b5cdd2c01c156d8a4725791cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type projects_ProjectsGrid$data = {
  readonly projects: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectCard">;
      };
    }>;
  };
  readonly " $fragmentType": "projects_ProjectsGrid";
};
export type projects_ProjectsGrid$key = {
  readonly " $data"?: projects_ProjectsGrid$data;
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectsGrid">;
};

import ProjectsGridQuery_graphql from "./ProjectsGridQuery.graphql";

const node: ReaderFragment = (function () {
  var v0 = ["projects"];
  return {
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "cursor",
      },
      {
        defaultValue: 9,
        kind: "LocalArgument",
        name: "first",
      },
    ],
    kind: "Fragment",
    metadata: {
      connection: [
        {
          count: "first",
          cursor: "cursor",
          direction: "forward",
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: "first",
            cursor: "cursor",
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: [],
        operation: ProjectsGridQuery_graphql,
      },
    },
    name: "projects_ProjectsGrid",
    selections: [
      {
        alias: "projects",
        args: null,
        concreteType: "QueryProjectsConnection",
        kind: "LinkedField",
        name: "__ProjectsGrid_projects_connection",
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
                    args: null,
                    kind: "FragmentSpread",
                    name: "projects_ProjectCard",
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
        storageKey: null,
      },
    ],
    type: "Query",
    abstractKey: null,
  };
})();

(node as any).hash = "4112654fbbafaf0dbd30c88721a51a79";

export default node;
