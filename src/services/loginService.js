import dataSource from "../config/datasource";
import bcrypt from "bcryptjs";

let login = async (user) => {
    try {
        const userExist = await findUserByUsername(user.username);
        if(userExist) {
            const isPasswordCorrect = await compareUserPassword(user.password, userExist.password);
            if(isPasswordCorrect) {
                return userExist;
            }
        }
    } catch (e) {
        return (e);
    }
}

let findUserByUsername = async (username) => {
    try {
        const userRepository = dataSource.getRepository("User");
        const user = await userRepository.findOneBy({username: username});
        if (user) { 
            return user;
        }
    } catch(e) {
        throw(e);
    }
};

let compareUserPassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        if (match) {
            return match; 
        } 
    } catch(e) {
        throw(e);
    }
};

let findUserById = async (id) => {
    try {
        const userRepository = dataSource.getRepository("User");
        const user = await userRepository.findOneBy({id: id});
        if (user) return user; 
    } catch(e) {
        throw(e);
    }
};

let countUsers = async () => {
    try {
        const userRepository = dataSource.getRepository("User");
        const totalUsers = await userRepository.count();
        if (totalUsers) return totalUsers; 
    } catch(e) {
        throw(e);
    }
};

let countRooms = async () => {
    try {
        const userRepository = dataSource.getRepository("Room");
        const totalRooms = await userRepository.count();
        if (totalRooms) return totalRooms; 
    } catch(e) {
        throw(e);
    }
};

module.exports = {
    findUserByUsername,
    compareUserPassword,
    findUserById,
    login,
    countUsers,
    countRooms
}