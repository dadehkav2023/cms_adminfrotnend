import * as React from "react";

import { ChallengeManagementContainer } from "../../../components/ChallangeManagement/ChallengeManagementContainer";
export interface ChallengeManagementProps {}

const ChallengeManagement: React.FC<ChallengeManagementProps> = () => {
  return (
    <>
      <ChallengeManagementContainer />
    </>
  );
};

export { ChallengeManagement };
