import { Sequelize, } from "sequelize";
import dbConfig from "./db-config";

let sequelize: Sequelize;

// if (process.env.DATABASE_URL) {
//     sequelize = new Sequelize(process.env.DATABASE_URL);
// } else {
//     sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
// }
sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default sequelize;