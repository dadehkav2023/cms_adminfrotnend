import * as React from "react";

import { MenuManagementContainer } from "../../../components/MenuManagement/MenuManagementContainer/MenuManagementContainer";
export interface MenuManagementProps {}

const MenuManagement: React.FC<MenuManagementProps> = () => {
  return (
    <>
      <MenuManagementContainer />
    </>
  );
};

export { MenuManagement };
