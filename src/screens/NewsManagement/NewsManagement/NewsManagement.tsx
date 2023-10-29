import * as React from "react";

import { NewsManagementContainer } from "../../../components/NewsManagement/NewsManagementContainer/NewsManagementContainer";
export interface NewsManagementProps {}

const NewsManagement: React.FC<NewsManagementProps> = () => {
  return (
    <>
      <NewsManagementContainer />
    </>
  );
};

export { NewsManagement };
