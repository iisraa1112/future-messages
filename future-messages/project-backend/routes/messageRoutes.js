const express = require('express');
const router = express.Router();

// Import controller
const { submitMessage,
        getRandomTodayMessage,
        heartMessage,
        getInTransitCount,
        getStats, 
        } = require('../controllers/messageController');

// POST /api/messages/
router.post('/', submitMessage);
router.get('/today', getRandomTodayMessage);            // GET  /api/messages/today
router.post('/:id/heart', heartMessage);                // POST /api/messages/:id/heart
router.get('/in-transit', getInTransitCount);           // GET  /api/messages/in-transit
router.get('/stats', getStats);

module.exports = router;