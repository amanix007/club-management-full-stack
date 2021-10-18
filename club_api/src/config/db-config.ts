const sequalizeOptions = {
    "host": process.env.DB_HOST,
    "define": {
        "timestamps": false
    },
    "charset": "utf8",
    "collate": "utf8_general_ci",
    "logging": false,
    "dialect": "mysql",
    "port": process.env.DB_PORT,
    log: console.log,
};

interface DBConfig {
    [key: string]: any;
}
const dbConfig: DBConfig = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        ...sequalizeOptions,
    },
    // "test": {
    //     "username": process.env.MYSQL_USER || "root",
    //     "password": process.env.MYSQL_PASSWORD || "root",
    //     "database": process.env.MYSQL_DATABASE || "",
    //     ...sequalizeOptions,
    // },
    // "production": {
    //     "username": process.env.MYSQL_USER || "root",
    //     "password": process.env.MYSQL_PASSWORD || "root",
    //     "database": process.env.MYSQL_DATABASE || "pp",
    //     ...sequalizeOptions,
    //     "pool": {
    //         "max": 20,
    //         "min": 5,
    //         "idle": 10000
    //     },
    // }
};

// const env: string = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
// const env: string = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

export = dbConfig["development"];