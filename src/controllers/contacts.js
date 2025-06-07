import createHttpError from 'http-errors'; 
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js'
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
        return next(createHttpError(404, 'Contact not found!'));
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });  
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body, req.user._id);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => { 
    const { contactId } = req.params;
    const photo = req.file;

    console.log('photo:', photo);  // 👉 Перевірка, чи файл приходить
    console.log('body:', req.body); // 👉 Перевірка тіла

    let photoUrl;
    

    if (photo) { 
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
           photoUrl = await saveFileToCloudinary(photo); 
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
        
    };
    const result = await updateContact(contactId, { ...req.body, userId: req.user._id, photo: photoUrl });


    // const result = await updateContact(contactId, { ...req.body, req.user._id, photo: photoUrl });

    if (!result) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result,
        // data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId, req.user._id);

    if(!contact) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    };

    res.status(204).end();
};


