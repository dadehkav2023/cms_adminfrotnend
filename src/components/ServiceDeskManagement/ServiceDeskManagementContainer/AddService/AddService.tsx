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
import Styles from "./AddService.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { UseAddService } from "../../../../core/services/api/add-service.api";
import { AddServiceValidate } from "../../../../core/validations/add-service.validations";

export interface AddServiceProps {}

const AddService: React.FC<AddServiceProps> = () => {
  const [shouldBeLoading, setShouldBeLoading] = useState(false);
  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    mutate: postMutate,
  } = UseAddService();

  const onSubmit = (values: any) => {
    if (values.ImageFile[0].size > 3 * 1000 * 1000) {
      showToast(["سایز عکس باید کمتر از ۳ مگابایت باشد"], "error");
    } else {
      postMutate({
        ...values,
        IsActive: values.IsActive.value === 1 ? true : false,
        ImageFile: values.ImageFile ? values.ImageFile[0] : null,
      });
      setShouldBeLoading(true);
    }
  };
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 0, label: "انتخاب کنید" },
    LinkService: "",
    ImageFile: null,
  });
  return postIsLoading || shouldBeLoading ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={AddServiceValidate}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
            <Form noValidate>
              <Alert color="info">
                شما میتوانید از طریق این بخش خدمت جدید اضافه کنید
              </Alert>
              <FormDivider textHeader="افزودن خدمت">
                <TwoColumn>
                  <div className={Styles.col}>
                    <TextInput
                      lableText="تیتر خدمت"
                      name="Title"
                      significant
                      placeholder="تیتر خدمت"
                    />
                    <BasicSelectOption
                      lableText="نمایش داده شود"
                      significant={false}
                      selectedDefault={{ value: 1, label: "بله" }}
                      name="IsActive"
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
                      name="LinkService"
                      placeholder="لینک مربوطه"
                    />
                  </div>
                </TwoColumn>
                <DropZone
                  lableText="عکس خدمت"
                  name="ImageFile"
                  significant
                  placeholder="فایل عکس مورد نظر را کشیده و در این مکان قرار دهید"
                  isSingle={true}
                  accept="image/jpeg, image/png, image/jpg"
                />
              </FormDivider>
              <SimpleSubmitButton
                isLoading={false}
                type="submit"
                className="mb-1"
                outLine
                btnText="افزودن خدمت"
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { AddService };
