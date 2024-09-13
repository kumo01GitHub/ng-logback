import { HttpClient } from "@angular/common/http";

import { Appender, ILoggingEvent } from "./appender";

/**
 * HTTP POST Appender.
 */
export class HttpPostAppender implements Appender {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: any
    ) { }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.httpClient.post(
                this.url, {
                    logger: event.logger,
                    level: event.level.label,
                    timestamp: event.timestamp,
                    message: event.message
                },
                this.options
            ).subscribe();
        }
    }
}
