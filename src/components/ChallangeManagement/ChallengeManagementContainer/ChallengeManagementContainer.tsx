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
import { ChallengesList } from "./ChallengesList/ChallengesList";
import { ViewChallenge } from "./ViewChallenge/ViewChallenge";
import { AcceptChallenge } from "./AcceptChallenge/AcceptChallenge";
export interface ChallengeManagementContainerProps {}

const ChallengeManagementContainer: React.FC<
  ChallengeManagementContainerProps
> = () => {
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
          <CardTitle> مدیریت چالش ها </CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/ChallengeManagement/${userType}ChallengesList`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/ChallengeManagement/${userType}ChallengesList`
                    );
                  }}
                >
                  نمایش چالش ها
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={ChallengesList}
                  path="/ChallengeManagement/ChallengesList"
                  exact
                />
                <SimpleProtectedRoute
                  component={ViewChallenge}
                  path="/ChallengeManagement/View/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AcceptChallenge}
                  path="/ChallengeManagement/Accept/:id"
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

export { ChallengeManagementContainer };
