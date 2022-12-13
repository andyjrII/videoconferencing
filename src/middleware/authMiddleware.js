import jwt from 'jsonwebtoken';
require("dotenv").config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //Check if json web token exists & is verified
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.redirect('/');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/');
    }
}

module.exports = { requireAuth };