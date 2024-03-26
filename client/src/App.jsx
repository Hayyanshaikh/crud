import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [userBtn, setUserBtn] = useState("Add user");
  const [userVariant, setUserVariant] = useState({ bool: true, id: "" });
  //  API URI's
  const BASE_URL = "http://localhost:3000/api";
  const getUsers = `${BASE_URL}/users`;
  const postUser = `${BASE_URL}/addUser`;

  // fetch data function
  const fetchUsers = async () => {
    try {
      const response = await axios.get(getUsers);
      setUsers(response.data.reverse());
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // call fetched data
  useEffect(() => {
    fetchUsers();
  }, []);

  // add user in database
  const handleAddUser = async (e) => {
    e.preventDefault();
    // check user update or add
    if (userVariant.bool) {
      try {
        const emailExists = users.some((user) => user.email === newUser.email);
        // check exist email
        if (emailExists) {
          alert("Email already exists. Please use a different email.");
        }
        // add a new user
        else if (newUser.name && newUser.email && newUser.age) {
          const response = await axios.post(postUser, newUser);
          setUsers([response.data,...users]);
          setNewUser({ name: "", email: "", age: "" });
        } else {
          alert("Please fill in all fields");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
      setUserBtn("Add user");
    }

    // user already added so update user 
    else {
      const getUser = `${BASE_URL}/users/${userVariant.id.toString()}`;

      try {
        await axios.put(getUser, newUser);
        fetchUsers();
        setNewUser({ name: "", email: "", age: "" });
        setUserVariant({ bool: true, id: "" });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  //  input change function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // delete user from database
  const handleDeleteUser = async (id) => {
    // get specific user through ID
    const getUser = `${BASE_URL}/users/${id}`;

    // Delete user after match id form document id
    try {
      await axios.delete(getUser);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // update user
  const handleUpdateUser = (id) => {
    // get specific user through ID
    const findUser = users.find((user) => user._id === id);

    // Delete user after match id form document id
    setNewUser({
      name: findUser.name,
      email: findUser.email,
      age: findUser.age,
    });
    setUserBtn("Update user");
    setUserVariant({ bool: false, id });
  };

  return (
    <div>
      <div className="container">
        <h1>MERN Stack Project (CRUD) - Hayyan shaikh</h1>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Enter the name"
            autoComplete="off"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <input
            type="eamil"
            placeholder="Enter the email"
            autoComplete="off"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Enter the age"
            autoComplete="off"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
          />
          <button>{userBtn}</button>
        </form>
      </div>
      <div className="container">
        <header className="header">
          <h3>Manage Users</h3>
        </header>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* render all user data using .map() */}
              {users &&
                users.map((user, key) => (
                  <tr key={key}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age} Year's</td>
                    <td>
                      {/* specific user update button */}
                      <button
                        className="edit_btn action-btn"
                        onClick={() => handleUpdateUser(user._id)}
                      >
                        Edit
                      </button>
                      {/* specific user delete button */}
                      <button
                        className="delete_btn action-btn"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
