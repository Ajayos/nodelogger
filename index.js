"use strict";
// Import required modules
const colors = require('colors'); // provides a way to add color to terminal output
const { format, createLogger, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

// Set default configuration variables for log file
let timeZone = 'Asia/Kolkata';
let hour = 'numeric';
let minute = 'numeric';
let hour12 = false;
let filename = 'logs/%DATE%.log';
let datePattern = 'YYYY-MM/DD';
let zippedArchive = false;
let maxSize = '1g';
//let myFormat = null;
let level = 'info';
let logger;

/**
 * Asynchronous function to configure log file options.
 * @param {Object} [options] - An optional object containing log file options.
 * @param {string} [options.timeZone] - The timezone to use for the log file.
 * @param {string} [options.hour] - The hour format to use for the log file.
 * @param {string} [options.minute] - The minute format to use for the log file.
 * @param {number} [options.hour12] - Whether to use 12-hour format or not. 1 for true, 0 for false.
 * @param {string} [options.filename] - The file path with %DATE% as a placeholder for the date.
 * @param {string} [options.datePattern] - The date pattern for the filename.
 * @param {boolean} [options.zippedArchive] - Whether to zip the archived files or not.
 * @param {string} [options.maxSize] - The maximum size of each log file before rotation.
 * @param {string} [options.format] - The format of the log messages.
 * @param {string} [options.level] - The level of the log messages.
 */
async function start(options) {
  // If options are provided, update the configuration variables
  if (options) {
    timeZone = options.timeZone || timeZone;
    hour = options.hour || hour;
    minute = options.minute || minute;
    hour12 = options.hour12 === 1 ? true : options.hour12 === 0 ? false : hour12;
    filename = options.filename || filename;
    datePattern = options.datePattern || datePattern;
    zippedArchive = options.zippedArchive || zippedArchive;
    maxSize = options.maxSize || maxSize;
    //myFormat = options.format || myFormat;
    level = options.level || level;
  }

  // Function that returns the current time in the specified timezone with the specified format
  const timezoned = () => {
    const date = new Date();
    const options = {
      timeZone,
      hour,
      minute,
      hour12
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Format for the log messages
  const myFormat = printf(({ message }) => {
    return `[${timezoned()}] ${message}`;
  });
  
  // Transport for logging to a file that is rotated daily
  const transport = new DailyRotateFile({
    filename,
    datePattern,
    zippedArchive,
    maxSize,
    format: myFormat,
    level
  });
  
  // Create a new logger instance with the specified format and transport
  logger = createLogger({
    format: combine(
      timestamp({ format: timezoned })
    ),
    transports: [ transport ]
  });

}

function winstonLog(text, type) {
    let level;
    switch (type) {
      case '[e] ':
        level = 'error';
        break;
      case '[w] ':
        level = 'warn';
        break;
      case '[i] ':
        level = 'info';
        break;
      case '[d] ':
        level = 'debug';
        break;
      case '[f] ':
        level = 'fatal';
        break;
      default:
        level = 'info';
        break;
    }
    logger.log(level, text);
}
/**
 * Logs the specified message with an optional message type.
 *
 * @param {string} text - The message to be logged.
 * @param {string} type - The severity level of the message. Default is 'info'.
 * Can be one of: 'error' (or 'e'), 'warn' (or 'w'), 'info' (or 'i'), 'debug' (or 'd'), 'fatal' (or 'f').
 *
 * The output format for different message types is as follows:
 * - Error (or 'e'): > [x]> message (red text)
 * - Warning (or 'w'): > [!]> message (yellow text)
 * - Info (or 'i'): > [*]> message (green text)
 * - Debug (or 'd'): > [*]> message (magenta text)
 * - Fatal (or 'f'): > [!]> message (white text on red background)
 * - line (or 'l'): >-----------------------------<
 */

function log(text, type = 'info') {
    type = type.toLowerCase();
    // default output format
    function output() {
        console.log(`>-----------------------------<`.cyan);
        winstonLog(`> [-]>-----------------------------<`,'[-] ');
    }
    // if no input is provided or default output
    if (text === undefined) return output();
    // create a map of type codes to type names
    const typeMap = {
        e: 'error',
        w: 'warn',
        i: 'info',
        d: 'debug',
        f: 'fatal',
        l: 'line'
    };

    // if the type code is recognized, set the type to its corresponding name
    type = typeMap[type] || type;

    // check the severity level and log the message with the appropriate prefix
    switch (type) {
        case 'error':
            console.log(`>`.cyan + ` [`.blue + `x`.red  + `]`.blue + `>`.cyan + ` ${text}`.red);
            winstonLog(`> [x]> ` + text + ' > ' , '[e] ');
            break;
        case 'warn':
            console.log(`>`.cyan + ` [`.blue + `!`.yellow  + `]`.blue + `>`.cyan + ` ${text}`.yellow);
            winstonLog(`> [!]> ` + text + ' > ' , '[w] ');
            break;
        case 'info':
            console.log(`>`.cyan + ` [`.blue + `*`.green  + `]`.blue + `>`.cyan + ` ${text}`.green );
            winstonLog(`> [*]> ` + text + ' > ' , '[i] ');
            break;
        case 'debug':
            console.log(`>`.cyan + ` [`.blue + `*`.magenta  + `]`.blue + `>`.cyan + ` ${text}`.magenta );
            winstonLog(`> [*]> ` + text + ' > ' , '[d] ');
            break;
        case 'fatal':
            console.log(`>`.cyan + ` [`.blue + `!`.bgRed.white  + `]`.blue + `>`.cyan + ` ${text}`.bgRed.white);
            winstonLog(`> [!]> ` + text + ' > ' , '[f] ');
            break;
        case 'line':
            console.log(`>-----------------------------<`.cyan);
            winstonLog(`> [-]>-----------------------------<`,'[-] ');
            break;
        default:
            console.log(`>`.cyan + ` [`.blue + `*`.green  + `]`.blue + `>`.cyan + ` ${text}`.green );
            winstonLog(`> [*]> ` + text + ' > ' , '[i] ');
            break;
    }
}
global.log = log;
// Export the start function for external use
module.exports = { start, log };
