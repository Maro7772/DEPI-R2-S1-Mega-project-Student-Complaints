import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Table } from "react-bootstrap";
import styles from "../Dashboard.module.css";

type StatusType = "Pending" | "Completed" | "Cancelled";

interface RowData {
  username: string;
  amount: number;
  status: StatusType;
}

interface TableRowProps {
  data: RowData;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <Row className={`${styles.TableRow}`}>
      <Col className="flex-grow-1">
        <p className={`${styles.RecName}`}>{data.username}</p>
      </Col>
      <Col className="flex-grow-0">
        <p className={`${styles.RecAmount}`}>{data.amount}</p>
      </Col>
      <Col className="flex-grow-0">
        <p className={`${styles.RecName} text-center`}>{data.status}</p>
      </Col>
      <Col className="flex-grow-0">
        <Button className={`${styles.ViewBtn}`}>View</Button>
      </Col>
    </Row>
  );
};

function LastRow() {
  const rowData: RowData[] = [
    { username: "User", amount: 123, status: "Cancelled" },
    { username: "User 2", amount: 456, status: "Pending" },
    { username: "User 3", amount: 789, status: "Completed" },
    { username: "User 4", amount: 123, status: "Cancelled" },
    { username: "User 5", amount: 345, status: "Pending" },
  ];
  return (
    <>
      <div className={`${styles.ThirdRow} d-flex mt-5`}>
        {/* The 1st Report */}
        <div className={`${styles.report} d-flex flex-column p-4`}>
          <div className="d-flex justify-content-between px-4 mb-4">
            <span className={`${styles.TableTitle}`}>Total Students</span>
          </div>
          <div className={`${styles.TableData} px-4`}>
            <Table>
              {rowData.map((data, index) => (
                <TableRow key={index} data={data} />
              ))}
            </Table>
          </div>
        </div>

        {/* The 2nd Report */}
        <div className={`${styles.report} d-flex flex-column p-4`}>
          <div className="d-flex justify-content-between px-4 mb-4">
            <span className={`${styles.TableTitle}`}>General Invoice</span>
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
