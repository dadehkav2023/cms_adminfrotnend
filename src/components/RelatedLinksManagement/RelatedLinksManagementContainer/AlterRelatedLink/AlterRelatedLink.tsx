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
import Styles from "./AlterRelatedLink.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { DeleteRelatedLinkModal } from "../DeleteRelatedLink/DeleteRelatedLinkModal";
import { UseGetRelatedLinks } from "../../../../core/services/api/get-related-links.api";
import { UseEditRelatedLink } from "../../../../core/services/api/edit-related-link.api";
import { UseDeleteRelatedLink } from "../../../../core/services/api/delete-related-link.api";
import { RelatedLinksValidate } from "../../../../core/validations/related-links.validations";

export interface AlterRelatedLinkProps {}

const AlterRelatedLink: React.FC<AlterRelatedLinkProps> = () => {
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
  } = UseGetRelatedLinks();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditRelatedLink();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteRelatedLink();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
  }, []);
  useEffect(() => {
    if (getData?.data.result.relatedLinkList[0]) {
      setInitialValues({
        title: getData?.data.result.relatedLinkList[0].title
          ? getData?.data.result.relatedLinkList[0].title
          : "",
        isActive:
          getData?.data.result.relatedLinkList[0].isActive !== null
            ? getData?.data.result.relatedLinkList[0].isActive
              ? { value: 1, label: "بله" }
              : { value: 2, label: "خیر" }
            : "",

        link: getData?.data.result.relatedLinkList[0].link
          ? getData?.data.result.relatedLinkList[0].link
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
    !getData?.data.result.relatedLinkList[0] &&
    (getIsSuccess || getIsError)
  ) {
    showToast(["لینک مرتبط مورد نظر یافت نشد"], "error");
  }
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  return getIsLoading || !getIsSuccess || editIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.relatedLinkList[0] &&
    (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/RelatedLinkManagement/RelatedLinkList" />
      <Link to="/RelatedLinkManagement/RelatedLinkList">
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
      <DeleteRelatedLinkModal
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
        validationSchema={RelatedLinksValidate}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش لینک های مرتبط را مشاهده و مدیریت
                  کنید
                </Alert>
                <FormDivider textHeader="مشاهده و مدیریت لینک مرتبط">
                  <TwoColumn>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="تیتر لینک مرتبط"
                        name="title"
                        significant
                        placeholder="تیتر لینک مرتبط"
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
                      btnText="ویرایش لینک مرتبط"
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
                      btnText="حذف لینک مرتبط"
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

export { AlterRelatedLink };
