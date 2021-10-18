import express from "express";
import app from "./app";
// const port = process.env.NODE_DOCKER_PORT || 1338;
const port = process.env.NODE_DOCKER_PORT;
var fs = require('fs');
var dir = './uploads';



import sequelize from "./config/sequelize";


if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// serving static files
app.use('/public', express.static('public'));


// make sure the app can talk to the database server
// :->TODO product environment tweak later

const connectAndSyncDB = (numberOfRetry: number) => new Promise((resolve, reject) => {
    let attempts = 5;
    const retry = (n: number): any => {
        return sequelize
            .authenticate()
            .then(() => {
                console.log("Database Connection has been established successfully.");
                // development purpose
                sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(function () {
                    sequelize.sync({  logging: console.log }).then(() => {
                        console.log("Database sync with model for development env.");
                        resolve(null);
                    });
                });
            }).catch(e => {
                console.log("couldnt connect to database", e);
                if (n === 1) {
                    throw reject("Error connecting database");
                } else {
                    console.log("Retryng again: ");
                    console.log("With delay " + attempts * 3000);
                    setTimeout(() => {
                        attempts++;
                        retry(n - 1);
                    }, attempts * 3000);
                }
            });

    };
    return retry(numberOfRetry);
});



connectAndSyncDB(10).then(() => {
    console.log("connected and synced db");
    app.listen(port, () => {
        console.log("API IS RUNNING: " + port);
    });
}).catch((e) => {
    console.log(e);
    process.exit(1);
});
