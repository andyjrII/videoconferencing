import express from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import roomController from "../controllers/roomController";
import {requireAuth} from "../middleware/authMiddleware";
import logoutController from "../controllers/logoutController";
import aboutController from "../controllers/aboutController"
import roomService from "../services/roomService";
import loginService from "../services/loginService";

const { v4: uuidv4 } = require('uuid')

let router = express.Router();

let initWebRoutes = (app) => {
   router.get("/", async (req, res) => {
      const totalUsers = await loginService.countUsers();
      const totalRooms = await loginService.countRooms();
    return res.render("index", {
      totalUsers,
      totalRooms
    });
   });

   router.get("/register", registerController.getRegisterPage);
   router.post("/register-new-user", registerController.createNewUser);
   
   router.get("/login", loginController.getLoginPage);
   router.post("/login", loginController.handleLogin);

   router.get("/create-room", requireAuth, roomController.getCreateRoomPage);
   router.post("/create-new-room", roomController.createNewRoom);

   router.get("/logout", logoutController.handleLogout);

   router.get("/about", aboutController.getAboutPage);

   router.get('/room', requireAuth, (req, res) => {
      res.redirect(`/room/${uuidv4()}`)
   });
    
   router.get('/room/:room', requireAuth, async (req, res) => {
      const user = req.cookies.data;
      const roomId = req.params.room;
      const room = await roomService.getRoomById(roomId);
      res.render('room', { 
         user: user,
         roomId: roomId,
         room: room
      });
   });
  
   return app.use("/", router);
};

module.exports = initWebRoutes;