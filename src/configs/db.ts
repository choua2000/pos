import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "sml",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/entitys/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
})
AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database successfully")
    })
    .catch((err) => {
        console.error("Server error", err)
    })
    export default AppDataSource;