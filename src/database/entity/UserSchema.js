import {EntitySchema} from "typeorm";

module.exports = new EntitySchema({
    name: "User", // Will use table name `user` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fullName: {
            type: "varchar",
        },
        username: {
            type: "varchar",
            unique: true
        },
        matricNumber: {
            type: "varchar",
            unique: true,
            nullable: true
        },
        password: {
            type: "varchar",
        },
        level: {
            type: 'varchar',
            nullable: true
        },
        session: {
            type: "varchar",
            nullable: true
        },
        picture: {
            type: "varchar",
            nullable: true
        },
        dateCreated: {
            type: "timestamp",
            createDate: true
        }
    },
})