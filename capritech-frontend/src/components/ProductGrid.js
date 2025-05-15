import React from 'react';
import '../styles/ProductGrid.css';

const ProductGrid = ({ products }) => {
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-img-wrapper">
              <img src={product.image} alt={product.name} />
              <div className="overlay">
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>
            <div className="rating">⭐⭐⭐⭐☆</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
