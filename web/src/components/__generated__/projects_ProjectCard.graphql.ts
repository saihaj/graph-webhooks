/**
 * @generated SignedSource<<e115292a8c9841d542c51443dc111b9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
export type Chain = "ETH_MAINNET" | "%future added value";
export type ProjectState = "ACTIVE" | "PAUSED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type projects_ProjectCard$data = {
  readonly chain: Chain;
  readonly id: string;
  readonly name: string;
  readonly state: ProjectState;
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
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "state",
      storageKey: null,
    },
  ],
  type: "Project",
  abstractKey: null,
};

(node as any).hash = "0be00976ebf85d2b5dc34e4f486b7219";

export default node;
