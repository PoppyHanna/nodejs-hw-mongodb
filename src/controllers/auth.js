import {
    registerUser,
    loginUser,
    logoutUser,
    refreshUsersSession,
    sendResetToken,
    resetPassword
} from "../services/auth.js";

import { ONE_DAY } from "../constants/index.js";

export const registerUserController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        
        res.status(201).json({
            status: 201,
            message: 'Successfully registered a user!',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const loginUserController = async (req, res) => { 
    try {
        const session = await loginUser(req.body);

        res.cookie('refreshToken', session.refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + ONE_DAY),
        });
        res.cookie('sessionId', session._id, {
            httpOnly: true,
            expires: new Date(Date.now() + ONE_DAY),
        });

        res.json({
            status: 200,
            message: 'Successfully logged in an user!',
            data: {
                accessToken: session.accessToken,
            },
        });
    } catch (error) {
    next(error);
    };
};

export const logoutUserController = async (req, res) => { 
    try{
        if (req.cookies.sessionId) {
            await logoutUser(req.cookies.sessionId);
        }

        res.clearCookie('sessionId');
        res.clearCookie('refreshToken');

        res.status(204).send();
    } catch (error) {
        next(error);
    };
};

const setupSession = (res, session) => { 
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res) => { 
    try{
        const session = await refreshUsersSession({
            sessionId: req.cookies.sessionId,
            refreshToken: req.cookies.refreshToken,
        });

        setupSession(res, session);

        res.json({
            status: 200,
            message: 'Successfully refreshed a session!',
            data: {
                accessToken: session.accessToken,
            },
        });
    } catch (error) {
        next(error);
    };
};

export const sendResetEmailController = async (req, res) => { 
     await sendResetToken(req.body.email);

        res.json({
            status: 200,
            message: 'Reset password email has been successfully send. 📧',
            data: {},
        });
   
};


export const resetPasswordController = async (req, res) => { 
    await resetPassword(req.body);
    res.json({
        status: 200,
        message: "Password has been successfully reset. 👍",
        data: {},
    });
};