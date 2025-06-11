import React, { useState } from "react";
import { Button, Table, Col, Container, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { RootState } from '../store';
import HeadBar from "@/common/Headbar/HeadBar";
import Heading from "@/common/Heading/Heading";
import { useSelector } from "react-redux";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", role: "User" },
  { id: 4, name: "Michael Brown", email: "michael.brown@example.com", role: "Admin" },
  { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", role: "User" },
  { id: 6, name: "David Wilson", email: "david.wilson@example.com", role: "User" },
  { id: 7, name: "Laura Martinez", email: "laura.martinez@example.com", role: "User" }
];

const Settings: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newId, ...newUser }]);
      setNewUser({ name: "", email: "", role: "" });
      setShowAddModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: 0, name: "", email: "", role: "" });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleEdit = (user: typeof initialUsers[0]) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    if (currentUser.name && currentUser.email && currentUser.role) {
      const updatedUsers = users.map(user =>
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  const role = useSelector((state: RootState) => state.user.role);
  const name = useSelector((state: RootState) => state.user.fullName);
  const email = useSelector((state: RootState) => state.user.email);
 
  return (
    <Container className="applications d-flex flex-column">
      <Heading title="Settings" description="View all Settings" />
      <HeadBar title={role === 'admin' ? "Users" : "Profile"} select={true} />

      {role === 'admin' ? (
        <>
          <div className="container py-2 px-2">
            <div className="d-flex align-items-center gap-3 p-4 mx-3 search-application">
              <div className="flex-grow-1">
                <div className="input-group w-100 m-auto">
                  <span className="input-group-text pe-none">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-secondary" />
                  </span>
                  <input
                    type="search"
                    className="form-control p-2 text-start"
                    placeholder="Search for User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Col xs="auto">
                <Button
                  className="btn-custom"
                  style={{ border: "none", backgroundColor: "#280559" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                  <span className="px-2">Add New User</span>
                </Button>
              </Col>
            </div>

            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="d-flex justify-content-evenly align-items-center">
                        <Button variant="outline-secondary" onClick={() => handleEdit(user)}>Edit</Button>
                        <Button variant="outline-danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#280559" }} className="fs-2">Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{ color: "#280559" }} className="fs-5">
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRole" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter role"
                    value={newUser.role}
                    onChange={handleNewUserChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="border-0" style={{ backgroundColor: "#280559" }} onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="border-0" style={{ backgroundColor: "#280559" }} onClick={handleAddUser}>
                Add User
              </Button>
            </Modal.Footer>
          </Modal>

        
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#280559" }} className="fs-2">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{ color: "#280559" }} className="fs-5">
                <Form.Group controlId="editName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group controlId="editEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group controlId="editRole" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={currentUser.role}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="border-0" style={{ backgroundColor: "#280559" }} onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="border-0" style={{ backgroundColor: "#280559" }} onClick={handleUpdateUser}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
        
          <Table striped bordered hover className="text-center my-5">
            <thead>
              <tr>
               
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
            <tr key={1}>
            
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
          </tr>
</tbody>

          </Table>
        </>
      )}
    </Container>
  );
};

export default Settings;
