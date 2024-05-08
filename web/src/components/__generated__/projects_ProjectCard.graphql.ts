/**
 * @generated SignedSource<<08f6cf5cadb5976e190eb88fa0aedd3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
export type Chain = "ETH_MAINNET" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type projects_ProjectCard$data = {
  readonly chain: Chain;
  readonly name: string;
  readonly " $fragmentType": "projects_ProjectCard";
};
export type projects_ProjectCard$key = {
  readonly " $data"?: projects_ProjectCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"projects_ProjectCard">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "projects_ProjectCard",
  selections: [
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
  ],
  type: "Project",
  abstractKey: null,
};

(node as any).hash = "00aa3900aa1691c7e321496f60a5e255";

export default node;
