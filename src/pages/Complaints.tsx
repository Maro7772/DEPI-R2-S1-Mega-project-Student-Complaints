<<<<<<< HEAD
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

=======
import { HeadBar, Heading } from "@common/index";
import { AddComplaint, ViewModal, EditComplaint } from "@layouts/index";
import { useState, useEffect } from "react";
import {
  fetchComplaints,
  updateComplaint,
  deleteComplaint,
  addComplaint
} from "@/store/complaints/complaintsSlice"; // Adjust the path as needed
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IComplaintProps } from "@/types/index";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";

const Complaints = () => {
  const dispatch = useAppDispatch();
  const { complaints, loading, error } = useAppSelector(
    (state) => state.complaints
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [
    selectedComplaint,
    setSelectedComplaint
  ] = useState<IComplaintProps | null>(null);
  const [
    selectedComplaintToEdit,
    setSelectedComplaintToEdit
  ] = useState<IComplaintProps | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = complaints.filter((program) =>
    (program.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewComplaintHandler = (data: {
    name?: string;
    category: string;
    description: string;
    status: string;
  }) => {
    const newComplaint = {
      name: data.name || "Unknown",
      ...data,
      solution: ""
    };
    dispatch(addComplaint(newComplaint));
    setShowAddModal(false);
  };

  const editComplaintHandler = (updatedComplaint: IComplaintProps) => {
    dispatch(updateComplaint(updatedComplaint));
    setShowEditModal(false);
  };

  const deleteComplaintHandler = (id: string) => {
    dispatch(deleteComplaint(id));
  };
  const addButton = <FontAwesomeIcon icon={faCirclePlus} className="px-2" />;

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  return (
    <>
      <ViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        name={selectedComplaint?.name}
        category={selectedComplaint?.category}
        description={selectedComplaint?.description}
        solution={selectedComplaint?.solution}
      />

      {selectedComplaintToEdit && (
        <EditComplaint
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          existingComplaint={selectedComplaintToEdit}
          editComplaintHandler={editComplaintHandler}
        />
      )}

      <AddComplaint
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        addNewComplaintHandler={addNewComplaintHandler}
      />

      <Container>
        <Heading title="Complaints" description="View Complaints" />
        <HeadBar title="Complaints" select={true} />

        <Container className="applications d-flex flex-column mb-4">
          <Row className="justify-content-between align-items-center w-100 px-3 py-4">
            <Col xs={8}>
              <h3 className="applications-heading">Your Complaints</h3>
            </Col>
            <Col xs="auto">
              <Button
                className="btn-custom"
                style={{ border: "none", backgroundColor: "#280559" }}
                onClick={() => setShowAddModal(true)}
              >
                {addButton}
                <span className="px-2">Add New Complaint</span>
              </Button>
            </Col>
          </Row>

          <div className="d-flex align-items-center gap-3 p-4 mx-3 search-application">
            <div className="flex-grow-1">
              <div className="input-group">
                <span className="input-group-text pe-none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-secondary"
                  />
                </span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search for Complaint"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="my-5 mx-3">
            {loading === "pending" && <p>Loading...</p>}
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <Table className="text-center" responsive>
                <thead>
                  <tr>
                    <th>
                      <p>Student Name</p>
                    </th>
                    <th>
                      <p>Category</p>
                    </th>
                    <th>
                      <p>Description</p>
                    </th>
                    <th>
                      <p>Status</p>
                    </th>
                    <th>
                      <p>Action</p>
                    </th>
                    <th>
                      <p>Option</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td
                        style={{
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {item.description}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => {
                            setSelectedComplaint({
                              _id: item._id,
                              name: item.name,
                              category: item.category,
                              description: item.description,
                              solution: item.solution,
                              status: item.status
                            });
                            setShowViewModal(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-evenly">
                          {/* <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              setSelectedComplaintForSolution(item);
                              setShowSolutionModal(true);
                            }}
                          >
                            Add Solution
                          </Button> */}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedComplaintToEdit({
                                _id: item._id,
                                name: item.name,
                                category: item.category,
                                description: item.description,
                                status: item.status
                              });
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${item.name} complaint?`
                                )
                              ) {
                                deleteComplaintHandler(item._id);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                1 - {filteredPrograms.length} of {complaints.length}
              </small>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};
>>>>>>> main
export default Complaints;
