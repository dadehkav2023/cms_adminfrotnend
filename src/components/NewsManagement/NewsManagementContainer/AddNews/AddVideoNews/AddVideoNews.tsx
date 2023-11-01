import React, { useState } from "react";
import { Alert, Col, Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import {
  FieldWrapper,
  FormDivider,
  InpuLable,
  ModernDatePicker,
  SimpleSubmitButton,
  TextInput,
} from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import {
  NewsContentType,
  NewsPriority,
  NewsType,
} from "../../../../../core/enums";
import { UseGetCategories } from "../../../../../core/services/api/get-news-categories.api";
import RichTextEditor from "../../../../common/Form/RichTextEditor/RichTextEditor";
import { UseAddNews } from "../../../../../core/services/api/add-news.api";
import { AddMediaNewsValidation } from "../../../../../core/validations/add-media-news.validations";
import TreeColumn from "../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import VideoSelector from "./VideoSelector/VideoSelector";
interface AddVideoNewsProps {}
const AddVideoNews: React.FC<AddVideoNewsProps> = () => {
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 1, label: "فعال" },
    ShowInMainPage: { value: 1, label: "نمایش" },
    HeadTitle: "",
    Subtitle: "",
    SummaryTitle: "",
    Summary: "",
    Lead: "",
    Content: "",
    PublishedDateTime: "",
    ImagePath: null,
    CategoriesId: [0],
    NewsPriority: {
      value: 2,
      label: NewsPriority.Moderate,
    },
    NewsContentType: {
      value: 3,
      label: NewsContentType.VideoNews,
    },
    NewsType: {
      value: 1,
      label: NewsType.Covering,
    },
    Attachments: [],
  });
  const onSubmit = (values: any) => {
    PostMutate({
      ...values,
      NewsContentType: +values.NewsContentType.value,
      NewsType: +values.NewsType.value,
      NewsPriority: +values.NewsPriority.value,
      ImagePath: values.ImagePath[0] ? values.ImagePath[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
      ShowInMainPage: values.ShowInMainPage.value === 1 ? true : false,
      CategoriesId: values.CategoriesId ? values.CategoriesId : [],
    });
  };
  const {
    data: getData,
    isError: getisError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    refetch: getRefetch,
  } = UseGetCategories();
  const {
    data: PostData,
    isError: PostisError,
    isLoading: PostIsLoading,
    isSuccess: PostIsSuccess,
    mutate: PostMutate,
  } = UseAddNews();
  const [contentType, setContentType] = useState(1);

  return getIsLoading || PostIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddMediaNewsValidation}
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
                  شما میتوانید از طریق این بخش خبر جدید اضافه کنید
                </Alert>
                <FormDivider textHeader="افزودن خبر">
                  <TreeColumn>
                    <div>
                      <BasicSelectOption
                        lableText="نوع محتوا خبر"
                        significant={true}
                        selectedDefault={{
                          value: 3,
                          label: NewsContentType.VideoNews,
                        }}
                        name="NewsContentType"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: [
                              { value: 1, label: NewsContentType.TextNews },
                              {
                                value: 2,
                                label: NewsContentType.PhotoNews,
                              },
                              {
                                value: 3,
                                label: NewsContentType.VideoNews,
                              },
                            ],
                          },
                        ]}
                        onChange={(e) => {
                          setFieldValue("NewsContentType", e);
                          if (e.value !== 3) {
                            history.push(
                              `/NewsManagement/AddNews/${
                                e.value === 1 ? "TextNews" : "PhotoNews"
                              }`
                            );
                          }
                        }}
                      />
                    </div>
                    <div>
                      <BasicSelectOption
                        lableText="وضعیت خبر"
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
                    <div>
                      <TextInput
                        lableText="تیتر خبر"
                        name="Title"
                        placeholder="تیتر خبر"
                        significant
                      />
                    </div>
                  </TreeColumn>
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
                      <ErrorMessage name="CategoriesId" />
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
                  <div>
                    <VideoSelector
                      name="ImagePath"
                      onVideoSelected={setFieldValue}
                    />
                  </div>
                  <RichTextEditor
                    name="Summary"
                    title="خلاصه خبر"
                    significant={true}
                    data={""}
                  />
                </FormDivider>
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="افزودن خبر"
                />
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};
export { AddVideoNews };
