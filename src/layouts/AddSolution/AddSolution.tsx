import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddSolutionProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (solution: string) => void;
  onReject: () => void;
  complaint?: { complaint: string; description: string };
}

const AddSolution = ({
  show,
  onHide,
  onSubmit,
  onReject,
  complaint
}: AddSolutionProps) => {
  const [solution, setSolution] = useState("");

  const handleSubmit = () => {
    onSubmit(solution);
    setSolution("");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Solution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem"
              }}
            >
              <Form.Label>Complaint: {complaint?.complaint}</Form.Label>
              <Form.Label style={{ marginTop: "1rem", overflowWrap: "break-word" }}>
                Description: {complaint?.description}
              </Form.Label>
            </div>
            <Form.Control
              as="textarea"
              rows={4}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Enter your solution here"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onReject}>
          Reject
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Solution
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSolution;
