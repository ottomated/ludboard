Uses the native WebSocket client code in a browser and the [ws package client](https://www.npmjs.com/package/ws) on Node.js, enabling isomorphic applications to use WebSockets. Keeps your browser build slim, by not including any of the Node WebSocket implementation.


Installation 
============

```
npm install --save universal-websocket-client
```

Usage
=====

```
var WebSocket = require('universal-websocket-client');

\\ ... use the [WebSocket client interface](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).
```

On the client side, you'll now need to use [browserify](http://browserify.org/) (or Webpack or something similar) to bundle your code.

See [`tests/browser`](tests/browser) and [`tests/node`](tests/node)


Run Tests
=========

These are end-to-end tests, that test the installed the package.

Node
----

```
cd tests/browser/
npm install
npm test
```

Browser
-------

```
cd tests/node/
npm install
npm test
```

Then visit [`http://localhost:8000`](http://localhost:8000)
