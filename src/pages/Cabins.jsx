import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setModalOpen((show) => !show)}>
          Add the cabin
        </Button>
        {modalOpen && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
