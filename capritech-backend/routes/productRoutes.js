const express = require('express');
const { createProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public - Get all products
router.get('/', getProducts);

// Admin - Create a product
router.post('/', protect, admin, createProduct);

module.exports = router;

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
