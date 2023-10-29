import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import Styles from "./ActiveProvinces.module.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { UseGetActiveProvinces } from "../../../../core/services/api/get-active-provinces.api";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { UseGetMap } from "../../../../core/services/api/get-map.api";

export interface ActiveProvincesProps {}

const ActiveProvinces: React.FC<ActiveProvincesProps> = () => {
  const { data, isLoading, isError } = UseGetMap();

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

  return isLoading ? (
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
                <div></div>
                <div></div>
              </TwoColumn>
            </TwoColumn>
            <Container className={Styles.container} fluid>
              <Row>
                <Col xs={2}>ردیف</Col>
                <Col xs={2}>عنوان</Col>
                <Col xs={3}>توضیحات</Col>
                <Col xs={3}>لینک مربوطه</Col>
                <Col xs={2}>نمایش</Col>
              </Row>
              {!data?.data.result[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.map((item: any, index: any) => {
                  return (
                    <Row key={index}>
                      <Col xs={2}>
                        {index + (pageNumber - 1) * pageSize + 1}
                      </Col>
                      <Col xs={2}>{item.province.description}</Col>
                      <Col xs={3}>{item.description}</Col>
                      <Col xs={3}>{item.websiteAddress}</Col>
                      <Col xs={2}>
                        <div className={Styles.buttonDiv}>
                          <Link
                            to={
                              "/ProvinceListing/AlterProvince/" +
                              item.province.province
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
          </FormDivider>
        </Form>
      </Formik>
    </>
  );
};

export { ActiveProvinces };
