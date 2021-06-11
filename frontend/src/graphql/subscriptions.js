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

export { allQuotes };
