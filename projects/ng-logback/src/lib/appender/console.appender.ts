import { Appender, ILoggingEvent, LogLevel } from "./appender";

export class ConsoleAppender implements Appender {
    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        let log: (message?: any, ...optionalParams: any[]) => void = console.log;
        let style: String = "color:black;"

        switch(event.level) {
            case LogLevel.None:
                return;
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
        }

        log(`%c[${event.level.label}] ${event.timestamp} - ${event.message}`, style);
    }
}
