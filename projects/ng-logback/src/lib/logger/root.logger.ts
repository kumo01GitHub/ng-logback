import { Logger } from "../abstract/logger.model";
import { LOGLEVEL } from "../abstract/loglevel";
import { ConsoleAppender } from "../appender/console.appender";

export class RootLogger extends Logger {
    public static readonly ROOT_LOGGER_NAME: string = "root";
    public static readonly DEFAULT_APPNEDER_KEY: string = "default";
    public static readonly DEFAULT_APPNEDER: ConsoleAppender = new ConsoleAppender();

    constructor(
        loglevel: LOGLEVEL
    ) {
        super(
            RootLogger.ROOT_LOGGER_NAME,
            loglevel,
            new Map([[RootLogger.DEFAULT_APPNEDER_KEY, RootLogger.DEFAULT_APPNEDER]])
        );
    }
}
