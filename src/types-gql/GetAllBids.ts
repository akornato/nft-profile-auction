/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllBids
// ====================================================

export interface GetAllBids_bids {
  __typename: "Bid";
  id: string;
  blockNumber: any;
  user: any;
  val: string;
  amount: any;
}

export interface GetAllBids {
  bids: GetAllBids_bids[];
}
