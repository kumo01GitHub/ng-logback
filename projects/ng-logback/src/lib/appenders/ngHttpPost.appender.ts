import { HttpClient } from "@angular/common/http";
import { ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * HTTP POST Appender for Angular.
 */
export class NgHttpPostAppender extends JsonAppender {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: any
    ) {
        super();
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.httpClient.post(
                this.url,
                this.getMessage(event),
                this.options
            ).subscribe();
        }
    }
}