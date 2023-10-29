import React from "react";
import {
  Circle,
  Gift,
  GitPullRequest,
  Home,
  Info,
  Layers,
  MessageSquare,
  Package,
  Settings,
  Users,
  Archive,
  Sliders,
  Slack,
  Clipboard,
  MapPin,
  Bookmark,
  Link,
  Link2,
  Activity,
  Menu,
} from "react-feather";
import { UserRoles } from "../core/enums";

interface ISidebarItem {
  id?: any;
  title?: string;
  icon?: React.ReactNode;
  permissions?: Array<string>;
  path?: string;
  newTab?: boolean;
  children?: any;
}

interface ISidebarItemWithChilde extends ISidebarItem {
  children?: Array<ISidebarItem>;
}
export const NavigationConfig: Array<ISidebarItemWithChilde> = [
  {
    id: "home",
    title: "پیشخوان",
    path: "/",
    permissions: ["UserReal"],
    icon: <Home className="sidebar-icon" size={20} />,
  },
  {
    id: "SiteSettings",
    path: "/SiteSettings",
    title: "تنظیمات سایت",
    icon: <Settings className="sidebar-icon" size={20} />,
    permissions: ["CmsSetting"],
    children: [
      {
        title: "ویرایش تنظیمات",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["CmsSetting"],
        path: "/SiteSettings/SetOptions",
      },
    ],
  },
  {
    id: "UserManagement",
    path: "/UserManagement",
    title: "مدیریت کاربران",
    icon: <Users className="sidebar-icon" size={20} />,
    permissions: ["UserManagement"],
    children: [
      {
        title: "نمایش کاربران",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["UserManagement"],
        path: "/UserManagement/UsersList",
      },
    ],
  },
  {
    id: "SliderManagement",
    path: "/SliderManagement",
    title: "مدیریت اسلایدر",
    icon: <Sliders className="sidebar-icon" size={20} />,
    permissions: ["Slider"],
    children: [
      {
        title: "نمایش اسلاید ها",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Slider"],
        path: "/SliderManagement/SlidesList",
      },
      {
        title: "افزودن اسلاید",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Slider"],
        path: "/SliderManagement/AddSlide",
      },
    ],
  },
  {
    id: "ServiceDeskManagement",
    path: "/ServiceDeskManagement",
    title: "مدیریت خدمات",
    icon: <Slack className="sidebar-icon" size={20} />,
    permissions: ["ServiceDesk"],
    children: [
      {
        title: "نمایش خدمات",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["ServiceDesk"],
        path: "/ServiceDeskManagement/ServicesList",
      },
      {
        title: "افزودن خدمت",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["ServiceDesk"],
        path: "/ServiceDeskManagement/AddService",
      },
    ],
  },
  {
    id: "QuickAccessManagement",
    path: "/QuickAccessManagement",
    title: "مدیریت دسترسی سریع",
    icon: <Bookmark className="sidebar-icon" size={20} />,
    permissions: ["QuickAccess"],
    children: [
      {
        title: "نمایش دسترسی سریع",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["QuickAccess"],
        path: "/QuickAccessManagement/QuickAccessList",
      },
      {
        title: "افزودن دسترسی سریع",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["QuickAccess"],
        path: "/QuickAccessManagement/AddQuickAccess",
      },
    ],
  },
  {
    id: "RelatedLinksManagement",
    path: "/RelatedLinksManagement",
    title: "مدیریت لینک های مرتبط",
    icon: <Link className="sidebar-icon" size={20} />,
    permissions: ["RelatedLink"],
    children: [
      {
        title: "نمایش لینک های مرتبط",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["RelatedLink"],
        path: "/RelatedLinksManagement/RelatedLinksList",
      },
      {
        title: "افزودن لینک های مرتبط",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["RelatedLink"],
        path: "/RelatedLinksManagement/AddRelatedLinks",
      },
    ],
  },
  {
    id: "NewsManagement",
    path: "/NewsManagement",
    title: "مدیریت اخبار",
    icon: <Clipboard className="sidebar-icon" size={20} />,
    permissions: ["TextNews", "ImageNews", "VideoNews"],
    children: [
      {
        title: "افزودن خبر",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["TextNews", "ImageNews", "VideoNews"],
        path: "/NewsManagement/AddNews/TextNews",
      },
      {
        title: "نمایش اخبار",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["TextNews", "ImageNews", "VideoNews"],
        path: "/NewsManagement/NewsList/TextNews",
      },
      {
        title: "مدیریت دسته بندی ها",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["TextNews", "ImageNews", "VideoNews"],
        path: "/NewsManagement/ManageCategories",
      },
    ],
  },
  {
    id: "MenuManagement",
    path: "/MenuManagement",
    title: "مدیریت منو",
    icon: <Menu className="sidebar-icon" size={20} />,
    permissions: ["Menu"],
    children: [
      {
        title: "افزودن منو",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Menu"],
        path: "/MenuManagement/AddMenu",
      },
      {
        title: "نمایش منو",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Menu"],
        path: "/MenuManagement/MenuSample",
      },
    ],
  },
  {
    id: "StatementManagement",
    path: "/StatementManagement",
    title: "مدیریت بیانیه ها",
    icon: <MessageSquare className="sidebar-icon" size={20} />,
    permissions: ["Statement"],
    children: [
      {
        title: "افزودن بیانیه",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Statement"],
        path: "/StatementManagement/AddStatement",
      },
      {
        title: "نمایش بیانیه ها",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Statement"],
        path: "/StatementManagement/StatementList",
      },
      {
        title: "مدیریت دسته بندی ها",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Statement"],
        path: "/StatementManagement/ManageCategories",
      },
    ],
  },
  {
    id: "ProvinceListing",
    path: "/ProvinceListing",
    title: "استان های فعال",
    icon: <MapPin className="sidebar-icon" size={20} />,
    permissions: ["Province"],
    children: [
      {
        title: "لیست استان های فعال",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Province"],
        path: "/ProvinceListing/ActiveProvinces",
      },
      {
        title: "افزودن استان به نقشه",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Province"],
        path: "/ProvinceListing/AddProvince",
      },
    ],
  },
  {
    id: "ChallengeManagement",
    path: "/ChallengeManagement",
    title: " صدای کشاورز",
    icon: <Activity className="sidebar-icon" size={20} />,
    permissions: ["Karzar"],
    children: [
      {
        title: "نمایش چالش ها",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: ["Karzar"],
        path: "/ChallengeManagement/ChallengesList",
      },
    ],
  },
];

export const navigationDetail = [
  {
    active: "/ManageLicense/UnionManager/MyCartable",
    for: ["/ManageLicense/UnionManager/DetailsRequest/"],
  },
];
