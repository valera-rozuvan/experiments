# todomvc redux react v15 typescript

TodoMVC example using Redux, React v15, and Typescript

## Fork

This project began as a fork of [jaysoo/todomvc-redux-react-typescript](https://github.com/jaysoo/todomvc-redux-react-typescript). A lot of changes took place to bring it up to speed. Think of it as a re-version in 2022 ;)

## About

This is an implementation of [TodoMVC](http://todomvc.com/) built using:

- [React & ReactDOM](http://facebook.github.io/react/) `^15.7.0`
- [Redux](https://github.com/rackt/redux) `3.7.2`
- [TypeScript](http://www.typescriptlang.org/) `^4.4.3`

It is adapted from the [redux TodoMVC example](https://github.com/rackt/redux/tree/master/examples/todomvc).

Original blog post (conceived in 2015, updated in 2017): [React and Redux with TypeScript](http://jaysoo.ca/2015/09/26/typed-react-and-redux/)

## Getting Started

Requirement:

- NodeJS v14+

Install dependencies:

```
npm install
```

## Running development server

Run webpack dev server:

```
npm run start
```

Visit [http://localhost:3000/](http://localhost:3000/).

## Generating a production build

```
npm run build:prod
```

This will build all the assets for you, and place the static files in the folder `build`. You can then use any static file server to host your production app.

## License

Licensed under MIT. See [LICENSE](LICENSE) for more details. See [CONTRIBUTORS.md](./CONTRIBUTORS.md) file for a list of all contributors to this project.
