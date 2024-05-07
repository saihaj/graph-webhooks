/**
 * @generated SignedSource<<ddf1f6418602c0536486e530a296e2ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routesProjectCard$data = {
  readonly name: string;
  readonly " $fragmentType": "routesProjectCard";
};
export type routesProjectCard$key = {
  readonly " $data"?: routesProjectCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"routesProjectCard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "routesProjectCard",
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

(node as any).hash = "4262fee83eb625764c4b9eb158d33c28";

export default node;
