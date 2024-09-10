import { LogLevel } from "../types/loglevel";

/** 
 * Logging event.
 */
export interface ILoggingEvent {
    /** Logger name. */
    logger: string,
    /** Timestamp. */
    timestamp: Date;
    /** Log level. */
    level: LogLevel;
    /** Log message. */
    message: string;
}

/**
 * Define output destination and append log.
 */
export interface Appender {
    /**
     * Appender name. Logger uses for key to manage Appenders.
     */
    get name(): string;

    /**
     * Do append.
     * @param {ILoggingEvent} event Logging event.
     */
    doAppend(event: ILoggingEvent): void;
}
