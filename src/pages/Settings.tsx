

// all imports i need
import HeadBar from "@/common/Headbar/HeadBar";
import Heading from "@/common/Heading/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button, Table, Col, Container, Modal, Form } from "react-bootstrap";


// Users Data for table without any changes
const initialUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", },
  { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", role: "User",  },
  { id: 4, name: "Michael Brown", email: "michael.brown@example.com", role: "Admin",  },
  { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", role: "User",  },
  { id: 6, name: "David Wilson", email: "david.wilson@example.com", role: "User", },
  { id: 7, name: "Laura Martinez", email: "laura.martinez@example.com", role: "User", }
];


// functional component
const Settings = () => {
 
//create new array (users) to edit on (initialUsers) using (useState) function
const [users, setUsers] = useState(initialUsers);


//for serch input
const [searchTerm, setSearchTerm] = useState("");
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase())
);


//----------------------------------------------------------------
// hide and show the add the (add new user) window
const [showAddModal, setShowAddModal] = useState(false);
// store the new user data
const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  role: "",
});


// update the new user value through writing
// e => the event that happend when the user write
const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({
    //copy th eold values of the newuser
    ...newUser,
    //update the new value in the correct place based on the field name.
    [e.target.name]: e.target.value
  });
};


// add the new user in the array
const handleAddUser = () => {
  //check if the user enter all data or not
  if (newUser.name && newUser.email && newUser.role) {
    // set the id for the new user
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    //add the new user with its id to the (users) array using (setusers) function
    setUsers([...users, { id: newId, ...newUser }]);
    //make inputs empty
    setNewUser({ name: "", email: "", role: "" });
    //close the window
    setShowAddModal(false);
  } else {
    alert("Please fill in all fields.");
  }
};
//-----------------------------------------------------------------------------
  // to show/hide edit modal
  const [showEditModal, setShowEditModal] = useState(false);


  //When we write something new in the edit form, we use setCurrentUser() to update the values.
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
  });


  // update the current user value through writing
  // e => the event that happend when the user write
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value
    });
  };


  const handleEdit = (user: typeof initialUsers[0]) => {
    // currentUser بنحط بيانات اليوزر الي ضغطنا عليه في ال
    setCurrentUser(user);
    //open the model window
    setShowEditModal(true);
  };




  const handleUpdateUser = () => {
    //check if the user enter all data or not
    if (currentUser.name && currentUser.email && currentUser.role) {
      //update all chenged users
      const updatedUsers = users.map(user =>
        user.id === currentUser.id ? currentUser : user
      );
       //add the updated user to the (users) array using (setusers) function
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };


 
  //-----------------------------------------------------------------------------
  // delete method
  const handleDelete = (id:Number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    }
  };
//------------------------------------------------------------------
  return (
    <Container className="applications d-flex flex-column">
      <Heading title="Settings" description="View all Settings" />
       <HeadBar title={"Users"} select={true}/>


      <div className="container py-2 px-2">
        {/* search input and add user button */}
        <div className="d-flex align-items-center gap-3 p-4 mx-3 search-application">
           {/* search input */}
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


          {/* add user button */}
          <Col xs="auto">
            <Button
              className="btn-custom"
              style={{ border: "none", backgroundColor: "#280559" }}
              // open the (add new user) window
              onClick={() => setShowAddModal(true)}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
              <span className="px-2">Add New User</span>
            </Button>
          </Col>
        </div>


       {/* users table */}
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
                <td colSpan={6}>No users found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>


      {/* Add New User Window Model*/}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "#280559" }} className="fs-2">Add New User</Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <Form style={{color: "#280559" }} className="fs-5">
            <Form.Group controlId="formName" className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newUser.name}
                //when user write any value --> the value saved at
                onChange={handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                name="role"
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
          <Button variant="primary"  className="border-0" style={{ backgroundColor: "#280559" }} onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Edit User Window Model*/}
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
    </Container>
  );
};


export default Settings;


