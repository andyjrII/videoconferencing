import loginService from "../services/loginService"
import jsonToken from "../middleware/jsonToken"

let getLoginPage = (req, res) => {
    const totalUsers = loginService.countUsers();
    const totalRooms = loginService.countRooms();
    return res.render("index", {
        totalUsers, 
        totalRooms
    });
};

let handleLogin = async (req, res) => {
    try {
        let data = {
            username: req.body.username,
            password: req.body.password,   
        };
        //login a new user
        const user = await loginService.login(data);
        if(user) {
            //Assign JWT Token
            const token = jsonToken.createToken(user.id);
            res.cookie('jwt', token, {httpOny: false, maxAge: jsonToken.maxAge * 1000});
            res.cookie('data', user, {httpOny: false, maxAge: jsonToken.maxAge * 1000});
            res.status(200).send({user});   
        } else {
            throw Error(`Invalid credentials!`);
        }
    } catch(e) {
        res.status(400).json({});
    }
};

module.exports = {
    getLoginPage: getLoginPage,
    handleLogin: handleLogin
};