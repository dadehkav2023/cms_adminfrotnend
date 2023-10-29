import { Form, Formik } from "formik";
import React from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
} from "reactstrap";
import { SimpleSubmitButton } from "../../../common/Form";
import Styles from "./DeleteQuickAccessModal.module.scss";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
const DeleteQuickAccessModal = ({
  id,
  isOpen,
  modalToggled,
  loading,
  mutate,
}) => {
  const handleSubmit = (values) => {
    mutate();
  };

  return loading ? (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{}}
        onSubmit={handleSubmit}
        //validationSchema={EditQuickAccessValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                حذف خدمت
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <FallBackSpinner />
                  </CardBody>
                </Card>
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
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                حذف خدمت
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <Alert color="danger">
                      آیا از حذف آیتم مورد نظر اطمینان دارید؟
                    </Alert>
                    <TwoColumn>
                      <div className={Styles.centerChildren}>
                        <SimpleSubmitButton
                          isLoading={false}
                          type="submit"
                          onCLick={() => {
                            mutate();
                          }}
                          className="mb-1"
                          outLine
                          btnText="حذف"
                        />
                      </div>
                      <div className={Styles.centerChildren}>
                        <SimpleSubmitButton
                          isLoading={false}
                          onCLick={() => {
                            modalToggled();
                          }}
                          type="button"
                          className="mb-1"
                          outLine
                          btnText="لغو"
                        />
                      </div>
                    </TwoColumn>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter className="justify-content-start"></ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
export { DeleteQuickAccessModal };
