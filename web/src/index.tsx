import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { App } from "./App";
import { apolloClient } from "./apollo-setup";

import "./styles/index.scss";

const container = document.getElementById("root");

if (!container) {
  throw Error("Couldn't find #root element");
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
