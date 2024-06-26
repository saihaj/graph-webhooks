/**
 * @generated SignedSource<<3c74837fd757bdfa2ccda1b7e79fc80a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type messages_ProjectMessage$data = {
  readonly id: string;
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly eventType: string;
        readonly id: string;
        readonly timestamp: any;
      };
    }>;
  };
  readonly " $fragmentType": "messages_ProjectMessage";
};
export type messages_ProjectMessage$key = {
  readonly " $data"?: messages_ProjectMessage$data;
  readonly " $fragmentSpreads": FragmentRefs<"messages_ProjectMessage">;
};

import Project_messages_graphql from "./Project_messages.graphql";

const node: ReaderFragment = (function () {
  var v0 = ["messages"],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    };
  return {
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "cursor",
      },
      {
        defaultValue: 10,
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
        fragmentPathInResult: ["node"],
        operation: Project_messages_graphql,
        identifierInfo: {
          identifierField: "id",
          identifierQueryVariableName: "id",
        },
      },
    },
    name: "messages_ProjectMessage",
    selections: [
      {
        alias: "messages",
        args: null,
        concreteType: "ProjectMessagesConnection",
        kind: "LinkedField",
        name: "__ProjectMessage_messages_connection",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "ProjectMessagesConnectionEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "ProjectWebhookMessage",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: [
                  v1 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "eventType",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "timestamp",
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
        storageKey: null,
      },
      v1 /*: any*/,
    ],
    type: "Project",
    abstractKey: null,
  };
})();

(node as any).hash = "19f23c4298bbddb943fe9d0513e1bc3a";

export default node;
