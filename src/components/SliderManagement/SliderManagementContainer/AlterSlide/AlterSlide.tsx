import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
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
import Styles from "./AlterSlide.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { UseGetSlides } from "../../../../core/services/api/get-slides.api";
import { EditSlideValidation } from "../../../../core/validations/edit-slide.validations";
import { showToast } from "../../../../core/utils";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { UseEditSlide } from "../../../../core/services/api/edit-slide.api";
import { useParams } from "react-router";
import { UseDeleteSlide } from "../../../../core/services/api/delete-slide.api";
import { Link, Redirect } from "react-router-dom";
import { DeleteSlideModal } from "../DeleteSlideModal/DeleteSlideModal";

export interface AlterSlideProps {}

const AlterSlide: React.FC<AlterSlideProps> = () => {
  const MOCK_SLIDE = {
    id: 11,
    title: "test",
    description: "tozih",
    imagePath:
      "Resources\\images\\2021\\2021-10\\ebd5512a-ebae-4c33-8f51-9ef4c60143a8slid1.jpg",
    linkAddress: "link",
    sortOrder: 2,
    canShow: false,
    startDateTimeShow: "1400-08-03T00:00:00",
    endDateTimeShow: "1400-08-03T00:00:00",
  };
  const [initialValues, setInitialValues] = useState({
    Title: MOCK_SLIDE.title ? MOCK_SLIDE.title : "",
    CanShow:
      MOCK_SLIDE.canShow !== null
        ? MOCK_SLIDE.canShow
          ? { value: 1, label: "بله" }
          : { value: 2, label: "خیر" }
        : "",
    StartDateTimeShow: MOCK_SLIDE.startDateTimeShow
      ? MOCK_SLIDE.startDateTimeShow
      : "",
    EndDateTimeShow: MOCK_SLIDE.endDateTimeShow
      ? MOCK_SLIDE.endDateTimeShow
      : "",
    LinkAddress: MOCK_SLIDE.linkAddress ? MOCK_SLIDE.linkAddress : "",
    SortOrder:
      MOCK_SLIDE.sortOrder !== null
        ? MOCK_SLIDE.sortOrder
          ? { value: MOCK_SLIDE.sortOrder, label: MOCK_SLIDE.sortOrder }
          : { value: 2, label: "خیر" }
        : "",

    Description: MOCK_SLIDE.description ? MOCK_SLIDE.description : "",
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetSlides();
  const {
    data: getAllData,
    isError: getAllIsError,
    isLoading: getAllIsLoading,
    isSuccess: getAllIsSuccess,
    mutate: getAllMutate,
  } = UseGetSlides();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditSlide();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteSlide();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
    getAllMutate({
      page: 1,
      pageSize: 5000,
    });
  }, []);
  useEffect(() => {
    if (getData?.data.result.sliderList[0]) {
      setInitialValues({
        Title: getData?.data.result.sliderList[0].title
          ? getData?.data.result.sliderList[0].title
          : "",
        CanShow:
          getData?.data.result.sliderList[0].canShow !== null
            ? getData?.data.result.sliderList[0].canShow
              ? { value: 1, label: "بله" }
              : { value: 2, label: "خیر" }
            : "",
        StartDateTimeShow: getData?.data.result.sliderList[0].startDateTimeShow
          ? getData?.data.result.sliderList[0].startDateTimeShow
          : "",
        EndDateTimeShow: getData?.data.result.sliderList[0].endDateTimeShow
          ? getData?.data.result.sliderList[0].endDateTimeShow
          : "",
        LinkAddress: getData?.data.result.sliderList[0].linkAddress
          ? getData?.data.result.sliderList[0].linkAddress
          : "",
        SortOrder:
          getData?.data.result.sliderList[0].sortOrder !== null
            ? getData?.data.result.sliderList[0].sortOrder
              ? {
                  value: getData?.data.result.sliderList[0].sortOrder,
                  label: getData?.data.result.sliderList[0].sortOrder,
                }
              : { value: 2, label: "خیر" }
            : "",

        Description: getData?.data.result.sliderList[0].description
          ? getData?.data.result.sliderList[0].description
          : "",
      });
    }
  }, [getIsSuccess]);
  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      SliderFile: values.SliderFile ? values.SliderFile[0] : null,
      Id: id,
      CanShow: values.CanShow.value === 1 ? true : false,
      SortOrder: values.SortOrder.value,
      StartShowDate: values.StartDateTimeShow,
      EndShowDate: values.EndDateTimeShow,
    });
  };

  if (!getData?.data.result.sliderList[0] && (getIsSuccess || getIsError)) {
    showToast(["اسلاید مورد نظر یافت نشد"], "error");
  }
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  return getIsLoading ||
    !getIsSuccess ||
    editIsLoading ||
    getAllIsLoading ||
    deleteIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.sliderList[0] && (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/SliderManagement/SlidesList" />
      <Link to="/SliderManagement/SlidesList">
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
      <DeleteSlideModal
        isOpen={deleteIsOpen}
        modalToggled={() => {
          setDeleteIsOpen(!deleteIsOpen);
        }}
        id={id}
        loading={deleteIsLoading}
        mutate={() => {
          deleteMutate({ Id: id });
        }}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditSlideValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش اسلاید جدید مشاهده و مدیریت کنید
                </Alert>
                <FormDivider textHeader="مشاهده و مدیریت اسلاید">
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
                              Array(
                                getAllData?.data.result.sliderList.length
                              ).keys()
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
                  <div className={Styles.logoBox}>
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                        getData?.data.result.sliderList[0].imagePath
                          ? correctUploadPath(
                              getData?.data.result.sliderList[0].imagePath
                            )
                          : "https://logo.com"
                      }`}
                      alt="current-logo"
                    />
                    <p>عکس فعلی اسلاید</p>
                  </div>
                  <DropZone
                    lableText="عکس اسلاید"
                    name="SliderFile"
                    significant
                    placeholder="فایل عکس مورد نظر را کشیده و در این مکان قرار دهید"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg"
                  />
                </FormDivider>
                <TwoColumn>
                  <div className={Styles.firstCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      type="submit"
                      className="mb-1"
                      outLine
                      btnText="ویرایش اسلاید"
                    />
                  </div>
                  <div className={Styles.secondCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      onCLick={() => {
                        setDeleteIsOpen(true);
                      }}
                      type="button"
                      className="mb-1"
                      outLine
                      btnText="حذف اسلاید"
                    />
                  </div>
                </TwoColumn>
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AlterSlide };
