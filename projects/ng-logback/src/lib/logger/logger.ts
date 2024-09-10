import { Appender } from '../appender/appender';
import { LogLevel } from '../types/loglevel';

/**
 * Manage and log Appenders.
 * @public
 */
export class Logger {
    private _appenders: Map<string, Appender> = new Map<string, Appender>();

    /**
     * @constructor
     * @param {string} _name Logger name. 
     * @param _level Log level.
     * @param appenders Appenders info.
     */
    constructor(
        private _name: string,
        private _level: LogLevel,
        appenders?: Appender[]
    ) {
        if (appenders) {
            appenders.forEach((appender: Appender) => {
                this.addAppender(appender);
            });
        }
    }

    /**
     * Logger name.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Add Appender from Logger.
     * @param {Appender} appender 
     */
    public addAppender(appender: Appender): void {
        this._appenders.set(appender.name, appender);
    }

    /**
     * Remove Appender from Logger.
     * @param {string} name Appender name. 
     */
    public removeAppender(name: string): void {
        this._appenders.delete(name);
    }

    /**
     * Appender names.
     */
    public get appenders(): string[] {
        return Array.from(this._appenders.keys());
    }

    private log(level: LogLevel, message: string): void {
        const timestamp = new Date();
        if (
            !!this._appenders &&
            this._level !== LogLevel.None &&
            this._level.priority <= level.priority
        ) {
            this._appenders.forEach((appender: Appender) => {
                appender.doAppend({
                    logger: this._name,
                    level: level,
                    message: message,
                    timestamp: timestamp
                });
            })
        }
    }

    /**
     * Trace log.
     * @param {string} message Log message. 
     */
    public trace(message: string): void { this.log(LogLevel.Trace, message); }

    /**
     * Debug log.
     * @param {string} message Log message. 
     */
    public debug(message: string): void { this.log(LogLevel.Debug, message); }

    /**
     * Information log.
     * @param {string} message Log message. 
     */
    public info(message: string): void { this.log(LogLevel.Info, message); }

    /**
     * Warning log.
     * @param {string} message Log message. 
     */
    public warn(message: string): void { this.log(LogLevel.Warn, message); }

    /**
     * Error log.
     * @param {string} message Log message. 
     */
    public error(message: string): void { this.log(LogLevel.Error, message); }
}
