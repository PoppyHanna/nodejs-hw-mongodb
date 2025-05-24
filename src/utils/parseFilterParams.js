export const parseFilterParams = (query) => { 
    const { isFavourite, type } = query;

    const filter = {};

    if (isFavourite !== undefined) {
        filter.isFavourite = isFavourite === 'true';
    }
    
    if (type) { 
        filter.contactType = type;
    }

    return filter;
};