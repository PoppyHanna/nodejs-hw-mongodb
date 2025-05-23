export const calculatePaginationData = (totalItems, page, perPage) => {
    const totalPages = Math.ceil(totalItems / perPage);
    // const hasNextPage = Boolean(totalPages - page);
    // const hasPreviusPage = page !== 1;

    return {
        page,
        perPage,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviusPage: page > 1,
    };
};