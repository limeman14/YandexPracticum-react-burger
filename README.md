# Stellar React Burger
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/limeman14/YandexPracticum-react-burger/blob/master/README.md)
[![ru](https://img.shields.io/badge/lang-ru-yellow.svg)](https://github.com/limeman14/YandexPracticum-react-burger/blob/master/README.ru.md)

Welcome to the Stellar React Burger repository, which is an educational project completed as part of the React course from Yandex Practicum.

- [Project features](#project-features)
- [Technology stack](#technology-stack)
- [Installation and Launch](#installation-and-launch)
- [Running Tests](#running-tests)

---

## Project features
React Burger offers the following features:

- Creating a burger by dragging and dropping ingredients
- Viewing information about individual burger ingredients in a modal window/on a separate page
- User registration, authorization, and profile management
- Placing and viewing a feed of orders in real-time using WebSocket.

## Technology stack

The project uses the following key technologies:

- React: a frontend library for building user interfaces
- React Router: navigation and routing in the application
- Redux: application state management
- TypeScript: static typing of code to enhance its reliability and simplify maintenance
- Webpack: module and resource bundling (preconfigured during project initialization via Create React App)
- CSS Modules: component style isolation
- Jest: framework for unit testing
- Cypress: framework for e2e testing

## Installation and Launch

To run the project locally, it is necessary to first install NodeJS (v18 or higher). Then follow these steps:

1. Clone the repository:

`git clone https://github.com/limeman14/YandexPracticum-react-burger.git`

2. Go to the project directory:

`cd YandexPracticum-react-burger`

3. Install dependencies:

`npm install`

4. Start the project:

`npm start`

After starting, the application will be available at [localhost:3000](http://localhost:3000), if this port is free.

## Running Tests
### Unit Tests
Currently, unit tests cover only the reducers. To run the tests, the project must be installed locally. Perform the following steps:

1. Run the tests using the command:

`npm test`

This will launch the Jest test runner in interactive watch mode.

2. To create and view the test coverage, execute the command:

`npm run test:coverage`

After running the command, a code coverage report will be generated in the coverage directory.

### E2E Tests
For example, a scenario covered is creating an order by an authorized user (including opening the modal window for an ingredient).
To run the tests, the project must be installed locally.

1. Start the application locally using the command:

`npm start`

2. Launch Cypress by running the command:

`npm run cypress:open`

After the testing type selection window opens, click on `E2E Testing`, then select the available browser (by default, the tests were checked in Chrome).

3. Select the required specification from the list and run the test.