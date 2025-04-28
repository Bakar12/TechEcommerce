import React, { useState } from 'react';
import axios from 'axios';

const AdminAddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: '',
  });

  const [token, setToken] = useState(''); // You'll paste your Admin JWT Token here manually for now

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Product created:', res.data);
      alert('Product created! Check HomePage.');
    } catch (error) {
      console.error(error.response.data);
      alert('Error creating product');
    }
  };

  return (
    <div>
      <h1>Add New Product (Admin)</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required /><br />
        <input name="image" placeholder="Image URL" onChange={handleChange} required /><br />
        <input name="brand" placeholder="Brand" onChange={handleChange} /><br />
        <input name="category" placeholder="Category" onChange={handleChange} /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br />
        <input name="countInStock" placeholder="Count In Stock" type="number" onChange={handleChange} /><br />
        <br />
        <input placeholder="Paste your Admin Token here" onChange={(e) => setToken(e.target.value)} required /><br /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProductPage;
