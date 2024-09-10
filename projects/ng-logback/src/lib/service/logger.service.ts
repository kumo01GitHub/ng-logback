import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from "@angular/core";
import { Logger } from "../logger/logger";
import { Appender } from "../appender/appender";
import { ConsoleAppender } from "../appender/console.appender";
import { LogLevel } from "../types/loglevel";

/**
 * Interface to add Logger.
 * @public
 */
export interface ILogger {
    /** Logger name. */
    name: string,
    /** Log level. */
    level: LogLevel,
    /** Appenders. */
    appenders?: Appender[]
}

/**
 * Singleton service for managing Loggers.
 * @public
 * @decorator `@Injectable()`
 */
@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    /**
     * Root Logger name.
     * @readonly
     */
    public static readonly ROOT_LOGGER_NAME: string = "root";

    /**
     * Loggers.
     */
    private static loggers: Map<string, Logger> = new Map<string, Logger>();

    /**
     * @constructor
     * @param {LogLevel} rootLoglevel Root Logger's log level. Default value is Trace.
     */
    constructor(
        rootLoglevel: LogLevel = LogLevel.Trace
    ) {
        // Initialize Root Logger.
        LoggerService.loggers.set(
            LoggerService.ROOT_LOGGER_NAME,
            new Logger(
                LoggerService.ROOT_LOGGER_NAME,
                rootLoglevel,
                [new ConsoleAppender()]
            ));
    }

    /**
     * Add Logger. When Logger service has the provided name, do nothing.
     * @param {ILogger}  logger Logger info
     */
    public addLogger(logger: ILogger): void {
        if (!this.has(logger.name)) {
            LoggerService.loggers.set(logger.name, new Logger(
                logger.name,
                logger.level,
                logger.appenders
            ));
        }
    }

    /**
     * Remove Logger. Root Logger is unremovable.
     * @param {string}  name Logger name.
     */
    public removeLogger(name: string): void {
        if (LoggerService.ROOT_LOGGER_NAME !== name) {
            LoggerService.loggers.delete(name);
        }
    }

    /**
     * Get Logger.
     * @param {string}  name Logger name.
     * @return {Logger} When Logger service doesn't have the provided Logger name, return Root Logger.
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
     * Logger names.
     * @returns {string[]} Logger names.
     */
    public get loggers(): string[] {
        return Array.from(LoggerService.loggers.keys());
    }

    /**
     * Logger service has the Logger or not.
     * @param {string} name Logger name.
     * @return {boolean} When true, Logger service has the Logger.
     */
    public has(name: string): boolean {
        return LoggerService.loggers.has(name);
    }
}

/**
 * Provider function for Logger service.
 * @param arg Loggers info. 
 * @returns {EnvironmentProviders} Providers of Logger service.
 */
export function provideLoggerService(arg?: {
    rootLogLevel?: LogLevel;
    rootAppenders?: Appender[];
    loggers?: ILogger[];
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
                        loggerService.addLogger(logger);
                    });
                }

                return loggerService;
            }
        }
    ]
    return makeEnvironmentProviders(providers);
}
