import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Table, Form, InputGroup, Pagination, Dropdown } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";
import styles from "./StudentDashboard.module.css";

interface Props {
  name: string;
  email: string;
  age: number;
  totalApplications: number;
  gender: string;
  address: string;
  phone: string;
  nationality: string;
}

interface ApplicationProps {
  id: string;
  date: string;
  status: string;
  remark: string;
}

const StudentDataInfo: React.FC<Props> = ({
  name,
  email,
  age,
  totalApplications,
  gender,
  address,
  phone,
  nationality,
}) => {
  return (
    <>
      <div>
        <p>Full Name: {name}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
        <p>Total Applications: {totalApplications}</p>
      </div>
      <div>
        <p>Gender: {gender}</p>
        <p>Address: {address}</p>
        <p>Phone: {phone}</p>
        <p>Nationality: {nationality}</p>
      </div>
    </>
  );
};

const ApplicationInfo: React.FC<ApplicationProps> = ({
  date,
  status,
  remark,
}) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{status}</td>
      <td>{remark}</td>
      <td>
        <Button variant="outline-dark" size="sm">
          View
        </Button>
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm">
            ⋮
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

function StudentDashboard() {
  return (
    <Container className="mx-0 px-5">
      <div className={`${styles.Summary} d-flex flex-row my-2 p-4`}>
        <div
          className={`${styles.Img} d-flex justify-content-center align-items-center m-5`}
        >
          <span>Profile Image</span>
        </div>
        <div className={`${styles.Info}`}>
          <p className={`${styles.SectionTitle}`}>Summary</p>
          <hr />
          <div className="d-flex flex-row justify-content-evenly mt-5">
            <StudentDataInfo
              name="John Doe"
              email="john.doe@example.com"
              age={25}
              totalApplications={10}
              gender="Male"
              address="123 Main St, City, Country"
              phone="01234567890"
              nationality="Egyptian"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.Indicators} d-flex my-2 p-4`}>
        <div className={`${styles.ColorQuestion} px-4`}>
          <p className={`${styles.SectionTitle}`}>What does the color mean?</p>
          <div className="d-flex flex-row">
            <div
              className={`${styles.Rectangle} d-flex justify-content-center align-items-center`}
            >
              <span className={`${styles.ColorPercentage}`}>73%</span>
            </div>
            <div className="d-flex flex-column px-4 justify-content-between">
              <span className="pt-4">Your application is in progress</span>
              <span className="pb-4">Your application has been submitted</span>
            </div>
          </div>
        </div>
        <div className={`${styles.ColorInfo}`}>
          <p className={`${styles.SectionTitle}`}>Color Info</p>
          <p className="pt-2">
            <span className="px-0">
              <FaSpinner
                style={{ color: "#00f531", width: "4vw", height: "4vh" }}
              />
            </span>
            Your application is progressing accordingly
          </p>
          <p className="pt-4">
            <span className="px-0">
              <FaSpinner
                style={{ color: "#FFD43B", width: "4vw", height: "4vh" }}
              />
            </span>
            Your application is pending additional documents or correction by
            your institution
          </p>
          <p className="pt-1">
            <span className="px-0">
              <FaSpinner
                style={{ color: "#f50000", width: "4vw", height: "4vh" }}
              />
              Your application has been rejected/expired at the current stage.
              Please contact your institution for advice
            </span>
          </p>
        </div>
      </div>
      <div className={`${styles.Applications}`}>
        <div className="container py-4">
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search for Your Application..." />
          </InputGroup>

          <Table responsive>
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Action</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <ApplicationInfo
                id="1"
                date="2023-10-01"
                status="Pending"
                remark="Awaiting documents"
              />

              <ApplicationInfo
                id="2"
                date="2023-09-20"
                status="Pending"
                remark="Awaiting documents"
              />
              <ApplicationInfo
                id="3"
                date="2023-08-04"
                status="Pending"
                remark="Awaiting documents"
              />
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default StudentDashboard;
