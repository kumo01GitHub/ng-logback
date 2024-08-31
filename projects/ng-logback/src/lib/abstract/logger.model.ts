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

    private async write(level: LogLevel, message: string): Promise<void> {
        if (!!this._appenders && this._level <= level ) {
            this._appenders.forEach((appender: Appender) => {
                appender.write(level, message);
            })
        }
    }

    public trace(message: string): void { this.write(LogLevel.Trace, message); }
    public debug(message: string): void { this.write(LogLevel.Debug, message); }
    public info(message: string): void { this.write(LogLevel.Info, message); }
    public warn(message: string): void { this.write(LogLevel.Warn, message); }
    public error(message: string): void { this.write(LogLevel.Error, message); }
}
