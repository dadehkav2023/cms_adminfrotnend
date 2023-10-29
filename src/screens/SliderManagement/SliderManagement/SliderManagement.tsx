import * as React from "react";

import { SliderManagementContainer } from "../../../components/SliderManagement/SliderManagementContainer/SliderManagementContainer";
export interface SliderManagementProps {}

const SliderManagement: React.FC<SliderManagementProps> = () => {
  return (
    <>
      <SliderManagementContainer />
    </>
  );
};

export { SliderManagement };
