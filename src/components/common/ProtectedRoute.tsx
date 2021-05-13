import { Redirect, Route, RouteProps } from "react-router";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
} & RouteProps;

export default function ProtectedRoute({
  isAuthenticated,
  redirectPath,
  ...routeProps
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={redirectPath} />;
  }
}
