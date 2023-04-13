export const stringToDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
    });
};
