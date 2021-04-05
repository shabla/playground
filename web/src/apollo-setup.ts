import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

import { getAccessToken } from "store";

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getAccessToken();

    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return forward(operation);
});

const httpLink = new HttpLink({ uri: "http://localhost:4444/graphql", credentials: "include" });

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authMiddleware, httpLink]),
});