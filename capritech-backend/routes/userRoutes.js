const express = require('express');
const { registerUser, authUser, getUsers, updateUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');
console.log('authMiddleware imported:', { protect, admin });

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/:id', protect, updateUserProfile);
router.get('/', protect, admin, getUsers); // ✅ Fetch all users (admin only)

module.exports = router;
