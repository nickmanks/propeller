<img src='./src/logo.svg' height='60' />

## Setup

> Requires node version >= 10, use:
>
> ```bash
> nvm use 10
> ```
>
> Make sure to use the latest version of npm:
> ```bash
> npm i -g npm
> ```
>
>
>**Note:**
> If you upgrade from previous versions of node or npm you may have to
> clear out your `node_modules` and the npm caches:
> ```bash
> rm -rf node_modules
> npm cache clean --force
> ```

## Install

```bash
git clone https://github.com/nickmanks/propeller.git
cd propeller
npm ci
```

## Run Development

```bash
npm start
```
Navigate to [http://localhost:8080](http://localhost:8080)

## Build and Package

To run a build use:

```bash
npm run build
```

## Running tests

Before committing and pushing code you should run the full suite of tests.
The full test command includes linting from `eslint` and `stylelint`.
The unit-tests are using [jest](https://facebook.github.io/jest/)
with config from [jest.config.js](./jest.config.js):

```bash
npm run test
```

You will find code coverage results in `.cov` including a HTML report:
```bash
open ./.cov/lcov-report/index.html
```

##### All tests

```bash
npm run jest:full
```

##### Update snapshots

```bash
npm run jest:full -- -u
```

##### Single test

```bash
npm run jest -- FILE_PATH_TO_MATCH
```

## Storybook UI

```bash
npm run storybook
```

Navigate to [http://localhost:9000](http://localhost:9000)

## Committing code

```bash
npx git-cz
```

> Follow `commitizen` commit conventions

## Browserstack

Go to [https://live.browserstack.com/](https://live.browserstack.com/) to check UI and code changes across browsers
