import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Button onClick={() => setModalOpen((show) => !show)}>
        Add the cabin
      </Button>
      {modalOpen && (
        <Modal onCloseModal={handleCloseModal}>
          <CreateCabinForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
