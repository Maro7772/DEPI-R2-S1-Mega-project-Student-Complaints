import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import TopRow from "./FirstRow/TopRow";
import LastRow from "./LastRow/LastRow";
import SecondRow from "./SecondRow/SecondRow";

function AdminDashboard() {
  return (
    <Container className="mx-0 px-5">
      <TopRow />
      <SecondRow />
      <LastRow />
    </Container>
  );
}

export default AdminDashboard;
