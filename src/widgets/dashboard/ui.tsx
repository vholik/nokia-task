import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { DashboardCard, DashboardCardSkeleton } from '@/entities/card';
import { Chevron } from '@/shared/images';
import { SummaryRes } from '@/shared/types';
import style from './style.module.scss';

interface DashboardProps {
    isLoading: boolean;
    data: SummaryRes | undefined;
}

export const Dashboard = ({ data, isLoading }: DashboardProps) => {
    const [showDashboard, setShowDashboard] = useState(true);

    const showHandler = () => {
        setShowDashboard((state) => !state);
    };

    return (
        <div className={style.card}>
            {isLoading ? (
                <Skeleton width={100} height={20} />
            ) : (
                <button className={style.button} onClick={showHandler}>
                    Global info
                    <Chevron side={showDashboard ? 'bottom' : 'top'} />
                </button>
            )}

            {showDashboard && (
                <div className={style.wrapper}>
                    {isLoading ? (
                        <>
                            <DashboardCardSkeleton isPrimary={true} />
                            <DashboardCardSkeleton />
                            <DashboardCardSkeleton />
                            <DashboardCardSkeleton />
                            <DashboardCardSkeleton />
                        </>
                    ) : (
                        <>
                            <DashboardCard
                                bgColor="var(--violet)"
                                title="Total confirmed"
                                count={data?.Global.TotalConfirmed}
                                isPrimary={true}
                            />
                            <DashboardCard
                                bgColor="var(--red)"
                                title="New deaths"
                                count={data?.Global.NewDeaths}
                            />
                            <DashboardCard
                                bgColor="var(--blue)"
                                title="New recovered"
                                count={data?.Global.NewRecovered}
                            />
                            <DashboardCard
                                bgColor="var(--green)"
                                title="New confirmed"
                                count={data?.Global.NewConfirmed}
                            />
                            <DashboardCard
                                bgColor="var(--yellow)"
                                title="Total deaths"
                                count={data?.Global.TotalDeaths}
                            />
                            <DashboardCard
                                bgColor="var(--purple)"
                                title="New recovered"
                                count={data?.Global.TotalRecovered}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
