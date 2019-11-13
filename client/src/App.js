import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ItemState from "./contexts/items/ItemState";
import LogState from "./contexts/logs/LogState";
import HeaderNavbar from "./layouts/HeaderNavbar";
import StudyPage from "./pages/StudyPage";
import Index from "./layouts/Index";
import ScrollToTop from "./background/ScrollToTop";
import LogEntryPage from "./pages/LogEntryPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ItemState>
      <LogState>
        <Router>
          <Fragment>
            <ScrollToTop />
            <HeaderNavbar />
          </Fragment>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/api/items/:id" component={StudyPage} />
            <Route exact path="/api/logs/:id" component={LogEntryPage} />
          </Switch>
        </Router>
      </LogState>
    </ItemState>
  );
}

export default App;
