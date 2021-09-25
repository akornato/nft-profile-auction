/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBidsByUser
// ====================================================

export interface GetBidsByUser_bids {
  __typename: "Bid";
  id: string;
  blockNumber: any;
  user: any;
  val: string;
  amount: any;
}

export interface GetBidsByUser {
  bids: GetBidsByUser_bids[];
}

export interface GetBidsByUserVariables {
  user?: string | null;
}
