import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import TopRow from "./FirstRow/TopRow";
import LastRow from "./LastRow/LastRow";


function Dashboard() {
  return (
    <Container className="mx-4 px-0">
      <TopRow />
      <div className={`${styles.SecondRow} d-flex mt-5`}>
        <div className={`${styles.status}`}>
          <p></p>
        </div>
        <div className={`${styles.status}`}>
          <p></p>
        </div>
        <div className={`${styles.status}`}>
          <p></p>
        </div>
        <div className={`${styles.status}`}>
          <p></p>
        </div>
      </div>
      <div className={`${styles.ThirdRow} d-flex mt-5`}>
        {/* The 1st Report */}
        <LastRow />

        
      </div>
    </Container>
  );
}

export default Dashboard;
