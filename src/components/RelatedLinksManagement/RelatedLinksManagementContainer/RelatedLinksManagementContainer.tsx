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
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { RelatedLinksList } from "./RelatedLinksList/RelatedLinksList";
import { AddRelatedLink } from "./AddRelatedLink/AddRelatedLink";
import { AlterRelatedLink } from "./AlterRelatedLink/AlterRelatedLink";
export interface RelatedLinksManagementContainerProps {}

const RelatedLinksManagementContainer: React.FC<RelatedLinksManagementContainerProps> =
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
            <CardTitle> مدیریت لینک های مرتبط </CardTitle>
          </CardHeader>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/RelatedLinksManagement/${userType}RelatedLinksList`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/RelatedLinksManagement/${userType}RelatedLinksList`
                      );
                    }}
                  >
                    نمایش لینک های مرتبط
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/RelatedLinksManagement/${userType}AddRelatedLink`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/RelatedLinksManagement/${userType}AddRelatedLink`
                      );
                    }}
                  >
                    افزودن لینک مرتبط
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50" activeTab={toggle}>
                <Switch>
                  <SimpleProtectedRoute
                    component={RelatedLinksList}
                    path="/RelatedLinksManagement/RelatedLinksList"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AddRelatedLink}
                    path="/RelatedLinksManagement/AddRelatedLink"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={AlterRelatedLink}
                    path="/RelatedLinksManagement/AlterRelatedLink/:id"
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

export { RelatedLinksManagementContainer };
