import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
import { SWAGGER_PATH } from '../constants/index.js';

let swaggerDocument = null;

try {
  const file = fs.readFileSync(SWAGGER_PATH, 'utf-8');
  swaggerDocument = JSON.parse(file);
  console.log("Swagger JSON loaded successfully");
} catch (error) {
  console.error("Failed to load swagger.json:", error.message);
}

export const swaggerUiServe = swaggerUI.serve;

export const swaggerUiSetup = swaggerDocument
  ? swaggerUI.setup(swaggerDocument)
  : (req, res, next) => {
      console.error("swaggerDocument is null, can't show Swagger UI");
      next(createHttpError(500, 'Swagger documentation is not available'));
    };
