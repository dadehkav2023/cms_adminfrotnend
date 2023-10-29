import * as React from 'react';

import { PersonalInfoContainer } from '../../../components/PersonalInformation/PersonalInfoContainer/PersonalInfoContainer';

export interface PersonalInfoProps {
  
}
 
const PersonalInfo: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <PersonalInfoContainer />
    </>
  );
}
 
export {PersonalInfo};