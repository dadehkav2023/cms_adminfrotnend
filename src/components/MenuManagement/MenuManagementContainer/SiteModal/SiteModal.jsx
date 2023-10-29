import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const SiteModal = ({ modalData, setModalData }) => {
  const close = () => {
    setModalData({ ...modalData, show: false });
  };
  return (
    <>
      <Modal isOpen={modalData.show} toggle={close}>
        <ModalHeader toggle={close}>{modalData.title}</ModalHeader>
        <ModalBody
          dangerouslySetInnerHTML={{
            __html: modalData.body,
          }}
        ></ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={close}>
            بستن
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default SiteModal;
