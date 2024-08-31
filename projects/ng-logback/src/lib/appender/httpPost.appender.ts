import { HttpClient } from "@angular/common/http";

import { Appender } from "../abstract/appender.model";
import { LogLevel } from "../abstract/loglevel";

export class HttpPostAppender implements Appender {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: any
    ) { }

    public get name(): string {
        return this.constructor.name;
    }

    public write(level: LogLevel, message: string): void {
        const timestamp = new Date();
        if (!level.level) {
            this.httpClient.post(this.url, {level: level.label, timestamp: timestamp, message: message}, this.options).subscribe();
        }
    }
}
