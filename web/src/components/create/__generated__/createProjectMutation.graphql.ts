/**
 * @generated SignedSource<<8ff0ecff92a3d7250aa4acc716f32a1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
  };
};
export type createProjectMutation = {
  response: createProjectMutation$data;
  variables: createProjectMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateProjectPayload",
    "kind": "LinkedField",
    "name": "createProject",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "project",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createProjectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createProjectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9677ec678523a8064fe9ad6bbb26a040",
    "id": null,
    "metadata": {},
    "name": "createProjectMutation",
    "operationKind": "mutation",
    "text": "mutation createProjectMutation(\n  $input: CreateProjectInput!\n) {\n  createProject(input: $input) {\n    project {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "60cdfd364feb84ac731cad0cf8ed2f05";

export default node;
