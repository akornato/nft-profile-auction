import { gql } from "@apollo/client";

export const GET_BIDS_BY_USER = gql`
  query GetBidsByUser($user: String) {
    bids(where: { user: $user }) {
      id
      blockNumber
      user
      val
      amount
    }
  }
`;

export const GET_ALL_BIDS = gql`
  query GetAllBids {
    bids {
      id
      blockNumber
      user
      val
      amount
    }
  }
`;
