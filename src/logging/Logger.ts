export type LogLevel = "debug" | "info" | "warning" | "error";

interface LogLevelConfig {
    /**
     * Priority of the log level.
     * Higher numbers indicate higher priority.
     */
    priority: number;

    /**
     * Prefix for log messages of this level.
     */
    prefix: string;
}

const logLevelConfig: Record<LogLevel, LogLevelConfig> = {
    debug: { priority: 0, prefix: "[Debug 🐛]" },
    info: { priority: 1, prefix: "[Info ℹ️]" },
    warning: { priority: 2, prefix: "[Warning ⚠️]" },
    error: { priority: 3, prefix: "[Error 🚨]" }
};

/**
 * A simple logger class that allows logging messages at different levels.
 */
export class Logger {
    #config: LogLevelConfig = logLevelConfig.info;

    constructor(level: LogLevel) {
        this.setLevel(level);
    }

    /**
     * Logs a message if the provided log level meets
     * or exceeds the current log level's priority.
     */
    #log(level: LogLevel, ...args: unknown[]): void {
        if (logLevelConfig[level].priority >= this.#config.priority) {
            console.log(logLevelConfig[level].prefix, ...args);
        }
    }

    /**
     * Updates the current log level of the logger.
     * If the provided level is invalid, it defaults to "info" and logs a warning.
     */
    setLevel(level: LogLevel): void {
        if (!logLevelConfig[level]) {
            this.#config = logLevelConfig.info;
            this.warning(`Invalid log level "${level}" provided. Defaulting to "info".`);
            return;
        }

        this.#config = logLevelConfig[level];
    }

    /**
     * Logs a debug message.
     */
    debug(...args: unknown[]): void {
        this.#log("debug", ...args);
    }

    /**
     * Logs an info message.
     */
    info(...args: unknown[]): void {
        this.#log("info", ...args);
    }

    /**
     * Logs a warning message.
     */
    warning(...args: unknown[]): void {
        this.#log("warning", ...args);
    }

    /**
     * Logs an error message.
     */
    error(...args: unknown[]): void {
        this.#log("error", ...args);
    }
}
