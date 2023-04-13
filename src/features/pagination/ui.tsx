import { useMemo } from 'react';
import { Chevron } from '@/shared/images';
import style from './style.module.scss';
import { ITEMS_ON_PAGE } from './lib';

interface NavigationProps {
    count: number;
    currentPage: number;
    // eslint-disable-next-line no-unused-vars
    pageHandler: (page: number) => void;
    moreHandler: () => void;
}

const getPageCount = (itemsLength: number, itemsOnPage: number) => {
    return Math.ceil(itemsLength / itemsOnPage);
};

const paginate = (current: number, max: number) => {
    if (!current || !max) return null;

    let prev = current === 1 ? null : current - 1,
        next = current === max ? null : current + 1,
        items: (string | number)[] = [1];

    if (current === 1 && max === 1) return { current, prev, next, items };
    if (current > 4) items.push('…');

    let r = 2,
        r1 = current - r,
        r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

    if (r2 + 1 < max) items.push('…');
    if (r2 < max) items.push(max);

    return { current, prev, next, items };
};

export const Navigation = ({ count, currentPage, pageHandler, moreHandler }: NavigationProps) => {
    const pageCount = useMemo(() => getPageCount(count, ITEMS_ON_PAGE), [currentPage, count]);
    const pagination = useMemo(() => paginate(currentPage, pageCount), [currentPage, pageCount]);

    return (
        <div className={style.wrapper}>
            {!!pagination?.next && (
                <button className={style.button} onClick={moreHandler}>
                    Load more
                </button>
            )}
            <nav className={style.nav}>
                <button
                    className={style.navBtn}
                    disabled={!pagination?.prev}
                    onClick={() => pageHandler(pagination?.prev!)}
                >
                    <Chevron side="left" /> Previous
                </button>
                <div className={style.inner}>
                    {pagination?.items.map((it, key) => {
                        if (typeof it === 'number') {
                            return (
                                <button
                                    className={style.countBtn}
                                    key={key}
                                    onClick={() => pageHandler(it)}
                                    style={
                                        pagination.current === it
                                            ? { border: '1px solid var(--black)' }
                                            : undefined
                                    }
                                >
                                    {it}
                                </button>
                            );
                        }
                        return <p key={key}>{it}</p>;
                    })}
                </div>
                <button
                    className={style.navBtn}
                    disabled={!pagination?.next}
                    onClick={() => pageHandler(pagination?.next!)}
                >
                    Next
                    <Chevron side="right" />
                </button>
            </nav>
        </div>
    );
};
