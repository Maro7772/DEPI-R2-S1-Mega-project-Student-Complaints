import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IComplaintProps } from "@/types/index";

interface IEditComplaintProps {
  show: boolean;
  onHide: () => void;
  existingComplaint: IComplaintProps;
  editComplaintHandler: (data: IComplaintProps) => void;
}

const EditComplaint = ({
  show,
  onHide,
  existingComplaint,
  editComplaintHandler
}: IEditComplaintProps) => {
  const [input, setInput] = useState<IComplaintProps>({
    _id: "",
    name: "",
    category: "",
    description: "",
    status: "Pending"
  });

  useEffect(() => {
    if (existingComplaint) {
      setInput(existingComplaint);
    }
  }, [existingComplaint]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.id;
    const value = e.target.value;
    setInput((prevState) => ({ ...prevState, [key]: value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    setInput((prevState) => ({ ...prevState, [key]: value }));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    editComplaintHandler(input);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onSubmitHandler}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Complaint
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Student Name"
              autoFocus
              required
              onChange={inputHandler}
              value={input.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              id="category"
              required
              onChange={selectHandler}
              value={input.category}
            >
              <option value="">Select Category</option>
              <option value="Academic">Academic</option>
              <option value="Non-Academic">Non-Academic</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              rows={6}
              required
              onChange={inputHandler}
              placeholder="Type your complaint"
              value={input.description}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            style={{ backgroundColor: "#280559", border: "none" }}
          >
            Save Changes
          </Button>
          <Button
            variant="secondary"
            onClick={onHide}
            style={{ backgroundColor: "#280559", border: "none" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditComplaint;
