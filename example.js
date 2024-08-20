const { default: Logger } = require("./index");

// Initialize the logger with options
const logger = new Logger({
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM/DD",
  zippedArchive: false,
  maxSize: "1g",
  level: "info",
});

// Log some messages
logger.line();
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.info("This is an info message");
logger.debug("This is a debug message");
logger.error("err")
logger.line();
