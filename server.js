const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./api/utils/handleErrors')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3001

const routes = require('./api/routes/routes')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Log incoming requests to make debugging easier.
function logRequest(req, res, next) {
    console.debug(`Incoming ${req.method} on ${req.url}`)
    next()
}

app.use(logRequest)

// Start listing on given port
app.listen(port, async () => {
    // Simple root request for basic health check
    app.get('/', (req, res) => {
        res.json({success: true})
    })

    // Register all exposed routes / endpoints
    routes.configure(app);

    // Graceful handle of shutdown signals
    process.on('SIGINT', shutDown)
    process.on('SIGTERM', shutDown)

    // Load middleware error handler
    app.use(errorHandler)
})

console.log(`Pro rata API started on port ${port}`)

// Gracefully shut down.
function shutDown() {
    console.log('\nShutting down Pro rata API!')
    process.exit(0)
}

