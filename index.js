"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
require("colors");
/**
 * Represents a logger that provides logging functionality.
 */
class Logger {
    /**
     * Creates an instance of the Logger class.
     * @param options - The options for configuring the logger.
     * @example
     * const logger = new Logger({
     *   timeZone: 'Asia/Kolkata',
     *   hour: 'numeric',
     *   minute: 'numeric',
     *   hour12: false,
     *   filename: 'logs/%DATE%.log',
     *   datePattern: 'YYYY-MM/DD',
     *   zippedArchive: false,
     *   maxSize: '1g',
     *   level: 'info',
     * });
     */ constructor(options) {
        /**
         * The format function used by the logger.
         * @private
         */
        this.myFormat = winston_1.format.printf(({ message, level }) => {
            return `[${this.timeZoned()}] [${level}] ${message}`;
        });
        /**
         * Logs an error message.
         *
         * @param text - The error message to log.
         * @returns void
         */
        this.error = (text) => {
            this.logs(text, "error");
            this.saveLog(text, "error");
        };
        /**
         * Logs a warning message.
         *
         * @param text - The warning message to log.
         */
        this.warn = (text) => {
            this.logs(text, "warn");
            this.saveLog(text, "warn");
        };
        /**
         * Logs an informational message.
         *
         * @param text - The message to log.
         */
        this.info = (text) => {
            this.logs(text, "info");
            this.saveLog(text, "info");
        };
        /**
         * Logs a debug message.
         *
         * @param text - The message to log.
         */
        this.debug = (text) => {
            this.logs(text, "debug");
            this.saveLog(text, "debug");
        };
        /**
         * Logs a line.
         */
        this.line = () => {
            this.logs(undefined, "line");
            this.saveLog(null, "line");
        };
        /**
         * Clears the console.
         */
        this.clear = () => {
            console.clear();
        };
        /**
         * Logs the given text and saves it.
         *
         * @param text - The text to be logged.
         */
        this.log = (text) => {
            this.logs(text);
            this.saveLog(text);
        };
        this.timeZone = (options === null || options === void 0 ? void 0 : options.timeZone) || "Asia/Kolkata";
        this.hour = (options === null || options === void 0 ? void 0 : options.hour) || "numeric";
        this.minute = (options === null || options === void 0 ? void 0 : options.minute) || "numeric";
        this.hour12 = Boolean(options === null || options === void 0 ? void 0 : options.hour12) || false;
        this.filename = (options === null || options === void 0 ? void 0 : options.filename) || "logs/%DATE%.log";
        this.datePattern = (options === null || options === void 0 ? void 0 : options.datePattern) || "YYYY-MM/DD";
        this.zippedArchive = (options === null || options === void 0 ? void 0 : options.zippedArchive) || false;
        this.maxSize = (options === null || options === void 0 ? void 0 : options.maxSize) || "1g";
        this.level = (options === null || options === void 0 ? void 0 : options.level) || "info";
        this.start();
    }
    /**
     * Returns the current time formatted according to the specified time zone and options.
     * @returns A string representing the current time in the specified time zone.
     */
    timeZoned() {
        const date = new Date();
        const options = {
            timeZone: this.timeZone,
            hour: this.hour,
            minute: this.minute,
            hour12: this.hour12,
        };
        // @ts-ignore
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
    /**
     * Starts the logger and initializes the necessary configurations.
     */
    start() {
        const logDirectory = "logs";
        if (!fs_1.default.existsSync(logDirectory)) {
            fs_1.default.mkdirSync(logDirectory, { recursive: true });
        }
        const transport = new winston_daily_rotate_file_1.default({
            filename: this.filename,
            datePattern: this.datePattern,
            zippedArchive: this.zippedArchive,
            maxSize: this.maxSize,
            format: winston_1.format.combine(winston_1.format.timestamp({ format: this.timeZoned }), this.myFormat),
            level: this.level,
        });
        this.logger = (0, winston_1.createLogger)({
            level: this.level,
            format: winston_1.format.combine(winston_1.format.timestamp({ format: this.timeZoned }), this.myFormat),
            transports: [transport],
        });
    }
    /**
     * Saves a log message with the specified type.
     * @param text - The log message to be saved.
     * @param type - The type of the log message. Defaults to 'info'.
     */
    saveLog(text, type = "info") {
        if (text === null)
            return this.winstonLog(`> [-]>-----------------------------<`, "[-] ");
        type = type.toLowerCase();
        const typeMap = {
            e: "error",
            w: "warn",
            i: "info",
            d: "debug",
            f: "fatal",
            l: "line",
        };
        type = typeMap[type] || type;
        switch (type) {
            case "error":
            case "warn":
            case "info":
            case "debug":
            case "fatal":
                this.logger.log(type, text);
                break;
            case "line":
                this.winstonLog(`> [-]>-----------------------------<`, "[-] ");
                break;
            default:
                this.logger.log("info", text);
                break;
        }
    }
    /**
     * Logs the given text with the specified type using Winston logger.
     * @param text - The text to be logged.
     * @param type - The type of the log message.
     */
    winstonLog(text, type) {
        let level;
        switch (type) {
            case "[e] ":
                level = "error";
                break;
            case "[w] ":
                level = "warn";
                break;
            case "[i] ":
                level = "info";
                break;
            case "[d] ":
                level = "debug";
                break;
            case "[f] ":
                level = "fatal";
                break;
            default:
                level = "info";
                break;
        }
        this.logger.log(level, text);
    }
    /**
     * Logs a message with an optional type.
     * @param text - The message to be logged.
     * @param type - The type of the log message. Defaults to 'info'.
     */
    logs(text, type = "info") {
        type = type === null || type === void 0 ? void 0 : type.toLowerCase();
        function output() {
            console.log(`>-----------------------------<`.cyan);
            // this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
        }
        if (text === undefined) {
            console.log(`>-----------------------------<`.cyan);
            // this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
            return;
        }
        const typeMap = {
            e: "error",
            w: "warn",
            i: "info",
            d: "debug",
            f: "fatal",
            l: "line",
        };
        type = typeMap[type] || type;
        switch (type) {
            case "error":
                console.log(`>`.cyan + ` [`.blue + `x`.red + `]`.blue + `>`.cyan + ` ${text}`.red);
                // this.winstonLog(`> [x]> ` + text + ' > ', '[e] ');
                break;
            case "warn":
                console.log(`>`.cyan +
                    ` [`.blue +
                    `!`.yellow +
                    `]`.blue +
                    `>`.cyan +
                    ` ${text}`.yellow);
                // this.winstonLog(`> [!]> ` + text + ' > ', '[w] ');
                break;
            case "info":
                console.log(`>`.cyan +
                    ` [`.blue +
                    `*`.green +
                    `]`.blue +
                    `>`.cyan +
                    ` ${text}`.green);
                // this.winstonLog(`> [*]> ` + text + ' > ', '[i] ');
                break;
            case "debug":
                console.log(`>`.cyan +
                    ` [`.blue +
                    `*`.magenta +
                    `]`.blue +
                    `>`.cyan +
                    ` ${text}`.magenta);
                // this.winstonLog(`> [*]> ` + text + ' > ', '[d] ');
                break;
            case "fatal":
                console.log(`>`.cyan +
                    ` [`.blue +
                    `!`.bgRed.white +
                    `]`.blue +
                    `>`.cyan +
                    ` ${text}`.bgRed.white);
                // this.winstonLog(`> [!]> ` + text + ' > ', '[f] ');
                break;
            case "line":
                console.log(`>-----------------------------<`.cyan);
                // this.winstonLog(`> [-]>-----------------------------<`, '[-] ');
                break;
            default:
                console.log(`>`.cyan +
                    ` [`.blue +
                    `*`.green +
                    `]`.blue +
                    `>`.cyan +
                    ` ${text}`.green);
                // this.winstonLog(`> [*]> ` + text + ' > ', '[i] ');
                break;
        }
    }
}
/**
 * Represents a logger.
 */
exports.default = Logger;
