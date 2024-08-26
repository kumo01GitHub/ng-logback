import { HttpClient } from "@angular/common/http";

import { Appender } from "../abstract/appender.model";
import { LOGLEVEL } from "../abstract/loglevel";

export class HttpPostAppender implements Appender {
    public name: string = this.constructor.name;

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: any
    ) { }

    public write(level: LOGLEVEL, message: string): void {
        switch(level) {
            case LOGLEVEL.TRACE:
                this.httpClient.post(this.url, {level: "TRACE", message: message}, this.options).subscribe();
                break;
            case LOGLEVEL.DEBUG:
                this.httpClient.post(this.url, {level: "DEBUG", message: message}, this.options).subscribe();
                break;
            case LOGLEVEL.INFO:
                this.httpClient.post(this.url, {level: "INFO", message: message}, this.options).subscribe();
                break;
            case LOGLEVEL.WARN:
                this.httpClient.post(this.url, {level: "WARN", message: message}, this.options).subscribe();
                break;
            case LOGLEVEL.ERROR:
                this.httpClient.post(this.url, {level: "ERROR", message: message}, this.options).subscribe();
                break;
        }
    }
}
