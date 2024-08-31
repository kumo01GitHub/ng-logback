import { LogLevel } from "./loglevel";

export interface ILoggingEvent {
    timestamp: Date;
    level: LogLevel;
    message: string;
}

export interface Appender {
    get name(): string;
    doAppend(event: ILoggingEvent): void;
}
