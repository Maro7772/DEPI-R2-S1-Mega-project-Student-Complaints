import { Button, Form, Modal } from "react-bootstrap";

const ViewModal = ({ ...props }) => {
  return (
    <Modal 
      onHide={props.onHide}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Complaint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="complaint">
            <Form.Label>StudentName</Form.Label>
            <Form.Control type="text" value={props.name} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" value={props.category} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={props.description}
              disabled
              style={{ resize: "none" }}
            />
          </Form.Group>
          {props.solution && (
            <Form.Group className="mb-3" controlId="solution">
              <Form.Label>Solution</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={props.solution}
                disabled
                style={{ resize: "none", backgroundColor: "#e6ffe6" }}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{ backgroundColor: "#280559", border: "none" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
