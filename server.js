const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connect, db } = require('./src/config/db.config')
const rootRouter = require('./src/routes/rootRouter')
const { role } = require('./src/models')

const app = express()
app.use(cors())
dotenv.config()

const corsOptions = {
  origin: 'http://localhost:5000/',
}

//Config body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Route
app.use(rootRouter)

//Connect check database
connect()

// Database
db.sync({ force: false }).then(() => {
  //
  //     function initial() {
  //         Role.create({
  //             id: 1,
  //             name: "user"
  //         });
  //
  //         Role.create({
  //             id: 2,
  //             name: "moderator"
  //         });
  //
  //         Role.create({
  //             id: 3,
  //             name: "admin"
  //         });
  //     }
  // initial()
  //Config port run server
  const port = process.env.PORT || 8100
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})
