export const LogLevel = {
    None: { level: 0, label: "NONE" },
    Trace: { level: 1000, label: "TRACE" },
    Debug: { level: 2000, label: "DEBUG" },
    Info: { level: 3000, label: "INFO" },
    Warn: { level: 4000, label: "WARN" },
    Error: { level: 5000, label: "ERROR" }
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];
