import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import {
    loginUserController,
    registerUserController,
    logoutUserController,
    refreshUserSessionController,
    sendResetEmailController,
    resetPasswordController
} from "../controllers/auth.js";
import {
    loginUserSchema,
    registerUserSchema,
    resetPasswordSchema,
    sendResetEmailSchema
} from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";



const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/send-reset-email', validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;