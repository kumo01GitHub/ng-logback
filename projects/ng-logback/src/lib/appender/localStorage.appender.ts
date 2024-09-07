import { v4 as uuid } from 'uuid';
import { Appender, ILoggingEvent } from "./appender";

/**
 * LocalStorage Appender. The key is UUID.
 */
export class LocalStorageAppender implements Appender {
    constructor(
        private keyPrefix: string = this.constructor.name
    ) { }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            localStorage.setItem(this.generateKey(), `[${event.logger}:${event.level.label}] ${event.timestamp} - ${event.message}`);
        }
    }

    private generateKey(): string {
        return this.keyPrefix + "." + uuid();
    }
}
