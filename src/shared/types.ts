export interface SummaryRes {
    Global: {
        NewConfirmed: 100282;
        TotalConfirmed: 1162857;
        NewDeaths: 5658;
        TotalDeaths: 63263;
        NewRecovered: 15405;
        TotalRecovered: 230845;
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