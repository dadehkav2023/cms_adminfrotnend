import { Form, Formik } from "formik";
import React from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  DropZone,
  SimpleSubmitButton,
  TextInput,
} from "../../../../../common/Form";
import Styles from "./EditVideoNewsAttachmentsModal.module.scss";
import { EditCategoryValidation } from "../../../../../../core/validations/edit-category.validations";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
const EditVideoNewsAttachmentsModal = ({
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
      File: values.Attachment ? values.Attachment : null,
    });
    // modalToggled();
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
        // validationSchema={EditCategoryValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                ویرایش پیوست
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
                ویرایش پیوست
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
                      placeholder="فقط فایل های ویدیویی"
                      accept=".mp4, .mkv"
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
                  btnText="ثبت ویرایش"
                />
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
export { EditVideoNewsAttachmentsModal };
