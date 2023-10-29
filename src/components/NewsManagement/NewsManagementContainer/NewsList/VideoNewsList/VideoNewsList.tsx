import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import { FormDivider, SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./VideoNewsList.module.scss";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { UseGetTextNews } from "../../../../../core/services/api/get-text-news.api";
import {
  NewsContentType,
  NewsPriority,
  NewsType,
} from "../../../../../core/enums";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { UseGetVideoNews } from "../../../../../core/services/api/get-video-news.api";

export interface VideoNewsListProps {}

const VideoNewsList: React.FC<VideoNewsListProps> = () => {
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterValue, setFilterValue] = useState({
    IsActive: {
      filterOn: false,
      filterValue: false,
    },

    NewsContentType: {
      filterOn: false,
      filterValue: 0,
    },
  });
  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetVideoNews();

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
      isActive: filterValue.IsActive.filterOn
        ? filterValue.IsActive.filterValue
          ? true
          : false
        : null,
    });
  }, [pageSize, pageNumber, filterValue]);
  const [contentType, setContentType] = useState(3);
  const history = useHistory();
  useEffect(() => {
    if (contentType === 1) history.push("/NewsManagement/NewsList/TextNews");
    else if (contentType === 2)
      history.push("/NewsManagement/NewsList/PhotoNews");
    else if (contentType === 3)
      history.push("/NewsManagement/NewsList/VideoNews");
    else return;
  }, [contentType]);
  return isLoading || !isSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik initialValues={{ a: "a" }} onSubmit={() => {}}>
        <Form>
          <Alert color="info">
            شما میتوانید از طریق این بخش خبر نمایش داده شده را مشاهده کنید
          </Alert>
          <FormDivider classNames={Styles.divider} textHeader="نمایش اخبار">
            <TwoColumn>
              <TwoColumn>
                <div>
                  <BasicSelectOption
                    lableText="نوع محتوا خبر"
                    significant={true}
                    onChange={(e) => {
                      setContentType(e.value);
                    }}
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
                          { value: 2, label: NewsContentType.PhotoNews },
                          { value: 3, label: NewsContentType.VideoNews },
                        ],
                      },
                    ]}
                  />
                </div>
                <div></div>
              </TwoColumn>

              <TwoColumn>
                <div></div>
                <div>
                  <BasicSelectOption
                    lableText="وضعیت خبر"
                    significant={true}
                    onChange={(e) => {
                      setFilterValue({
                        ...filterValue,
                        IsActive: {
                          filterOn: e.value === 0 ? false : true,
                          filterValue: e.value,
                        },
                      });
                    }}
                    selectedDefault={{
                      value: filterValue.IsActive.filterOn
                        ? filterValue.IsActive.filterValue
                          ? 1
                          : 2
                        : 0,
                      label: filterValue.IsActive.filterOn
                        ? filterValue.IsActive.filterValue
                          ? "فعال"
                          : "غیر فعال"
                        : "آزاد",
                    }}
                    name="IsActive"
                    data={[
                      {
                        label: "انتخاب کنید",
                        options: [
                          {
                            value: 0,
                            label: "آزاد",
                          },
                          { value: 1, label: "فعال" },
                          { value: 2, label: "غیر فعال" },
                        ],
                      },
                    ]}
                  />
                </div>
              </TwoColumn>
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
                      selectedDefault={{ value: 1, label: 8 }}
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
                <Col xs={2}>تاریخ انتشار</Col>
                <Col xs={2}>حالت نمایش</Col>
                <Col xs={3}>مشاهده جزئیات</Col>
              </Row>
              {!data?.data.result.newsList[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.newsList.map((item: any, index: any) => {
                  return (
                    <Row key={index}>
                      <Col xs={2}>
                        {index + (pageNumber - 1) * pageSize + 1}
                      </Col>
                      <Col xs={3}>{item.title}</Col>
                      <Col xs={2}>{item.publishedDateTimeAsJalali}</Col>
                      <Col xs={2}>
                        {item.isActive ? (
                          <p>
                            فعال <span className={Styles.isActive}>است</span>
                          </p>
                        ) : (
                          <p>
                            فعال{" "}
                            <span className={Styles.isNotActive}>نیست</span>
                          </p>
                        )}
                      </Col>
                      <Col xs={3}>
                        <div className={Styles.buttonDiv}>
                          <Link
                            to={
                              "/NewsManagement/AlterNews/VideoNews/" + item.id
                            }
                          >
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

export { VideoNewsList };
