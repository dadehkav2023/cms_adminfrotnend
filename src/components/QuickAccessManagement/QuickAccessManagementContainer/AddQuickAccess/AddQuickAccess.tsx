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
import Styles from "./AddQuickAccess.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { UseAddQuickAccess } from "../../../../core/services/api/add-quick-access.api";
import { QuickAccessValidate } from "../../../../core/validations/quick-access.validations";

export interface AddQuickAccessProps {}

const AddQuickAccess: React.FC<AddQuickAccessProps> = () => {
  const [shouldBeLoading, setShouldBeLoading] = useState(false);
  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    mutate: postMutate,
  } = UseAddQuickAccess();

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
      validationSchema={QuickAccessValidate}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
            <Form noValidate>
              <Alert color="info">
                شما میتوانید از طریق این بخش دسترسی سریع جدید اضافه کنید
              </Alert>
              <FormDivider textHeader="افزودن دسترسی سریع">
                <TwoColumn>
                  <div className={Styles.col}>
                    <TextInput
                      lableText="تیتر دسترسی سریع"
                      name="title"
                      significant
                      placeholder="تیتر دسترسی سریع"
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
                btnText="افزودن دسترسی سریع"
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { AddQuickAccess };
