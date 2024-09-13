import { Analytics, logEvent } from "firebase/analytics";
import { Appender, ILoggingEvent } from "./appender";

/**
 * Google Analytics for Firebase Appender.
 */
export class FirebaseAnalyticsAppender implements Appender {

    constructor(
        private analytics: Analytics,
        private eventName: string
    ) { }

    public get name(): string {
        return this.analytics.app.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            logEvent(this.analytics, this.eventName, {
                logger: event.logger,
                timestamp: event.timestamp,
                level: event.level.label,
                message: event.message
            });
        }
    }
}
