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
import { SetOptions } from "./SetOptions/SetOptions";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
export interface SiteSettingsContainerProps {}

const SiteSettingsContainer: React.FC<SiteSettingsContainerProps> = () => {
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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> تنظیمات سایت </CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              {userInfo.roles.includes("CmsSetting") && (
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/SiteSettings/${userType}SetOptions`
                      ),
                    })}
                    onClick={() => {
                      history.push(`/SiteSettings/${userType}SetOptions`);
                    }}
                  >
                    ویرایش تنظیمات
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={SetOptions}
                  path="/SiteSettings/SetOptions"
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

export { SiteSettingsContainer };
