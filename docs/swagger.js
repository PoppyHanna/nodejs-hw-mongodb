import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import path from 'path';

const swaggerPath = path.resolve('docs', 'swagger.json');

export const setupSwaggerDocs = async (app) => {
  try {
    const file = await readFile(swaggerPath, 'utf-8');
    const swaggerDocument = JSON.parse(file);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger docs available at http://localhost:3000/api-docs');
  } catch (error) {
    console.error('Failed to load Swagger documentation:', error.message);
  }
};
