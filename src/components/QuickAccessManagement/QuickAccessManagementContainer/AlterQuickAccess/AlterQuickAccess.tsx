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
import Styles from "./AlterQuickAccess.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { DeleteQuickAccessModal } from "../DeleteQuickAccess/DeleteQuickAccessModal";
import { UseGetQuickAccess } from "../../../../core/services/api/get-quick-access.api";
import { UseEditQuickAccess } from "../../../../core/services/api/edit-quick-access.api";
import { UseDeleteQuickAccess } from "../../../../core/services/api/delete-quick-access.api";
import { QuickAccessValidate } from "../../../../core/validations/quick-access.validations";

export interface AlterQuickAccessProps {}

const AlterQuickAccess: React.FC<AlterQuickAccessProps> = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    isActive: { value: 2, label: "خیر" },
    link: "",
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetQuickAccess();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditQuickAccess();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteQuickAccess();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
  }, []);
  useEffect(() => {
    if (getData?.data.result.quickAccessList[0]) {
      setInitialValues({
        title: getData?.data.result.quickAccessList[0].title
          ? getData?.data.result.quickAccessList[0].title
          : "",
        isActive:
          getData?.data.result.quickAccessList[0].isActive !== null
            ? getData?.data.result.quickAccessList[0].isActive
              ? { value: 1, label: "بله" }
              : { value: 2, label: "خیر" }
            : "",

        link: getData?.data.result.quickAccessList[0].link
          ? getData?.data.result.quickAccessList[0].link
          : "",
      });
    }
  }, [getIsSuccess]);
  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      id: id,
      isActive: values.isActive.value === 1 ? true : false,
    });
  };

  if (
    !getData?.data.result.quickAccessList[0] &&
    (getIsSuccess || getIsError)
  ) {
    showToast(["دسترسی سریع مورد نظر یافت نشد"], "error");
  }
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  return getIsLoading || !getIsSuccess || editIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.quickAccessList[0] &&
    (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/QuickAccessManagement/QuickAccessList" />
      <Link to="/QuickAccessManagement/QuickAccessList">
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
      <DeleteQuickAccessModal
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
        validationSchema={QuickAccessValidate}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش دسترسی سریع را مشاهده و مدیریت
                  کنید
                </Alert>
                <FormDivider textHeader="مشاهده و مدیریت دسترسی سریع">
                  <TwoColumn>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="تیتر دسترسی سریع"
                        name="title"
                        significant
                        placeholder="تیتر دسترسی سریع"
                      />
                      <BasicSelectOption
                        lableText="فعال است"
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
                <TwoColumn>
                  <div className={Styles.firstCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      type="submit"
                      className="mb-1"
                      outLine
                      btnText="ویرایش دسترسی سریع"
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
                      btnText="حذف دسترسی سریع"
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

export { AlterQuickAccess };
