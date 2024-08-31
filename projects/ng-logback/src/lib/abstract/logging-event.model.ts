import { LogLevel } from "./loglevel";

export interface ILoggingEvent {
    timestamp: Date;
    level: LogLevel;
    message: string;
}
