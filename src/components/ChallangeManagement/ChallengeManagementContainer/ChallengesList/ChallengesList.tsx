import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./ChallengesList.module.scss";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { UseGetChallenges } from "../../../../core/services/api/get-challenges.api";

export interface ChallengesListProps {}

const ChallengesList: React.FC<ChallengesListProps> = () => {
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [challengeStatus, setChallengeStatus] = useState(0);
  const [loadInTimeChallenge, setLoadInTimeChallenges] = useState(false);

  const statusText = [
    "آزاد",
    "در انتظار ثبت نهایی",
    "ثبت نهایی چالش",
    "رد چالش",
    "تأیید و پیوست در چالشی دیگر",
    "تأیید چالش",
  ];
  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetChallenges();

  useEffect(() => {
    mutate({
      page: 1,
      pageSize: pageSize,
    });
  }, []);
  useEffect(() => {
    mutate({
      page: pageNumber,
      pageSize: pageSize,
      status: challengeStatus ? challengeStatus : null,
      loadInTimeChallenges: loadInTimeChallenge,
    });
  }, [pageSize, pageNumber, challengeStatus, loadInTimeChallenge]);
  const history = useHistory();

  return isLoading || !isSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik initialValues={{ a: "a" }} onSubmit={() => {}}>
        <Form>
          <Alert color="info">
            شما میتوانید از طریق این بخش چالش های نمایش داده شده را مشاهده کنید
          </Alert>
          <FormDivider classNames={Styles.divider} textHeader="نمایش چالش ها">
            <TwoColumn>
              <div>
                <BasicSelectOption
                  lableText="وضعیت چالش"
                  onChange={(e) => {
                    console.log(e);
                    setChallengeStatus(e.value);
                  }}
                  selectedDefault={{
                    value: challengeStatus,
                    label: statusText[challengeStatus],
                  }}
                  name="Status"
                  data={[
                    {
                      label: "انتخاب کنید",
                      options: [
                        { value: 0, label: "آزاد" },
                        { value: 1, label: "در انتظار ثبت نهایی" },
                        { value: 2, label: "ثبت نهایی چالش" },
                        { value: 3, label: "رد چالش" },
                        { value: 4, label: "تأیید و پیوست در چالشی دیگر" },
                        { value: 5, label: "تأیید چالش" },
                      ],
                    },
                  ]}
                />
              </div>
              <div>
                <BasicSelectOption
                  lableText="تنها نمایش چالش های جاری"
                  onChange={(e) => {
                    console.log(e);
                    setLoadInTimeChallenges(e.value ? true : false);
                  }}
                  selectedDefault={{
                    value: loadInTimeChallenge ? 1 : 0,
                    label: loadInTimeChallenge ? "بلی" : "خیر",
                  }}
                  name="LoadInTimeChallenges"
                  data={[
                    {
                      label: "انتخاب کنید",
                      options: [
                        { value: 0, label: "خیر" },
                        { value: 1, label: "بلی" },
                      ],
                    },
                  ]}
                />
              </div>
            </TwoColumn>

            <Container className={Styles.container} fluid>
              <Row>
                <Col xs={2}>
                  <div className={Styles.selectDiv}>
                    <BasicSelectOption
                      lableText="تعداد نمایش"
                      onChange={(e) => {
                        setPageSize(e.label);
                      }}
                      significant={false}
                      selectedDefault={{
                        value: pageSize === 8 ? 1 : pageSize === 10 ? 2 : 3,
                        label: pageSize,
                      }}
                      name="pageSize"
                      data={[
                        {
                          label: "انتخاب کنید",
                          options: [
                            { value: 1, label: 8 },
                            { value: 2, label: 10 },
                            { value: 3, label: 16 },
                          ],
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col xs={3}> </Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>
                <Col xs={3}></Col>
              </Row>
              <Row>
                <Col xs={2}>ردیف</Col>
                <Col xs={3}>عنوان</Col>
                <Col xs={2}>تاریخ ثبت</Col>
                <Col xs={2}>وضعیت</Col>
                <Col xs={3}>مشاهده جزئیات</Col>
              </Row>
              {!data?.data.result.challenges[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.challenges.map((item: any, index: any) => {
                  return (
                    <Row key={index}>
                      <Col xs={2}>
                        {index + (pageNumber - 1) * pageSize + 1}
                      </Col>
                      <Col xs={3}>{item.title}</Col>
                      <Col xs={2}>{item.startDateTimeShowAsJalali}</Col>
                      <Col xs={2}>{item.statusText}</Col>
                      <Col xs={3}>
                        <div className={Styles.buttonDiv}>
                          <Link to={"/ChallengeManagement/View/" + item.id}>
                            <SimpleSubmitButton
                              isLoading={false}
                              type="submit"
                              className="mb-1"
                              outLine
                              btnText="مشاهده و ویرایش"
                            />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  );
                })
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
              pageCount={Math.ceil(data?.data.result.totalCount / pageSize)}
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
        </Form>
      </Formik>
    </>
  );
};

export { ChallengesList };
