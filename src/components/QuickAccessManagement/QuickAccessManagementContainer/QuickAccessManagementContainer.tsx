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
import { QuickAccessList } from "./QuickAccessList/QuickAccessList";
import { AlterQuickAccess } from "./AlterQuickAccess/AlterQuickAccess";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { AddQuickAccess } from "./AddQuickAccess/AddQuickAccess";
export interface QuickAccessManagementContainerProps {}

const QuickAccessManagementContainer: React.FC<QuickAccessManagementContainerProps> =
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
            <CardTitle> مدیریت دسترسی سریع </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/QuickAccessManagement/${userType}QuickAccessList`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/QuickAccessManagement/${userType}QuickAccessList`
                      );
                    }}
                  >
                    نمایش دسترسی سریع
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/QuickAccessManagement/${userType}AddQuickAccess`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/QuickAccessManagement/${userType}AddQuickAccess`
                      );
                    }}
                  >
                    افزودن دسترسی سریع
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={QuickAccessList}
                    path="/QuickAccessManagement/QuickAccessList"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AddQuickAccess}
                    path="/QuickAccessManagement/AddQuickAccess"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AlterQuickAccess}
                    path="/QuickAccessManagement/AlterQuickAccess/:id"
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

export { QuickAccessManagementContainer };
