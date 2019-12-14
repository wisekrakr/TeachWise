import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../pages/MainPage";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import Profile from "../pages/ProfilePage";
import ProfileCreation from "../components/profiles/profile-input/ProfileCreation";
import ProfileEdit from "../components/profiles/profile-input/ProfileEdit";
import ProfileAddEducation from "../components/profiles/profile-input/ProfileAddEducation";
import AlertPopUp from "../layouts/AlertPopUp";
import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import StudyPage from "../pages/StudyPage";
import LogEntryPage from "../pages/LogEntryPage";
import PrivateRoute from "./PrivateRoute";
import Profiles from "../components/profiles/profile-lists/Profiles";
import ProfilePage from "../pages/ProfilePage";
// import ProfileItem from "../components/profiles/ProfileItem";

const Routes = () => {
  return (
    <div>
      <AlertPopUp />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Main} />
        <PrivateRoute
          exact
          path="/profile-creation"
          component={ProfileCreation}
        />
        <PrivateRoute exact path="/profile-edit" component={ProfileEdit} />
        <PrivateRoute
          exact
          path="/profile-add-education"
          component={ProfileAddEducation}
        />
        <PrivateRoute exact path="/api/profile" component={Profiles} />
        {/* <PrivateRoute
          exact
          path="/api/items/user/:id"
          component={ProfileItem}
        /> */}
        <PrivateRoute exact path="/api/items" component={StudyList} />
        <PrivateRoute exact path="/api/logs" component={LogEntryList} />
        <PrivateRoute exact path="/api/fields" component={StudyFieldsList} />
        <PrivateRoute exact path="/api/items/:id" component={StudyPage} />
        <PrivateRoute exact path="/api/logs/:id" component={LogEntryPage} />
        <PrivateRoute exact path="/api/profile/:id" component={ProfilePage} />
      </Switch>
    </div>
  );
};

export default Routes;
