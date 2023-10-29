import React, { useState, Suspense, useEffect } from "react";
import { Route, useHistory, useLocation, Redirect } from "react-router-dom";

import { ContextLayout } from "../../../../core/utils/context/Layout";
import { FallBackSpinner } from "../../Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  component: any;
  Layout: any;
  path: string;
  exact?: boolean;
}

const UnAuthorizeRoute: React.FC<IPropTypes> = ({
  component: Component,
  path,
  exact,
  Layout,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              return (
                <Layout {...props}>
                  <Suspense fallback={<FallBackSpinner />}>
                    <Component {...props} />
                  </Suspense>
                </Layout>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

export { UnAuthorizeRoute };
