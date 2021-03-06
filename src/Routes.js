import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import SwipeRight from "./containers/SwipeRight";
import Movies from "./containers/Movies";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import Settings from "./containers/Settings";


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
     <UnauthenticatedRoute exact path="/login">
        <Login />
    </UnauthenticatedRoute>
    <UnauthenticatedRoute exact path="/login/reset">
      <ResetPassword />
    </UnauthenticatedRoute>
    <UnauthenticatedRoute exact path="/signup">
        <Signup />
    </UnauthenticatedRoute>
    <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/swipe/new">
        <SwipeRight />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/swipe/:id">
        <Movies />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/settings/password">
       <ChangePassword />
    </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
        <Route>
            <NotFound />
        </Route>
    </Switch>
  );
}