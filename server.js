const express = require('express')
const dotenv = require('dotenv')

const {connect, db } = require('./src/config/db.config')
const rootRouter = require('./src/routes/rootRouter')

dotenv.config()
const app = express()

//Config body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

//Route
app.use('/api',rootRouter)

//Connect check database
connect()

// Database
db.sync({ force: false }).then(() => {

    //Config port run server
    const port = process.env.PORT || 8100;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
