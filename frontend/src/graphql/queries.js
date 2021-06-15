import gql from "graphql-tag";

const getSymbols = gql`
  query Symbols {
    symbols(order_by: { id: asc }) {
      name
      description
    }
  }
`;

export { getSymbols };
