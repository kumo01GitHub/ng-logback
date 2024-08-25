import { Injectable } from '@angular/core';
import { Appender } from './appender.model'; 
import { LOGLEVEL } from './loglevel';

@Injectable()
export abstract class Logger {
    constructor(
        private _name: string,
        private _level: LOGLEVEL = LOGLEVEL.NONE,
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

    private write(level: LOGLEVEL, message: string): void {
        if (!!this._appenders && this._level <= level ) {
            this._appenders.forEach((appender: Appender) => {
                appender.write(level, message);
            })
        }
    }

    public trace(message: string): void { this.write(LOGLEVEL.TRACE, message); }
    public debug(message: string): void { this.write(LOGLEVEL.DEBUG, message); }
    public info(message: string): void { this.write(LOGLEVEL.INFO, message); }
    public warn(message: string): void { this.write(LOGLEVEL.WARN, message); }
    public error(message: string): void { this.write(LOGLEVEL.ERROR, message); }
}
