import { Appender } from "../abstract/appender.model";
import { LOGLEVEL } from "../abstract/loglevel";

export class ConsoleAppender implements Appender {
    public name: string = this.constructor.name;

    public write(level: LOGLEVEL, message: string): void {
        switch(level) {
            case LOGLEVEL.TRACE:
                console.trace("%c[TRACE] " + message, "cyan");
                break;
            case LOGLEVEL.DEBUG:
                console.debug("%c[DEBUG] " + message, "gray");
                break;
            case LOGLEVEL.INFO:
                console.info("%c[INFO] " + message, "green");
                break;
            case LOGLEVEL.WARN:
                console.warn("%c[WARN] " + message, "yellow");
                break;
            case LOGLEVEL.ERROR:
                console.warn("%c[ERROR] " + message, "red");
                break;
        }
    }
}
