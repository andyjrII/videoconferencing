import dataSource from "../config/datasource";
import bcrypt from "bcryptjs";
import alert from 'alert';

let createNewUser = async (user) => {
    try {
        //check if matric number already exists
        let checkNumber = await checkMatricNumber(user.matricNumber);
        if(checkNumber) alert(`User with Matric Number already exists`);
        if(!checkNumber) {
            //check if username already exists
            let checkUser = await checkUsername(user.username);
            if(checkUser) alert(`Username is already taken`);
            if(!checkUser) {
                //hash user's password
                let salt = bcrypt.genSaltSync(10);
                let data = {
                    fullName: user.fullName,
                    username: user.username,
                    matricNumber: user.matricNumber,
                    level: user.level,
                    session: user.session,
                    picture: user.picture,
                    password: bcrypt.hashSync(user.password, salt)   
                };
                
                //create a new user 
                const userRepository = dataSource.getRepository("User");
                const savedUser = await userRepository.save(data)
                return savedUser;
            } 
        } 
    } catch(e) {
        return (e);
    }
};

let checkMatricNumber = async (matricNumber) => {
    try {
        const userRepository = dataSource.getRepository("User");
        const userExists = await userRepository.findOneBy({matricNumber: matricNumber});
        return userExists; 
    } catch(e) {
        throw(e);
    }
}

let checkUsername = async (username) => {
    try {
        const userRepository = dataSource.getRepository("User");
        const userExists = await userRepository.findOneBy({username: username});
        return userExists; 
    } catch(e) {
        throw(e);
    }
}

module.exports = {
    createNewUser: createNewUser,
    checkMatricNumber: checkMatricNumber
}