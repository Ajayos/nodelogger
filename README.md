# nodelogger

`@ajayos/nodelogger` is a Node.js module for logging messages with customizable severity levels and output formats.

[![@ajayos/nodelogger](https://img.shields.io/npm/v/@ajayos/nodelogger.svg)](https://www.npmjs.com/package/@ajayos/nodelogger)

## Installation

To install `@ajayos/nodelogger`, run:

```shell
npm install @ajayos/nodelogger
```

## Usage

First, import the module into your Node.js application:

```js
const Logger = require("@ajayos/nodelogger");
```

Then, create an instance of the `Logger` class with the desired configuration options and start it:

```js
const options = {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM/DD",
  zippedArchive: false,
  maxSize: "1g",
  level: "info",
};

const logger = new Logger(options);
```

Once the logger is started, you can log messages with the log method:

```js
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.info("This is an info message");
logger.debug("This is a debug message");
logger.fatal("This is a fatal message");
```

You can also log messages with the default severity level by omitting the second argument:

```js
logger.log("This is a default message");
```

To log a horizontal line, use:

```js
logger.line();
```

To clear screen:
```js
logger.clear()
```

## Example


Additional example of how to use the package can be found in the [example](./example.js) file.

## Configuration Options

The following configuration options are available for the logger:

* `timeZone` (string): The timezone to use for the log file (default: 'Asia/Kolkata')
* `hour` (string): The hour format to use for the log file (default: 'numeric')
* `minute` (string): The minute format to use for the log file (default: 'numeric')
* `hour12` (boolean): Whether to use 12-hour format or not. 1 for true, 0 for false (default: false)
* `filename` (string): The file path with `%DATE%` as a placeholder for the date (default: 'logs/%DATE%.log')
* `datePattern` (string): The date pattern for the filename (default: 'YYYY-MM/DD')
* `zippedArchive` (boolean): Whether to zip the archived files or not (default: false)
* `maxSize` (string): The maximum size of each log file before rotation (default: '1g')
* `level` (string): The level of the log messages (default: 'info')

## Message Types

The following message types are available for the log method:

* `info` (or `i`): Informational message (green text)
* `warn` (or `w`): Warning message (yellow text)
* `error` (or `e`): Error message (red text)
* `debug` (or `d`): Debug message (magenta text)
* `fatal` (or `f`): Fatal message (white text on red background)
* `line` (or `l`): Horizontal line (cyan text)

## Output Format

The output format for each message type is as follows:

* Informational message (green text): `[timestamp] [*]> message`
* Warning message (yellow text): `[timestamp] [!]> message`
* Error message (red text): `[timestamp] [x]> message`
* Debug message (magenta text): `[timestamp] [*]> message`
* Fatal message (white text on red background): `[timestamp] [!]> message`
* Horizontal line (cyan text): `>-----------------------------<`

## License

`@ajayos/nodelogger` is released under the [`Apache-2.0`](/LICENSE) License.

---

