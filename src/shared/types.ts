import { Dispatch, SetStateAction } from 'react';

export interface SummaryRes {
    Global: {
        NewConfirmed: number;
        TotalConfirmed: number;
        NewDeaths: number;
        TotalDeaths: number;
        NewRecovered: number;
        TotalRecovered: number;
    };
    Countries: Country[];
    Date: string;
}

export interface Country {
    Country: string;
    CountryCode: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
}

export interface Filter {
    totalDeaths: [number, number];
    totalConfirmed: [number, number];
    totalRecovered: [number, number];
    sortBy: null | 'totalDeaths' | 'totalConfirmed' | 'totalRecovered';
    value: string;
}

export type SetFilter = Dispatch<SetStateAction<Filter>>;
