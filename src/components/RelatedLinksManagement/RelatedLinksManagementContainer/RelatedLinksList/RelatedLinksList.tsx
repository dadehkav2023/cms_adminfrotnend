import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./RelatedLinksList.module.scss";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import { UseGetRelatedLinks } from "../../../../core/services/api/get-related-links.api";

export interface RelatedLinksListProps {}

const RelatedLinksList: React.FC<RelatedLinksListProps> = () => {
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [activeFilterValue, setActiveFilterValue] = useState({
    filterOn: false,
    filterStatus: false,
  });
  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetRelatedLinks();

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
      isActive: activeFilterValue.filterOn
        ? activeFilterValue.filterStatus
        : null,
    });
  }, [
    pageSize,
    pageNumber,
    activeFilterValue.filterOn,
    activeFilterValue.filterStatus,
  ]);
  return isLoading || !isSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik initialValues={{ a: "A" }} onSubmit={() => {}}>
        <Form>
          <Alert color="info">
            شما میتوانید از طریق این بخش دسترسی های سریع نمایش داده شده را
            مشاهده کنید
          </Alert>
          <FormDivider
            classNames={Styles.divider}
            textHeader="نمایش دسترسی های سریع"
          >
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
                <Col xs={3}>
                  <div className={Styles.selectDiv}>
                    <BasicSelectOption
                      lableText="وضعیت نمایش"
                      onChange={(e) => {
                        setActiveFilterValue({
                          filterOn: e.label === "آزاد" ? false : true,
                          filterStatus:
                            e.label === "آزاد"
                              ? true
                              : e.label === "بلی"
                              ? true
                              : false,
                        });
                      }}
                      significant={false}
                      selectedDefault={{
                        value: activeFilterValue.filterOn
                          ? activeFilterValue.filterStatus
                            ? 2
                            : 3
                          : 1,
                        label: activeFilterValue.filterOn
                          ? activeFilterValue.filterStatus
                            ? "بلی"
                            : "خیر"
                          : "آزاد",
                      }}
                      name="pageSize"
                      data={[
                        {
                          label: "انتخاب کنید",
                          options: [
                            { value: 1, label: "آزاد" },
                            { value: 2, label: "بلی" },
                            { value: 3, label: "خیر" },
                          ],
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>ردیف</Col>
                <Col xs={3}>عنوان</Col>
                <Col xs={2}>لینک مربوطه</Col>
                <Col xs={2}>حالت نمایش</Col>
                <Col xs={3}>مشاهده جزئیات</Col>
              </Row>
              {!data?.data.result.relatedLinkList[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.relatedLinkList.map(
                  (item: any, index: any) => {
                    return (
                      <Row key={index}>
                        <Col xs={2}>
                          {index + (pageNumber - 1) * pageSize + 1}
                        </Col>
                        <Col xs={3}>{item.title}</Col>
                        <Col xs={2}>{item.link}</Col>
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
                                "/RelatedLinksManagement/AlterRelatedLink/" +
                                item.id
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

export { RelatedLinksList };
