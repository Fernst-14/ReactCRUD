import Axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [newphone, setNewPhone] = useState("");

  //Get data employee
  const [employeelist, setEmployeeList] = useState([]);
  const GetStudents = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };

  //Insert Data
  const AddStudents = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      phone: phone,
    }).then(() => {
      setEmployeeList([
        ...employeelist,
        {
          name: name,
          age: age,
          country: country,
          phone: phone,
        },
      ]);
    });
  };

  //Update
  const updatePhone = (id) => {
    Axios.put("http://localhost:3001/update", {
      phone: newphone,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeelist.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                age: val.age,
                country: val.country,
                phone: newphone,
              }
            : val;
        })
      );
    });
  };

  //Delete
  const DeleteStudents = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) =>{
      setEmployeeList(
        employeelist.filter((val)=>{
          return val.id != id;
        })
      )
    })
  }

  return (
    <>
      <div className="App container">
        <h1>Student Information</h1>
        <div className="information">
          <form action="">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Phone Number:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone number"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>
            <button className="btn btn-success" onClick={AddStudents}>
              Add Student
            </button>
          </form>
        </div>
        <hr />
        <div className="employee">
          <button className="btn btn-primary" onClick={GetStudents}>
            Show Students
          </button>
          <br />
          <br />
          {employeelist.map((val, index) => {
            return (
              <div className="employee card" key={index}>
                <div className="card-body text-left">
                  <p className="card-text">Name : {val.name}</p>
                  <p className="card-text">Age : {val.age}</p>
                  <p className="card-text">Country : {val.country}</p>
                  <p className="card-text">Phone Number : {val.Phonenumber}</p>
                  <div className="d-flex">
                    <input
                      type="number"
                      placeholder="02xxxxx"
                      style={{ width: "300px" }}
                      className="form-control"
                      onChange={(event) => {
                        setNewPhone(event.target.value);
                      }}
                    />
                    <button className="btn btn-warning" onClick={()=> updatePhone(val.id)}>Update</button>
                    <button className="btn btn-danger" onClick={()=> DeleteStudents(val.id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
