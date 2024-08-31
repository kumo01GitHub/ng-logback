import { ILoggingEvent } from "./logging-event.model";

export interface Appender {
    get name(): string;
    doAppend(event: ILoggingEvent): void;
}
