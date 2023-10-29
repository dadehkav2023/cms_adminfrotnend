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
import { ServicesList } from "./ServicesList/ServicesList";
import { AddService } from "./AddService/AddService";
import { AlterService } from "./AlterService/AlterService";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
export interface ServiceDeskManagementContainerProps {}

const ServiceDeskManagementContainer: React.FC<ServiceDeskManagementContainerProps> =
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
            <CardTitle> مدیریت خدمات </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/ServiceDeskManagement/${userType}ServicesList`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ServiceDeskManagement/${userType}ServicesList`
                      );
                    }}
                  >
                    نمایش خدمات
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/ServiceDeskManagement/${userType}AddService`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ServiceDeskManagement/${userType}AddService`
                      );
                    }}
                  >
                    افزودن خدمات
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={ServicesList}
                    path="/ServiceDeskManagement/ServicesList"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AddService}
                    path="/ServiceDeskManagement/AddService"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AlterService}
                    path="/ServiceDeskManagement/AlterService/:id"
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

export { ServiceDeskManagementContainer };
