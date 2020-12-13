# Pro Rata API

## What is this?

This project is a simple api server that handles the calculation of the pro rated investor allocation. This API uses the
historical average of an investor to calculate a fair allocation amongst the investors participating in the round.
Investors allocation shall never exceed the allocation they requested.

## Assumptions and requirements

Please ensure you have the latest `node.js` installed and configured correctly.

BigDecimal has been used extensively to ensure that the decimal numbers are handled correctly and precisely.

## Outstanding concerns

* There is little to no validation on the type of input. This opens the potential for various types of exploits. This
  has been left out given the nature of this project. If you intend to run this in a production environment, please
  ensure validation is implemented correctly.
* There is currently no persistence. Results of computations are returned to the caller and are not stored.

## Running the API Server

The API server has been implemented in Node.js using Express.js

To run the API simply start the server as follows:

```bash
npm install
node server.js
```

The server should now be running. The standard port is `3000`

## Using the API

The API exposes two routes

### Health Check

```http request
GET /
```

### Calculate

This is the route where all the magic happens. A request is sent to the endpoint which is used to calculate the fair
allocation for the round.

```
POST /calculate

{
  "allocation_amount": 200,
  "investor_amounts": [
    {
      "name": "Investor A",
      "requested_amount": 100,
      "average_amount": 100
    },
    {
      "name": "Investor B",
      "requested_amount": 25,
      "average_amount": 25
    }
  ]
}
```

## Running the test suite

The test suite makes use of Mocha. To run the tests execute the following form your terminal

```bash
npm test
```

## Docker support
This API server can be run inside a container. 

Build the container image
```
docker build -t pro-rata-api .
```

Start the container

```
docker run -p 3000:3000 -d pro-rata-api
```

The API server will now be accessible through port `3000` unless explicitly change.