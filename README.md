# NgLogback

Logger Service for Angular inspired by Logback.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Outline
```mermaid
---
title: "Outline Diagram"
---
erDiagram
    LoggerService ||--|{ Logger: ""
    Logger }o--o{ Appender: ""

```

| Class | Role |
| ---- | ---- |
| LoggerService | Singleton service for managing Loggers. |
| Logger | Manage and log Appenders. |
| Appender | Define destination and append log. |

# Development

## Development server

Run `npm run start` for a dev server.

## Build

Run `npm run build ng-logback` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
