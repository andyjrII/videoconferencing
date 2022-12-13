import {EntitySchema} from "typeorm";

module.exports = new EntitySchema({
    name: "Room", // Will use table name `room` as default behaviour.
    tableName: "rooms", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "bigint",
            generated: "uuid",
        },
        roomName: {
            type: "varchar",
        },
        roomDescription: {
            type: "text"
        },
        usersId: {
            type: "int"
        },
        dateCreated: {
            type: "timestamp",
            createDate: true
        }
    },
    relations: {
        users: {
            target: "User",
            type: "Many-to-One",
            joinTable: true,
            cascade: true,
        },
    },
});