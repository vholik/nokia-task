import { Provider } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Dashboard } from 'widgets/dashboard';
import { CountryFilterRow } from '@/features/country-filter';
import { CountryRows } from '@/entities/country';
import { Navigation, ITEMS_ON_PAGE } from '@/features/pagination';
import { Country, Filter } from '@/shared/types';
import { useDebounce } from '@/shared/lib';
import { Header } from 'widgets/header';
import ErrorImage from '@/shared/images/illustation.svg';
import { store } from './store';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGetSummaryQuery } from './store/model';

export const WrappedApp = () => {
    return (
        <Provider store={store}>
            <Toaster />
            <Header />
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
        value: '',
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

    const filterCallback = useCallback(() => {
        // Return to first page
        pageHandler(1);

        const isInitial =
            !filter.sortBy &&
            !filter.totalConfirmed[0] &&
            !filter.totalConfirmed[1] &&
            !filter.totalDeaths[0] &&
            !filter.totalDeaths[1] &&
            !filter.totalRecovered[0] &&
            !filter.totalRecovered[1] &&
            !filter.value;

        if (isInitial && data?.Countries) {
            setCountries(data.Countries.slice(0, ITEMS_ON_PAGE));
            return setFetchedCountries(data?.Countries);
        }

        if (!data?.Countries) return;

        let countries = data?.Countries.filter((it) => {
            const totalConfirmed = it.TotalConfirmed;

            if (
                totalConfirmed >= (filter.totalConfirmed[0] || 0) &&
                totalConfirmed <= (filter.totalConfirmed[1] || Infinity)
            ) {
                return true;
            }

            return false;
        });

        countries = countries.filter((it) => {
            const totalDeaths = it.TotalDeaths;

            if (
                totalDeaths >= (filter.totalDeaths[0] || 0) &&
                totalDeaths <= (filter.totalDeaths[1] || Infinity)
            ) {
                return true;
            }

            return false;
        });

        countries = countries.filter((it) => {
            const totalRecovered = it.TotalConfirmed;

            if (
                totalRecovered >= (filter.totalRecovered[0] || 0) &&
                totalRecovered <= (filter.totalRecovered[1] || Infinity)
            ) {
                return true;
            }

            return false;
        });

        const sortBy = filter.sortBy;

        if (sortBy === 'totalConfirmed') {
            countries = countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        }
        if (sortBy === 'totalDeaths') {
            countries = countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        }
        if (sortBy === 'totalRecovered') {
            countries = countries.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
        }

        countries = countries.filter((v) =>
            v.Country.toLowerCase().includes(searchValue.toLowerCase()),
        );

        setFetchedCountries(countries);
        setCountries(countries.slice(0, ITEMS_ON_PAGE));
    }, [filter]);

    useEffect(() => {
        filterCallback();
    }, [filter]);

    // Input debounce
    useEffect(() => {
        console.log(searchValue);

        setFilter({
            ...filter,
            value: searchValue,
        });
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
        return (
            <div className="container">
                <div className="error-illustration">
                    <div className="icon">
                        <Image width={130} height={130} alt="Error" src={ErrorImage} />
                    </div>
                    Error occured please try again later
                </div>
            </div>
        );
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
            {!!countries.length && (
                <Navigation
                    count={fetchedCountries.length!}
                    currentPage={currentPage}
                    pageHandler={pageHandler}
                    moreHandler={moreHandler}
                />
            )}
        </div>
    );
};
