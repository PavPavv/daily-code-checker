# AMyTemplate project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1. via `ng new <dirame>` command

## Project structure

In Angular applications, it is recommended to follow a modular and component-based architecture to organize the files and structure of the application.

### /src

#### /app

The root module (AppModule) that serves as the entry point of the application and orchestrates the feature modules.

#### /assets

Static assets such as images, fonts, and global stylesheets are typically stored in a dedicated directory within the project structure

#### /config

Configuration files, environment-specific settings, and constants are often stored in a separate directory to manage different configurations for development, testing, and production environments.

#### /modules

Angular applications are divided into feature modules, which encapsulate a set of related components, services, and other code. Each feature module should be focused on a specific aspect of the application, such as user authentication, dashboard, shopping cart, etc.

#### /routes

Angular applications often use the Angular Router to implement navigation and routing between different views and components. Routing configuration is usually defined in a separate file, and routing-related components are organized within their respective modules.

#### /services

Services are used to encapsulate reusable business logic, data access, and other shared functionality. They are typically injected into components and other services to provide specific functionality across the application.

#### /shared

##### /ui

Common components. Components are the building blocks of an Angular application. They encapsulate the UI and behavior of a specific part of the application.


Services are used to encapsulate reusable business logic, data access, and other shared functionality. They are typically injected into components and other services to provide specific functionality across the application.

#### /test

Unit tests, end-to-end tests, and other testing-related files are usually organized within their respective directories to ensure proper testing coverage.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Generate component with module and not standalone

Run `ng generate component <component-name> --standalone false`

Or if you want default behavior like to be standalone for each generate comand. You need to implement change in **angular.json**

```json
"projects": {
    "my-angular17-project": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": false
        }
      },
    }
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
