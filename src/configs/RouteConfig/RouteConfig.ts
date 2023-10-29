import { lazy } from "react";
import { IAuthenticatedRoute } from ".";
import { UserRoles } from "../../core/enums";

export const AuthenticatedRoutesConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/",
    component: lazy(() =>
      import("../../screens/Dashboard/Dashboard").then((module) => ({
        default: module.Dashboard,
      }))
    ),
    exact: true,
    roles: ["UserReal"],
  },
  {
    path: "/SiteSettings",
    component: lazy(() =>
      import("../../screens/SiteSettings/SiteSettings/SiteSettings").then(
        (module) => ({
          default: module.SiteSettings,
        })
      )
    ),
    exact: false,
    roles: ["CmsSetting"],
  },
  {
    path: "/UserManagement",
    component: lazy(() =>
      import("../../screens/UserManagement/UserManagement/UserManagement").then(
        (module) => ({
          default: module.UserManagement,
        })
      )
    ),
    exact: false,
    roles: ["UserManagement"],
  },
  {
    path: "/SliderManagement",
    component: lazy(() =>
      import(
        "../../screens/SliderManagement/SliderManagement/SliderManagement"
      ).then((module) => ({
        default: module.SliderManagement,
      }))
    ),
    exact: false,
    roles: ["Slider"],
  },
  {
    path: "/ServiceDeskManagement",
    component: lazy(() =>
      import(
        "../../screens/ServiceDeskManagement/ServiceDeskManagement/ServiceDeskManagement"
      ).then((module) => ({
        default: module.ServiceDeskManagement,
      }))
    ),
    exact: false,
    roles: ["ServiceDesk"],
  },
  {
    path: "/QuickAccessManagement",
    component: lazy(() =>
      import(
        "../../screens/QuickAccessManagement/QuickAccessManagement/QuickAccessManagement"
      ).then((module) => ({
        default: module.QuickAccessManagement,
      }))
    ),
    exact: false,
    roles: ["QuickAccess"],
  },
  {
    path: "/RelatedLinksManagement",
    component: lazy(() =>
      import(
        "../../screens/RelatedLinksManagement/RelatedLinksManagement/RelatedLinksManagement"
      ).then((module) => ({
        default: module.RelatedLinksManagement,
      }))
    ),
    exact: false,
    roles: ["RelatedLink"],
  },
  {
    path: "/NewsManagement",
    component: lazy(() =>
      import("../../screens/NewsManagement/NewsManagement/NewsManagement").then(
        (module) => ({
          default: module.NewsManagement,
        })
      )
    ),
    exact: false,
    roles: ["TextNews", "ImageNews", "VideoNews"],
  },
  {
    path: "/MenuManagement",
    component: lazy(() =>
      import("../../screens/MenuManagement/MenuManagement/MenuManagement").then(
        (module) => ({
          default: module.MenuManagement,
        })
      )
    ),
    exact: false,
    roles: ["Menu"],
  },
  {
    path: "/StatementManagement",
    component: lazy(() =>
      import(
        "../../screens/StatementManagement/StatementManagement/StatementManagement"
      ).then((module) => ({
        default: module.StatementManagement,
      }))
    ),
    exact: false,
    roles: ["Statement"],
  },
  {
    path: "/ProvinceListing",
    component: lazy(() =>
      import(
        "../../screens/ProvinceListing/ProvinceListing/ProvinceListing"
      ).then((module) => ({
        default: module.ProvinceListing,
      }))
    ),
    exact: false,
    roles: ["Province"],
  },
  {
    path: "/ChallengeManagement",
    component: lazy(() =>
      import(
        "../../screens/ChallengeManagement/ChallengeManagement/ChallengeManagement"
      ).then((module) => ({
        default: module.ChallengeManagement,
      }))
    ),
    exact: false,
    roles: ["Karzar"],
  },
];
