import "colors";
/**
 * Represents a logger that provides logging functionality.
 */
declare class Logger {
    /**
     * The time zone for logging. Defaults to 'Asia/Kolkata'.
     */
    private timeZone;
    /**
     * The format for displaying the hour. Defaults to 'numeric'.
     */
    private hour;
    /**
     * The format for displaying the minute. Defaults to 'numeric'.
     */
    private minute;
    /**
     * Determines whether to use 12-hour format. Defaults to false.
     */
    private hour12;
    /**
     * The filename pattern for log files. Defaults to 'logs/%DATE%.log'.
     */
    private filename;
    /**
     * The date pattern for log files. Defaults to 'YYYY-MM/DD'.
     */
    private datePattern;
    /**
     * Determines whether to compress archived log files. Defaults to false.
     */
    private zippedArchive;
    /**
     * The maximum size of log files. Defaults to '1g'.
     */
    private maxSize;
    /**
     * The log level. Defaults to 'info'.
     */
    private level;
    /**
     * The Winston logger instance.
     */
    private logger;
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
     */ constructor(options?: {
        timeZone?: string;
        hour?: string;
        minute?: string;
        hour12?: boolean;
        filename?: string;
        datePattern?: string;
        zippedArchive?: boolean;
        maxSize?: string;
        level?: string;
    });
    /**
     * Returns the current time formatted according to the specified time zone and options.
     * @returns A string representing the current time in the specified time zone.
     */
    private timeZoned;
    /**
     * The format function used by the logger.
     * @private
     */
    private myFormat;
    /**
     * Starts the logger and initializes the necessary configurations.
     */
    private start;
    /**
     * Saves a log message with the specified type.
     * @param text - The log message to be saved.
     * @param type - The type of the log message. Defaults to 'info'.
     */
    saveLog(text: string | null, type?: string): void;
    /**
     * Logs an error message.
     *
     * @param text - The error message to log.
     * @returns void
     */
    error: (text: string) => void;
    /**
     * Logs a warning message.
     *
     * @param text - The warning message to log.
     */
    warn: (text: string) => void;
    /**
     * Logs an informational message.
     *
     * @param text - The message to log.
     */
    info: (text: string) => void;
    /**
     * Logs a debug message.
     *
     * @param text - The message to log.
     */
    debug: (text: string) => void;
    /**
     * Logs a line.
     */
    line: () => void;
    /**
     * Clears the console.
     */
    clear: () => void;
    /**
     * Logs the given text and saves it.
     *
     * @param text - The text to be logged.
     */
    log: (text: string) => void;
    /**
     * Logs the given text with the specified type using Winston logger.
     * @param text - The text to be logged.
     * @param type - The type of the log message.
     */
    private winstonLog;
    /**
     * Logs a message with an optional type.
     * @param text - The message to be logged.
     * @param type - The type of the log message. Defaults to 'info'.
     */
    logs(text?: string, type?: string): void;
}
/**
 * Represents a logger.
 */
export default Logger;
