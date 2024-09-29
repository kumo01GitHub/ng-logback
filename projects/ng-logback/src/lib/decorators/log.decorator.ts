import { LoggerFactory, LogLevel } from "@logback4js/core";

/**
 * Interface for Log Method Decorator Factory.
 */
export interface ILogDecorator {
    /** Logger Name */
    logger?: string;
    /** Log Message */
    msg?: string;
    /** Log Level */
    level: LogLevel;
}

/**
 * Log Method Decorator Factory.\
 * Default values are below:
 * - `logger`: Class Name
 * - `level`: `Info`
 * @param {ILogDecorator} param Log Information
 * @returns Method Decorator
 */
export const Log = (param?: ILogDecorator) => {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        const logger: string = param?.logger ? param.logger : target.constructor.name;
        const msg: string = param?.msg ? param.msg : `${target.constructor.name}.${propertyKey} start.`;
        const level = param?.level ? param.level : LogLevel.Info

        descriptor.value = function (...args: unknown[]) {
            switch (level) {
                case LogLevel.Trace:
                    LoggerFactory.getLogger(logger).trace(msg);
                    break;
                case LogLevel.Debug:
                    LoggerFactory.getLogger(logger).debug(msg);
                    break;
                case LogLevel.Info:
                    LoggerFactory.getLogger(logger).info(msg);
                    break;
                case LogLevel.Warn:
                    LoggerFactory.getLogger(logger).warn(msg);
                    break;
                case LogLevel.Error:
                    LoggerFactory.getLogger(logger).error(msg);
                    break;
            }

            return original.apply(this, args);
        }
    };
};
