import "bootstrap/dist/css/bootstrap.min.css";
import { FaCircle } from "react-icons/fa";
import styles from "../Dashboard.module.css";
import React from "react";

interface Props {
  value: number;
}

const MyComponent: React.FC<Props> = ({ value }) => {
  return <span className={`${styles.SecValue}`}>{value.toLocaleString()}</span>;
};

function SecondRow() {
  return (
    <div className={`${styles.SecondRow} d-flex mt-5`}>
      <div className={`${styles.status} d-flex flex-column`}>
        <p className={`${styles.SecTitle}`}>Leads status</p>
        <div className="d-flex flex-row w-100">
          <div className={`${styles.circle} mx-5`}></div>
          <div className="d-flex flex-column px-5">
            <p className={`${styles.StatusItem}`}>
              <span className="pe-3">
                <FaCircle style={{ color: "#02bb17" }} />
              </span>
              Item 1
            </p>
            <p className={`${styles.StatusItem}`}>
              <span className="pe-3">
                <FaCircle style={{ color: "#001eff" }} />
              </span>
              Item 2
            </p>
            <p className={`${styles.StatusItem}`}>
              <span className="pe-3">
                <FaCircle style={{ color: "#ed0202" }} />
              </span>
              Item 3
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.status} d-flex flex-column`}>
        <span className={`${styles.SecTitle}`}>Total Applications Today</span>
        <MyComponent value={200165} />
      </div>
    </div>
  );
}

export default SecondRow;
