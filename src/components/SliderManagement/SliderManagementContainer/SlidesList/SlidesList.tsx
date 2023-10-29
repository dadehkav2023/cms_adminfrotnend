import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
} from "../../../common/Form";
import { TextArea } from "../../../common/Form";
import { SetSettingValidate } from "../../../../core/validations/set-setting.validations"; //needs to change
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./SlidesList.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { SlidesListModal } from "./SlidesListModal";
import { UseGetSlides } from "../../../../core/services/api/get-slides.api";
import { Link } from "react-router-dom";
import { ListTablePaginate } from "../../../common/ListTablePaginate/ListTablePaginate";

export interface SlidesListProps {}

const SlidesList: React.FC<SlidesListProps> = () => {
  const [initialValues, setInitialValues] = useState({});
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [showFilterValue, setShowFilterValue] = useState({
    filterOn: false,
    filterStatus: false,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState({
    id: 1,
    title:
      "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
    description:
      "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
    imagePath:
      "Resources\\images\\2021\\2021-10\\ebd5512a-ebae-4c33-8f51-9ef4c60143a8slid1.jpg",
    linkAddress: "https://cms.sabakorg.ir/",
    sortOrder: 1,
    canShow: true,
    startDateTimeShow: null,
    endDateTimeShow: null,
  });
  const [listOfSlides, setListOfSlides] = useState([
    {
      id: 1,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\ebd5512a-ebae-4c33-8f51-9ef4c60143a8slid1.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 1,
      canShow: true,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: false,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: true,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: false,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: true,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: false,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: true,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: false,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: true,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
    {
      id: 2,
      title:
        "امضای تفاهمنامه همکاری میان سازمان نظام صنفی رایانه ای کشور و پارک فناوری اطلاعات و ارتیاطات",
      description:
        "به منظور زمینه سازی برای تحقق شعار سال 1400 در زمینه گسترش پشتیبانی ها و مانع زدایی و توسعه و تحکیم روابط فیمابین",
      imagePath:
        "Resources\\images\\2021\\2021-10\\acbb8f06-323e-4c21-a163-46f5f7c1a525slid2.jpg",
      linkAddress: "https://cms.sabakorg.ir/",
      sortOrder: 2,
      canShow: false,
      startDateTimeShow: null,
      endDateTimeShow: null,
    },
  ]);

  const onSubmit = async (values: any) => {};
  const { data, isError, isLoading, isSuccess, mutate } = UseGetSlides();

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
      title: null,
      canShow: showFilterValue.filterOn ? showFilterValue.filterStatus : null,
      description: null,
      startShowDateTime: null,
      endShowDateTime: null,
    });
    // setListOfSlides(data?.data.result.sliderList);
  }, [
    pageSize,
    pageNumber,
    showFilterValue.filterOn,
    showFilterValue.filterStatus,
  ]);
  return isLoading || !isSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik initialValues={{ a: "a" }} onSubmit={() => {}}>
        <Form>
          <SlidesListModal
            isOpen={modalIsOpen}
            modalToggled={() => {
              setModalIsOpen(!modalIsOpen);
            }}
            passedSlide={selectedSlide}
          />
          <Alert color="info">
            شما میتوانید از طریق این بخش اسلاید های نمایش داده شده را مشاهده
            کنید
          </Alert>
          <FormDivider classNames={Styles.divider} textHeader="نمایش اسلاید ها">
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
                      selectedDefault={{ value: 1, label: pageSize }}
                      name="pageSize"
                      data={[
                        {
                          label: "انتخاب کنید",
                          options: [
                            { value: 1, label: pageSize },
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
                        setShowFilterValue({
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
                        value: showFilterValue.filterOn
                          ? showFilterValue.filterStatus
                            ? 2
                            : 3
                          : 1,
                        label: showFilterValue.filterOn
                          ? showFilterValue.filterStatus
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
                <Col xs={2}>اولویت نمایش</Col>
                <Col xs={2}>حالت نمایش</Col>
                <Col xs={3}>مشاهده جزئیات</Col>
              </Row>
              {!data?.data.result.sliderList[0] ? (
                <h1 className={Styles.noneFound}>موردی یافت نشد</h1>
              ) : (
                data?.data.result.sliderList.map((item: any, index: any) => {
                  return (
                    <Row key={index}>
                      <Col xs={2}>
                        {index + (pageNumber - 1) * pageSize + 1}
                      </Col>
                      <Col xs={3}>{item.title}</Col>
                      <Col xs={2}>{item.sortOrder}</Col>
                      <Col xs={2}>
                        {item.canShow ? (
                          <p>
                            نمایش داده{" "}
                            <span className={Styles.canShow}>میشود</span>
                          </p>
                        ) : (
                          <p>
                            نمایش داده{" "}
                            <span className={Styles.canNotShow}>نمیشود</span>
                          </p>
                        )}
                      </Col>
                      <Col xs={3}>
                        <div
                          className={Styles.buttonDiv}
                          onClick={() => {
                            setSelectedSlide({
                              ...item,
                            });
                            setModalIsOpen(true);
                          }}
                        >
                          <Link to={"/SliderManagement/AlterSlide/" + item.id}>
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

export { SlidesList };
