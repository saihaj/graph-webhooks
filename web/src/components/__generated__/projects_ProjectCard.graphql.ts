/**
 * @generated SignedSource<<8d8b22b8ba25ddb09d3b39961c9578ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type projects_ProjectCard$data = {
  readonly name: string;
  readonly " $fragmentType": "projects_ProjectCard";
};
export type projects_ProjectCard$key = {
  readonly " $data"?: projects_ProjectCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectCard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "projects_ProjectCard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};

(node as any).hash = "8be12bd917876ee410d39804fa49e9a5";

export default node;
