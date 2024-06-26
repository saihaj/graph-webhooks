/**
 * @generated SignedSource<<3127b9574cee8981afa6b28696067e90>>
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
  readonly id: string;
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
  ],
  type: "Project",
  abstractKey: null,
};

(node as any).hash = "733a256d531cf5c1716c7b62d419f483";

export default node;
