const logger = require("./index");

// Initialize the logger with options
logger.start({
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
logger.log("This is an error message", "error");
logger.log("This is a warning message", "warn");
logger.log("This is an info message", "info");
logger.log("This is a debug message", "debug");
logger.log("This is a fatal message", "fatal");
