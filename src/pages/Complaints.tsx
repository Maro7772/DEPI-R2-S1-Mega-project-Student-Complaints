import { HeadBar, Heading } from "@common/index";
import {
  AddComplaint,
  ViewModal,
  EditComplaint,
  AddSolution
} from "@layouts/index";
import { useState, useEffect } from "react";
import {
  fetchComplaints,
  updateComplaint,
  deleteComplaint,
  addComplaint
} from "@/store/complaints/complaintsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IComplaintProps } from "@/types/index";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
// import { Navigate } from "react-router-dom";

const Complaints = () => {
  const dispatch = useAppDispatch();
  const { complaints, loading, error } = useAppSelector(
    (state) => state.complaints
  );
  const { fullName, role } = useAppSelector((state) => state.user);

  console.log(fullName, role);
  // if (role === null) {
  //   return <Navigate to="/Login" />;
  // }

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false);

  const [
    selectedComplaint,
    setSelectedComplaint
  ] = useState<IComplaintProps | null>(null);
  const [
    selectedComplaintToEdit,
    setSelectedComplaintToEdit
  ] = useState<IComplaintProps | null>(null);
  const [
    selectedComplaintToResolve,
    setSelectedComplaintToResolve
  ] = useState<IComplaintProps | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = (complaint.name ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (role === "student") {
      return complaint.name === fullName && matchesSearch;
    }

    return matchesSearch;
  });

  const addNewComplaintHandler = (data: {
    name?: string;
    category: string;
    description: string;
    status: string;
  }) => {
    const newComplaint = {
      name: fullName || "Unknown",
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

  const submitSolutionHandler = (solution: string) => {
    if (!selectedComplaintToResolve) return;

    const updatedComplaint = {
      ...selectedComplaintToResolve,
      solution,
      status: "resolved"
    };

    dispatch(updateComplaint(updatedComplaint));
    setShowAddSolutionModal(false);
  };

  const rejectComplaintHandler = () => {
    if (!selectedComplaintToResolve) return;

    const updatedComplaint = {
      ...selectedComplaintToResolve,
      solution: "",
      status: "rejected"
    };

    dispatch(updateComplaint(updatedComplaint));
    setShowAddSolutionModal(false);
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

      {selectedComplaintToResolve && (
        <AddSolution
          show={showAddSolutionModal}
          onHide={() => setShowAddSolutionModal(false)}
          onSubmit={submitSolutionHandler}
          onReject={rejectComplaintHandler}
          complaint={{
            complaint: selectedComplaintToResolve.category,
            description: selectedComplaintToResolve.description
          }}
        />
      )}

      <Container>
        <Heading title="Complaints" description="View Complaints" />
        <HeadBar title="Complaints" select={true} />

        <Container className="applications d-flex flex-column mb-4">
          <Row className="justify-content-between align-items-center w-100 px-3 py-4">
            <Col xs={8}>
              <h3 className="applications-heading">
                {role === "admin" ? "All Complaints" : "Your Complaints"}
              </h3>
            </Col>

            {role === "student" && (
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
            )}
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
                  {filteredComplaints.map((item) => (
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
                            console.log(item.solution);
                            setSelectedComplaint(item);
                            setShowViewModal(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-evenly">
                          {role === "admin" ? (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => {
                                setSelectedComplaintToResolve(item);
                                setShowAddSolutionModal(true);
                              }}
                            >
                              Add Solution
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => {
                                  setSelectedComplaintToEdit(item);
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
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                1 - {filteredComplaints.length} of {complaints.length}
              </small>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Complaints;
