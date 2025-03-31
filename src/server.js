// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '8080'));

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    if (!contacts) {
      res.status(404).json({
        status: 404,
        message: 'Contacts not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
		 if (!mongoose.Types.ObjectId.isValid(contactId)) {
       return res.status(400).json({
         status: 400,
         message: 'Invalid contact ID format',
       });
     }

     try {
       const contact = await getContactById(contactId);

       if (!contact) {
         return res.status(404).json({
           status: 404,
           message: 'Contact not found',
         });
       }

       res.status(200).json({
         status: 200,
         message: `Successfully found contact with id ${contactId}!`,
         data: contact,
       });
     } catch (error) {
       console.error('Error fetching contact:', error);
       res.status(500).json({
         status: 500,
         message: 'Internal server error',
       });
     }
	});

  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
