import { ContactsCollection } from '../db/models/contact.js'
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    userId,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const query = ContactsCollection.find({ owner: userId });

    if (filter.isFavourite !== undefined) {
        query.where('isFavourite').equals(filter.isFavourite);
    };
    
    if (filter.contactType) {
        query.where('contactType').equals(filter.contactType);
    }
    
    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().countDocuments({owner: userId}),
        // contactsQuery
        query
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]: sortOrder})
        .exec(),
    ]);
    
    
    const paginationData = calculatePaginationData(contactsCount, page, perPage);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId, userId) => {
    return ContactsCollection.findOne({ _id: contactId, owner: userId });
    // const contact = await ContactsCollection.findById(contactId);
    // return contact;
};
  
export const createContact = async (payload, userId) => {
    return ContactsCollection.create({ ...payload, owner: userId });
    // const contact = await ContactsCollection.create(payload);
    // return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, owner: userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = async (contactId, userId) => { 
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
        owner: userId,
    });

    return contact;
};