import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoggerFactory, LogLevel } from 'ng-logback';

LoggerFactory.initialize(LogLevel.Trace);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
