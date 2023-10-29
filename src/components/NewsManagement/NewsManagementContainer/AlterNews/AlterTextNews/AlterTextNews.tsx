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
} from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AlterTextNews.module.scss";
import { FieldWrapper } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { correctUploadPath } from "../../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { UseGetTextNews } from "../../../../../core/services/api/get-text-news.api";
import RichTextEditor from "../../../../common/Form/RichTextEditor/RichTextEditor";
import { NewsPriority, NewsType } from "../../../../../core/enums";
import { UseGetCategories } from "../../../../../core/services/api/get-news-categories.api";
import TreeColumn from "../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { UseEditTextNews } from "../../../../../core/services/api/edit-text-news.api";
import { UseDeleteTextNews } from "../../../../../core/services/api/delete-text-news.api";
import { AddTextNewsAttachmentsModal } from "./AddTextNewsAttachmentsModal/AddTextNewsAttachmentsModal";
import { UseGetTextNewsAttachments } from "../../../../../core/services/api/get-text-news-attachments.api";
import { UseAddTextNewsAttachment } from "../../../../../core/services/api/add-text-news-attachment.api";
import { UseDeleteTextNewsAttachment } from "../../../../../core/services/api/delete-text-news-attachment.api";
import { UseEditTextNewsAttachment } from "../../../../../core/services/api/edit-text-news-attachment.api";
import { DeleteTextNewsAttachmentsModal } from "./DeleteTextNewsAttachmentsModal/DeleteTextNewsAttachmentsModal";
import { EditTextNewsAttachmentsModal } from "./EditTextNewsAttachmentsModal/EditTextNewsAttachmentsModal";
import { DeleteNewsModal } from "../DeleteNewsModal/DeleteNewsModal";
import { EditTextNewsValidation } from "../../../../../core/validations/edit-text-news.validations";

export interface AlterTextNewsProps {}

