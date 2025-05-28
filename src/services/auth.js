import bcrypt from 'bcrypt';
import { UserCollection } from "../db/models/user";
import createHttpError from 'http-errors';

export const registerUser = async (payload) => { 
    const user = await UserCollection.findOne({
        email: payload.email
    });
    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UserCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await UserCollection.findOne({
        email: payload.email
    });
    if (!user) {
        throw createHttpError(401, 'Unauthorized!');
    };


};