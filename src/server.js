// src/server.js

import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js'

const PORT = Number(getEnvVar('PORT', '3000'));

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
          message: 'Contact list!',
        });
    });
    
    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

         if (!contact) {
           return res.status(404).json({
                message: "Contact not found!"
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data:contact,
        });  
        next();
    });

    app.use((req, res) => {
        res.status(404).json({
          message: 'Not found',
        });
      });

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
 
