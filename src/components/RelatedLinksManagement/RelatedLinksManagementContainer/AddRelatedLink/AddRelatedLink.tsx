import React, { useState } from "react";
import { Alert } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AddRelatedLink.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { UseAddRelatedLink } from "../../../../core/services/api/add-related-link.api";
import { RelatedLinksValidate } from "../../../../core/validations/related-links.validations";

export interface AddRelatedLinkProps {}

const AddRelatedLink: React.FC<AddRelatedLinkProps> = () => {
  const [shouldBeLoading, setShouldBeLoading] = useState(false);
  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    mutate: postMutate,
  } = UseAddRelatedLink();

  const onSubmit = (values: any) => {
    postMutate({
      ...values,
      isActive: values.isActive.value === 1 ? true : false,
    });
  };
  const [initialValues, setInitialValues] = useState({
    title: "",
    isActive: { value: 0, label: "انتخاب کنید" },
    link: "",
  });
  return postIsLoading || shouldBeLoading ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={RelatedLinksValidate}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
            <Form noValidate>
              <Alert color="info">
                شما میتوانید از طریق این بخش لینک مرتبط جدید اضافه کنید
              </Alert>
              <FormDivider textHeader="افزودن لینک مرتبط">
                <TwoColumn>
                  <div className={Styles.col}>
                    <TextInput
                      lableText="تیتر لینک مرتبط"
                      name="title"
                      significant
                      placeholder="تیتر لینک مرتبط"
                    />
                    <BasicSelectOption
                      lableText="نمایش داده شود"
                      significant={false}
                      selectedDefault={{ value: 1, label: "بله" }}
                      name="isActive"
                      data={[
                        {
                          label: "انتخاب کنید",
                          options: [
                            { value: 1, label: "بله" },
                            { value: 2, label: "خیر" },
                          ],
                        },
                      ]}
                    />
                  </div>
                  <div className={Styles.col}>
                    <TextInput
                      lableText="لینک مربوطه"
                      name="link"
                      placeholder="لینک مربوطه"
                    />
                  </div>
                </TwoColumn>
              </FormDivider>
              <SimpleSubmitButton
                isLoading={false}
                type="submit"
                className="mb-1"
                outLine
                btnText="افزودن لینک مرتبط"
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { AddRelatedLink };
