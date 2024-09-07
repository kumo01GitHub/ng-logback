import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Logger } from './logger';
import { LoggerService, provideLoggerService } from '../service/logger.service';
import { LocalStorageAppender } from '../appender/localStorage.appender';
import { IndexedDBAppender } from '../appender/indexedDB.appender';
import { ConsoleAppender } from '../appender/console.appender';
import { LogLevel } from '../types/loglevel';

describe('Logger', () => {
  let rootLogger: Logger;

  let noneLogger: Logger;
  let traceLogger: Logger;
  let debugLogger: Logger;
  let infoLogger: Logger;
  let warnLogger: Logger;
  let errorLogger: Logger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideLoggerService({
          rootLogLevel: LogLevel.Info,
          loggers: [
            { name: 'none', level: LogLevel.None },
            { name: 'trace', level: LogLevel.Trace },
            { name: 'debug', level: LogLevel.Debug },
            { name: 'info', level: LogLevel.Info },
            { name: 'warn', level: LogLevel.Warn },
            { name: 'error', level: LogLevel.Error },
          ]
        }),
        provideHttpClient()
      ]
    });
    rootLogger = TestBed.inject(LoggerService).getLogger();

    noneLogger = TestBed.inject(LoggerService).getLogger('none');
    traceLogger = TestBed.inject(LoggerService).getLogger('trace');
    debugLogger = TestBed.inject(LoggerService).getLogger('debug');
    infoLogger = TestBed.inject(LoggerService).getLogger('info');
    warnLogger = TestBed.inject(LoggerService).getLogger('warn');
    errorLogger = TestBed.inject(LoggerService).getLogger('error');
  });

  it('should be created', () => {
    expect(rootLogger).toBeTruthy();
  });

  it('has name', () => {
    expect(rootLogger.name).toBeTruthy();
    expect(rootLogger.name).toEqual(LoggerService.ROOT_LOGGER_NAME);
  });

  it('can add appender', () => {
    const addedAppender = new IndexedDBAppender();
    spyOn(addedAppender, 'doAppend');
    const beforeAppenders = rootLogger.appenders;

    rootLogger.addAppender(addedAppender);
    rootLogger.error('Logger Specific Test');

    expect(addedAppender.doAppend).toHaveBeenCalledTimes(1);
    expect(rootLogger.appenders).toEqual(beforeAppenders.concat(addedAppender.name));
  });

  it('can remove appender', () => {
    const removedAppender = new LocalStorageAppender();
    spyOn(removedAppender, 'doAppend');

    rootLogger.addAppender(removedAppender);
    rootLogger.error('Logger Specific Test before remove');
    const beforeAppenders = rootLogger.appenders;

    rootLogger.removeAppender(removedAppender.name);
    rootLogger.error('Logger Specific Test after remove');

    expect(removedAppender.doAppend).toHaveBeenCalledTimes(1);
    expect(rootLogger.appenders).toEqual(beforeAppenders.filter(
      (item: string) => item !== removedAppender.name));
  });

  it('which Log Level is None', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    noneLogger.addAppender(spyAppender);
    let calledTimes = 0;

    noneLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);
  });

  it('which Log Level is Trace', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    traceLogger.addAppender(spyAppender);
    let calledTimes = 0;

    traceLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Debug', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    debugLogger.addAppender(spyAppender);
    let calledTimes = 0;

    debugLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    debugLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Info', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    infoLogger.addAppender(spyAppender);
    let calledTimes = 0;

    infoLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    infoLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    infoLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    infoLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    infoLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Warn', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    warnLogger.addAppender(spyAppender);
    let calledTimes = 0;

    warnLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    warnLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Error', () => {
    const spyAppender = new ConsoleAppender();
    spyOn(spyAppender, 'doAppend');

    errorLogger.addAppender(spyAppender);
    let calledTimes = 0;

    errorLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });
});
