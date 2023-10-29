import React, { useState } from "react";
import { Alert, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
  ModernDatePicker,
  InpuLable,
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { FieldWrapper, TextArea } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { UseGetStatementCategories } from "../../../../core/services/api/get-statement-categories.api";
import { UseAddStatement } from "../../../../core/services/api/add-statement.api";
import { AddStatementValidation } from "../../../../core/validations/add-statement.validations";
interface AddStatementProps {}

const AddStatement: React.FC<AddStatementProps> = () => {
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 1, label: "فعال" },
    Description: "",
    PublishedDateTime: "",
    ImagePath: null,
    CategoriesId: [],
    Attachments: [],
  });
  const onSubmit = (values: any) => {
    PostMutate({
      ...values,
      ImagePath: values.ImagePath[0] ? values.ImagePath[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
      CategoriesId: values.CategoriesId ? values.CategoriesId : [],
    });
  };
  const {
    data: getData,
    isError: getisError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    refetch: getRefetch,
  } = UseGetStatementCategories();
  const {
    data: PostData,
    isError: PostisError,
    isLoading: PostIsLoading,
    isSuccess: PostIsSuccess,
    mutate: PostMutate,
  } = UseAddStatement();

  return getIsLoading || PostIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddStatementValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({
          values,
          setFieldValue,
          setFieldError,
          setErrors,
          errors,
          touched,
        }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info" onClick={() => {}}>
                  شما میتوانید از طریق این بخش بیانیه جدید اضافه کنید
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
                        name="CategoriesId"
                        render={(arrayHelpers) => (
                          <Container fluid>
                            <Row
                              style={{
                                border:
                                  errors.CategoriesId && touched.CategoriesId
                                    ? "1px solid #ff2222"
                                    : "none",
                                borderRadius: "7px",
                                overflow: "hidden",
                                padding: "5px",
                              }}
                            >
                              {getData?.data.result.map(
                                (category: any, index: any) => (
                                  <Col style={{ padding: "5px" }} xs={4}>
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
                      <span style={{ color: "#ff2222", fontSize: "11px" }}>
                        <ErrorMessage name="CategoriesId" />
                      </span>
                    </div>
                    <div>
                      <ModernDatePicker
                        lableText="تاریخ انتشار"
                        name="PublishedDateTime"
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
                  <DropZone
                    lableText="عکس بیانیه"
                    name="ImagePath"
                    significant
                    placeholder="عکس بیانیه"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg"
                  />
                </FormDivider>
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="افزودن بیانیه"
                />
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AddStatement };
