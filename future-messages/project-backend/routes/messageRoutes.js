const express = require('express');
const router = express.Router();

// Import controller
const { submitMessage } = require('../controllers/messageController');

// POST /api/messages/
router.post('/', submitMessage);

module.exports = router;