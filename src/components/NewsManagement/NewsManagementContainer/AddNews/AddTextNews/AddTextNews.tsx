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
} from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { FieldWrapper, TextArea } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import {
  NewsContentType,
  NewsPriority,
  NewsType,
} from "../../../../../core/enums";
import { AddTextNewsValidation } from "../../../../../core/validations/add-text-news.validations";
import { UseGetCategories } from "../../../../../core/services/api/get-news-categories.api";
import RichTextEditor from "../../../../common/Form/RichTextEditor/RichTextEditor";
import { UseAddNews } from "../../../../../core/services/api/add-news.api";
interface AddTextNewsProps {}

const AddTextNews: React.FC<AddTextNewsProps> = () => {
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
      value: 1,
      label: NewsContentType.TextNews,
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
        validationSchema={AddTextNewsValidation}
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
                  <TwoColumn>
                    <TwoColumn>
                      <div>
                        <BasicSelectOption
                          lableText="نوع محتوا خبر"
                          significant={true}
                          selectedDefault={{
                            value: 1,
                            label: NewsContentType.TextNews,
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
                            if (e.value !== 1) {
                              history.push(
                                `/NewsManagement/AddNews/${
                                  e.value === 2 ? "PhotoNews" : "VideoNews"
                                }`
                              );
                            }
                          }}
                        />
                      </div>
                      <div>
                        <BasicSelectOption
                          lableText="نوع خبر"
                          significant={true}
                          selectedDefault={{
                            value: 1,
                            label: NewsType.Covering,
                          }}
                          name="NewsType"
                          data={[
                            {
                              label: "انتخاب کنید",
                              options: [
                                {
                                  value: 1,
                                  label: NewsType.Covering,
                                },
                                {
                                  value: 2,
                                  label: NewsType.Production,
                                },
                                {
                                  value: 3,
                                  label: NewsType.Sending,
                                },
                                {
                                  value: 4,
                                  label: NewsType.Recieving,
                                },
                                {
                                  value: 5,
                                  label: NewsType.Quoting,
                                },
                              ],
                            },
                          ]}
                        />
                      </div>
                    </TwoColumn>

                    <TwoColumn>
                      <div>
                        <BasicSelectOption
                          lableText="اولویت خبر"
                          significant={true}
                          selectedDefault={{
                            value: 2,
                            label: NewsPriority.Moderate,
                          }}
                          name="NewsPriority"
                          data={[
                            {
                              label: "انتخاب کنید",
                              options: [
                                {
                                  value: 1,
                                  label: NewsPriority.Low,
                                },
                                {
                                  value: 2,
                                  label: NewsPriority.Moderate,
                                },
                                {
                                  value: 3,
                                  label: NewsPriority.High,
                                },
                                {
                                  value: 4,
                                  label: NewsPriority.Hot,
                                },
                                {
                                  value: 5,
                                  label: NewsPriority.Critical,
                                },
                              ],
                            },
                          ]}
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
                    </TwoColumn>
                  </TwoColumn>
                  <TwoColumn>
                    <TwoColumn>
                      <div>
                        <TextInput
                          lableText="سر تیتر"
                          name="HeadTitle"
                          placeholder="سر تیتر"
                          // significant
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
                    </TwoColumn>

                    <TwoColumn>
                      <div>
                        <TextInput
                          lableText="تیتر خلاصه"
                          name="SummaryTitle"
                          placeholder="تیتر خلاصه"
                          // significant
                        />
                      </div>
                      <div>
                        <TextInput
                          lableText="تیتر زیرین"
                          name="Subtitle"
                          placeholder="تیتر زیرین"
                          // significant
                        />
                      </div>
                    </TwoColumn>
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
                      <TwoColumn>
                        <div>
                          <ModernDatePicker
                            lableText="تاریخ انتشار"
                            name="PublishedDateTime"
                            placeholder="تاریخ انتشار"
                            hasMaximum={false}
                            significant
                          />
                        </div>
                        <div>
                          <BasicSelectOption
                            lableText="نمایش در صفحه اصلی"
                            significant={true}
                            selectedDefault={{ value: 1, label: "نمایش" }}
                            name="ShowInMainPage"
                            data={[
                              {
                                label: "انتخاب کنید",
                                options: [
                                  { value: 1, label: "نمایش" },
                                  { value: 2, label: "عدم نمایش" },
                                ],
                              },
                            ]}
                          />
                        </div>
                      </TwoColumn>
                    </div>
                  </TwoColumn>
                  <DropZone
                    lableText="عکس خبر"
                    name="ImagePath"
                    significant
                    placeholder="عکس خبر"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg ,image/jfif"
                  />

                  <RichTextEditor
                    name="Lead"
                    title="لید خبر"
                    significant={true}
                    data={""}
                    height="300"
                  />

                  <RichTextEditor
                    name="Content"
                    title="محتوای خبر"
                    significant={true}
                    data={""}
                    height="300"
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

export { AddTextNews };
