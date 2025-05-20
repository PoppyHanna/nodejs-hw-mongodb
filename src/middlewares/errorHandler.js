import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // Якщо невалідний ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found!',
    });
  }

  // Всі інші помилки
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
  });
};
