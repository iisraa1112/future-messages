const validateMessage = require('../utils/validateMessage');

// In-memory placeholder data until DB is added
let mockMessages = [];
let messageId = 1;

// Submit new message
function submitMessage(req, res) {
    const error = validateMessage(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const newMessage = {
        id: messageId++,
        ...req.body,
        isRead: false,
        hasHeart: false,
        createdAt: new Date().toISOString(),
    };

    mockMessages.push(newMessage);
    res.status(201).json({ message: 'Message saved!', data: newMessage });
}

// Get one random unread message for today
function getRandomTodayMessage(req, res) {
    const today = new Date().toISOString().split('T')[0];

    const todaysMessages = mockMessages.filter(
        (msg) => !msg.isRead && msg.deliveryDate === today
    );

    if (todaysMessages.length === 0) {
        return res.status(404).json({ message: 'No unread messages for today' });
    }

    const randomIndex = Math.floor(Math.random() * todaysMessages.length);
    const selected = todaysMessages[randomIndex];
    selected.isRead = true;

    res.json(selected);
}

// Add a heart reaction
function heartMessage(req, res) {
    const id = parseInt(req.params.id);
    const message = mockMessages.find((msg) => msg.id === id);

    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    message.hasHeart = true;
    res.json({ message: '❤️ added to message', data: message });
}

// Get messages in transit (future delivery)
function getInTransitCount(req, res) {
    const today = new Date().toISOString().split('T')[0];
    const counts = {};

    mockMessages.forEach((msg) => {
        if (msg.deliveryDate > today) {
            counts[msg.deliveryDate] = (counts[msg.deliveryDate] || 0) + 1;
        }
    });

    res.json({
        total: Object.values(counts).reduce((a, b) => a + b, 0),
        byDate: counts,
    });
}

// Get stats for dashboard
function getStats(req, res) {
    const stats = {
        totalMessages: mockMessages.length,
        todayMessages: mockMessages.filter(
            (msg) => msg.deliveryDate === new Date().toISOString().split('T')[0]
        ).length,
        moods: {},
        popularDeliveryDates: {},
    };

    mockMessages.forEach((msg) => {
        stats.moods[msg.mood] = (stats.moods[msg.mood] || 0) + 1;

        stats.popularDeliveryDates[msg.deliveryDate] =
            (stats.popularDeliveryDates[msg.deliveryDate] || 0) + 1;
    });

    res.json(stats);
}

module.exports = {
    submitMessage,
    getRandomTodayMessage,
    heartMessage,
    getInTransitCount,
    getStats,
};
