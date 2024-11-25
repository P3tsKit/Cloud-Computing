const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateUserDetails,
  getUser,
  deleteUser,
  logout,
} = require('./controller.js')

// Endpoint register
router.post('/register', register);

// Endpoint login
router.post('/login', login);

// Endpoint update
router.put('/update/:uid', updateUserDetails);

// Endpoint /logout
router.get('/user/:uid', getUser);

// Endpoint /logout
router.post('/logout', logout);

// Endpoint delete
router.delete('/delete/:uid', deleteUser);

module.exports = router;