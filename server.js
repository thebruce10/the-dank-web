import express, { response } from "express";
import path from "path";
import db from "siennasql";
import crypto from "crypto-js"
import pinoHTTP from "pino-http";
import logger from "./logger.js";

const __dirname = import.meta.dirname;

const app = express();

db.connect("the-dank-web.db"); // Connect to the database

const port = 3000;


function createHash(plainText) {
    let hash = crypto.SHA256(plainText).toString();
    return hash;
}



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
    (req, res)=> {

        res.redirect("/register.html");
        
    }
);


app.all(
    "/register",
    (req, res)=> {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;

        if (password !== passwordConfirm || username === "" || password === "") {
            res.send("Registration failed.");
            return;
        }

        let hashedPassword = createHash(password);

        db.run(
            "INSERT INTO USERS(USERNAME, EMAIL, PASSWORD, ADMIN) VALUES (?, ?, ?, ?);",
            [username, email, hashedPassword, false]
        );

        res.send("Registration succeeded.");


    }
)


// :)
app.listen(
    port,
    "127.0.0.1",
    ()=> {
        console.log("Running server on port " + port);
    }
);