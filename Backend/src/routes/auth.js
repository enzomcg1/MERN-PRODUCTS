const express = require('express');
const { register, login, getUser, updateUser, deleteUser } = require('../controller/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', getUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router;
