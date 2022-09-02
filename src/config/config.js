import ApolloClient, { InMemoryCache } from "apollo-boost";

const defaultOptions = {
  watchQuery: { fetchPolicy: "no-cache", errorPolicy: "ignore" },
  query: { fetchPolicy: "no-cache", errorPolicy: "all" },
};
// const uri = process.env.REACT_APP_GRAPHQL
const uri = "http://colegioheroes.interschool.mx:9191/graphql";
console.log("uri", uri);
export const client = new ApolloClient({
  uri,
});

export const getApolloClient = (uri) => {
  const client = new ApolloClient({
    uri,
  });
  return client;
};

export const BASE_URL = process.env.REACT_APP_API_URL;
