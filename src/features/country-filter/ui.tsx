import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputComponent } from '@/shared/ui/input';
import { ButtonComponent } from '@/shared/ui/button';
import ModalComponent from '@/shared/ui/modal';
import { Chevron, FilterIcon } from '@/shared/images';
import { Filter, SetFilter } from '@/shared/types';
import modalStyle from './modal.module.scss';
import rowStyle from './row.module.scss';

interface FilterModalProps {
    modalOpen: boolean;
    handleModalClose: () => void;
    setFilter: SetFilter;
}

const FilterModal = ({ handleModalClose, modalOpen, setFilter }: FilterModalProps) => {
    const [sortBy, setSortBy] = useState<Filter['sortBy']>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<Filter>();

    const submit = (data: Filter) => {
        setFilter(data);
        handleModalClose();
    };

    const changeSort = (key: Filter['sortBy']) => {
        if (getValues('sortBy') === key) {
            setSortBy(null);
            return setValue('sortBy', null);
        }

        setSortBy(key);

        setValue('sortBy', key);
    };

    return (
        <ModalComponent isOpen={modalOpen} onClose={handleModalClose}>
            <form className={modalStyle.filter} onSubmit={handleSubmit((data) => submit(data))}>
                <div className={modalStyle.container}>
                    <h2 className={modalStyle.title}>More filters</h2>
                </div>
                <span className={modalStyle.line}></span>
                <div className={modalStyle.container}>
                    <h2 className={modalStyle.subtitle}>Total deaths</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent
                            min={0}
                            type="number"
                            placeholder="Min amount"
                            {...register('totalDeaths.0', {
                                valueAsNumber: true,
                                validate: (val) => {
                                    const c = getValues('totalDeaths.1');
                                    if (typeof c === 'number' && val >= c) {
                                        return false;
                                    }

                                    return true;
                                },
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                            })}
                        />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent
                            placeholder="Max amount"
                            type="number"
                            min={0}
                            {...register('totalDeaths.1', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                                validate: (val) => {
                                    const c = getValues('totalDeaths.0');
                                    if (typeof c === 'number' && val <= c) {
                                        return false;
                                    }

                                    return true;
                                },
                            })}
                        />
                    </div>
                    {errors.totalDeaths && <p className={modalStyle.error}>Invalid values</p>}
                    <span className={modalStyle.line}></span>
                    <h2 className={modalStyle.subtitle}>Total confirmed</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent
                            min={0}
                            placeholder="Min amount"
                            type="number"
                            {...register('totalConfirmed.0', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                                validate: (val) => {
                                    const c = getValues('totalConfirmed.1');
                                    if (typeof c === 'number' && val >= c) {
                                        return false;
                                    }

                                    return true;
                                },
                            })}
                        />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent
                            min={0}
                            placeholder="Max amount"
                            type="number"
                            {...register('totalConfirmed.1', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                                validate: (val) => {
                                    const c = getValues('totalConfirmed.0');
                                    if (typeof c === 'number' && val <= c) {
                                        return false;
                                    }

                                    return true;
                                },
                            })}
                        />
                    </div>
                    {errors.totalConfirmed && <p className={modalStyle.error}>Invalid values</p>}
                    <span className={modalStyle.line}></span>
                    <h2 className={modalStyle.subtitle}>Total recovered</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent
                            min={0}
                            type="number"
                            placeholder="Min amount"
                            {...register('totalRecovered.0', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                                validate: (val) => {
                                    const c = getValues('totalRecovered.1');
                                    if (typeof c === 'number' && val >= c) {
                                        return false;
                                    }

                                    return true;
                                },
                            })}
                        />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent
                            min={0}
                            type="number"
                            placeholder="Max amount"
                            {...register('totalRecovered.1', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Min value is 0',
                                },
                                validate: (val) => {
                                    const c = getValues('totalRecovered.0');
                                    if (typeof c === 'number' && val <= c) {
                                        return false;
                                    }

                                    return true;
                                },
                            })}
                        />
                    </div>
                    {errors.totalRecovered && <p className={modalStyle.error}>Invalid values</p>}
                    <span className={modalStyle.line}></span>
                    <h2 className={modalStyle.subtitle}>Sort by</h2>
                    <div className={modalStyle.buttonWrapper}>
                        <ButtonComponent
                            value="Total deaths"
                            property={sortBy === 'totalDeaths' ? 'focused' : undefined}
                            type="button"
                            onClick={() => changeSort('totalDeaths')}
                        />
                        <ButtonComponent
                            value="Total confirmed count"
                            type="button"
                            property={sortBy === 'totalConfirmed' ? 'focused' : undefined}
                            onClick={() => changeSort('totalConfirmed')}
                        />
                        <ButtonComponent
                            value="Total recovered"
                            type="button"
                            property={sortBy === 'totalRecovered' ? 'focused' : undefined}
                            onClick={() => changeSort('totalRecovered')}
                        />
                    </div>
                    <span className={modalStyle.line}></span>
                    <div className={modalStyle.wrapper}>
                        <ButtonComponent property="primary" value="Show results" type="submit" />
                        <ButtonComponent value="Clear filters" type="button" />
                    </div>
                </div>
            </form>
        </ModalComponent>
    );
};

interface FilterRowProps {
    // eslint-disable-next-line no-unused-vars
    inputHandler: (value: string) => void;
    value: string;
    setFilter: SetFilter;
}

export const FilterRow = ({ inputHandler, value, setFilter }: FilterRowProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <FilterModal
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                setFilter={setFilter}
            />
            <div className={rowStyle.wrapper}>
                <h2 className={rowStyle.title}>Countries</h2>
                <span className={rowStyle.right}>
                    <InputComponent
                        placeholder="Search"
                        inputMode="search"
                        value={value}
                        onChange={(e) => inputHandler(e.target.value)}
                    />
                    <span className={rowStyle.betweenLine}></span>
                    <button onClick={handleModalOpen} className={rowStyle.button}>
                        <FilterIcon /> Filter <Chevron />
                    </button>
                </span>
            </div>
        </>
    );
};
