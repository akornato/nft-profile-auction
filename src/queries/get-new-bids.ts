import { gql } from "@apollo/client";

export const GET_NEW_BIDS = gql`
  {
    transfers(first: 10) {
      id
      from
      to
      value
    }
  }
`;
