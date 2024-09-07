import { LogLevel } from "../types/loglevel";

/** Logging Event. */
export interface ILoggingEvent {
    /** Logger Name. */
    logger: string,
    /** Timestamp. */
    timestamp: Date;
    /** Log Level. */
    level: LogLevel;
    /** Log Message. */
    message: string;
}

/**
 * Appender. Define Output Destination.
 */
export interface Appender {
    /**
     * Appender Name.
     */
    get name(): string;

    /**
     * Do Append.
     *
     * @param {ILoggingEvent} event Logging Event
     */
    doAppend(event: ILoggingEvent): void;
}
