import { registerUserController, loginController } from "../controllers/authController.js";
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginController);

export default authRouter;