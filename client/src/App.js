import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import cache from "./cache";

import Routes from "./routing/Routes";
import Home from "./pages/HomePage";
import HeaderNavbar from "./layouts/HeaderNavbar";
import ScrollToTop from "./background/ScrollToTop";
import FooterSection from "./layouts/FooterSection";

import { loadUser } from "./actions/AuthState";
import setAuthToken from "./helpers/setAuthToken";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import "./js/main.js";
import "./js/tabs.js";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    cache.dispatch(loadUser());
  }, []);

  return (
    <Provider store={cache}>
      <Router>
        <Fragment>
          <ScrollToTop />
          <HeaderNavbar />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route component={Routes} />
          </Switch>
          <FooterSection />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
