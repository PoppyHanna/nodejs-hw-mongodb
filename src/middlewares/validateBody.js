// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//     try {
//         await schema.validateAsync(req.body, {
//             abortEarly: false,
//         });
//         next();
//     } catch (err) {
//         const error = createHttpError(400, 'Bad request!', {
//             errors: err.details,
//         });
//         next(error);
//     }
// };


export const validateBody = (schema) => { 
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const details = error.details.map(detail => detail.message).join('; ');

            return res.status(400).json({
                status: 'error',
                code: 400,
                message: `Validation error: ${details}`
            });
        }
        next();
    };
};