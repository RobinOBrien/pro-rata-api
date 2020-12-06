# Pro-Rata API

## What is this?

## Assumptions and requirements

Please ensure you have the latest `node.js` installed and configured correctly.

## Outstanding concerns

* There is no validation on the type of input. This opens the potential for various types of exploits. This has been
  left out given the nature of this project. If you intend to run this in a production environment, please ensure
  validation is implemented correctly.
* There is currently no persistence. Results of computations are returned to the user and not stored.

## Running the API Server

The API server has been implemented in Node.js using Express.js

To run the API simply start the server as follows:

```bash
node server.js
```

The server should now be running. The standard port is `3000`

## Using the API

## Running the test suite

The test suite makes use of Mocha. To run the tests execute the following form your terminal

```bash
npm test
```

## Docker support

TBC