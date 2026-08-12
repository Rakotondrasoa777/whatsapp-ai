const conversations = new Map();

export const getConversation = (userId) => {
    return conversations.get(userId);
};

export const setConversation = (userId, state) => {
    conversations.set(userId, state);
};

export const deleteConversation = (userId) => {
    conversations.delete(userId);
};