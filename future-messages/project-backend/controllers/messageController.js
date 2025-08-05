// This will handle POST /api/messages

const submitMessage = (req, res) => {
    const { content, deliveryDate } = req.body;

    if (!content || !deliveryDate) {
        return res.status(400).json({ error: 'Content and delivery date are required.' });
    }

    // Just return a mock response for now
    res.status(201).json({
        message: 'Message scheduled successfully!',
        data: { content, deliveryDate },
    });
};

module.exports = { submitMessage };