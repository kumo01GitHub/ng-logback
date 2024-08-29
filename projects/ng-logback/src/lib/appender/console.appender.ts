import { Appender } from "../abstract/appender.model";
import { LOGLEVEL } from "../abstract/loglevel";

export class ConsoleAppender implements Appender {
    public name: string = this.constructor.name;

    public write(level: LOGLEVEL, message: string): void {
        switch(level) {
            case LOGLEVEL.TRACE:
                console.trace("%c[TRACE] " + message, "color:cyan;");
                break;
            case LOGLEVEL.DEBUG:
                console.debug("%c[DEBUG] " + message, "color:gray;");
                break;
            case LOGLEVEL.INFO:
                console.info("%c[INFO] " + message, "color:green;");
                break;
            case LOGLEVEL.WARN:
                console.warn("%c[WARN] " + message, "color:yellow;");
                break;
            case LOGLEVEL.ERROR:
                console.warn("%c[ERROR] " + message, "color:red;");
                break;
        }
    }
}
