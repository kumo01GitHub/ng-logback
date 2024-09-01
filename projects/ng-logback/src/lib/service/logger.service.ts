import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from "@angular/core";
import { Logger } from "../logger/logger";
import { Appender, LogLevel } from "../appender/appender";
import { ConsoleAppender } from "../appender/console.appender";

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    /** Root Logger */
    public static readonly ROOT_LOGGER_NAME: string = "root";
    private static ROOT_LOGGER: Logger;

    /** Loggers (include Root Logger) */
    private static loggers: Map<string, Logger> = new Map<string, Logger>();

    constructor(
        rootLoglevel: LogLevel = LogLevel.Trace
    ) {
        // Initialize Root Logger
        LoggerService.ROOT_LOGGER = new Logger(
            LoggerService.ROOT_LOGGER_NAME,
            rootLoglevel,
            [new ConsoleAppender()]
        );

        this.addLogger(LoggerService.ROOT_LOGGER);
    }

    /**
     * Add Logger
     * @param {Logger}  logger Logger
     */
    public addLogger(logger: Logger): void {
        if (LoggerService.ROOT_LOGGER_NAME !== logger.name) {
            LoggerService.loggers.set(logger.name, logger);
        }
    }

    /**
     * Remove Logger
     * @param {string}  name Logger Name
     */
    public removeLogger(name: string): void {
        if (LoggerService.ROOT_LOGGER_NAME !== name) {
            LoggerService.loggers.delete(name);
        }
    }

    /**
     * Get Logger
     * @param {string}  name Logger Name
     * @returns {Logger}
     */
    public getLogger(name?: string): Logger {
        if (!name) {
            return LoggerService.ROOT_LOGGER;
        } else if (LoggerService.loggers.has(name)) {
            return LoggerService.loggers.get(name) as Logger;
        } else {
            return LoggerService.ROOT_LOGGER;
        }
    }

    /**
     * Get Logger Names
     * @returns {string[]} Logger Names include Root Logger 
     */
    public get loggerNames(): string[] {
        return Array.from(LoggerService.loggers.keys());
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
                        loggerService.addLogger(new Logger(
                            logger.name, logger.level, logger.appenders));
                    });
                }

                return loggerService;
            }
        }
    ]
    return makeEnvironmentProviders(providers);
}
