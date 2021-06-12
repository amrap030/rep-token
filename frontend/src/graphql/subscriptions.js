import gql from "graphql-tag";

const allQuotes = gql`
  subscription Quotes {
    quotes(limit: 30, order_by: { time: desc }) {
      change
      change_percent
      close
      high
      low
      name
      open
      symbol
      time
      volume
    }
  }
`;

const filteredQuotes = gql`
  subscription FilteredQuotes($symbol: String!) {
    symbols(where: { name: { _eq: $symbol } }) {
      quotes(order_by: { time: asc }) {
        change
        change_percent
        close
        high
        id
        low
        open
        time
        volume
      }
      name
      description
    }
  }
`;

export { allQuotes, filteredQuotes };
