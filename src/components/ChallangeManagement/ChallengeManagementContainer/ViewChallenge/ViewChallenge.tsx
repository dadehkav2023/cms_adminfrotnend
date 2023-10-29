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
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./ViewChallenge.module.scss";
import TreeColumn from "../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect, useHistory } from "react-router-dom";
import RichTextEditor from "../../../common/Form/RichTextEditor/RichTextEditor";
import { NewsPriority, NewsType } from "../../../../core/enums";
import { UseGetCategories } from "../../../../core/services/api/get-news-categories.api";
import { UseGetChallengeDetails } from "../../../../core/services/api/get-challenge-details.api";
import { UseGetChallengeAttachments } from "../../../../core/services/api/get-challenge-attachments.api";
import { RejectChallengeAttachmentsModal } from "../RejectChallengeAttachmentsModal/RejectChallengeAttachmentsModal";
import { UseRejectChallenge } from "../../../../core/services/api/reject-challenge";
import { UseGetChallenges } from "../../../../core/services/api/get-challenges.api";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { UseAcceptAttachmentChallenge } from "../../../../core/services/api/accept-attachment-challenge";

export interface ViewChallengeProps {}

const ViewChallenge: React.FC<ViewChallengeProps> = () => {
  const history = useHistory();
  const {
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    isLoading: getIsLoading,
    mutate: getMutate,
  } = UseGetChallengeDetails();

  const {
    data: getAttachmentData,
    isSuccess: getAttachmentIsSuccess,
    isError: getAttachmentIsError,
    isLoading: getAttachmentIsLoading,
    mutate: getAttachmentMutate,
  } = UseGetChallengeAttachments();

  const {
    data: getChallengesData,
    isSuccess: getChallengesIsSuccess,
    isError: getChallengesIsError,
    isLoading: getChallengesIsLoading,
    mutate: getChallengesMutate,
  } = UseGetChallenges();

  const {
    data: rejectData,
    isSuccess: rejectIsSuccess,
    isError: rejectIsError,
    isLoading: rejectIsLoading,
    mutate: rejectMutate,
  } = UseRejectChallenge();

  const {
    data: acceptData,
    isSuccess: acceptIsSuccess,
    isError: acceptIsError,
    isLoading: acceptIsLoading,
    mutate: acceptMutate,
  } = UseAcceptAttachmentChallenge();

  const [selected, setSelected] = useState("");

  const [initialValues, setInitialValues] = useState({});

  const { id } = useParams<{ id: any }>();

  const onSubmit = (values: any) => {};

  useEffect(() => {
    getMutate({ Id: id });
    getAttachmentMutate({ Id: id, page: 1, pageSize: 1 });
  }, []);

  useEffect(() => {
    acceptIsSuccess && history.push("/ChallengeManagement/ChallengesList");
  }, [acceptData]);
  const [rejectIsOpen, setRejectIsOpen] = useState(false);
  const [acceptIsOpen, setAcceptIsOpen] = useState(false);

  useEffect(() => {
    rejectIsSuccess && history.push("/ChallengeManagement/ChallengesList");
  }, [rejectData]);

  useEffect(() => {
    getIsSuccess &&
      getChallengesMutate({
        page: 1,
        pageSize: pageSize,
        hashtags: getData?.data.result.hashtags,
      });
  }, [getData]);

  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);

  return getIsLoading || !getIsSuccess || getAttachmentIsLoading ? (
    <FallBackSpinner />
  ) : !getData?.data.result.id && (getIsSuccess || getIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/ChallengeManagement/ChallengesList" />
      <Link to="/ChallengeManagement/ChallengesList">
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
      <RejectChallengeAttachmentsModal
        id={id}
        isOpen={rejectIsOpen}
        modalToggled={() => {
          setRejectIsOpen(!rejectIsOpen);
        }}
        mutate={rejectMutate}
        loading={rejectIsLoading}
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <TwoColumn>
                  <div style={{ margin: "10px 0 70px 0" }}>
                    <Link to={`/ChallengeManagement/Accept/${id}`}>
                      <SimpleSubmitButton
                        isLoading={false}
                        style={{ float: "left" }}
                        type="submit"
                        className="mb-1"
                        outLine
                        btnText="تایید چالش"
                      />
                    </Link>
                  </div>
                  <div style={{ margin: "10px 0 70px 0" }}>
                    <SimpleSubmitButton
                      isLoading={false}
                      style={{ float: "right" }}
                      type="submit"
                      className="mb-1"
                      onCLick={() => {
                        setRejectIsOpen(true);
                      }}
                      outLine
                      btnText="رد چالش"
                    />
                  </div>
                </TwoColumn>
                <TwoColumn>
                  <TwoColumn>
                    <div>
                      <h4 style={{ textAlign: "center" }}>استان های حامی :</h4>
                    </div>
                    <div>
                      {getData?.data.result.provinces[0] &&
                        getData?.data.result.provinces.map(
                          (item: any, index: any) => {
                            return (
                              <>
                                <span>
                                  {index !== 0 ? "-" : ""} {item.title}{" "}
                                </span>
                              </>
                            );
                          }
                        )}
                    </div>
                  </TwoColumn>

                  <TwoColumn>
                    <div>
                      <h4 style={{ textAlign: "center" }}>موارد استفاده :</h4>
                    </div>
                    <div>
                      {getData?.data.result.usageTypes[0] &&
                        getData?.data.result.usageTypes.map(
                          (item: any, index: any) => {
                            return (
                              <>
                                <span>
                                  {index !== 0 ? "-" : ""} {item.title}{" "}
                                </span>
                              </>
                            );
                          }
                        )}
                    </div>
                  </TwoColumn>
                </TwoColumn>

                <TwoColumn>
                  <TwoColumn>
                    <div style={{ textAlign: "center" }}>
                      <h2>تیتر چالش :</h2>
                    </div>
                    <div>
                      <h3>{getData?.data.result.title}</h3>
                    </div>
                  </TwoColumn>
                  <TwoColumn>
                    <div style={{ textAlign: "center" }}>
                      <h2>ثبت شده از طرف :</h2>
                    </div>
                    <div>
                      <h3>
                        {getData?.data.result.authorFirstName +
                          " " +
                          getData?.data.result.authorLastName}
                      </h3>
                    </div>
                  </TwoColumn>
                </TwoColumn>
                <div className={Styles.logoBox}>
                  <img
                    src={`https://api.farmervoice.agroom.org/${
                      getData?.data.result.imagePath
                        ? correctUploadPath(getData?.data.result.imagePath)
                        : "https://logo.com"
                    }`}
                    alt="current-logo"
                  />
                  <p>عکس فعلی اسلاید</p>
                </div>

                <h1 style={{ textAlign: "center", margin: "20px 0" }}>
                  متن چالش
                </h1>
                <div
                  style={{ width: "70%", padding: "20px", fontSize: "20px" }}
                  dangerouslySetInnerHTML={{
                    __html: getData?.data.result.draftDescription,
                  }}
                ></div>
              </Form>

              <FormDivider textHeader="پیوست های چالش">
                <Container className={Styles.container} fluid>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={2}>ردیف</Col>
                    <Col xs={4}>عنوان</Col>
                    <Col xs={2}>مشاهده</Col>
                    <Col xs={2}></Col>
                  </Row>
                  {!getAttachmentData?.data.result.attachments[0] ? (
                    <h1
                      style={{ textAlign: "center" }}
                      className={Styles.noneFound}
                    >
                      موردی یافت نشد
                    </h1>
                  ) : (
                    getAttachmentData?.data.result.attachments.map(
                      (item: any, index: any) => {
                        return (
                          <Row key={index}>
                            <Col xs={2}></Col>
                            <Col xs={2}>{index + 1}</Col>
                            <Col xs={4}>{item.title}</Col>
                            <Col xs={2}>
                              <div className={Styles.buttonDiv}>
                                <a
                                  href={`${
                                    process.env.REACT_APP_UPLOAD_SERVER_PATH
                                  }/${correctUploadPath(item.filePath)}`}
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
                            <Col xs={2}></Col>
                          </Row>
                        );
                      }
                    )
                  )}
                </Container>
              </FormDivider>
              {getChallengesData?.data.result.challenges[0].id && (
                <FormDivider textHeader="چالش های مشابه">
                  <Container className={Styles.container} fluid>
                    <Row>
                      <Col xs={1}></Col>
                      <Col xs={2}>ردیف</Col>
                      <Col xs={4}>عنوان</Col>
                      <Col xs={2}>مشاهده</Col>
                      <Col xs={2}>ادغام</Col>
                      <Col xs={1}></Col>
                    </Row>
                    {!getChallengesData?.data.result.challenges[0] ? (
                      <h1
                        style={{ textAlign: "center" }}
                        className={Styles.noneFound}
                      >
                        موردی یافت نشد
                      </h1>
                    ) : (
                      getChallengesData?.data.result.challenges.map(
                        (item: any, index: any) => {
                          return (
                            <Row key={index}>
                              <Col xs={1}></Col>
                              <Col xs={2}>{index + 1}</Col>
                              <Col xs={4}>{item.title}</Col>
                              <Col xs={2}>
                                <div className={Styles.buttonDiv}>
                                  <Link
                                    to={`/ChallengeManagement/View/${item.id}`}
                                    target="_blank"
                                  >
                                    <SimpleSubmitButton
                                      isLoading={false}
                                      type="button"
                                      className="mb-1"
                                      outLine
                                      btnText="مشاهده پیوست"
                                    />
                                  </Link>
                                </div>
                              </Col>
                              <Col xs={2}>
                                <SimpleSubmitButton
                                  onCLick={() => {
                                    setAcceptIsOpen(true);
                                    setSelected(item.id);
                                  }}
                                  isLoading={false}
                                  type="button"
                                  className="mb-1"
                                  outLine
                                  btnText="ادغام با این چالش"
                                />
                              </Col>
                              <Col xs={1}></Col>
                            </Row>
                          );
                        }
                      )
                    )}
                  </Container>

                  <ReactPaginate
                    previousLabel={
                      <span className={`${Styles["page-prev"]}`}>
                        <ChevronRight size={15} />
                      </span>
                    }
                    nextLabel={
                      <span className={`${Styles["page-prev"]}`}>
                        <ChevronLeft size={15} />
                      </span>
                    }
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={Math.ceil(
                      getChallengesData?.data.result.totalCount / pageSize
                    )}
                    containerClassName={`disabled-pagination-btn ${Styles["pagination-holder"]}`}
                    activeClassName={`${Styles["page-active"]}`}
                    forcePage={pageNumber - 1}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    onPageChange={(page: any) => {
                      setPageNumber(page.selected + 1);
                    }}
                  />
                </FormDivider>
              )}
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { ViewChallenge };
