import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/shared/config';
import { SummaryRes } from '@/shared/types';

export const summaryApi = createApi({
    reducerPath: 'summaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryRes, void>({
            query: () => '/summary',
        }),
    }),
});

export const { useGetSummaryQuery } = summaryApi;
