import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: '',
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products`);
        const product = data.find(p => p._id === id);
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          description: product.description,
          countInStock: product.countInStock,
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      alert('Product updated!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed!');
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} placeholder="Name" onChange={handleChange} required /><br />
        <input name="price" type="number" value={formData.price} placeholder="Price" onChange={handleChange} required /><br />
        <input name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} required /><br />
        <input name="brand" value={formData.brand} placeholder="Brand" onChange={handleChange} /><br />
        <input name="category" value={formData.category} placeholder="Category" onChange={handleChange} /><br />
        <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange}></textarea><br />
        <input name="countInStock" type="number" value={formData.countInStock} placeholder="Count In Stock" onChange={handleChange} /><br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default AdminProductEditPage;
