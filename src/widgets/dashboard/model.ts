import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/shared/config';

interface DashboardRes {
    Global: {
        NewConfirmed: 100282;
        TotalConfirmed: 1162857;
        NewDeaths: 5658;
        TotalDeaths: 63263;
        NewRecovered: 15405;
        TotalRecovered: 230845;
    };
    Date: string;
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getSummary: builder.query<DashboardRes, void>({
            query: () => '/summary',
        }),
    }),
});

export const { useGetSummaryQuery } = dashboardApi;
