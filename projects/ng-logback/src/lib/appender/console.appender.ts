import { Appender } from "../abstract/appender.model";
import { LOGLEVEL } from "../abstract/loglevel";

export class ConsoleAppender implements Appender {
    public name: string = this.constructor.name;

    public write(level: LOGLEVEL, message: string): void {
        const timestamp = new Date();
        let log: (message?: any, ...optionalParams: any[]) => void = console.log;
        let label: String = "";
        let style: String = "color:black;"

        switch(level) {
            case LOGLEVEL.TRACE:
                log = console.trace;
                label = "TRACE";
                style = "color:cyan;"
                break;
            case LOGLEVEL.DEBUG:
                log = console.debug;
                label = "DEBUG";
                style = "color:gray;"
                break;
            case LOGLEVEL.INFO:
                log = console.info;
                label = "INFO";
                style = "color:green;"
                break;
            case LOGLEVEL.WARN:
                log = console.warn;
                label = "WARN";
                style = "color:orange;"
                break;
            case LOGLEVEL.ERROR:
                log = console.error;
                label = "ERROR";
                style = "color:red;"
                break;
        }

        log(`%c[${label}] ${timestamp} - ${message}`, style);
    }
}
