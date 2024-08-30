import { Appender } from "../abstract/appender.model";
import { LogLevel } from "../abstract/loglevel";

export class ConsoleAppender implements Appender {
    public name: string = this.constructor.name;

    public write(level: LogLevel, message: string): void {
        const timestamp = new Date();
        let log: (message?: any, ...optionalParams: any[]) => void = console.log;
        let style: String = "color:black;"

        switch(level) {
            case LogLevel.Trace:
                log = console.trace;
                style = "color:cyan;"
                break;
            case LogLevel.Debug:
                log = console.debug;
                style = "color:gray;"
                break;
            case LogLevel.Info:
                log = console.info;
                style = "color:green;"
                break;
            case LogLevel.Warn:
                log = console.warn;
                style = "color:orange;"
                break;
            case LogLevel.Error:
                log = console.error;
                style = "color:red;"
                break;
            default:
                return;
        }

        log(`%c[${level.label}] ${timestamp} - ${message}`, style);
    }
}
