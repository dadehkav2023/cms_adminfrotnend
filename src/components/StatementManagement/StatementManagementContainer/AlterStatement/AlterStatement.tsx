import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Container } from "reactstrap";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
  ModernDatePicker,
  InpuLable,
  TextArea,
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AlterStatement.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { AddStatementAttachmentsModal } from "./AddStatementAttachmentsModal/AddStatementAttachmentsModal";
import { DeleteStatementAttachmentsModal } from "./DeleteStatementAttachmentsModal/DeleteStatementAttachmentsModal";
import { EditStatementAttachmentsModal } from "./EditStatementAttachmentsModal/EditStatementAttachmentsModal";
import { DeleteStatementModal } from "./DeleteStatementModal/DeleteStatementModal";
import { UseGetStatementCategories } from "../../../../core/services/api/get-statement-categories.api";
import { UseGetStatement } from "../../../../core/services/api/get-statement.api";
import { UseEditStatement } from "../../../../core/services/api/edit-statement.api";
import { UseDeleteStatement } from "../../../../core/services/api/delete-statement.api";
import { UseGetStatementAttachments } from "../../../../core/services/api/get-statement-attachments.api";
import { UseAddStatementAttachment } from "../../../../core/services/api/add-statement-attachment.api";
import { UseEditStatementAttachment } from "../../../../core/services/api/edit-statement-attachment.api";
import { UseDeleteStatementAttachment } from "../../../../core/services/api/delete-statement-attachment.api";
import { EditStatementValidation } from "../../../../core/validations/edit-statement.validations";

export interface AlterStatementProps {}

