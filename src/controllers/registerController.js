import registerService from "../services/registerService";

let getRegisterPage = (req, res) => {
    return res.render("register");
};

let createNewUser = async (req, res) => {
    try {
        
        let data = {
            fullName: req.body.fullName,
            username: req.body.username,
            matricNumber: req.body.matricNumber,
            level: req.body.level,
            session: req.body.session,
            picture: req.body.picture,
            password: req.body.password,   
        };

        console.log("createNewUser controller: ", data);
        
        //Create a new user
        const user = await registerService.createNewUser(data);
        if(user) {
            res.status(200).json({user: user.id});
        } else {
            throw Error(`A user with Matric Number ${user.matricNumber} already exists!`);
        }
    } catch(e) {
        res.status(400).json({});
    }
};

module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};