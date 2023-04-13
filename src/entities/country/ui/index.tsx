import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { Country } from '@/shared/types';
import { stringToDate } from '@/shared/lib';
import ErrorImage from '@/shared/images/illustation.svg';
import style from './style.module.scss';

interface CountryProps {
    country: Country;
}

const CountryRowSkeleton = () => {
    return (
        <div
            className={cn(style.wrapper, {
                [style.row]: true,
            })}
        >
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
        </div>
    );
};

const CountryRow = ({ country }: CountryProps) => {
    return (
        <div
            className={cn(style.wrapper, {
                [style.row]: true,
            })}
        >
            <h2>{country?.Country}</h2>
            <h2>{country.NewConfirmed}</h2>
            <h2>{country.TotalConfirmed}</h2>
            <h2>{country.NewDeaths}</h2>
            <h2>{country.TotalDeaths}</h2>
            <h2>{country.NewRecovered}</h2>
            <h2>{country.TotalRecovered}</h2>
            <h2>{stringToDate(country.Date)}</h2>
        </div>
    );
};

const CountryHeader = () => {
    return (
        <div className={style.wrapper}>
            <h2>Country</h2>
            <h2>New confirmed count</h2>
            <h2>Total confirmed count</h2>
            <h2>New deaths</h2>
            <h2>Total deaths</h2>
            <h2>New recovered</h2>
            <h2>Total recovered</h2>
            <h2>Date</h2>
        </div>
    );
};

interface CountryRowsProps {
    countries: Country[] | undefined;
    isLoading?: boolean;
}

export const CountryRows = ({ countries, isLoading }: CountryRowsProps) => {
    return (
        <div className={style.rows}>
            {isLoading ? (
                <>
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                    <CountryRowSkeleton />
                </>
            ) : (
                <>
                    <CountryHeader />
                    {countries?.map((country) => (
                        <CountryRow country={country} key={country.Slug} />
                    ))}
                    {!countries?.length && (
                        <div className="error-illustration">
                            <div className="icon">
                                <Image width={130} height={130} alt="Error" src={ErrorImage} />
                            </div>
                            No countries founded
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
