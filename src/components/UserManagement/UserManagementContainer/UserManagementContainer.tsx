import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, Switch } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { IsSameUrl } from "../../../core/utils";
import { SimpleProtectedRoute } from "../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { UsersList } from "./UsersList/UsersList";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
export interface UserManagementContainerProps {}

const UserManagementContainer: React.FC<UserManagementContainerProps> = () => {
  const [toggle, setToggle] = useState<string>("1");
  const [userType, setUserType] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const { userInfo, role } = useUserAuth();

  useEffect(() => {
    if (userInfo && userInfo.userType === 2) {
      setUserType("Legal");
    } else if (userInfo && userInfo.userType === 1) {
      setUserType("");
    }
  }, [userInfo]);
  return false ? (
    <FallBackSpinner />
  ) : (
    <>
      <Card>
        <CardHeader>
          <CardTitle> مدیریت کاربران </CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/UserManagement/${userType}UsersList`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/UserManagement/${userType}UsersList`);
                  }}
                >
                  نمایش کاربران
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={UsersList}
                  path="/UserManagement/UsersList"
                  exact
                />
              </Switch>
            </TabContent>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
};

export { UserManagementContainer };
