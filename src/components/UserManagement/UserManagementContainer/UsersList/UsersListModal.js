import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import Styles from "./UsersListModal.module.scss";
import { UseGetRolesOfUserApi } from "../../../../core/services/api/get-roles-of-user.api";
import { UseGetAllRolesApi } from "../../../../core/services/api/get-all-roles.api";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { UseDeleteRolesOfUser } from "../../../../core/services/api/delete-roles-of-user.api";
import { UseAddRolesToUser } from "../../../../core/services/api/add-roles-to-user.api";
import { showToast } from "../../../../core/utils";
const UserListModal = ({
  id,
  userName,
  isOpen,
  modalToggled,
  nationalCode,
  deleteMutate,
  addMutate,
  deleteIsLoading,
  addIsLoading,
  deleteData,
  addData,
}) => {
  const handleSubmit = () => {};
  const [initialValues, setInitialValues] = useState({
    activeRoles: [0],
  });

  const {
    data: getActiveRolesData,
    isLoading: getActiveRolesIsLoading,
    isError: getActiveRolesIsError,
    isSuccess: getActiveRolesIsSuccess,
    refetch: refetchActiveRoles,
  } = UseGetRolesOfUserApi(id);
  const {
    data: allRolesData,
    isLoading: allRolesIsLoading,
    isError: allRolesIsError,
    isSuccess: allRolesIsSuccess,
  } = UseGetAllRolesApi();

  useEffect(() => {
    getActiveRolesData &&
      getActiveRolesData.data &&
      setInitialValues({
        activeRoles: getActiveRolesData.data.result.map((role) => role.name),
      });
  }, [getActiveRolesData]);

  const onSubmit = (value: any) => {
    const RolesToBeAdded = value.activeRoles.filter(
      (role) =>
        !getActiveRolesData.data.result.map((role) => role.name).includes(role)
    );
    RolesToBeAdded.length &&
      addMutate({ userId: id, rolesName: RolesToBeAdded });

    const RolesToBeRemoved = getActiveRolesData.data.result
      .map((role) => role.name)
      .filter((role) => !value.activeRoles.includes(role));
    RolesToBeRemoved.length &&
      deleteMutate({ userId: id, rolesName: RolesToBeRemoved });
    showToast([" نقش های کاربر با موفقیت ویرایش شد"], "success");
  };

  useEffect(() => {
    refetchActiveRoles();
  }, [addData, deleteData]);

  return deleteIsLoading || addIsLoading || getActiveRolesIsLoading ? (
    <FallBackSpinner />
  ) : (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                مشاهده کاربر
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <p>مشخصات فردی :</p>
                    <TwoColumn>
                      <div>
                        <p>نام و نام خانوادگی :</p>
                        <p> نام کاربری :</p>
                      </div>
                      <div>
                        <p>{userName}</p>
                        <p>{nationalCode}</p>
                      </div>
                    </TwoColumn>
                    <FormDivider
                      classNames={Styles.divider}
                      textHeader="مدیریت نقش ها"
                    >
                      <Container className={Styles.container} fluid>
                        <Row>
                          <Col xs={2}>ردیف</Col>
                          <Col xs={4}>نقش</Col>
                          <Col xs={3}>وضعیت</Col>
                          <Col xs={3}>تغییر</Col>
                        </Row>

                        <FieldArray
                          name="activeRoles"
                          render={(arrayHelpers) => (
                            <>
                              {allRolesData?.data.result.map((role, index) => (
                                <Row key={index}>
                                  <Col xs={2}>{index + 1}</Col>
                                  <Col xs={4}>{role.displayName}</Col>
                                  <Col xs={3}>
                                    {values.activeRoles.includes(role.name)
                                      ? "فعال"
                                      : "غیر فعال"}
                                  </Col>
                                  <Col xs={3}>
                                    <input
                                      name="activeRoles"
                                      value={role.name}
                                      checked={values.activeRoles.includes(
                                        role.name
                                      )}
                                      type="checkbox"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          arrayHelpers.push(role.name);
                                        } else {
                                          const idx =
                                            values.activeRoles.indexOf(
                                              role.name
                                            );
                                          arrayHelpers.remove(idx);
                                        }
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ))}
                            </>
                          )}
                        />
                      </Container>
                    </FormDivider>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter className="justify-content-start">
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="ذخیره تغییرات"
                />
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
export { UserListModal };
