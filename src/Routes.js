import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewMovie from "./containers/NewMovie";
import Movies from "./containers/Movies";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default function Routes() {
  return (
    <Switch>
     <UnauthenticatedRoute exact path="/login">
        <Login />
    </UnauthenticatedRoute>
    <UnauthenticatedRoute exact path="/signup">
        <Signup />
    </UnauthenticatedRoute>
    <AuthenticatedRoute exact path="/movies/new">
        <NewMovie />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/movies/:id">
        <Movies />
    </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
        <Route>
            <NotFound />
        </Route>
    </Switch>
  );
}