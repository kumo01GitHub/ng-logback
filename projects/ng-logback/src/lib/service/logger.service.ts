import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from "@angular/core";
import { LogLevel } from "../abstract/loglevel";
import { RootLogger } from "../logger/root.logger";
import { Logger } from "../abstract/logger.model";

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private static ROOT_LOGGER: RootLogger;
    private static loggers: Map<string, Logger>;

    constructor(
        rootLoglevel: LogLevel = LogLevel.Trace
    ) {
        LoggerService.ROOT_LOGGER = new RootLogger(rootLoglevel);
        LoggerService.loggers = new Map([
            [LoggerService.ROOT_LOGGER.name, LoggerService.ROOT_LOGGER]
        ]);
    }

    public addLogger(logger: Logger): void {
        if (RootLogger.ROOT_LOGGER_NAME !== logger.name) {
            LoggerService.loggers.set(logger.name, logger);
        }
    }

    public removeLogger(name: string): void {
        if (RootLogger.ROOT_LOGGER_NAME !== name) {
            LoggerService.loggers.delete(name);
        }
    }

    public getLogger(name?: string): Logger {
        if (!name) {
            return LoggerService.ROOT_LOGGER;
        } else if (LoggerService.loggers.has(name)) {
            return LoggerService.loggers.get(name) as Logger;
        } else {
            return LoggerService.ROOT_LOGGER;
        }
    }
}

export function provideLoggerService(rootLoglevel: LogLevel = LogLevel.Info): EnvironmentProviders {
    const providers = [
        {
            provide: LoggerService,
            useFactory: () => new LoggerService(rootLoglevel)
        }
    ]
    return makeEnvironmentProviders(providers);
}
