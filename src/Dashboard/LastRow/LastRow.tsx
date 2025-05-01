import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import styles from "../Dashboard.module.css";

type StatusType = "Pending" | "Completed" | "Cancelled";

interface UserNameProps {
  username: string;
}

interface AmountProps {
  value: number;
}

interface StatusProps {
  status: StatusType;
}

const UserName = ({ username }: UserNameProps) => (
  <p className={styles.RecName}>{username}</p>
);

const Amount = ({ value }: AmountProps) => (
  <p className={styles.RecAmount}>{value}</p>
);

const Status = ({ status }: StatusProps) => (
  <p className={styles.RecName}>{status}</p>
);

function LastRow() {
  return (
    <>
      <div className={`${styles.ThirdRow} d-flex mt-5`}>
        {/* The 1st Report */}
        <div className={`${styles.report} d-flex flex-column p-4`}>
          <div className="d-flex justify-content-between px-4 mb-4">
            <span className={`${styles.TableTitle}`}>Total Students</span>
            <Button className={`${styles.ViewAllBtn}`}>View All</Button>
          </div>
          <div className={`${styles.TableData} px-4`}>
            <Row className={`${styles.TableRow}`}>
              <Col className="flex-grow-1">
                <p className={`${styles.ColTitle}`}>Recipient</p>
                <UserName username="User" />
                <UserName username="User 2" />
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle}`}>Amount</p>
                <Amount value={123} />
                <Amount value={456} />
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle} text-center`}>Status</p>
                <Status status="Cancelled" />
                <Status status="Pending" />
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle} text-center`}>Action</p>
                <Button className={`${styles.ViewBtn}`}>View</Button>
              </Col>
            </Row>
          </div>
        </div>

        {/* The 2nd Report */}
        <div className={`${styles.report} d-flex flex-column p-4`}>
          <div className="d-flex justify-content-between px-4 mb-4">
            <span className={`${styles.TableTitle}`}>General Invoice</span>
            <Button className={`${styles.ViewAllBtn}`}>View All</Button>
          </div>
          <div className={`${styles.TableData} px-4`}>
            <Row className={`${styles.TableRow}`}>
              <Col className="flex-grow-1">
                <p className={`${styles.ColTitle}`}>Recipient</p>
                <p className={`${styles.RecName}`}>User</p>
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle}`}>Amount</p>
                <p className={`${styles.RecAmount} text-center`}>$123</p>
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle} text-center`}>Status</p>
                <p className={`${styles.RecStatus}`}>Completed</p>
              </Col>
              <Col className="flex-grow-0">
                <p className={`${styles.ColTitle} text-center`}>Action</p>
                <Button className={`${styles.ViewBtn}`}>View</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default LastRow;
