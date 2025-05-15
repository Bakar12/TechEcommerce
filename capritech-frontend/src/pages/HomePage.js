import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import PromotionsSection from '../components/PromotionsSection';
import ServicesSection from '../components/ServicesSection';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});

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
      <HeroBanner />
      <PromotionsSection />
      <ServicesSection />
      <ProductGrid products={products} />
    </div>
  );
};

export default HomePage;

