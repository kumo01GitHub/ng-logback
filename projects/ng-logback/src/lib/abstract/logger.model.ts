import { Appender } from './appender.model'; 
import { LogLevel } from './loglevel';

export abstract class Logger {
    constructor(
        private _name: string,
        private _level: LogLevel,
        private _appenders: Map<string, Appender>
    ) { }

    public get name() {
        return this._name;
    }

    public addAppender(appender: Appender): void {
        this._appenders.set(appender.name, appender);
    }

    public removeAppender(name: string): void {
        this._appenders.delete(name);
    }

    private log(level: LogLevel, message: string): void {
        const timestamp = new Date();
        if (!!this._appenders && this._level.priority <= level.priority ) {
            this._appenders.forEach((appender: Appender) => {
                appender.doAppend({level: level, message: message, timestamp: timestamp});
            })
        }
    }

    public trace(message: string): void { this.log(LogLevel.Trace, message); }
    public debug(message: string): void { this.log(LogLevel.Debug, message); }
    public info(message: string): void { this.log(LogLevel.Info, message); }
    public warn(message: string): void { this.log(LogLevel.Warn, message); }
    public error(message: string): void { this.log(LogLevel.Error, message); }
}
