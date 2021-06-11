import gql from "graphql-tag";

const getSymbols = gql`
  query Symbols {
    symbols {
      name
      description
    }
  }
`;

export { getSymbols };
