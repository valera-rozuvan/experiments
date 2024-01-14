# VUE without a build step

A simple demonstrator of how to run a [Vue.js](https://vuejs.org/) app without a build step.

You need a local server to properly view the live app.

For example, you can use [http-server](https://www.npmjs.com/package/http-server):

```shell
npm install -g http-server
http-server --cors='*' --port 3001 ./
```

Then navigate to [http://localhost:3001/](http://localhost:3001/) to see it live.
