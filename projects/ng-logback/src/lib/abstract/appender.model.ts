import { LogLevel } from "./loglevel";

export interface Appender {
    name: string;
    write: (level: LogLevel, message: string) => void;
}
