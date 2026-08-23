const morgan = require('morgan');

// Custom morgan configuration
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

module.exports = logger;
