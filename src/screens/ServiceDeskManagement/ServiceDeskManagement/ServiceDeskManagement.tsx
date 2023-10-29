import * as React from "react";

import { ServiceDeskManagementContainer } from "../../../components/ServiceDeskManagement/ServiceDeskManagementContainer/ServiceDeskManagementContainer";
export interface ServiceDeskManagementProps {}

const ServiceDeskManagement: React.FC<ServiceDeskManagementProps> = () => {
  return (
    <>
      <ServiceDeskManagementContainer />
    </>
  );
};

export { ServiceDeskManagement };
