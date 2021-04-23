import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { loggedUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
