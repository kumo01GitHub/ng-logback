import { LOGLEVEL } from "./loglevel";

export interface Appender {
    name: string;
    write: (level: LOGLEVEL, message: string) => void;
}
