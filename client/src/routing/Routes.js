import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../pages/MainPage";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import AlertPopUp from "../layouts/AlertPopUp";
import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";
import StudyPage from "../pages/StudyPage";
import LogEntryPage from "../pages/LogEntryPage";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <div>
      <AlertPopUp />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Main} />
        <PrivateRoute exact path="/api/items" component={StudyList} />
        <PrivateRoute exact path="/api/logs" component={LogEntryList} />
        <PrivateRoute exact path="/api/items/:id" component={StudyPage} />
        <PrivateRoute exact path="/api/logs/:id" component={LogEntryPage} />
      </Switch>
    </div>
  );
};

export default Routes;
