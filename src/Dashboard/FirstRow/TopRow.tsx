import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Dashboard.module.css";
import React from "react";

interface Props {
  title: string;
  value: number;
}

const MyComponent: React.FC<Props> = ({ title, value }) => {
  if (title === "Annual revenue") {
    return (
      <div className={`${styles.item}`}>
        <span className={`${styles.CustomValue}`}>${value.toLocaleString()}</span>
        <span className={`${styles.CustomTitle}`}>{title}</span>
      </div>
    );
  }
  return (
    <div className={`${styles.item}`}>
      <span className={`${styles.CustomValue}`}>{value.toLocaleString()}</span>
      <span className={`${styles.CustomTitle}`}>{title}</span>
    </div>
  );
};

function TopRow() {
  return (
    <>
      <div className={`${styles.FirstRow} d-flex my-3`}>
        <MyComponent title="Total Students" value={653} />
        <MyComponent title="Total Applications" value={201} />

        <MyComponent title="Number of Universities" value={34} />

        <MyComponent title="Overall Invoices" value={3024} />
        <MyComponent title="Annual revenue" value={19216} />
      </div>
    </>
  );
}

export default TopRow;
