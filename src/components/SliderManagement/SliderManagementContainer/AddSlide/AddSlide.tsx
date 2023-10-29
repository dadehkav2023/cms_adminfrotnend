import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
  ModernDatePicker,
} from "../../../common/Form";
import { TextArea } from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AddSlide.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { UseGetSlides } from "../../../../core/services/api/get-slides.api";
import { AddSlideValidation } from "../../../../core/validations/add-slide.validations";
import { UseAddSlide } from "../../../../core/services/api/add-slide.api";
import { showToast } from "../../../../core/utils";

export interface AddSlideProps {}

const AddSlide: React.FC<AddSlideProps> = () => {
  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetSlides();

  const [shouldBeLoading, setShouldBeLoading] = useState(false);
  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    mutate: postMutate,
  } = UseAddSlide();

  useEffect(() => {
    getMutate({
      page: 1,
      pageSize: 5000,
    });
  }, []);
  const onSubmit = (values: any) => {
    if (values.SliderFile[0].size > 3 * 1000 * 1000) {
      showToast(["سایز عکس باید کمتر از ۳ مگابایت باشد"], "error");
    } else {
      postMutate({
        ...values,
        CanShow: values.CanShow.value === 1 ? true : false,
        SortOrder: values.SortOrder.value,
        StartShowDate: values.StartDateTimeShow,
        EndShowDate: values.EndDateTimeShow,
      });
      setShouldBeLoading(true);
    }
  };
  const [initialValues, setInitialValues] = useState({
    Title: "",
    CanShow: { value: 0, label: "انتخاب کنید" },
    StartDateTimeShow: "",
    EndDateTimeShow: "",
    LinkAddress: "",
    SortOrder: { value: 0, label: "انتخاب کنید" },
    Description: "",
    SliderFile: null,
  });
  return getIsLoading || !getIsSuccess || postIsLoading || shouldBeLoading ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={AddSlideValidation}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
            <Form noValidate>
              <Alert color="info">
                شما میتوانید از طریق این بخش اسلاید جدید اضافه کنید
              </Alert>
              <FormDivider textHeader="افزودن اسلاید">
                <TwoColumn>
                  <div className={Styles.col}>
                    <TextInput
                      lableText="تیتر اسلاید"
                      name="Title"
                      significant
                      placeholder="تیتر اسلاید"
                    />
                    <ModernDatePicker
                      lableText="تاریخ شروع نمایش"
                      name="StartDateTimeShow"
                      placeholder="تاریخ شروع نمایش"
                      initialValue={initialValues.StartDateTimeShow}
                      hasMaximum={false}
                    />
                    <BasicSelectOption
                      lableText="نمایش داده شود"
                      significant={false}
                      selectedDefault={{ value: 1, label: "بله" }}
                      name="CanShow"
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
                      name="LinkAddress"
                      placeholder="لینک مربوطه"
                    />
                    <ModernDatePicker
                      lableText="تاریخ پایان نمایش"
                      name="EndDateTimeShow"
                      placeholder="تاریخ پایان نمایش"
                      initialValue={initialValues.EndDateTimeShow}
                      hasMaximum={false}
                    />
                    <BasicSelectOption
                      lableText="اولویت نمایش"
                      significant={false}
                      selectedDefault={{
                        value: 1,
                        label: 1,
                      }}
                      name="SortOrder"
                      data={[
                        {
                          label: "انتخاب کنید",
                          options: Array.from(
                            Array(getData?.data.result.totalCount + 1).keys()
                          ).map((num) => ({
                            value: num + 1,
                            label: num + 1,
                          })),
                        },
                      ]}
                    />
                  </div>
                </TwoColumn>
                <TextArea
                  lableText="توضیحات اسلاید"
                  name="Description"
                  placeholder="توضیحات اسلاید"
                  significant
                />
                <DropZone
                  lableText="عکس اسلاید"
                  name="SliderFile"
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
                btnText="افزودن اسلاید"
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { AddSlide };
