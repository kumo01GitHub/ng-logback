# NgLogback

[![npm version](https://badge.fury.io/js/ng-logback.svg)](https://badge.fury.io/js/ng-logback)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Logger for Angular inspired by Logback using [Logback4js](https://github.com/kumo01GitHub/logback4js).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Overview

```mermaid
---
title: "Outline Diagram"
---
erDiagram
    LoggerFactory ||--|{ Logger: ""
    Logger }o--o{ Appender: ""

```

| Class | Role |
| ---- | ---- |
| LoggerFactory | Factory class of Loggers. |
| Logger | Manage and log Appenders. |
| Appender | Define output destination and append log. |

## Appenders

List of Appenders library provides:
- HTTP POST Appender for Angular
    - dependencies: [@angular/common/http](https://www.npmjs.com/package/@angular/common)

## Development server

Run `npm run start` for a dev server.

## Build

Run `npm run build ng-logback` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
