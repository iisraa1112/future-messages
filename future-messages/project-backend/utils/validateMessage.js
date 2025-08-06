function validateMessage({ name, content, deliveryDate, mood }) {
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return 'Message content is required and must be a non-empty string.';
    }

    if (!deliveryDate || isNaN(Date.parse(deliveryDate))) {
        return 'A valid delivery date is required.';
    }

    const today = new Date();
    const submittedDate = new Date(deliveryDate);

    // Remove time component from "today" for date-only comparison
    today.setHours(0, 0, 0, 0);
    submittedDate.setHours(0, 0, 0, 0);

    if (submittedDate < today) {
        return 'Delivery date cannot be in the past.';
    }

    const allowedMoods = ['hopeful', 'funny', 'wish/pray', 'happy', 'others'];
    if (!mood || !allowedMoods.includes(mood)) {
        return `Mood must be one of: ${allowedMoods.join(', ')}`;
    }

    return null; // All good
}

module.exports = validateMessage;
