import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { UserCollection } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization'); 
        
        if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header!'));
        return;
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }

    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
        next(createHttpError(401, 'Access token expired'));
    }

        // перевірка на термін дії access token
        if (session.expiresAt && session.expiresAt < Date.now()) {
        return next(createHttpError(401, 'Session expired'))
    }
        
    const user = await UserCollection.findById(session.userId);

    if (!user) {
        next(createHttpError(401, 'User not found'));
        return;
    }

        req.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
        };
        
        next();
        
    }
    catch (err) {
        next(err);
    }
};