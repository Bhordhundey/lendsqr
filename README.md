# Lendsqr Wallet Backend (DPM) - Restful Api for Lendsqr

Lendsqr Wallet Backend is a Node.js application built using [Fastify js](https://www.fastify.io//) framework.
The application purpose is to serve as the center API for ACUMEN ACADEMY

## Requirements

To setup Lendsqr Wallet you will need

- [Node >= v14.0.0 (recommended latest)](https://nodejs.org/)
- [npm (recommended latest)](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Node

It will run the application as a server

### npm

The Javascript package manager

### Git

To checkout the code from the repository

## Setup

Make sure you have both Node.js and npm installed in your computer by checking its versions in your system

```
$ <program> -v
```

Clone DPM repository.

```
$ git clone https://github.com/plusacumen/AcumenAcademyMF
```

Install API package dependencies

```
$ npm install
```

Configure parameters by copying .sample-env to .env and update credentials.

```
$ cp .sample-env .env

```

You should be ready to run your application

```
$ npm run start
```

Server should start and a message should be displayed to the console:

## Running UnitTests with code coverage

```
$ npm run test
```

## Creating Migration File

```
$ npm run knex:migrate:make {name of migration file}
```

## Running Migration

```
$ npm run knex:migrate:latest
```

## Test Lendsqr API

To test Lendsqr Api, both a Postman collection and environment are available in https://documenter.getpostman.com/view/3701162/2s8YmKSQ6F

## Debug on Visual Studio Code

It's easy to debug with Visual Studio Code both for unit tests and app run.
Add a file named "launch.json" in .vscode hidden folder, at the root of your project.
Paste the following content:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/app.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    },
    {
      "name": "Run tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
      "stopOnEntry": false,
      //"args": ["-t", "10000", "src/modules/**/tests/*.spec.ts'"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "preLaunchTask": null,
      "runtimeArgs": ["run-script", "test"],
      "env": {
        "NODE_ENV": "test"
      },
      "console": "internalConsole",
      "outFiles": ["${workspaceRoot}"]
    }
  ]
}
```

Now, if you want to run the application in debug mode (Ctr+Shift+D), choose one of the two available configurations ("Debug Mocha tests" or "Debug Program") and play "Start Debugging".
App will stop at your breakpoints.
