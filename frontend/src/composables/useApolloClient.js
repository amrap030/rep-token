import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { reactive } from "vue";

export function useApolloClient() {
  const apollo = reactive({
    client: null,
  });

  const httpLink = new HttpLink({
    uri: "https://stocks-dapp-db.herokuapp.com/v1/graphql",

    headers: {
      "x-hasura-admin-secret": "blockchain",
    },
  });

  const wsLink = new WebSocketLink({
    uri: "ws://stocks-dapp-db.herokuapp.com/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": "blockchain",
        },
      },
    },
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  apollo.client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return apollo;
}
