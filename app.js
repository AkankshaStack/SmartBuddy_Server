const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const MySQLEvents = require("@rodrigogs/mysql-events");
const mysql = require("mysql");

const authRoutes = require("./routes/auth.routes");
const retailRoutes = require("./routes/retail.routes");
const contextualRoutes = require("./routes/contextual.routes");
const surveyRoutes = require("./routes/survey.route");
const gameplayRoutes = require("./routes/gameplay.routes");
const gameRoutes = require("./routes/game.routes");
const descriptiveRoutes = require("./routes/descriptive.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
// const db = require("./models");

// MY_SQL Connection
const { database } = require("./mysql/connectionVerify");

const DescriptivePlay = require("./models/descriptiveplay.model");

const PORT = process.env.PORT;
app.get("/", (req, res, next) => {
  res.send("HELLO");
});

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);
app.use(
  cors({
    origin: "*", // allow the server to accept request from different origin,
    // allowedHeaders: ["Content_Type", "Authorization","X-Requested-With"],
    allowedHeaders: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    // credentials: true // allow session cookie from browser to pass through
  })
);



app.use("/auth", authRoutes);
app.use("/contextual", contextualRoutes);
app.use("/retail", retailRoutes);
app.use("/survey", surveyRoutes);
app.use("/gameplay", gameplayRoutes);
app.use("/game", gameRoutes);
app.use("/descriptive", descriptiveRoutes);


const server = app.listen(PORT, (err) => {
  if (err) console.log("Error in starting Server: " + err);
  else console.log(`Starting server on PORT ${PORT}`);
});


const io = require('socket.io')(server, {
  pingTimeOut: 60000, // if there is no request on the server io will be off 
  cors: {
    origin: '*'
  }
})


const program = async () => {
  const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
  });

  await instance.start();

  await instance.addTrigger({
    name: 'monitoring all statments',
    expression: 'smart_buddy.*', // listen to contextual_play database !!!
    statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    onEvent: async (e) => {      
        // console.log(e)
        if (e.table === 'contextual_play') {
          const sql = "select * from contextual_play";
          connection.query(sql, (err, result) => {
            console.log(result)
            if (err) throw err;
            io.sockets.emit("contextual_play_data", result);
          });
        } else if (e.table === 'descriptive_play') {
          const sql = "select * from descriptive_play";
          connection.query(sql, (err, result) => {
            console.log(result)
            if (err) throw err;
            io.sockets.emit("descriptive_play_data", result);
          });
  
        } else if (e.table === 'retail') {
          const sql = "select * from retail";
          connection.query(sql, (err, result) => {
            console.log(result)
            if (err) throw err;
            io.sockets.emit("retail_data", result);
          });
        }
      }
  //     console.log(e.affectedRows[0].after)
  //     const sql = "select * from contextual_play";
  //     connection.query(sql, (err, result) => {
  //       // console.log(result)
  //       if (err) throw err;
  //       io.sockets.emit("contextual_play_data", result);
  //     });
  //   }
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);


io.on("connection", (socket) => {
  console.log("New client connected");
});