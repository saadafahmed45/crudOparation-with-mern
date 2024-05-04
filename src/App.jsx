import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import UserList from "./components/UserList";
import AddStudents from "./components/AddStudents";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  // console.log(users);

 const [selectedValue, setSelectedValue] = useState(""); // State to store the selected value
 // Function to handle the change in the select element
 const handleSelected = (event) => {
   setSelectedValue(event.target.value); // Update the selected value state
   
 };
  console.log(selectedValue);



  // post users
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email, };
    const role = { role: selectedValue };
      const userDataWithRole = { ...user, ...role };

    console.log( userDataWithRole);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataWithRole),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("send", data);
        const newUsers = [...users, data];
        if (data.insertedId) {
          // alert("user added");
          form.reset();
          location.reload();
        }
        setUsers(newUsers);
      });
  };

  const handleDelete = (_id) => {
    console.log("dlt", _id);

    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          // alert("deleted successfully");
          location.reload();
        }
      });
  };

  return (
    <>
      <div className=''>
        <div className='container d-flex flex-column  justify-content-center   text-primary pt-20'>
          <div>

            {/* <AddStudents/> */}
            <form className='p-2 m-5 d-flex  gap-2  ' onSubmit={handleAddUser}>
              <input
                className='form-control'
                name='name'
                type='text'
                id=''
                placeholder='name '
                required
              />
              <input
                className='form-control'
                required
                name='email'
                type='email'
                id=''
                placeholder='email '
              />
              <select
                className='form-select'
                required
                onChange={handleSelected}
                aria-label='Default select example'
                value={selectedValue} // Set the value of the select element to the selectedValue state
              >
                <option value=''>Open this select menu</option>
                <option value='admin'>Admin</option>
                <option value='editor'>Editor</option>
                <option value='user'>user</option>
              </select>
              <div>
                {" "}
                <button type='submit  ' className='btn btn-outline-primary m-2'>
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* <UserList /> */}

          <h3>All User: {users?.length} </h3>

          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
                <th scope='col'>Handle</th>
              </tr>
            </thead>
            {users?.map((user) => (
              <tbody key={user._id}>
                <tr>
                  <th scope='row'></th>
                  <td className=''>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm btn-danger'
                      onClick={() => handleDelete(user._id)}>
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
