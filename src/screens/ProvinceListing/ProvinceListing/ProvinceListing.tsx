import * as React from "react";

import { ProvinceListingContainer } from "../../../components/ProvinceListing/ProvinceListingContainer/ProvinceListingContainer";
export interface ProvinceListingProps {}

const ProvinceListing: React.FC<ProvinceListingProps> = () => {
  return (
    <>
      <ProvinceListingContainer />
    </>
  );
};

export { ProvinceListing };
