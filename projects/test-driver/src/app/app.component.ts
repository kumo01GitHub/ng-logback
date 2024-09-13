import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { FirebaseAnalyticsAppender, GoogleAnalyticsAppender, HttpPostAppender, LoggerService, LogLevel } from 'ng-logback';

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

    logger.trace(`${this.title}: sample message`);
    logger.debug(`${this.title}: sample message`);
    logger.info(`${this.title}: sample message`);
    logger.warn(`${this.title}: sample message`);
    logger.error(`${this.title}: sample message`);

    const firebaseConfig = {
      apiKey: "xxxx",
      authDomain: "xxxx.firebaseapp.com",
      projectId: "xxxx",
      storageBucket: "xxxx.appspot.com",
      messagingSenderId: "000000000000",
      appId: "xxxx",
      measurementId: "G-XXXXXXXXXX"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    this.loggerService.addLogger({
      name: this.constructor.name,
      level: LogLevel.Info,
      appenders: [
        new HttpPostAppender(this.httpClient, this.loggingApiUrl),
        new GoogleAnalyticsAppender("log_event"),
        new FirebaseAnalyticsAppender(analytics, "log_event"),
      ]
    });
  }

  public log(): void {
    this.loggerService.getLogger(this.constructor.name).info("send log");
  }
}
