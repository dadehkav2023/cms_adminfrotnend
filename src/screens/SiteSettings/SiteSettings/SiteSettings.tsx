import * as React from "react";

import { SiteSettingsContainer } from "../../../components/SiteSettings/SiteSettingsContainer/SiteSettingsContainer";
export interface SiteSettingsProps {}

const SiteSettings: React.FC<SiteSettingsProps> = () => {
  return (
    <>
      <SiteSettingsContainer />
    </>
  );
};

export { SiteSettings };
