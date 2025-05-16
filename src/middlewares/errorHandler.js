import HttpError from 'http-errors'; 

// export const errorHandler = (err, req, res, next) => {
//     const status = err.status || 500;
    
//         res.status(status).json({
//             status,
//             message: status === 500 ? 'Something went wrong!' : err.message,
//             data: err.message,
//         });
// };


export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
       res.status(err.status).json({
        status:err.status,
        message: err.name,
        error: err,
       });  
        return;
    }
   
    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
};