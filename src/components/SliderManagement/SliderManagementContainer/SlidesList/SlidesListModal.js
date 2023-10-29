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
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FormDivider, SimpleSubmitButton } from "../../../common/Form";
import Styles from "./SlidesListModal.module.scss";
const SlidesListModal = ({ isOpen, modalToggled, passedSlide }) => {
  const handleSubmit = () => {};
  return (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{ file: null }}
        onSubmit={handleSubmit}
      >
        {(params) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                مشاهده اسلاید
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0"></CardBody>
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
export { SlidesListModal };
