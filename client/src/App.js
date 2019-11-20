import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import cache from "./cache";

import HeaderNavbar from "./layouts/HeaderNavbar";
import StudyPage from "./pages/StudyPage";
import Index from "./pages/Index";
import MainPage from "./pages/MainPage";
import ScrollToTop from "./background/ScrollToTop";
import LogEntryPage from "./pages/LogEntryPage";
import StudyList from "./components/items/StudyList";
import LogEntryList from "./components/logs/LogEntryList";
// import FieldsOfStudyList from "./components/fields/FieldsOfStudyList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={cache}>
      <Router>
        <Fragment>
          <ScrollToTop />
          <HeaderNavbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/api/items" component={StudyList} />
            <Route exact path="/api/logs" component={LogEntryList} />
            {/* <Route exact path="/api/fields" component={FieldsOfStudyList} /> */}
            <Route exact path="/api/items/:id" component={StudyPage} />
            <Route exact path="/api/logs/:id" component={LogEntryPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
