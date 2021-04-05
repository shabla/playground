import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

import { App } from "components";
import { getAccessToken } from "store";

import "./index.css";

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

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authMiddleware, httpLink]),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
