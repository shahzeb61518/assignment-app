import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ROUTES } from "./helpers/RoutePaths";
import Main from "./Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <React.Suspense>
          <Switch>
            <Route
              exact
              path={ROUTES.products}
              name="Product List"
              render={(props) => <Main {...props} />}
            />
            <Redirect to={ROUTES.products} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
