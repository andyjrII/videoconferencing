import jwt from "jsonwebtoken";
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60;

let createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge 
    });
}

module.exports = {
    createToken: createToken,
    maxAge: maxAge
}