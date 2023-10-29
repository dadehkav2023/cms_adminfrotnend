import React, { useState } from "react";

import { Button } from "reactstrap";
import { DocumentsTable } from "./DocumentsTable";
import { UploadDocuments } from "./UploadDocuments";

import Styled from "./PersonalDocuments.module.scss";
import { SubmitButton } from "../../../common/Form";

export interface PersonalDocumentsProps {}

const PersonalDocuments: React.FC<PersonalDocumentsProps> = () => {
  const [modal, setModal] = useState(false);
  const [refetchFromUpload, setRefetchFromUpload] = useState(false);

  return (
    <>
      <UploadDocuments
        backdrop={true}
        isOpen={modal}
        toggleModal={() => setModal((val) => !val)}
        setRefetchFromUpload={() => setRefetchFromUpload((val) => !val)}
      />

      <div>
        <Button
          color="primary"
          onClick={() => {
            setModal(true);
          }}
        >
          آپلود اسناد{" "}
        </Button>
      </div>

      <DocumentsTable refetchFromUpload={refetchFromUpload} />

      <div className={Styled.navigationButtonContainer}>
        <SubmitButton
          noSubmit
          backTo="/PersonalInfo/JobInfo"
          isLoading={false}
        />
      </div>
    </>
  );
};

export { PersonalDocuments };
