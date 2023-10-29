import React, { useEffect, useState } from "react";
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
import Styles from "./AlterService.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { UseGetServices } from "../../../../core/services/api/get-services.api";
import { UseEditService } from "../../../../core/services/api/edit-service.api";
import { UseDeleteService } from "../../../../core/services/api/delete-service.api";
import { DeleteServiceModal } from "../DeleteServiceModal/DeleteServiceModal";
import { EditServiceValidate } from "../../../../core/validations/edit-service.validations";

export interface AlterServiceProps {}

const AlterService: React.FC<AlterServiceProps> = () => {
  const MOCK_SERVICE = {
    id: 11,
    title: "test",
    imagePath:
      "Resources\\images\\2021\\2021-10\\ebd5512a-ebae-4c33-8f51-9ef4c60143a8slid1.jpg",
    linkService: "link",
    isActive: false,
  };
  const [initialValues, setInitialValues] = useState({
    Title: MOCK_SERVICE.title ? MOCK_SERVICE.title : "",
    IsActive:
      MOCK_SERVICE.isActive !== null
        ? MOCK_SERVICE.isActive
          ? { value: 1, label: "بله" }
          : { value: 2, label: "خیر" }
        : "",
    LinkService: MOCK_SERVICE.linkService ? MOCK_SERVICE.linkService : "",
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetServices();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditService();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteService();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
  }, []);
  useEffect(() => {
    if (getData?.data.result.serviceDeskList[0]) {
      setInitialValues({
        Title: getData?.data.result.serviceDeskList[0].title
          ? getData?.data.result.serviceDeskList[0].title
          : "",
        IsActive:
          getData?.data.result.serviceDeskList[0].isActive !== null
            ? getData?.data.result.serviceDeskList[0].isActive
              ? { value: 1, label: "بله" }
              : { value: 2, label: "خیر" }
            : "",

        LinkService: getData?.data.result.serviceDeskList[0].linkService
          ? getData?.data.result.serviceDeskList[0].linkService
          : "",
      });
    }
  }, [getIsSuccess]);
  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      ImageFile: values.ImageFile ? values.ImageFile[0] : null,
      Id: id,
      IsActive: values.IsActive.value === 1 ? true : false,
    });
  };

  if (
    !getData?.data.result.serviceDeskList[0] &&
    (getIsSuccess || getIsError)
  ) {
    showToast(["خدمت مورد نظر یافت نشد"], "error");
  }
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  return getIsLoading || !getIsSuccess || editIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.serviceDeskList[0] &&
    (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/ServiceDeskManagement/ServicesList" />
      <Link to="/ServiceDeskManagement/ServicesList">
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
      <DeleteServiceModal
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
        validationSchema={EditServiceValidate}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش خدمات را مشاهده و مدیریت کنید
                </Alert>
                <FormDivider textHeader="مشاهده و مدیریت خدمت">
                  <TwoColumn>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="تیتر خدمت"
                        name="Title"
                        significant
                        placeholder="تیتر خدمت"
                      />
                      <BasicSelectOption
                        lableText="فعال است"
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
                      <DropZone
                        lableText="عکس خدمت"
                        name="ImageFile"
                        significant
                        placeholder="فایل عکس مورد نظر را کشیده و در این مکان قرار دهید"
                        isSingle={true}
                        accept="image/jpeg, image/png, image/jpg"
                      />
                    </div>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="لینک مربوطه"
                        name="LinkService"
                        placeholder="لینک مربوطه"
                      />
                      <div className={Styles.logoBox}>
                        <img
                          src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                            getData?.data.result.serviceDeskList[0].imagePath
                              ? correctUploadPath(
                                  getData?.data.result.serviceDeskList[0]
                                    .imagePath
                                )
                              : "https://logo.com"
                          }`}
                          alt="current-logo"
                        />
                        <p>عکس فعلی خدمت</p>
                      </div>
                    </div>
                  </TwoColumn>
                </FormDivider>
                <TwoColumn>
                  <div className={Styles.firstCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      type="submit"
                      className="mb-1"
                      outLine
                      btnText="ویرایش خدمت"
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
                      btnText="حذف خدمت"
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

export { AlterService };
