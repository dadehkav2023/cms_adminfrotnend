import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { DropZone } from "../../../DropZone/DropZone";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data?: any;
  accept?: string;
  removeServedFiles?: () => void;
}

const SelectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
  accept,
  removeServedFiles,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>انتخاب اسناد</ModalHeader>
        <ModalBody>
          <DropZone
            removeServedFiles={removeServedFiles}
            toggleModal={toggleModal}
            name="files"
            accept={accept}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export { SelectModal };
