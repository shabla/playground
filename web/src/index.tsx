import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { App } from "components";
import { apolloClient } from "./apollo-setup";

import "./index.css";

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
