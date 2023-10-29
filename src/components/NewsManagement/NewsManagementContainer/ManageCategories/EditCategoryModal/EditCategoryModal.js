import { Form, Formik } from "formik";
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { X, Plus } from "react-feather";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
} from "../../../../common/Form";
import Styles from "./EditCategoryModal.module.scss";
import { UseEditCategory } from "../../../../../core/services/api/edit-news-category.api";
import { EditCategoryValidation } from "../../../../../core/validations/edit-category.validations";
const EditCategoryModal = ({ editMutate, id, isOpen, modalToggled }) => {
  const handleSubmit = (values) => {
    editMutate({ Id: id, Title: values.Title });
    modalToggled();
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{ Title: "" }}
        onSubmit={handleSubmit}
        validationSchema={EditCategoryValidation}
      >
        {(params) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                ویرایش دسته بندی
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <TextInput
                      lableText="تیتر دسته بندی"
                      name="Title"
                      significant
                      placeholder="تیتر دسته بندی"
                    />
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
export { EditCategoryModal };
