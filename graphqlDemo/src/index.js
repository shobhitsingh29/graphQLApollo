import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri: "http://smart-meeting.herokuapp.com",
    cache,
    request: operation => {
        operation.setContext({
            headers: {
                token: `a123gjhgjsdf657622`
            }
        });
    },
    connectToDevTools: true
});

render(
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route component={App} />
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById("root")
);
