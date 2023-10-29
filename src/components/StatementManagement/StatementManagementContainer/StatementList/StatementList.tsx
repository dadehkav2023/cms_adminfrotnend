import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./StatementList.module.scss";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { UseGetStatement } from "../../../../core/services/api/get-statement.api";

export interface StatementListProps {}

const StatementList: React.FC<StatementListProps> = () => {
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterValue, setFilterValue] = useState({
    IsActive: {
      filterOn: false,
      filterValue: false,
    },
    loadPublishStatements: {
      filterOn: false,
      filterValue: false,
    },
  });
  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetStatement();

  useEffect(() => {
    mutate({
      page: 1,
      pageSize: pageSize,
    });
  }, []);

  useEffect(() => {
    filterValue.loadPublishStatements.filterOn &&
      mutate({
        page: pageNumber,
        pageSize: pageSize,
        isActive: filterValue.IsActive.filterOn
          ? filterValue.IsActive.filterValue
          : null,
        loadPublishStatements: filterValue.loadPublishStatements.filterOn
          ? filterValue.loadPublishStatements.filterValue
          : null,
      });
    !filterValue.loadPublishStatements.filterOn &&
      mutate({
        page: pageNumber,
        pageSize: pageSize,
        isActive: filterValue.IsActive.filterOn
          ? filterValue.IsActive.filterValue
          : null,
      });
  }, [pageSize, pageNumber, filterValue]);
  const history = useHistory();

  return isLoading || !isSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik initialValues={{ a: "a" }} onSubmit={() => {}}>
        <Form>
          <Alert color="info">
            شما میتوانید از طریق این بخش بیانیه نمایش داده شده را مشاهده کنید
          </Alert>
          <FormDivider classNames={Styles.divider} textHeader="نمایش بیانیه ها">
            <TwoColumn>
              <div>
                <BasicSelectOption
                  lableText="وضعیت بیانیه"
                  significant={true}
                  onChange={(e) => {
                    setFilterValue({
                      ...filterValue,
                      IsActive: {
                        filterOn: e.value === 0 ? false : true,
                        filterValue: e.value === 1 ? true : false,
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
              <div>
                <BasicSelectOption
                  lableText="وضعیت انتشار"
                  significant={true}
                  onChange={(e) => {
                    setFilterValue({
                      ...filterValue,
                      loadPublishStatements: {
                        filterOn: e.value === 0 ? false : true,
                        filterValue: e.value === 1 ? true : false,
                      },
                    });
                  }}
                  selectedDefault={{
                    value: filterValue.loadPublishStatements.filterOn
                      ? filterValue.loadPublishStatements.filterValue
                        ? 1
                        : 2
                      : 0,
                    label: filterValue.loadPublishStatements.filterOn
                      ? filterValue.loadPublishStatements.filterValue
                        ? "منتشر شده"
                        : "منتشر نشده"
                      : "آزاد",
                  }}
                  name="loadPublishStatements"
                  data={[
                    {
                      label: "انتخاب کنید",
                      options: [
                        {
                          value: 0,
                          label: "آزاد",
                        },
                        { value: 1, label: "منتشر شده" },
                        { value: 2, label: "منتشر نشده" },
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
              {!data?.data.result.statementList[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.statementList.map((item: any, index: any) => {
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
                              "/StatementManagement/AlterStatement/" + item.id
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

export { StatementList };
