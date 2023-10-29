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
import { SlidesList } from "./SlidesList/SlidesList";
import { AddSlide } from "./AddSlide/AddSlide";
import { AlterSlide } from "./AlterSlide/AlterSlide";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
export interface UserManagementContainerProps {}

const SliderManagementContainer: React.FC<UserManagementContainerProps> =
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
            <CardTitle> مدیریت اسلاید ها </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/SliderManagement/${userType}SlidesList`
                      ),
                    })}
                    onClick={() => {
                      history.push(`/SliderManagement/${userType}SlidesList`);
                    }}
                  >
                    نمایش اسلاید ها
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/SliderManagement/${userType}AddSlide`
                      ),
                    })}
                    onClick={() => {
                      history.push(`/SliderManagement/${userType}AddSlide`);
                    }}
                  >
                    افزودن اسلاید ها
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={SlidesList}
                    path="/SliderManagement/SlidesList"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AddSlide}
                    path="/SliderManagement/AddSlide"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AlterSlide}
                    path="/SliderManagement/AlterSlide/:id"
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

export { SliderManagementContainer };
