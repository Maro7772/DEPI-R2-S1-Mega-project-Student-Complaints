import { HeadBar, Heading, ModalFromMe } from "@common/index";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Table,
  Button,
  Form
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Complaint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Complaint</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Type your complaint"
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{ backgroundColor: "#280559", border: "none" }}
        >
          Add
        </Button>
        <Button
          onClick={props.onHide}
          style={{ backgroundColor: "#280559", border: "none" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
const programsData = [
  {
    program: "Accounting",
    intake: "Stern",
    certificate: "Bachelor's degrees",
    status: "Pending"
  },
  {
    program: "Anthropology & Linguistics",
    intake: "Arts & Science",
    certificate: "Master's Degree",
    status: "Resolved"
  },
  {
    program: "Biomedical Engineering",
    intake: "Engineering",
    certificate: "Bachelor's degrees",
    status: "Pending"
  },
  {
    program: "Business Studies",
    intake: "Arts & Science",
    certificate: "Master's Degree",
    status: "Pending"
  },
  {
    program: "Cardiothoracic Surgery",
    intake: "Medicine",
    certificate: "Master's Degree",
    status: "Resolved"
  },
  {
    program: "Central & East Asian Art & Archaeology",
    intake: "ISAW",
    certificate: "Bachelor's degrees",
    status: "Rejected"
  },
  {
    program: "Dental Surgery",
    intake: "Dentistry",
    certificate: "Bachelor's degrees",
    status: "Pending"
  }
];

const Complaints = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = programsData.filter((program) =>
    program.program.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const addButton = <FontAwesomeIcon icon={faCirclePlus} className="px-2" />;
  return (
    <>
      <ModalFromMe show={showModal} closeModal={() => setShowModal(false)} />
      <Container>
        <Heading title="Complaints" description="view All Complaints" />
        <HeadBar title="Complaints" select={true} />
        <Container className="applications d-flex flex-column mb-4">
          <Row className="justify-content-between align-items-center w-100 px-3 py-4">
            <Col xs={8} className="pe4">
              <h3 className="applications-heading">Your Complaints</h3>
            </Col>
            <Col xs="auto">
              <Button
                className="btn-custom"
                style={{ border: "none", backgroundColor: "#280559" }}
                onClick={() => setShow(true)}
              >
                {addButton}
                <span className="px-2">Add New Complaint</span>
              </Button>
              <MyVerticallyCenteredModal
                show={show}
                onHide={() => setShow(false)}
              />
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
            <div className="d-flex gap-2 flex-shrink-0">
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#fff",
                  color: "#280559"
                }}
                className="filter-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-filter"
                >
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
                Filters
              </Button>
              <Button
                className="export-btn"
                style={{
                  border: "none",
                  backgroundColor: "#fff",
                  color: "#280559"
                }}
              >
                Export
              </Button>
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
                {filteredPrograms.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.program}</td>
                    <td>{item.intake}</td>
                    <td>{item.certificate}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => setShowModal(true)}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-evenly">
                        <Button variant="outline-secondary" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm">
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
