import { HeadBar, Heading } from "@common/index";
import {
  AddComplaint,
  ViewModal,
  EditComplaint,
  AddSolution
} from "@layouts/index";
import { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";

const Complaints = () => {
  const [programsData, setProgramsData] = useState([
    {
      id: 1,
      complaint: "Accounting",
      category: "Academic",
      description: "Bachelor's degrees",
      status: "Pending",
      solution: ""
    },
    {
      id: 2,
      complaint: "Anthropology & Linguistics",
      category: "Non-Academic",
      description: "Master's Degree",
      status: "Resolved",
      solution: ""
    },
    {
      id: 3,
      complaint: "Biomedical Engineering",
      category: "Academic",
      description: "Bachelor's Degree",
      status: "Pending",
      solution: ""
    },
    {
      id: 4,
      complaint: "Business Studies",
      category: "Academic",
      description: "Master's Degree",
      status: "Pending",
      solution: ""
    },
    {
      id: 5,
      complaint: "Cardiothoracic Surgery",
      category: "Academic",
      description: "Master's Degree",
      status: "Resolved",
      solution: ""
    },
    {
      id: 6,
      complaint: "Central & East Asian Art & Archaeology",
      category: "Non-Academic",
      description: "Bachelor's degrees",
      status: "Rejected",
      solution: ""
    },
    {
      id: 7,
      complaint: "Dental Surgery",
      category: "Academic",
      description: "Bachelor's degrees",
      status: "Pending",
      solution: ""
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [
    selectedComplaintForSolution,
    setSelectedComplaintForSolution
  ] = useState<{
    id: number;
    complaint: string;
    category: string;
    description: string;
    status: string;
    solution?: string;
  } | null>(null);

  const [selectedComplaint, setSelectedComplaint] = useState<{
    complaint: string;
    category: string;
    description: string;
    solution?: string;
  }>({
    complaint: "",
    category: "",
    description: "",
    solution: ""
  });

  const [selectedComplaintToEdit, setSelectedComplaintToEdit] = useState<{
    id: number;
    complaint: string;
    category: string;
    description: string;
    status: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = programsData.filter((program) =>
    program.complaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewComplaintHandler = (data: {
    complaint: string;
    category: string;
    description: string;
    status: string;
  }) => {
    const newComplaint = { id: Date.now(), ...data, solution: "" };
    setProgramsData((prevData) => [...prevData, newComplaint]);
    setShowAddModal(false);
  };

  const editComplaintHandler = (updatedComplaint: {
    id: number;
    complaint: string;
    category: string;
    description: string;
    status: string;
  }) => {
    setProgramsData((prevData) =>
      prevData.map((complaint) =>
        complaint.id === updatedComplaint.id
          ? { ...updatedComplaint, solution: complaint.solution }
          : complaint
      )
    );
    setShowEditModal(false);
  };

  const deleteComplaintHandler = (id: number) => {
    setProgramsData((prevData) =>
      prevData.filter((complaint) => complaint.id !== id)
    );
  };
  const handleSolutionSubmit = (solution: string) => {
    setProgramsData((prevData) =>
      prevData.map((item) =>
        selectedComplaintForSolution &&
        item.id === selectedComplaintForSolution.id
          ? { ...item, solution, status: "Resolved" }
          : item
      )
    );
    setShowSolutionModal(false);
  };
  const handleRejectComplaint = () => {
    setProgramsData((prevData) =>
      prevData.map((item) =>
        selectedComplaintForSolution &&
        item.id === selectedComplaintForSolution.id
          ? { ...item, status: "Rejected" } // Set status to "Rejected"
          : item
      )
    );
    setShowSolutionModal(false);
  };

  const addButton = <FontAwesomeIcon icon={faCirclePlus} className="px-2" />;

  return (
    <>
      <ViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        complaint={selectedComplaint.complaint}
        category={selectedComplaint.category}
        description={selectedComplaint.description}
        solution={selectedComplaint.solution}
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
      <AddSolution
        show={showSolutionModal}
        onReject={handleRejectComplaint}
        onHide={() => setShowSolutionModal(false)}
        complaint={
          selectedComplaintForSolution
            ? {
                complaint: selectedComplaintForSolution.complaint,
                description: selectedComplaintForSolution.description
              }
            : undefined
        }
        onSubmit={handleSolutionSubmit}
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
            <Table className="text-center" responsive>
              <thead>
                <tr>
                  <th>
                    <p>Name</p>
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
                  <tr key={item.id}>
                    <td>{item.complaint}</td>
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
                            complaint: item.complaint,
                            category: item.category,
                            description: item.description,
                            solution: item.solution
                          });
                          setShowViewModal(true);
                        }}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-evenly">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => {
                            setSelectedComplaintForSolution(item);
                            setShowSolutionModal(true);
                          }}
                        >
                          Add Solution
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedComplaintToEdit({
                              id: item.id,
                              complaint: item.complaint,
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
                                `Are you sure you want to delete ${item.complaint} complaint?`
                              )
                            ) {
                              deleteComplaintHandler(item.id);
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
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                1 - {filteredPrograms.length} of {programsData.length}
              </small>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Complaints;
