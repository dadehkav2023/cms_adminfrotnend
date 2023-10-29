import * as React from "react";

import { StatementManagementContainer } from "../../../components/StatementManagement/StatementManagementContainer/StatementManagementContainer";
export interface StatementManagementProps {}

const StatementManagement: React.FC<StatementManagementProps> = () => {
  return (
    <>
      <StatementManagementContainer />
    </>
  );
};

export { StatementManagement };
