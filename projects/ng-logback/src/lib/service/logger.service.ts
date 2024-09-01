import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from "@angular/core";
import { Logger } from "../logger/logger";
import { Appender, LogLevel } from "../appender/appender";
import { ConsoleAppender } from "../appender/console.appender";

export interface ILogger {
    name: string,
    level: LogLevel,
    appenders?: Appender[]
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    /** Root Logger */
    public static readonly ROOT_LOGGER_NAME: string = "root";

    /** Loggers */
    private static loggers: Map<string, Logger> = new Map<string, Logger>();

    constructor(
        rootLoglevel: LogLevel = LogLevel.Trace
    ) {
        // Initialize Root Logger
        LoggerService.loggers.set(
            LoggerService.ROOT_LOGGER_NAME,
            new Logger(
                LoggerService.ROOT_LOGGER_NAME,
                rootLoglevel,
                [new ConsoleAppender()]
            ));
    }

    /**
     * Add Logger. Root Logger is uneditable using this method.
     * @param {ILogger}  logger Logger Info
     */
    public addLogger(logger: ILogger): void {
        if (LoggerService.ROOT_LOGGER_NAME !== logger.name) {
            LoggerService.loggers.set(logger.name, new Logger(
                logger.name,
                logger.level,
                logger.appenders
            ));
        }
    }

    /**
     * Remove Logger. Root Logger is unremovable using this method.
     * @param {string}  name Logger Name
     */
    public removeLogger(name: string): void {
        if (LoggerService.ROOT_LOGGER_NAME !== name) {
            LoggerService.loggers.delete(name);
        }
    }

    /**
     * Get Logger.
     * @param {string}  name Logger Name
     * @returns {Logger} When Logger Service doesn't have the provided Logger name, return Root Logger
     */
    public getLogger(name?: string): Logger {
        if (!name) {
            return LoggerService.loggers.get(LoggerService.ROOT_LOGGER_NAME) as Logger;
        } else if (LoggerService.loggers.has(name)) {
            return LoggerService.loggers.get(name) as Logger;
        } else {
            return LoggerService.loggers.get(LoggerService.ROOT_LOGGER_NAME) as Logger;
        }
    }

    /**
     * Get Logger Names.
     * @returns {string[]} Logger Names
     */
    public get loggerNames(): string[] {
        return Array.from(LoggerService.loggers.keys());
    }

    /**
     * Logger Service has the Logger or not.
     * @param {string} name Logger Name
     * @returns {boolean} When true, Logger Service has the Logger
     */
    public has(name: string): boolean {
        return LoggerService.loggers.has(name);
    }
}

export function provideLoggerService(arg?: {
    rootLogLevel?: LogLevel;
    rootAppenders?: Appender[];
    loggers?: {
        name: string;
        level: LogLevel;
        appenders: Appender[];
    }[];
}): EnvironmentProviders {
    const providers = [
        {
            provide: LoggerService,
            useFactory: (): LoggerService => {
                // Create Logger Service and Setup Root Logger
                let loggerService =  new LoggerService(arg?.rootLogLevel);
                if (arg?.rootAppenders) {
                    arg.rootAppenders.forEach((appender: Appender) => {
                        loggerService.getLogger().addAppender(appender);
                    });
                }

                // Add Other Loggers
                if (arg?.loggers) {
                    arg.loggers.forEach((logger) => {
                        loggerService.addLogger({
                            name: logger.name,
                            level: logger.level,
                            appenders: logger.appenders
                        });
                    });
                }

                return loggerService;
            }
        }
    ]
    return makeEnvironmentProviders(providers);
}
