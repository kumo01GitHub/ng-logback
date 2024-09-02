import { TestBed } from '@angular/core/testing';
import { LoggerService, provideLoggerService } from './logger.service';
import { provideHttpClient } from '@angular/common/http';
import { LogLevel } from '../appender/appender';
import { IndexedDBAppender } from '../appender/indexedDB.appender';
import { ConsoleAppender } from '../appender/console.appender';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideLoggerService(),
        provideHttpClient()
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('has Root Logger', () => {
    expect(service.getLogger()).toBeTruthy();
    expect(service.has(LoggerService.ROOT_LOGGER_NAME)).toBeTrue();
  });

  it('can add Logger', () => {
    const loggerName = "canAddLogger";
    const beforeLength = service.loggerNames.length;
    service.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: []
    });

    expect(service.has(loggerName)).toBeTrue();
    expect(service.getLogger(loggerName)).toBeTruthy();
    expect(service.getLogger(loggerName).name).toEqual(loggerName);
    expect(service.loggerNames).toHaveSize(beforeLength + 1);
  });

  it('can\'t add Logger twice', () => {
    const loggerName = "cantAddLoggerTwice";
    const appenders1 = [new ConsoleAppender()];
    const appenders2 = [new ConsoleAppender(), new IndexedDBAppender];

    const beforeLength = service.loggerNames.length;

    service.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: appenders1
    });
    service.addLogger({
      name: loggerName,
      level: LogLevel.Error,
      appenders: appenders2
    });

    expect(service.has(loggerName)).toBeTrue();
    expect(service.getLogger(loggerName)).toBeTruthy();
    expect(service.loggerNames).toHaveSize(beforeLength + 1);
    expect(service.getLogger(loggerName).appenderNames).toHaveSize(appenders1.length);
  });

  it('can remove Logger', () => {
    const loggerName = "canRemoveLogger";
    const beforeLength = service.loggerNames.length;

    service.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: [new ConsoleAppender()]
    });

    expect(service.has(loggerName)).toBeTrue();
    expect(service.getLogger(loggerName)).toBeTruthy();
    expect(service.loggerNames).toHaveSize(beforeLength + 1);

    service.removeLogger(loggerName);

    expect(service.has(loggerName)).toBeFalse();
    expect(service.getLogger(loggerName).name).toEqual(LoggerService.ROOT_LOGGER_NAME);
    expect(service.loggerNames).toHaveSize(beforeLength);
  });

  it('can\'t remove Root Logger', () => {
    service.removeLogger(LoggerService.ROOT_LOGGER_NAME);

    expect(service.getLogger()).toBeTruthy();
    expect(service.has(LoggerService.ROOT_LOGGER_NAME)).toBeTrue();
  });

  it('returns Root Logger without name', () => {
    expect(service.getLogger().name).toEqual(LoggerService.ROOT_LOGGER_NAME);
  });

  it('returns Root Logger when not added name', () => {
    expect(service.getLogger("notAddedName").name).toEqual(LoggerService.ROOT_LOGGER_NAME);
  });

  it('returns Logger names', () => {
    const loggerName = "addName";
    const before = service.loggerNames;

    service.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: [new ConsoleAppender()]
    });

    expect(service.loggerNames).toEqual(before.concat([loggerName]));
  });
});
