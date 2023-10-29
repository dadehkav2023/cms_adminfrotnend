import * as React from "react";

import { QuickAccessManagementContainer } from "../../../components/QuickAccessManagement/QuickAccessManagementContainer/QuickAccessManagementContainer";
export interface QuickAccessManagementProps {}

const QuickAccessManagement: React.FC<QuickAccessManagementProps> = () => {
  return (
    <>
      <QuickAccessManagementContainer />
    </>
  );
};

export { QuickAccessManagement };
