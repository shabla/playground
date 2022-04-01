import { StrictMode } from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';

import { App } from "./App";
import { apolloClient } from "./apollo-setup";

import "./styles/index.scss";

// add all the solid icons
library.add(fas);

const container = document.getElementById("root");

if (!container) {
  throw Error("Couldn't find #root element");
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