const AlterTextNews: React.FC<AlterTextNewsProps> = () => {
  const NewsPriorityKeys = ["ازاد", "کم", "متوسط", "زیاد", "داغ", "بحرانی"];
  const NewsTypeKeys = ["ازاد", "پوششی", "تولیدی", "ارسالی", "دریافتی", "نقلی"];

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
    newsCategories: [{ id: 0, title: "" }],
    NewsPriority: {
      value: 2,
      label: NewsPriorityKeys[2],
    },
    NewsType: {
      value: 1,
      label: NewsTypeKeys[1],
    },
    Attachments: [],
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetTextNews();
  const {
    data: getAttachmentData,
    isError: getAttachmentIsError,
    isLoading: getAttachmentIsLoading,
    isSuccess: getAttachmentIsSuccess,
    mutate: getAttachmentMutate,
  } = UseGetTextNewsAttachments();
  const {
    data: getCategoryData,
    isError: getCategoryisError,
    isLoading: getCategoryIsLoading,
    isSuccess: getCategoryIsSuccess,
    refetch: getCategoryRefetch,
  } = UseGetCategories();
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditTextNews();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteTextNews();

  useEffect(() => {
    getMutate({
      id: id,
      page: 1,
      pageSize: 1,
    });
    getAttachmentMutate({ Id: id, Title: "" });
  }, []);
  useEffect(() => {
    if (getData?.data.result.newsList[0]) {
      setInitialValues({
        Title: getData?.data.result.newsList[0].title
          ? getData?.data.result.newsList[0].title
          : "",
        IsActive: {
          value: getData?.data.result.newsList[0].isActive ? 1 : 2,
          label: getData?.data.result.newsList[0].isActive
            ? "فعال"
            : "غیر فعال",
        },
        ShowInMainPage: {
          value: getData?.data.result.newsList[0].ShowInMainPage ? 1 : 2,
          label: getData?.data.result.newsList[0].ShowInMainPage
            ? "نمایش"
            : "عدم نمایش",
        },

        HeadTitle: getData?.data.result.newsList[0].headTitle
          ? getData?.data.result.newsList[0].headTitle
          : "",
        Subtitle: getData?.data.result.newsList[0].subTitle
          ? getData?.data.result.newsList[0].subTitle
          : "",
        SummaryTitle: getData?.data.result.newsList[0].summaryTitle
          ? getData?.data.result.newsList[0].summaryTitle
          : "",
        Summary: getData?.data.result.newsList[0].summary
          ? getData?.data.result.newsList[0].summary
          : "",
        Lead: getData?.data.result.newsList[0].lead
          ? getData?.data.result.newsList[0].lead
          : "",
        Content: getData?.data.result.newsList[0].content
          ? getData?.data.result.newsList[0].content
          : "",
        PublishedDateTime: getData?.data.result.newsList[0].publishedDateTime
          ? getData?.data.result.newsList[0].publishedDateTime
              .replace(/-/g, "/")
              .substring(0, 10)
          : "",
        ImagePath: getData?.data.result.newsList[0].imagePath
          ? getData?.data.result.newsList[0].imagePath
          : "",
        newsCategories: getData?.data.result.newsList[0].newsCategories
          ? getData?.data.result.newsList[0].newsCategories.map(
              (category: any) => {
                return category.id;
              }
            )
          : [],
        NewsPriority: {
          value: getData?.data.result.newsList[0].newsPriority
            ? getData?.data.result.newsList[0].newsPriority
            : 0,
          label: getData?.data.result.newsList[0].newsPriority
            ? NewsPriorityKeys[getData?.data.result.newsList[0].newsPriority]
            : NewsPriorityKeys[0],
        },

        NewsType: {
          value: getData?.data.result.newsList[0].newsPriority
            ? getData?.data.result.newsList[0].newsPriority
            : 0,
          label: getData?.data.result.newsList[0].newsPriority
            ? NewsTypeKeys[getData?.data.result.newsList[0].newsPriority]
            : NewsTypeKeys[0],
        },
        Attachments: [],
      });
    }
  }, [getIsSuccess]);
  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      Id: id,
      NewsType: +values.NewsType.value,
      NewsPriority: +values.NewsPriority.value,
      ImagePath: values.ImagePath[0] ? values.ImagePath[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
      ShowInMainPage: values.ShowInMainPage.value === 1 ? true : false,
      CategoriesId: values.newsCategories ? values.newsCategories : [],
      ContentType: 1,
    });
  };

  const {
    data: addAttachmentData,
    isError: addAttachmentIsError,
    isLoading: addAttachmentIsLoading,
    isSuccess: addAttachmentIsSuccess,
    mutate: addAttachmentMutate,
  } = UseAddTextNewsAttachment();
  const [addIsOpen, setAddIsOpen] = useState(false);

  const {
    data: deleteAttachmentData,
    isError: deleteAttachmentIsError,
    isLoading: deleteAttachmentIsLoading,
    isSuccess: deleteAttachmentIsSuccess,
    mutate: deleteAttachmentMutate,
  } = UseDeleteTextNewsAttachment();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const {
    data: editAttachmentData,
    isError: editAttachmentIsError,
    isLoading: editAttachmentIsLoading,
    isSuccess: editAttachmentIsSuccess,
    mutate: editAttachmentMutate,
  } = UseEditTextNewsAttachment();
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
  } = UseDeleteTextNews();
  const [deleteNewsIsOpen, setDeleteNewsIsOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(0);

  return getIsLoading ||
    !getIsSuccess ||
    editIsLoading ||
    getAttachmentIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.newsList[0] && (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/NewsManagement/NewsList/VideoNews" />
      <Link to="/NewsManagement/NewsList/VideoNews">
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
      <AddTextNewsAttachmentsModal
        id={id}
        isOpen={addIsOpen}
        modalToggled={() => {
          setAddIsOpen(!addIsOpen);
        }}
        mutate={addAttachmentMutate}
        loading={addAttachmentIsLoading}
      />
      <DeleteTextNewsAttachmentsModal
        id={selectedId}
        isOpen={deleteIsOpen}
        modalToggled={() => {
          setDeleteIsOpen(!deleteIsOpen);
        }}
        mutate={deleteAttachmentMutate}
        loading={deleteAttachmentIsLoading}
      />
      <EditTextNewsAttachmentsModal
        id={selectedId}
        isOpen={editIsOpen}
        modalToggled={() => {
          setEditIsOpen(!editIsOpen);
        }}
        mutate={editAttachmentMutate}
        loading={editAttachmentIsLoading}
      />
      <DeleteNewsModal
        id={id}
        isOpen={deleteNewsIsOpen}
        modalToggled={() => {
          setDeleteNewsIsOpen(!deleteNewsIsOpen);
        }}
        mutate={() => {
          deleteNewsMutate({ Id: id, ContentType: "1" });
        }}
        loading={deleteNewsIsLoading}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditTextNewsValidation}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش اخبار متنی را مشاهده و مدیریت
                  کنید
                </Alert>
                <FormDivider textHeader="افزودن خبر">
                  <TreeColumn>
                    <div>
                      <BasicSelectOption
                        lableText="نوع خبر"
                        significant={true}
                        selectedDefault={values.NewsType}
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
                    <div>
                      <BasicSelectOption
                        lableText="اولویت خبر"
                        significant={true}
                        selectedDefault={values.NewsPriority}
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
                        selectedDefault={values.IsActive}
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
                  </TreeColumn>
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
                          lableText="تیتر زیرین"
                          name="Subtitle"
                          placeholder="تیتر زیرین"
                          // significant
                        />
                      </div>
                      <div>
                        <TextInput
                          lableText="تیتر خلاصه"
                          name="SummaryTitle"
                          placeholder="تیتر خلاصه"
                          // significant
                        />
                      </div>
                    </TwoColumn>
                  </TwoColumn>
                  <TwoColumn>
                    <div role="group" aria-labelledby="checkbox-group">
                      <InpuLable lableText="دسته بندی های مربوطه" significant />
                      <FieldArray
                        name="newsCategories"
                        render={(arrayHelpers) => (
                          <Container fluid>
                            <Row>
                              {getCategoryData?.data.result.map(
                                (category: any, index: any) => (
                                  <Col className={Styles.categoryItem} xs={4}>
                                    <label key={index}>
                                      <input
                                        name="newsCategories"
                                        type="checkbox"
                                        value={category.id}
                                        checked={values.newsCategories.includes(
                                          category.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            arrayHelpers.push(category.id);
                                          } else {
                                            const idx =
                                              values.newsCategories.indexOf(
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
                      <ErrorMessage name="newsCategories" />
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
                            selectedDefault={values.ShowInMainPage}
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
                  <div className={Styles.logoBox}>
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                        values.ImagePath
                          ? correctUploadPath(
                              getData?.data.result.newsList[0].imagePath
                            )
                          : "https://logo.com"
                      }`}
                      alt="current-logo"
                    />
                    <p>عکس فعلی خبر</p>
                  </div>
                  <DropZone
                    lableText="عکس خبر"
                    name="ImagePath"
                    significant
                    placeholder="عکس خبر"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  <RichTextEditor
                    name="Lead"
                    title="لید خبر"
                    data={"values.Lead"}
                    significant={true}
                    height="300"
                  />
                  <RichTextEditor
                    name="Content"
                    data={values.Content}
                    title="محتوای خبر"
                    significant={true}
                    height="300"
                  />
                  <FormDivider textHeader="پیوست های خبر">
                    <Container className={Styles.container} fluid>
                      <Row>
                        <Col xs={2}>ردیف</Col>
                        <Col xs={4}>عنوان</Col>
                        <Col xs={2}>مشاهده</Col>
                        <Col xs={2}>ویرایش</Col>
                        <Col xs={2}>حذف</Col>
                      </Row>
                      {!getAttachmentData?.data.result.newsAttachmentList[0] ? (
                        <h1
                          style={{ textAlign: "center" }}
                          className={Styles.noneFound}
                        >
                          موردی یافت نشد
                        </h1>
                      ) : (
                        getAttachmentData?.data.result.newsAttachmentList.map(
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
                                      type="button"
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
                      btnText="ویرایش خبر"
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
                      btnText="حذف خبر"
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

export { AlterTextNews };
