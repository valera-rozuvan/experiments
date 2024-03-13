# Vue and Metamask

A simple demonstrator of how to run a [Vue.js](https://vuejs.org/) app with [Metamask](https://metamask.io/) wallet. The app allows a user to connect to his Metamask wallet, and make a transaction to a recipient address.

You need a local server to properly view the live app.

For example, you can use [http-server](https://www.npmjs.com/package/http-server) like so:

```shell
npm install -g http-server
http-server --cors='*' --port 3001 --proxy http://localhost:3001? ./
```

When the server is up, navigate to [http://localhost:3001/](http://localhost:3001/) to see it live.
