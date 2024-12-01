require('dotenv').config();

module.exports = {
    historyService: process.env.HISTORY_SERVICE_URL || 'http://localhost:3001'
};
