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
import { ActiveProvinces } from "./ActiveProvinces/ActiveProvinces";
import { AlterProvince } from "./AlterProvince/AlterProvince";
import { AddProvince } from "./AddProvince/AddProvince";

export interface ProvinceListingContainerProps {}

const ProvinceListingContainer: React.FC<ProvinceListingContainerProps> =
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
            <CardTitle> مدیریت اخبار </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/ProvinceListing/${userType}ActiveProvinces`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ProvinceListing/${userType}ActiveProvinces`
                      );
                    }}
                  >
                    استان های فعال
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/ProvinceListing/${userType}AddProvince`
                      ),
                    })}
                    onClick={() => {
                      history.push(`/ProvinceListing/${userType}AddProvince`);
                    }}
                  >
                    افزودن استان به نقشه
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={ActiveProvinces}
                    path="/ProvinceListing/ActiveProvinces"
                    exact
                  />{" "}
                  <SimpleProtectedRoute
                    component={AddProvince}
                    path="/ProvinceListing/AddProvince"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AlterProvince}
                    path="/ProvinceListing/AlterProvince/:id"
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

export { ProvinceListingContainer };
