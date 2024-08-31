import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpPostAppender, LoggerService } from 'ng-logback';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-driver';

  constructor(
    httpClient: HttpClient,
    loggerService: LoggerService
  ) {
    const loggingApiUrl = "http://localhost:3000/mock/logging"
    loggerService.getLogger().addAppender(
      new HttpPostAppender(httpClient, loggingApiUrl));
    
      const logger = loggerService.getLogger();
      
      logger.trace(`${this.title}: sample message`);
      logger.debug(`${this.title}: sample message`);
      logger.info(`${this.title}: sample message`);
      logger.warn(`${this.title}: sample message`);
      logger.error(`${this.title}: sample message`);
  }
}
