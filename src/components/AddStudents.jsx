"use client"
import React, { useState } from 'react'

const AddStudents = () => {
 
    const [student ,setStudent]=useState([])
    
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can perform any action you want with the form data
      console.log("Form data:", formData);
        // For example, you can submit the data to the server using fetch or Axios
        setStudent(formData)
    };

console.log(student);

  return (
    <div>
      <div>
        <h1>My Form</h1>
        <form onSubmit={handleSubmit} className='d-flex m-10'>
          <div>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}></textarea>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div>
        <h1> {student.length}dfsd</h1>
        <h1> {student.name}dfsd</h1>
      </div>
    </div>
  );
}

export default AddStudents