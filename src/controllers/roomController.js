import roomService from "../services/roomService";

let getCreateRoomPage = async (req, res) => {
    const user = req.cookies.data;
    const url = req.get('host') + "/room/"
    const room = await roomService.getUserRoom(user.id);
    return res.render("create-room", {
        user: user,
        url: url,
        room: room
    });
};

let createNewRoom = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            roomName: req.body.roomName,
            roomDescription: req.body.roomDescription,
        };

        //Create a new room
        const room = await roomService.createNewRoom(data);
        if(room) {
            res.status(200).json({ room });
        } else {
            throw Error(`Unable to create room ${roomName}`);
        }
    } catch(e) {
        res.status(400).json({});
    }
};

module.exports = {
    getCreateRoomPage: getCreateRoomPage,
    createNewRoom: createNewRoom
};