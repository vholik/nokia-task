import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { UserIcon } from '@/shared/images';
import style from './style.module.scss';

interface CardProps {
    title?: string;
    count?: number;
    bgColor?: string;
    isPrimary?: boolean;
}

export const Card = ({ bgColor, count, title, isPrimary }: CardProps) => {
    return (
        <div
            className={cn(style.item, {
                [style.primaryItem]: isPrimary,
            })}
        >
            <span
                className={cn(style.icon, {
                    [style.primary]: isPrimary,
                })}
                style={{ backgroundColor: bgColor }}
            >
                <UserIcon size={isPrimary ? 50 : 40} />
            </span>
            <span>
                <h3 className={style.subtitle}>{title}</h3>
                <h2 className={style.count}>{count}</h2>
            </span>
        </div>
    );
};

export const CardSkeleton = ({ isPrimary }: CardProps) => {
    const size = isPrimary ? 80 : 60;
    return (
        <div
            className={cn(style.item, {
                [style.primaryItem]: isPrimary,
            })}
        >
            <Skeleton circle width={size} height={size} />
            <Skeleton width={100} count={2} />
        </div>
    );
};
