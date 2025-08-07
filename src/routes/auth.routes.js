
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, isAllreadyAuthenticated, getToken } = require('../middleware/auth.middleware');
const validateUser = require('../middleware/validateUser');

router.post('/register', isAllreadyAuthenticated, validateUser, authController.register);
router.post('/login', authController.login);
router.get('/getToken', verifyToken, getToken)
router.get('/Myprofile', verifyToken, authController.Profile);
        
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully');
});


module.exports = router;



