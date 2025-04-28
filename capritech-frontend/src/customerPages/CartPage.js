import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty. <Link to="/">Go Shop</Link></p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} style={{ marginBottom: '20px', border: '1px solid gray', padding: '10px' }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Qty: {item.qty}</p>
              <button onClick={() => addToCart(item)}>+1</button>
              <button onClick={() => removeFromCart(item._id)}>- Remove</button>
            </div>
          ))}
          <h2>Total: ${getTotal()}</h2>
          <button style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
