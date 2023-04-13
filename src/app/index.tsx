import { Provider } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Dashboard } from 'widgets/dashboard';
import { CountryFilterRow } from '@/features/country-filter';
import { CountryRows } from '@/entities/country';
import { Navigation, ITEMS_ON_PAGE } from '@/features/nav';
import { Country, Filter } from '@/shared/types';
import { useDebounce } from '@/shared/lib';
import { store } from './store';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGetSummaryQuery } from './store/model';

export const WrappedApp = () => {
    return (
        <Provider store={store}>
            <Toaster />
            <MainPage />
        </Provider>
    );
};

const MainPage = () => {
    const { isError, isLoading, data } = useGetSummaryQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce<string>(searchValue, 500);
    const [filter, setFilter] = useState<Filter>({
        totalDeaths: [0, 0],
        totalConfirmed: [0, 0],
        totalRecovered: [0, 0],
        sortBy: null,
    });

    const pageHandler = (page: number) => {
        setCurrentPage(page);

        if (data?.Countries) {
            const skip = (page - 1) * ITEMS_ON_PAGE;
            setCountries(fetchedCountries.slice(skip, skip + ITEMS_ON_PAGE));
        }

        window?.scrollTo(0, 0);
    };

    const moreHandler = () => {
        if (data?.Countries) {
            const skip = currentPage * ITEMS_ON_PAGE;
            setCountries((prev) => prev.concat(fetchedCountries.slice(skip, skip + ITEMS_ON_PAGE)));
            setCurrentPage((prev) => prev + 1);
        }
    };

    const inputHandler = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    useEffect(() => {
        // Return to first page
        pageHandler(1);

        if (searchValue === '' && data?.Countries) {
            setCountries(data.Countries.slice(0, ITEMS_ON_PAGE));
            return setFetchedCountries(data?.Countries);
        }

        const countries = data?.Countries.filter((v) =>
            v.Country.toLowerCase().includes(searchValue.toLowerCase()),
        );

        if (countries) {
            setFetchedCountries(countries);
            setCountries(countries.slice(0, ITEMS_ON_PAGE));
        }
    }, [debouncedValue]);

    useEffect(() => {
        if (isError) {
            toast.error('Error while fetching your data');
        }
    }, [isError]);

    useEffect(() => {
        if (data?.Countries) {
            setFetchedCountries(data.Countries);
            setCountries(data.Countries.slice(0, ITEMS_ON_PAGE));
        }
    }, [data]);

    if (isError) {
        <div className="container">Error occured please try again later</div>;
    }

    return (
        <div className="container">
            <Dashboard isLoading={isLoading} data={data} />
            <CountryFilterRow
                inputHandler={inputHandler}
                value={searchValue}
                setFilter={setFilter}
            />
            <CountryRows countries={countries} isLoading={isLoading} />
            <Navigation
                count={fetchedCountries.length!}
                currentPage={currentPage}
                pageHandler={pageHandler}
                moreHandler={moreHandler}
            />
        </div>
    );
};
