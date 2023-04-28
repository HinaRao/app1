import React, { useState, useEffect } from "react";
import './App.css';
function CrudOperationsWithLocalStorage() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    course: "",
  
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myData"));
    console.log(storedData);
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(data));
  }, [data]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.id) {
      const updatedData = data.map((item) =>
        item.id === formData.id ? formData : item
      );
      setData(updatedData);
    } else {
      const newData = [...data, { ...formData, id: Date.now() }];
      setData(newData);
    }
    setFormData({ id: "", name: "", email: "", course:"" });
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setFormData(itemToEdit);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        /> <br></br>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        /><br></br>
        <input
          type="course"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleInputChange}
        /><br></br> <br></br>
        <div className="btn">
        <button type="submit">{formData.id ? "Update" : "Add"}</button>
        </div>
      </form>
      
      {/* <ul className="table">
        {data.map((item) => (
          <li key={item.id}>
            {item.name}, {item.course}, {item.email} &nbsp;
            
            <button  onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            
          </li>
        ))}
      </ul> */}
      <table className="table">
      <tbody>
        
          {data.map((row) => (
            <tr key= {row.id}>
            <td>
            {row.name} </td>
            <td>
            {row.course}</td>
            <td>
            {row.email} </td>
            <td>
            &nbsp;<button  onClick={() => handleEdit(row.id)}>Edit</button> &nbsp;
            <button onClick={() => handleDelete(row.id)}>Delete</button>&nbsp;</td> 
          </tr>
          ))}

      </tbody>
      </table>
        
    </div>
  );
}

export default CrudOperationsWithLocalStorage;

