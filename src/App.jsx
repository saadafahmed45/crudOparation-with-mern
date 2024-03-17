import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  // console.log(users);

  // post users
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("send", data);
        const newUsers = [...users, data];
        if (data.insertedId) {
          alert("user added");
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
          alert("deleted successfully");
          location.reload();
        }
      });
  };

  return (
    <>
      <div className="">
        <div className="container d-flex flex-column  justify-content-center   text-primary pt-20">
          <div>
            <form className="p-2 m-5 d-flex  gap-2  " onSubmit={handleAddUser}>
              <input
                className="form-control"
                name="name"
                type="text"
                id=""
                placeholder="name "
                required
              />
              <input
                className="form-control"
                required
                name="email"
                type="email"
                id=""
                placeholder="email "
              />
              <div>
                {" "}
                <button type="submit  " className="btn btn-outline-primary m-2">
                  Add
                </button>
              </div>
            </form>
          </div>
          <h3>All User: {users?.length} </h3>

          {users?.map((user) => (
            <div className="p-2 m-2  d-flex" key={user._id}>
              <div>
                {" "}
                <h3 className="fs-5">Name: {user.name}</h3>
                <p>Email: {user.email}</p>
              </div>
              <div>
                {" "}
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user._id)}>
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
