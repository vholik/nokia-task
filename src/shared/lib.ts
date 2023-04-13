import { useEffect, useState } from 'react';

export const stringToDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
    });
};

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
