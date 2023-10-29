import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { SigninOidc } from "../../components/Authentication/SigninOidc/SigninOidc";
import { SignOutOidc } from "../../components/Authentication/SignOutOidc/SignOutOidc";
import { ProtectedRoute } from "../../components/common/RouteComponents/ProtectedRoute";
import { IAuthenticatedRoute } from "../../configs/RouteConfig";
import AuthenticatedRoutesConfig from "../../configs/RouteConfig/index";
import { ToastTypes } from "../../core/enums";
import { showToast } from "../../core/utils";
import { history } from "../../history";
import { AccessDenied } from "../../screens/Errors/AccessDenied";

const AuthenticatedApp: React.FC = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          {AuthenticatedRoutesConfig.map((item: IAuthenticatedRoute, key) => {
            return (
              <ProtectedRoute
                path={item.path}
                component={item.component}
                exact={item.exact}
                roles={item.roles}
                status={item.status ? item.status : undefined}
                key={key}
              />
            );
          })}

          <Route path="/signin-oidc" component={SigninOidc} />
          <Route path="/signout-oidc" component={SignOutOidc} />
          <Route exact path="/access-denied" component={AccessDenied} />

          <Route
            path="/Register"
            render={() => {
              history.push("/");
              return null;
            }}
          />
          <Route
            render={() => {
              history.push("/");
              showToast(["صفحه مورد نظر یافت نشد"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export { AuthenticatedApp };
