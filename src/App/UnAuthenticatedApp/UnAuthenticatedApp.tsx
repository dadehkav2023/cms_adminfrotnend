import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { RegisterContainer } from "../../components/Authentication/RegisterContainer";
import { SigninOidc } from "../../components/Authentication/SigninOidc/SigninOidc";
import { SignOutOidc } from "../../components/Authentication/SignOutOidc/SignOutOidc";
import { ToastTypes } from "../../core/enums";
import { showToast } from "../../core/utils";
import { history } from "./../../history";

const UnAuthenticatedApp: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/Register" render={() => <RegisterContainer />} />

          <Route exact path="/" render={() => <Redirect to="/Register" />} />
          <Route path="/signin-oidc" component={SigninOidc} />
          <Route path="/signout-oidc" component={SignOutOidc} />
          <Route
            render={() => {
              history.push("/Register");
              showToast(["لطفا ابتدا وارد شوید"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </>
  );
};

export { UnAuthenticatedApp };
