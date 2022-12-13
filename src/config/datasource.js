import { DataSource } from "typeorm";
require("dotenv").config();

var dataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: [require("../database/entity/UserSchema"), require("../database/entity/RoomSchema")],
});

export default dataSource;