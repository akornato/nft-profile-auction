import { gql } from "@apollo/client";

export const GET_BIDS = gql`
  {
    bids {
      id
      blockNumber
      user
      val
      amount
    }
  }
`;
