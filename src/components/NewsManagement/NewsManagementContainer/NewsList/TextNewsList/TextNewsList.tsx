import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import { FormDivider, SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./TextNewsList.module.scss";
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

export interface TextNewsListProps {}

const TextNewsList: React.FC<TextNewsListProps> = () => {
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterValue, setFilterValue] = useState({
    IsActive: {
      filterOn: false,
      filterValue: false,
    },
    NewsPriority: {
      filterOn: false,
      filterValue: 0,
    },
    NewsType: {
      filterOn: false,
      filterValue: 0,
    },
    NewsContentType: {
      filterOn: false,
      filterValue: 0,
    },
  });
  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetTextNews();

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
      newsType: filterValue.NewsType.filterOn
        ? filterValue.NewsType.filterValue
        : null,
      newsPriority: filterValue.NewsPriority.filterOn
        ? filterValue.NewsPriority.filterValue
        : null,
    });
  }, [pageSize, pageNumber, filterValue]);
  const history = useHistory();
  const [contentType, setContentType] = useState(1);
  useEffect(() => {
    if (contentType === 1) history.push("/NewsManagement/NewsList/TextNews");
    else if (contentType === 2)
      history.push("/NewsManagement/NewsList/PhotoNews");
    else if (contentType === 3)
      history.push("/NewsManagement/NewsList/VideoNews");
    else return;
  }, [contentType]);
  const NewsPriorityKeys = ["ازاد", "کم", "متوسط", "زیاد", "داغ", "بحرانی"];
  const NewsTypeKeys = ["ازاد", "پوششی", "تولیدی", "ارسالی", "دریافتی", "نقلی"];
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
                      value: 1,
                      label: NewsContentType.TextNews,
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
                <div>
                  <BasicSelectOption
                    lableText="نوع خبر"
                    significant={true}
                    onChange={(e) => {
                      setFilterValue({
                        ...filterValue,
                        NewsType: {
                          filterOn: e.value === 0 ? false : true,
                          filterValue: e.value,
                        },
                      });
                    }}
                    selectedDefault={{
                      value: NewsTypeKeys[filterValue.NewsType.filterValue],
                      label: NewsTypeKeys[filterValue.NewsType.filterValue],
                    }}
                    name="NewsType"
                    data={[
                      {
                        label: "انتخاب کنید",
                        options: [
                          {
                            value: 0,
                            label: "آزاد",
                          },
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
                      value:
                        NewsPriorityKeys[filterValue.NewsPriority.filterValue],
                      label:
                        NewsPriorityKeys[filterValue.NewsPriority.filterValue],
                    }}
                    name="NewsPriority"
                    onChange={(e) => {
                      setFilterValue({
                        ...filterValue,
                        NewsPriority: {
                          filterOn: e.value === 0 ? false : true,
                          filterValue: e.value,
                        },
                      });
                    }}
                    data={[
                      {
                        label: "انتخاب کنید",
                        options: [
                          {
                            value: 0,
                            label: "آزاد",
                          },
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
                            to={"/NewsManagement/AlterNews/TextNews/" + item.id}
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

export { TextNewsList };
