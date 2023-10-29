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
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { SetSettingValidate } from "../../../../core/validations/set-setting.validations"; //needs to change
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./UsersList.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { UserListModal } from "./UsersListModal";
import { UseGetAllRolesApi } from "../../../../core/services/api/get-all-roles.api";
import { UseGetUsersApi } from "../../../../core/services/api/get-user.api";
import { UseDeleteRolesOfUser } from "../../../../core/services/api/delete-roles-of-user.api";
import { UseAddRolesToUser } from "../../../../core/services/api/add-roles-to-user.api";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";

export interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = () => {
  const {
    setRoleState,
    setTokenState,
    setUserInfoState,
    setUserClaimState,
    userInfo,
  } = useUserAuth();

  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    role: 0,
  });
  const [initialValues, setInitialValues] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    data: allRolesData,
    isLoading: allRolesIsLoading,
    isError: allRolesIsError,
    isSuccess: allRolesIsSuccess,
  } = UseGetAllRolesApi();
  const [selectedUser, setSelectedUser] = useState({
    id: 4,
    firstName: "محمد",
    lastName: "باقری نیا",
    userName: "2081121234",
  });

  const {
    data: getUsersData,
    isLoading: getUsersIsLoading,
    isError: getUsersIsError,
    isSuccess: getUsersIsSuccess,
    mutate: getUsersMutate,
  } = UseGetUsersApi();
  useEffect(() => {
    getUsersMutate({ page: 1, pageSize: 100 });
  }, []);

  useEffect(() => {
    getUsersMutate({
      page: pageNumber,
      pageSize: pageSize,
      userName: searchValue.userName,
      firstName: searchValue.firstName,
      lastName: searchValue.lastName,
      roleId: searchValue.role,
    });
  }, [searchValue, pageNumber, pageSize]);

  const onSubmit = async (values: any) => {};

  const {
    data: deleteRolesData,
    isLoading: deleteRolesIsLoading,
    isError: deleteRolesIsError,
    isSuccess: deleteRolesIsSuccess,
    mutate: deleteRolesMutate,
  } = UseDeleteRolesOfUser();
  const {
    data: addRolesData,
    isLoading: addRolesIsLoading,
    isError: addRolesIsError,
    isSuccess: addRolesIsSuccess,
    mutate: addRolesMutate,
  } = UseAddRolesToUser();

  return allRolesIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      {" "}
      <UserListModal
        isOpen={modalIsOpen}
        modalToggled={() => {
          setModalIsOpen(!modalIsOpen);
        }}
        nationalCode={selectedUser.userName}
        userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
        id={selectedUser.id}
        deleteIsLoading={deleteRolesIsLoading}
        deleteMutate={deleteRolesMutate}
        deleteData={deleteRolesData}
        addIsLoading={addRolesIsLoading}
        addMutate={addRolesMutate}
        addData={addRolesData}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={SetSettingValidate}
        enableReinitialize={true}
        onSubmit={(value) => onSubmit(value)}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Container fluid>
                  <Row>
                    <Col md={4}>
                      <TextInput
                        lableText="نام"
                        name="fName"
                        placeholder="نام مورد جست و جو"
                        onChange={(e) => {
                          setTimeout(() => {
                            setSearchValue({ ...searchValue, firstName: e });
                          }, 400);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <TextInput
                        lableText="نام خانوادگی"
                        name="lName"
                        placeholder="نام خانوادگی مورد جست و جو"
                        onChange={(e) => {
                          setTimeout(() => {
                            setSearchValue({ ...searchValue, lastName: e });
                          }, 400);
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <TextInput
                        lableText="کد ملی  (نام کاربری)"
                        name="username"
                        placeholder="کد ملی مورد جست و جو"
                        onChange={(e) => {
                          setTimeout(() => {
                            setSearchValue({ ...searchValue, userName: e });
                          }, 400);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <BasicSelectOption
                        lableText="نقش"
                        significant={false}
                        selectedDefault={{ value: 0, label: "همه نقش ها" }}
                        name="role"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: [
                              { value: 0, label: "همه نقش ها" },
                              ...allRolesData?.data.result.map((role: any) => {
                                return {
                                  value: role.id,
                                  label: role.displayName,
                                };
                              }),
                            ],
                          },
                        ]}
                        onChange={(e) => {
                          setTimeout(() => {
                            setSearchValue({ ...searchValue, role: +e.value });
                          }, 400);
                        }}
                      />
                    </Col>
                  </Row>
                </Container>
                <FormDivider
                  classNames={Styles.divider}
                  textHeader="نمایش کاربران"
                >
                  <Container className={Styles.container} fluid>
                    {" "}
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
                      <Col xs={1}>ردیف</Col>
                      <Col xs={2}>نام</Col>
                      <Col xs={3}>نام خانوادگی</Col>
                      <Col xs={3}>نام کاربری</Col>
                      <Col xs={3}>نقش کاربر</Col>
                    </Row>
                    {getUsersData &&
                      getUsersData.data &&
                      getUsersData?.data.result.list.map(
                        (item: any, index: any) => {
                          return (
                            <Row key={index}>
                              <Col xs={1}>{index + 1}</Col>
                              <Col xs={2}>{item.firstName}</Col>
                              <Col xs={3}>{item.lastName}</Col>
                              <Col xs={3}>{item.userName}</Col>
                              <Col xs={3}>
                                <div
                                  onClick={() => {
                                    setSelectedUser({
                                      firstName: item.firstName,
                                      lastName: item.lastName,
                                      userName: item.userName,
                                      id: item.id,
                                    });
                                    setModalIsOpen(true);
                                  }}
                                >
                                  <SimpleSubmitButton
                                    isLoading={false}
                                    type="submit"
                                    className="mb-1"
                                    outLine
                                    btnText="مشاهده نقش"
                                  />
                                </div>
                              </Col>
                            </Row>
                          );
                        }
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
                      getUsersData?.data.result.totalCount / pageSize
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
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { UsersList };
