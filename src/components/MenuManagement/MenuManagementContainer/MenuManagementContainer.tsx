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
import { AddLinkMenu } from "./AddMenu/AddLinkMenu/AddLinkMenu";
import { AddDownloadMenu } from "./AddMenu/AddDownloadMenu/AddDownloadMenu";
import { AddContentMenu } from "./AddMenu/AddContentMenu/AddContentMenu";
import { AddModuleMenu } from "./AddMenu/AddModuleMenu/AddModuleMenu";
import { AddMenu } from "./AddMenu/AddMenu/AddMenu";
import MenuSample from "./SampleMenu/MenuSample";
import { AlterMenu } from "./AlterMenu/AlterMenu/AlterMenu";
import { AlterLinkMenu } from "./AlterMenu/AlterLinkMenu/AlterLinkMenu";
import { AlterDownloadMenu } from "./AlterMenu/AlterDownloadMenu/AlterDownloadMenu";
import { AlterContentMenu } from "./AlterMenu/AlterContentMenu/AlterContentMenu";
import { AlterModuleMenu } from "./AlterMenu/AlterModuleMenu/AlterModuleMenu";
export interface MenuManagementContainerProps {}

const MenuManagementContainer: React.FC<MenuManagementContainerProps> = () => {
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
          <CardTitle> مدیریت منو </CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/MenuManagement/${userType}AddMenu`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/MenuManagement/${userType}AddMenu`);
                  }}
                >
                  افزودن منو
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/MenuManagement/${userType}MenuSample`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/MenuManagement/${userType}MenuSample`);
                  }}
                >
                  نمایش منو
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={AddMenu}
                  path="/MenuManagement/AddMenu"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterMenu}
                  path="/MenuManagement/AlterMenu/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddLinkMenu}
                  path="/MenuManagement/AddMenuItem/LinkMenu"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterLinkMenu}
                  path="/MenuManagement/AlterMenuItem/LinkMenu/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddDownloadMenu}
                  path="/MenuManagement/AddMenuItem/DownloadMenu"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterDownloadMenu}
                  path="/MenuManagement/AlterMenuItem/DownloadMenu/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddContentMenu}
                  path="/MenuManagement/AddMenuItem/ContentMenu"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterContentMenu}
                  path="/MenuManagement/AlterMenuItem/ContentMenu/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddModuleMenu}
                  path="/MenuManagement/AddMenuItem/ModuleMenu"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterModuleMenu}
                  path="/MenuManagement/AlterMenuItem/ModuleMenu/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={MenuSample}
                  path="/MenuManagement/MenuSample"
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

export { MenuManagementContainer };
