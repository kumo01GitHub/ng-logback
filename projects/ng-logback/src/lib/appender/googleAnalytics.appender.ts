import { Appender, ILoggingEvent } from "./appender";

/**
 * Google Analytics Appender.
 * @public
 */
export class GoogleAnalyticsAppender implements Appender {

    constructor(
        private eventName: string
    ) { }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            gtag('event', this.eventName, {
                logger: event.logger,
                timestamp: event.timestamp,
                level: event.level.label,
                message: event.message
            });
        }
    }
}