const AlterStatement: React.FC<AlterStatementProps> = () => {
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 1, label: "فعال" },
    Description: "",
    publishedDateTimeAsJalali: "",
    ImagePath: null,
    CategoriesId: [0],
    Attachments: [],
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetStatement();
  const {
    data: getAttachmentData,
    isError: getAttachmentIsError,
    isLoading: getAttachmentIsLoading,
    isSuccess: getAttachmentIsSuccess,
    mutate: getAttachmentMutate,
  } = UseGetStatementAttachments();
  const {
    data: getCategoryData,
    isError: getCategoryisError,
    isLoading: getCategoryIsLoading,
    isSuccess: getCategoryIsSuccess,
    refetch: getCategoryRefetch,
  } = UseGetStatementCategories();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditStatement();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteStatement();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
    getAttachmentMutate({ Id: id, Title: "" });
  }, []);
  useEffect(() => {
    if (getData?.data.result.statementList[0]) {
      setInitialValues({
        Title: getData?.data.result.statementList[0].title
          ? getData?.data.result.statementList[0].title
          : "",
        IsActive: {
          value: getData?.data.result.statementList[0].isActive ? 1 : 2,
          label: getData?.data.result.statementList[0].isActive
            ? "فعال"
            : "غیر فعال",
        },
        Description: getData?.data.result.statementList[0].description
          ? getData?.data.result.statementList[0].description
          : "",

        publishedDateTimeAsJalali: getData?.data.result.statementList[0]
          .publishedDateTimeAsJalali
          ? getData?.data.result.statementList[0].publishedDateTimeAsJalali
              .replace(/-/g, "/")
              .substring(0, 10)
          : "",
        ImagePath: getData?.data.result.statementList[0].imagePath
          ? getData?.data.result.statementList[0].imagePath
          : "",
        CategoriesId: getData?.data.result.statementList[0].statementCategories
          ? getData?.data.result.statementList[0].statementCategories.map(
              (category: any) => {
                return category.id;
              }
            )
          : [],

        Attachments: [],
      });
    }
  }, [getIsSuccess]);
  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      Id: id,
      ImagePath: values.ImagePath[0] ? values.ImagePath[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
      CategoriesId: values.CategoriesId ? values.CategoriesId : [],
      ContentType: 1,
    });
  };

  const {
    data: addAttachmentData,
    isError: addAttachmentIsError,
    isLoading: addAttachmentIsLoading,
    isSuccess: addAttachmentIsSuccess,
    mutate: addAttachmentMutate,
  } = UseAddStatementAttachment();
  const [addIsOpen, setAddIsOpen] = useState(false);

  const {
    data: deleteAttachmentData,
    isError: deleteAttachmentIsError,
    isLoading: deleteAttachmentIsLoading,
    isSuccess: deleteAttachmentIsSuccess,
    mutate: deleteAttachmentMutate,
  } = UseDeleteStatementAttachment();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const {
    data: editAttachmentData,
    isError: editAttachmentIsError,
    isLoading: editAttachmentIsLoading,
    isSuccess: editAttachmentIsSuccess,
    mutate: editAttachmentMutate,
  } = UseEditStatementAttachment();
  const [editIsOpen, setEditIsOpen] = useState(false);

  useEffect(() => {
    getAttachmentMutate({ Id: id, Title: "" });
    setAddIsOpen(false);
    setEditIsOpen(false);
    setDeleteIsOpen(false);
  }, [addAttachmentData, editAttachmentData, deleteAttachmentData]);

  const {
    data: deleteNewsData,
    isError: deleteNewsIsError,
    isLoading: deleteNewsIsLoading,
    isSuccess: deleteNewsIsSuccess,
    mutate: deleteNewsMutate,
  } = UseDeleteStatement();
  const [deleteNewsIsOpen, setDeleteNewsIsOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(0);

  return getIsLoading ||
    !getIsSuccess ||
    editIsLoading ||
    getAttachmentIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.statementList[0] && (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/StatementManagement/StatementList" />
      <Link to="/StatementManagement/StatementList">
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
      <AddStatementAttachmentsModal
        id={id}
        isOpen={addIsOpen}
        modalToggled={() => {
          setAddIsOpen(!addIsOpen);
        }}
        mutate={addAttachmentMutate}
        loading={addAttachmentIsLoading}
      />
      <DeleteStatementAttachmentsModal
        id={selectedId}
        isOpen={deleteIsOpen}
        modalToggled={() => {
          setDeleteIsOpen(!deleteIsOpen);
        }}
        mutate={deleteAttachmentMutate}
        loading={deleteAttachmentIsLoading}
      />
      <EditStatementAttachmentsModal
        id={selectedId}
        isOpen={editIsOpen}
        modalToggled={() => {
          setEditIsOpen(!editIsOpen);
        }}
        mutate={editAttachmentMutate}
        loading={editAttachmentIsLoading}
      />
      <DeleteStatementModal
        id={id}
        isOpen={deleteNewsIsOpen}
        modalToggled={() => {
          setDeleteNewsIsOpen(!deleteNewsIsOpen);
        }}
        mutate={() => {
          deleteMutate({ Id: id, ContentType: "1" });
        }}
        loading={deleteNewsIsLoading}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditStatementValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش بیانیه ها متنی را مشاهده و مدیریت
                  کنید
                </Alert>
                <FormDivider textHeader="افزودن بیانیه">
                  <TwoColumn>
                    <div>
                      <TextInput
                        lableText="تیتر بیانیه"
                        name="Title"
                        placeholder="تیتر بیانیه"
                        significant
                      />
                    </div>

                    <div>
                      <BasicSelectOption
                        lableText="وضعیت بیانیه"
                        significant={true}
                        selectedDefault={{ value: 1, label: "فعال" }}
                        name="IsActive"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: [
                              { value: 1, label: "فعال" },
                              { value: 2, label: "غیر فعال" },
                            ],
                          },
                        ]}
                      />
                    </div>
                  </TwoColumn>

                  <TwoColumn>
                    <div role="group" aria-labelledby="checkbox-group">
                      <InpuLable lableText="دسته بندی های مربوطه" significant />
                      <FieldArray
                        name="statementList"
                        render={(arrayHelpers) => (
                          <Container fluid>
                            <Row>
                              {getCategoryData?.data.result.map(
                                (category: any, index: any) => (
                                  <Col className={Styles.categoryItem} xs={4}>
                                    <label key={index}>
                                      <input
                                        name="CategoriesId"
                                        type="checkbox"
                                        value={category.id}
                                        checked={values.CategoriesId.includes(
                                          category.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            arrayHelpers.push(category.id);
                                          } else {
                                            const idx =
                                              values.CategoriesId.indexOf(
                                                category.id
                                              );
                                            arrayHelpers.remove(idx);
                                          }
                                        }}
                                      />
                                      <span>{category.title}</span>
                                    </label>
                                  </Col>
                                )
                              )}
                            </Row>
                          </Container>
                        )}
                      />
                      <ErrorMessage name="CategoriesId" />
                    </div>
                    <div>
                      <ModernDatePicker
                        lableText="تاریخ انتشار"
                        name="publishedDateTimeAsJalali"
                        initialValue={values.publishedDateTimeAsJalali}
                        placeholder="تاریخ انتشار"
                        hasMaximum={false}
                        significant
                      />
                    </div>
                  </TwoColumn>
                  <TextArea
                    lableText="نوضیحات بیانیه"
                    name="Description"
                    placeholder="توضیحات بیانیه"
                    significant
                  />
                  <div className={Styles.logoBox}>
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                        values.ImagePath
                          ? correctUploadPath(
                              getData?.data.result.statementList[0].imagePath
                            )
                          : "https://logo.com"
                      }`}
                      alt="current-logo"
                    />
                    <p>عکس فعلی بیانیه</p>
                  </div>
                  <DropZone
                    lableText="عکس بیانیه"
                    name="ImagePath"
                    significant
                    placeholder="عکس بیانیه"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg"
                  />

                  <FormDivider textHeader="پیوست های بیانیه">
                    <Container className={Styles.container} fluid>
                      <Row>
                        <Col xs={2}>ردیف</Col>
                        <Col xs={4}>عنوان</Col>
                        <Col xs={2}>مشاهده</Col>
                        <Col xs={2}>ویرایش</Col>
                        <Col xs={2}>حذف</Col>
                      </Row>
                      {!getAttachmentData?.data.result
                        .statementAttachmentList[0] ? (
                        <h1
                          style={{ textAlign: "center" }}
                          className={Styles.noneFound}
                        >
                          موردی یافت نشد
                        </h1>
                      ) : (
                        getAttachmentData?.data.result.statementAttachmentList.map(
                          (item: any, index: any) => {
                            return (
                              <Row key={index}>
                                <Col xs={2}>{index + 1}</Col>
                                <Col xs={4}>{item.title}</Col>
                                <Col xs={2}>
                                  <div className={Styles.buttonDiv}>
                                    <a
                                      href={`${
                                        process.env.REACT_APP_UPLOAD_SERVER_PATH
                                      }/${correctUploadPath(
                                        item.attachmentFile
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <SimpleSubmitButton
                                        isLoading={false}
                                        type="button"
                                        className="mb-1"
                                        outLine
                                        btnText="مشاهده پیوست"
                                      />
                                    </a>
                                  </div>
                                </Col>
                                <Col xs={2}>
                                  <div className={Styles.buttonDiv}>
                                    <SimpleSubmitButton
                                      isLoading={false}
                                      onCLick={() => {
                                        setEditIsOpen(true);
                                        setSelectedId(item.id);
                                      }}
                                      type="submit"
                                      className="mb-1"
                                      outLine
                                      btnText="ویرایش پیوست"
                                    />
                                  </div>
                                </Col>
                                <Col xs={2}>
                                  <div className={Styles.buttonDiv}>
                                    <SimpleSubmitButton
                                      isLoading={false}
                                      onCLick={() => {
                                        setDeleteIsOpen(true);
                                        setSelectedId(item.id);
                                      }}
                                      type="button"
                                      className="mb-1"
                                      outLine
                                      btnText="حذف پیوست"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            );
                          }
                        )
                      )}
                    </Container>
                  </FormDivider>

                  <SimpleSubmitButton
                    isLoading={false}
                    onCLick={() => {
                      setAddIsOpen(!addIsOpen);
                    }}
                    type="button"
                    className="mb-1"
                    outLine
                    btnText="افزودن پیوست جدید"
                  />
                </FormDivider>
                <TwoColumn>
                  <div className={Styles.firstCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      type="submit"
                      className="mb-1"
                      outLine
                      btnText="ویرایش بیانیه"
                    />
                  </div>
                  <div className={Styles.secondCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      onCLick={() => {
                        setDeleteNewsIsOpen(true);
                      }}
                      type="button"
                      className="mb-1"
                      outLine
                      btnText="حذف بیانیه"
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

export { AlterStatement };
