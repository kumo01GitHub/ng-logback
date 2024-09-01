export const LogLevel = {
    None: { priority: 0, label: "NONE" },
    Trace: { priority: 1000, label: "TRACE" },
    Debug: { priority: 2000, label: "DEBUG" },
    Info: { priority: 3000, label: "INFO" },
    Warn: { priority: 4000, label: "WARN" },
    Error: { priority: 5000, label: "ERROR" }
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

export interface ILoggingEvent {
    timestamp: Date;
    level: LogLevel;
    message: string;
}

export interface Appender {
    get name(): string;
    doAppend(event: ILoggingEvent): void;
}
