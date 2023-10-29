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
import { TextNewsList } from "./NewsList/TextNewsList/TextNewsList";
import { AlterTextNews } from "./AlterNews/AlterTextNews/AlterTextNews";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ManageCategories } from "./ManageCategories/ManageCategories";
import { PhotoNewsList } from "./NewsList/PhotoNewsList/PhotoNewsList";
import { VideoNewsList } from "./NewsList/VideoNewsList/VideoNewsList";
import { AlterPhotoNews } from "./AlterNews/AlterPhotoNews/AlterPhotoNews";
import { AlterVideoNews } from "./AlterNews/AlterVideoNews/AlterVideoNews";
import { AddTextNews } from "./AddNews/AddTextNews/AddTextNews";
import { AddPhotoNews } from "./AddNews/AddPhotoNews/AddPhotoNews";
import { AddVideoNews } from "./AddNews/AddVideoNews/AddVideoNews";
export interface NewsManagementContainerProps {}

const NewsManagementContainer: React.FC<NewsManagementContainerProps> = () => {
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
                      `/NewsManagement/${userType}AddNews/TextNews`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/NewsManagement/${userType}AddNews/TextNews`);
                  }}
                >
                  افزودن خبر
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/NewsManagement/${userType}NewsList/TextNews`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/NewsManagement/${userType}NewsList/TextNews`
                    );
                  }}
                >
                  نمایش اخبار
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/NewsManagement/${userType}ManageCategories`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/NewsManagement/${userType}ManageCategories`);
                  }}
                >
                  مدیریت دسته بندی ها
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={TextNewsList}
                  path="/NewsManagement/NewsList/TextNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={PhotoNewsList}
                  path="/NewsManagement/NewsList/PhotoNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={VideoNewsList}
                  path="/NewsManagement/NewsList/VideoNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddTextNews}
                  path="/NewsManagement/AddNews/TextNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddPhotoNews}
                  path="/NewsManagement/AddNews/PhotoNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={AddVideoNews}
                  path="/NewsManagement/AddNews/VideoNews"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterTextNews}
                  path="/NewsManagement/AlterNews/TextNews/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterPhotoNews}
                  path="/NewsManagement/AlterNews/PhotoNews/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={AlterVideoNews}
                  path="/NewsManagement/AlterNews/VideoNews/:id"
                  exact
                />
                <SimpleProtectedRoute
                  component={ManageCategories}
                  path="/NewsManagement/ManageCategories"
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

export { NewsManagementContainer };
