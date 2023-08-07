import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// const AddCabin = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };
//   return (
//     <div>
//       <Button onClick={() => setModalOpen((show) => !show)}>
//         Add the cabin
//       </Button>
//       {modalOpen && (
//         <Modal onCloseModal={handleCloseModal}>
//           <CreateCabinForm onCloseModal={handleCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
