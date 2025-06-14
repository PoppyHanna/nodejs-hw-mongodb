// src/server.js

import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);

export const setupServer = () => {

    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
          message: 'Hello World!',
        });
    });
    
    app.use('*', (req, res, next) => {
        res.status(404).json({
          message: 'Not found',
        });
      });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
};
 
