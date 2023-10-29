import React, { useEffect, useState } from "react";
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
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ManageCategories } from "./ManageCategories/ManageCategories";
import { AddStatement } from "./AddStatement/AddStatement";
import { StatementList } from "./StatementList/StatementList";
import { AlterStatement } from "./AlterStatement/AlterStatement";
export interface StatementManagementContainerProps {}

const StatementManagementContainer: React.FC<StatementManagementContainerProps> =
  () => {
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
            <CardTitle> مدیریت بیانیه ها </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/StatementManagement/${userType}AddStatement`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/StatementManagement/${userType}AddStatement`
                      );
                    }}
                  >
                    افزودن بیانیه
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/StatementManagement/${userType}StatementList`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/StatementManagement/${userType}StatementList`
                      );
                    }}
                  >
                    نمایش بیانیه ها
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/StatementManagement/${userType}ManageCategories`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/StatementManagement/${userType}ManageCategories`
                      );
                    }}
                  >
                    مدیریت دسته بندی ها
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={AddStatement}
                    path="/StatementManagement/AddStatement"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={StatementList}
                    path="/StatementManagement/StatementList"
                    exact
                  />

                  <SimpleProtectedRoute
                    component={AlterStatement}
                    path="/StatementManagement/AlterStatement/:id"
                    exact
                  />

                  <SimpleProtectedRoute
                    component={ManageCategories}
                    path="/StatementManagement/ManageCategories"
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

export { StatementManagementContainer };
