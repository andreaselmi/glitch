import React from "react";
import { Switch, Route } from "react-router-dom";

//store
import { useAppSelector } from "../store/hooks";

//my components
import ProtectedRoute from "../components/common/ProtectedRoute";

//config
import routes from "../config/routes";

const Routes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Switch>
      {routes.map((route, key) => {
        if (route.private)
          return (
            <ProtectedRoute
              component={route.component}
              isAuthenticated={isAuthenticated}
              key={key}
              path={route.path}
              redirectPath="/"
            />
          );

        return (
          <Route
            component={route.component}
            exact
            key={key}
            path={route.path}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
