import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContentPage = () => {
  const [formData, setFormData] = useState({
    bannerText: '',
    servicesText: '',
    promotionsText: '',
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/content');
        setFormData({
          bannerText: data?.bannerText || '',
          servicesText: data?.servicesText || '',
          promotionsText: data?.promotionsText || '',
        });
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    fetchContent();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:5000/api/content',
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      alert('Website content updated!');
    } catch (error) {
      console.error('Failed to update content:', error);
      alert('Update failed');
    }
  };

  return (
    <div>
      <h1>Edit Website Content</h1>
      <form onSubmit={handleSubmit}>
        <textarea name="bannerText" placeholder="Banner Text" value={formData.bannerText} onChange={handleChange}></textarea><br />
        <textarea name="servicesText" placeholder="Services Text" value={formData.servicesText} onChange={handleChange}></textarea><br />
        <textarea name="promotionsText" placeholder="Promotions Text" value={formData.promotionsText} onChange={handleChange}></textarea><br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminContentPage;
