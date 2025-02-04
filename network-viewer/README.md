# network-viewer

Network viewer allow you to check http requests comming from SSR (Server Side Rendering) to BFF (Backend for Frontend Server)
and from BFF to 3PIs (any, ecommerce platform, cms, etc.)

## Setup
Install dependencies

```yarn install```

Run app in development mode

```yarn dev```

Run app in production mode (if you are not developing it, but want to use)
- compile it ```yarn build```
- start it for OS X or Linux ```yarn start``` for windows ```yarn start:windows```

Open UI console in browser following [link](http://localhost:12345)

It consist of 2 parts
- Connector
- UI Console

## Connector

This part extend native `http` node module by firing events for request/response.

Implementation in [networkViewerConnector.js](../web/server/networkViewerConnector.js)

## UI Console

This app simply websocket client which connected to server in [networkViewerConnector.js](../web/server/networkViewerConnector.js).

It's listening all requests/responses and showing req/res headers and bodies.

There is config for exclude requests to graphql local server.