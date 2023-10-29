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
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { DenyChallengeValidate } from "../../../../core/validations/deny-cahllenge.validations";
import { SimpleSubmitButton, TextInput, TextArea } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";

const RejectChallengeAttachmentsModal = ({
  id,
  isOpen,
  modalToggled,
  loading,
  mutate,
}) => {
  const { userInfo } = useUserAuth();

  const handleSubmit = (values) => {
    console.log(values);
    mutate({
      farmerVoiceId: id,
      provinceId: +process.env.REACT_APP_PROVINCE_ID,
      userId: userInfo.localId,
      description: values.Description,
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
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                رد چالش
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
        initialValues={{ Description: "" }}
        onSubmit={handleSubmit}
        validationSchema={DenyChallengeValidate}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                رد چالش
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <TextArea
                      lableText="توضیحات رد چالش"
                      name="Description"
                      placeholder="توضیحات رد چالش"
                      significant
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
export { RejectChallengeAttachmentsModal };
