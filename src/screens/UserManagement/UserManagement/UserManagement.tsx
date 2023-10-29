import * as React from "react";

import { UserManagementContainer } from "../../../components/UserManagement/UserManagementContainer/UserManagementContainer";
export interface UserManagementProps {}

const UserManagement: React.FC<UserManagementProps> = () => {
  return (
    <>
      <UserManagementContainer />
    </>
  );
};

export { UserManagement };
