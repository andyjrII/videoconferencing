import dataSource from "../config/datasource";

let createNewRoom = async (data) => {
    try {
        let roomData = {
            usersId: data.id,
            roomName: data.roomName,
            roomDescription: data.roomDescription
        };
        const roomRepository = dataSource.getRepository("Room");
        const savedRoom = await roomRepository.save(roomData);
        return savedRoom;
    } catch(e) {
        return (e);
    }
};

let getUserRoom = async (id) => {
    try {
        const roomRepository = dataSource.getRepository("Room");
        console.log(id);
        const room = await roomRepository.findBy({usersId: id});
        if (room) return room;
    } catch(e) {
        throw(e);
    }
};

let getRoomById = async (id) => {
    try {
        const roomRepository = dataSource.getRepository("Room");
        const room = await roomRepository.findOneBy({id: id});
        if (room) return room;
    } catch(e) {
        throw(e);
    }
};

module.exports = {
    createNewRoom: createNewRoom,
    getUserRoom: getUserRoom,
    getRoomById: getRoomById
}