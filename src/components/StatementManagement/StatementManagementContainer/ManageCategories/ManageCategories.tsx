import React, { useState, useEffect } from "react";
import { Alert, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
} from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./ManageCategories.module.scss";
import { FieldWrapper } from "../../../common/Form";
import { UseGetCategories } from "../../../../core/services/api/get-news-categories.api";
import { UseDeleteCategory } from "../../../../core/services/api/delete-news-category.api";
import { UseEditCategory } from "../../../../core/services/api/edit-news-category.api";
import { UseAddcategory } from "../../../../core/services/api/add-news-category.api";
import { AddCategoryValidation } from "../../../../core/validations/add-category.validations";
import { EditCategoryModal } from "./EditCategoryModal/EditCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategoryModal/DeleteCategoryModal";
import { UseGetStatementCategories } from "../../../../core/services/api/get-statement-categories.api";
import { UseAddStatementCategory } from "../../../../core/services/api/add-statement-category.api";
import { UseDeleteStatementCategory } from "../../../../core/services/api/delete-statement-category.api";
import { UseEditStatementCategory } from "../../../../core/services/api/edit-statement-category.api";

export interface ManageCategoriesProps {}

const ManageCategories: React.FC<ManageCategoriesProps> = () => {
  const {
    data: getData,
    isError: getisError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    refetch: getRefetch,
  } = UseGetStatementCategories();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteStatementCategory();
  const {
    isError: editIsError,
    isLoading: editIsLoading,
    data: editData,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditStatementCategory();
  const {
    isError: addIsError,
    isLoading: addIsLoading,
    isSuccess: addIsSuccess,
    mutate: addMutate,
  } = UseAddStatementCategory();

  const onSubmit = (values: any) => {
    addMutate({ Title: values.Title });
  };
  const [initialValues, setInitialValues] = useState({ Title: "" });

  useEffect(() => {
    getRefetch();
  }, [addIsSuccess, editData, deleteData]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  return getIsLoading || editIsLoading || addIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <EditCategoryModal
        isOpen={modalIsOpen}
        modalToggled={() => {
          setModalIsOpen(!modalIsOpen);
        }}
        id={editId}
        editMutate={editMutate}
      />
      <DeleteCategoryModal
        isOpen={deleteIsOpen}
        modalToggled={() => {
          setDeleteIsOpen(!deleteIsOpen);
        }}
        id={editId}
        loading={deleteIsLoading}
        mutate={() => {
          deleteMutate({ Id: deleteId });
        }}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AddCategoryValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش دسته بندی جدید اضافه کنید
                </Alert>
                <FormDivider textHeader="افزودن دسته بندی">
                  <TextInput
                    lableText="تیتر دسته بندی"
                    name="Title"
                    significant
                    placeholder="تیتر دسته بندی"
                  />
                </FormDivider>
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="افزودن دسته بندی"
                />
                <FormDivider textHeader="لیست دسته بندی ها">
                  <Container className={Styles.container} fluid>
                    <Row>
                      <Col xs={3}>ردیف</Col>
                      <Col xs={3}>عنوان</Col>
                      <Col xs={3}>ویرایش</Col>
                      <Col xs={3}>حذف</Col>
                    </Row>
                    {getData?.data.result.map((category: any, index: any) => {
                      return (
                        <Row key={index}>
                          <Col xs={3}>{index + 1}</Col>
                          <Col xs={3}>{category.title}</Col>
                          <Col xs={3}>
                            <SimpleSubmitButton
                              type="button"
                              isLoading={false}
                              className="mb-1"
                              outLine
                              btnText="ویرایش"
                              onCLick={() => {
                                setEditId(category.id);
                                setModalIsOpen(true);
                              }}
                            />
                          </Col>
                          <Col xs={3}>
                            <SimpleSubmitButton
                              type="button"
                              isLoading={false}
                              onCLick={() => {
                                setDeleteId(category.id);
                                setDeleteIsOpen(true);
                              }}
                              className="mb-1"
                              outLine
                              btnText="حذف"
                            />
                          </Col>
                        </Row>
                      );
                    })}
                  </Container>
                </FormDivider>
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { ManageCategories };
