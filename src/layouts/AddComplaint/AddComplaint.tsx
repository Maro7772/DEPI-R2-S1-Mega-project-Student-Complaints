import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IComplaintProps } from "@/types/index";
interface IAddComplaintProps {
  show: boolean;
  onHide: () => void;
  addNewComplaintHandler: (
    data: Omit<IComplaintProps, "_id" | "solution">
  ) => void;
}
const AddComplaint = ({
  show,
  onHide,
  addNewComplaintHandler
}: IAddComplaintProps) => {
  const [input, setInput] = useState({
    name: "",
    category: "",
    description: "",
    status: "Pending"
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    addNewComplaintHandler({
      name: input.name,
      category: input.category,
      description: input.description,
      status: input.status
    });
    setInput({
      name: "",
      category: "",
      description: "",
      status: "Pending"
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Complaint
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitHandler}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Student Name"
              autoFocus
              required
              value={input.name}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              autoFocus
              id="category"
              value={input.category}
              required
              onChange={selectHandler}
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
            Add
          </Button>
          <Button
            type="button"
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

export default AddComplaint;
