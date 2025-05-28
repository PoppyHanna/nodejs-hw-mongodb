import { Router } from "express";
import { crtlWrapper } from '../utils/ctrlWrapper.js'
import { loginUserController, registerUserController } from "../controllers/auth.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";


const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    crtlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    crtlWrapper(loginUserController),
);

export default router;