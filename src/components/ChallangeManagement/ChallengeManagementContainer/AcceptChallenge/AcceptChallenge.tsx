import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  SimpleSubmitButton,
  TextInput,
  ModernDatePicker,
  MultiSelectOption,
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AcceptChallenge.module.scss";
import TreeColumn from "../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { FieldWrapper } from "../../../common/Form";
import { useParams } from "react-router";
import { Link, Redirect, useHistory } from "react-router-dom";
import RichTextEditor from "../../../common/Form/RichTextEditor/RichTextEditor";
import { UseGetChallengeDetails } from "../../../../core/services/api/get-challenge-details.api";
import { UseGetChallengeAttachments } from "../../../../core/services/api/get-challenge-attachments.api";
import { UseGetProvinces } from "../../../../core/services/api/get-provinces.api";
import { UseGetUsageTypes } from "../../../../core/services/api/get-usage-types.api";
import { UseAcceptChallenge } from "../../../../core/services/api/accept-challenge";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";

export interface AcceptChallengeProps {}

const AcceptChallenge: React.FC<AcceptChallengeProps> = () => {
  const { userInfo } = useUserAuth();

  const history = useHistory();
  const {
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    isLoading: getIsLoading,
    mutate: getMutate,
  } = UseGetChallengeDetails();

  const {
    data: provincesData,
    isSuccess: provincesIsSuccess,
    isError: provincesIsError,
    isLoading: provincesIsLoading,
    mutate: provincesMutate,
  } = UseGetProvinces();

  const {
    data: usageTypesData,
    isSuccess: usageTypesIsSuccess,
    isError: usageTypesIsError,
    isLoading: usageTypesIsLoading,
    mutate: usageTypesMutate,
  } = UseGetUsageTypes();

  const {
    data: getAttachmentData,
    isSuccess: getAttachmentIsSuccess,
    isError: getAttachmentIsError,
    isLoading: getAttachmentIsLoading,
    mutate: getAttachmentMutate,
  } = UseGetChallengeAttachments();

  const {
    data: acceptData,
    isSuccess: acceptIsSuccess,
    isError: acceptIsError,
    isLoading: acceptIsLoading,
    mutate: acceptMutate,
  } = UseAcceptChallenge();

  const [initialValues, setInitialValues] = useState<{
    startDate: string;
    endDate: string;
    description: string;
    behalf: string;
    provinceIds: any[];
    usageTypeIds: any[];
  }>({
    startDate: "",
    endDate: "",
    description: "",
    behalf: "",
    provinceIds: [],
    usageTypeIds: [],
  });

  const { id } = useParams<{ id: any }>();

  const onSubmit = (values: any) => {
    acceptMutate({
      farmerVoiceId: id,
      provinceId: +process.env.REACT_APP_PROVINCE_ID,
      userId: userInfo.localId,
      description: values.description,
    });
  };

  useEffect(() => {
    getMutate({ Id: id });
    getAttachmentMutate({ Id: id, page: 1, pageSize: 1 });
  }, []);

  useEffect(() => {
    if (getData?.data.result.id) {
      setInitialValues({
        ...initialValues,
        startDate: getData?.data.result.startDateTimeShowAsJalali,
        endDate: getData?.data.result.endDateTimeShowAsJalali,
        description: getData?.data.result.draftDescription,
      });
    }
  }, [getIsSuccess]);

  useEffect(() => {
    acceptIsSuccess && history.push("/ChallengeManagement/ChallengesList");
  }, [acceptData]);

  return getIsLoading ||
    acceptIsLoading ||
    !getIsSuccess ||
    getAttachmentIsLoading ||
    provincesIsLoading ||
    usageTypesIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.id && (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/ChallengeManagement/ChallengesList" />
      <Link to="/ChallengeManagement/ChallengesList">
        <div className={Styles.buttonDiv}>
          <SimpleSubmitButton
            isLoading={false}
            type="submit"
            className="mb-1"
            outLine
            btnText="بازگشت به خانه"
          />
        </div>
      </Link>
    </div>
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <TwoColumn>
                  <TwoColumn>
                    <div style={{ textAlign: "center" }}>
                      <h2>تیتر چالش :</h2>
                    </div>
                    <div>
                      <h3>{getData?.data.result.title}</h3>
                    </div>
                  </TwoColumn>
                  <TwoColumn>
                    <div style={{ textAlign: "center" }}>
                      <h2>ثبت شده از طرف :</h2>
                    </div>
                    <div>
                      <h3>
                        {getData?.data.result.authorFirstName +
                          " " +
                          getData?.data.result.authorLastName}
                      </h3>
                    </div>
                  </TwoColumn>
                </TwoColumn>
                <hr />
                <TreeColumn>
                  <div>
                    <TextInput
                      lableText="از طرف"
                      name="behalf"
                      significant
                      placeholder="از طرف"
                    />
                  </div>
                  <div></div>
                  <div></div>
                </TreeColumn>
                <RichTextEditor
                  data={initialValues.description}
                  name="description"
                  significant={true}
                  title="توضیحات چالش"
                />

                <SimpleSubmitButton
                  style={{ marginTop: "20px" }}
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="تایید چالش"
                />
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AcceptChallenge };
