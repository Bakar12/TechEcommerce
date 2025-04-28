import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await axios.get('http://localhost:5000/api/products');
        setProducts(productsData.data);

        const contentData = await axios.get('http://localhost:5000/api/content');
        setContent(contentData.data || {});
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: '#eee', padding: '20px', marginBottom: '20px' }}>
        <h1>{content.bannerText || 'Welcome to CapriTech!'}</h1>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Our Services</h2>
        <p>{content.servicesText || 'We offer the best computer parts and tech repair.'}</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Promotions</h2>
        <p>{content.promotionsText || 'Special discounts available now!'}</p>
      </section>

      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

