/**
 * @generated SignedSource<<2e237b5dda86543c451f03538d046560>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Chain = "ETH_MAINNET" | "%future added value";
export type CreateProjectInput = {
  chain: Chain;
  contractAddress: any;
  name: string;
  startBlock?: number | null | undefined;
  webhookUrl?: any | null | undefined;
};
export type createProjectMutation$variables = {
  input: CreateProjectInput;
};
export type createProjectMutation$data = {
  readonly createProject: {
    readonly project: {
      readonly id: string;
    };
    readonly projectEdge: {
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectCard">;
      };
    };
  };
};
export type createProjectMutation = {
  response: createProjectMutation$data;
  variables: createProjectMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "input",
        variableName: "input",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      concreteType: "Project",
      kind: "LinkedField",
      name: "project",
      plural: false,
      selections: [v2 /*: any*/],
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "createProjectMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "CreateProjectPayload",
          kind: "LinkedField",
          name: "createProject",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "QueryProjectsConnectionEdge",
              kind: "LinkedField",
              name: "projectEdge",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Project",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    {
                      args: null,
                      kind: "FragmentSpread",
                      name: "projects_ProjectCard",
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "createProjectMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "CreateProjectPayload",
          kind: "LinkedField",
          name: "createProject",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "QueryProjectsConnectionEdge",
              kind: "LinkedField",
              name: "projectEdge",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Project",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    v2 /*: any*/,
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
                      name: "state",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "b6865920be16f2ab169c42624b226784",
      id: null,
      metadata: {},
      name: "createProjectMutation",
      operationKind: "mutation",
      text: "mutation createProjectMutation(\n  $input: CreateProjectInput!\n) {\n  createProject(input: $input) {\n    projectEdge {\n      node {\n        id\n        ...projects_ProjectCard\n      }\n    }\n    project {\n      id\n    }\n  }\n}\n\nfragment projects_ProjectCard on Project {\n  id\n  name\n  chain\n  state\n}\n",
    },
  };
})();

(node as any).hash = "a3150719e2b3d140c701ee9cb44a59c5";

export default node;
