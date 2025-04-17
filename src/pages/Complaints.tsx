import HeadBar from "@common/Headbar/HeadBar";
import Heading from "@common/Heading/Heading";
import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  Pagination,
  Dropdown
} from "react-bootstrap";

const programsData = [
  { program: "Accounting", intake: "Stern", certificate: "Bachelor's degrees" },
  {
    program: "Anthropology & Linguistics",
    intake: "Arts & Science",
    certificate: "Master's Degree"
  },
  {
    program: "Biomedical Engineering",
    intake: "Engineering",
    certificate: "Bachelor's degrees"
  },
  {
    program: "Business Studies",
    intake: "Arts & Science",
    certificate: "Master's Degree"
  },
  {
    program: "Cardiothoracic Surgery",
    intake: "Medicine",
    certificate: "Master's Degree"
  },
  {
    program: "Central & East Asian Art & Archaeology",
    intake: "ISAW",
    certificate: "Bachelor's degrees"
  },
  {
    program: "Dental Surgery",
    intake: "Dentistry",
    certificate: "Bachelor's degrees"
  }
];

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = programsData.filter((program) =>
    program.program.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Heading title="Complaints" description="view all Complaints" />
      <HeadBar title="Complaints" />
      <div className="container py-4">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Table responsive>
          <thead className="table-light">
            <tr>
              <th>Program Name</th>
              <th>Intake</th>
              <th>Certificate</th>
              <th>Action</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((item, idx) => (
              <tr key={idx}>
                <td>{item.program}</td>
                <td>{item.intake}</td>
                <td>{item.certificate}</td>
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
            ))}
          </tbody>
        </Table>

        {/* Pagination UI */}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            1 - {filteredPrograms.length} of {programsData.length}
          </small>
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
