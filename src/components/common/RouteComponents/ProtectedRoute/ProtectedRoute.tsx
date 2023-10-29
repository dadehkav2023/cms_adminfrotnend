import jwt_decode from "jwt-decode";
import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { VerticalLayout } from "../../../../App/AuthenticatedApp/Layout/VerticalLayout";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { ContextLayout } from "../../../../core/utils/context/Layout";
import { FallBackSpinner } from "../../Spinner/FallBackSpinner/FallbackSpinner";
import { ScrollToTop } from "../../Wrapper/ScrollToTop";

interface IPropTypes {
  component: any;
  fullLayout?: any;
  roles?: Array<string>;
  user?: any;
  path: string;
  status?: number;
  statusKey?: string;
  exact?: boolean;
  permissions?: string[] | string;
  flow?: string;
}

export const CanRole: React.FC<{ roles: string[] }> = ({ children, roles }) => {
  const { role, token, logOut, userInfo } = useUserAuth();

  let valid = false; //roles.includes(role)
  try {
    const decodedRoles: any = jwt_decode(token);
    console.log(roles);
    console.log(userInfo);

    valid = roles.some((p: any) => userInfo.roles.includes(p));
    let decodeRole = decodedRoles.role;
    let ownRole = role;
    if (typeof decodeRole === "string") {
      decodeRole = [decodeRole];
    }

    if (typeof ownRole === "string") {
      ownRole = [ownRole];
    }

    if (
      ownRole.length !== decodeRole.length ||
      ownRole.some((r: string) => !decodeRole.includes(r))
    ) {
      logOut();
      console.log(ownRole, decodeRole);
    }
  } catch (error) {
    //logOut();
    console.log(error);
  }

  if (valid) {
    return <>{children}</>;
  } else {
    return <Redirect to="/access-denied" />;
  }
};

export const AllowRole: React.FC<{ roles: string[] }> = ({
  children,
  roles,
}) => {
  const { role, token, logOut, userInfo } = useUserAuth();

  const valid = roles.some((p: any) => userInfo.roles.includes(p));

  if (valid) {
    return <>{children}</>;
  } else {
    return null;
  }
};

const ProtectedRoute: React.FC<IPropTypes> = ({
  component: Component,
  fullLayout,
  roles = [],
  user,
  path,
  status,
  exact,
  permissions,
  flow,
}) => {
  // const checkExpirty = useCheckExpiry();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              return (
                <VerticalLayout
                  {...props}
                  permission={roles}
                  collapseSidebar={() => {}}
                >
                  <CanRole roles={roles}>
                    {/* <CanStatus flow={flow} status={status}> */}
                    <Suspense fallback={<FallBackSpinner />}>
                      <ScrollToTop>
                        <Component {...props} permissions={permissions} />
                      </ScrollToTop>
                    </Suspense>
                    {/* </CanStatus> */}
                  </CanRole>
                </VerticalLayout>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

export { ProtectedRoute };
