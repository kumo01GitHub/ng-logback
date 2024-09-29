import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Log, LoggerFactory, LogLevel, NgHttpPostAppender } from 'ng-logback';

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
    private httpClient: HttpClient
  ) {
    const logger = LoggerFactory.getLogger();
    logger.debug(`${this.title}: sample message`);

    LoggerFactory.addLogger({
      name: this.constructor.name,
      level: LogLevel.Info,
      appenders: [
        new NgHttpPostAppender(this.httpClient, this.loggingApiUrl)
      ]
    });
  }

  @Log({
    level: LogLevel.Warn
  })
  public log(): void {
    LoggerFactory.getLogger(this.constructor.name).info("send log");
  }
}
