import express from "express";
import path from "path";
import db from "siennasql";
import pinoHTTP from "pino-http";
import logger from "./logger.js";

const __dirname = import.meta.dirname;

const app = express();

db.connect("the-dank-web.db"); // Connect to the database

const port = 3000;


// Logging
app.use(
    pinoHTTP({
        logger, //for the log file
        customSuccessMessage: (req, res, responseTime)=> { //for the console log
            let date = new Date().toISOString();
            let logLine = `[${date}] ${req.socket.remoteAddress.replace("::ffff:", "").replace("::1", "127.0.0.1")} "${req.method} ${req.url}" ${res.statusCode} - ${responseTime}ms`;
            console.log(logLine);
            return logLine;
        },
        customErrorMessage: (req, res, err)=> { //for the console log
            let date = new Date().toISOString();
            let logLine = `[${date}] ${req.socket.remoteAddress.replace("::ffff:", "").replace("::1", "127.0.0.1")} "${req.method} ${req.url}" ${res.statusCode} - Error: ${err.message}`;
            console.log(logLine);
            return logLine;
        },
    })
);


// Set the folder for the static files
app.use(express.static(path.join(__dirname, "public")));

app.use(
    express.urlencoded(
        {extended:true}
    )
);


// Redirect the user to pages from root
app.all(
    "/",
    (request, response)=> {

        response.redirect("/index.html");
        
    }
);


// :)
app.listen(
    port,
    "127.0.0.1",
    ()=> {
        console.log("Running server on port " + port);
    }
);