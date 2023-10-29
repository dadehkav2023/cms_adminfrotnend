import { FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
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
import {
  DropZone,
  InpuLable,
  SimpleSubmitButton,
  TextInput,
} from "../../../../common/Form";
import Styles from "./AddStatementAttachmentsModal.module.scss";
import { EditCategoryValidation } from "../../../../../core/validations/edit-category.validations";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
const AddStatementAttachmentsModal = ({
  id,
  isOpen,
  modalToggled,
  loading,
  mutate,
}) => {
  const handleSubmit = (values) => {
    mutate({
      Id: id,
      Title: values.Title,
      File: values.Attachment[0] ? values.Attachment[0] : null,
    });
  };

  return loading ? (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{ Title: "", Attachment: null }}
        onSubmit={handleSubmit}
        validationSchema={EditCategoryValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                افزودن پیوست ها
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <FallBackSpinner />
              </ModalBody>
              <ModalFooter className="justify-content-start"></ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  ) : (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{ Title: "", Attachment: null }}
        onSubmit={handleSubmit}
        validationSchema={EditCategoryValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                افزودن پیوست ها
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <TextInput
                      lableText="تیتر پیوست"
                      name="Title"
                      placeholder="تیتر پیوست"
                      significant
                    />
                    <DropZone
                      name="Attachment"
                      placeholder="فقط فایل های(.pdf, .doc, .docx, .rar, .zip)"
                      accept=".pdf, .doc, .docx, .rar, .zip"
                      isSingle={true}
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
                  btnText="افزودن"
                />
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
export { AddStatementAttachmentsModal };
