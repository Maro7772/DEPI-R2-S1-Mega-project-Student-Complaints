import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./App.css";

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
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const addButton = <FontAwesomeIcon icon={faCirclePlus} className="px-2" />;
  return (
    <>
      <Container>
        <div className="my-4">
          <h1 className="heading-custom">Dashboard</h1>
          <p className="view-status-paragraph">
            View all status from the dashboard
          </p>
        </div>
        <Container className="additional-information d-flex mb-4">
          <Row className="justify-content-between align-items-start w-100 p-4">
            <Col xs={8} className="pe-4">
              <p className="additional-paragraph">
                We Need Additional Information
              </p>
              <p className="additional-text">
                Please provide additional documentation to proceed with your
                application
              </p>
            </Col>
            <Col xs="auto">
              <Button className="btn-custom">
                {addButton}
                <span className="px-2">Upload</span>
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className="applications d-flex flex-column mb-4">
          <Row className="justify-content-between align-items-center w-100 px-3 py-4">
            <Col xs={8} className="pe4">
              <h3 className="applications-heading">Your Applications</h3>
            </Col>
            <Col xs="auto">
              <Button className="btn-custom" onClick={() => setModalShow(true)}>
                {addButton}
                <span className="px-2">Apply New</span>
              </Button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-3 p-4 mx-3 search-application">
            {/* Search Input (takes remaining space) */}
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
                  placeholder="Search for application"
                />
              </div>
            </div>

            {/* Buttons (fixed width) */}
            <div className="d-flex gap-2 flex-shrink-0">
              <Button className="filter-btn">
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
              <Button className="export-btn">Export</Button>
            </div>
          </div>
          <div className="my-5 mx-3">
            <Table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="all" id="all" />
                  </th>
                  <th>
                    <p>Date</p>
                  </th>
                  <th>
                    <p>Name</p>
                  </th>
                  <th>
                    <p>Email</p>
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
            </Table>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default App;
