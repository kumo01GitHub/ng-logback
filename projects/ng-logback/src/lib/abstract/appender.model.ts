import { LogLevel } from "./loglevel";

export interface Appender {
    get name(): string;
    write(level: LogLevel, message: string): void;
}
