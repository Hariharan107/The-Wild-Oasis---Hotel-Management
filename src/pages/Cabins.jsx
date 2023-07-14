import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
function Cabins() {
  useEffect(() => {
    getCabins().then((cabins) => console.log(cabins));
  }, []);
  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
      <p>TEST</p>
      <img src='https://zhwpqjjjronwhdoaffta.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTY4OTMwOTM0MCwiZXhwIjoxNjg5OTE0MTQwfQ.Jc-g-4QLZKEUGDtEfYeHRWopI11jpH6xzLJgbVv3CvQ&t=2023-07-14T17%3A06%3A00.035Z' />
    </Row>
  );
}

export default Cabins;
