import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ItemState from "./contexts/ItemState";
import HeaderNavbar from "./components/layouts/HeaderNavbar";
import StudyList from "./components/items/StudyList";
import ItemModal from "./components/items/ItemModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ItemState>
      <Router>
        <Fragment>
          <HeaderNavbar />
          <ItemModal />
        </Fragment>
        <Switch>
          <Route exact path="/" component={StudyList} />
        </Switch>
      </Router>
    </ItemState>
  );
}

export default App;
