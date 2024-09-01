import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpPostAppender, IndexedDBAppender, LocalStorageAppender, LoggerService, LogLevel } from 'ng-logback';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-driver';
  private readonly loggingApiUrl = "http://localhost:3000/mock/logging";

  constructor(
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {
    const logger = this.loggerService.getLogger();

    logger.addAppender(new HttpPostAppender(httpClient, this.loggingApiUrl));
    const storeName = this.constructor.name;
    logger.addAppender(new IndexedDBAppender(storeName));
    logger.addAppender(new LocalStorageAppender());

    logger.trace(`${this.title}: sample message`);
    logger.debug(`${this.title}: sample message`);
    logger.info(`${this.title}: sample message`);
    logger.warn(`${this.title}: sample message`);
    logger.error(`${this.title}: sample message`);
  }

  public log(): void {
    const serverLoggerName: string = "server";

    if (!this.loggerService.has(serverLoggerName)) {
      console.info("Add Server Logger");
      this.loggerService.addLogger({
        name: "server",
        level: LogLevel.Info,
        appenders: [new HttpPostAppender(this.httpClient, this.loggingApiUrl)]
      });
    }

    this.loggerService.getLogger(serverLoggerName).info("send log");
  }
}
