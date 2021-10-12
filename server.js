const express = require('express')
const dotenv = require('dotenv')

const {connect, db } = require('./src/config/db.config')
const rootRouter = require('./src/routes/rootRouter')

dotenv.config()
const app = express()

//Config body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
