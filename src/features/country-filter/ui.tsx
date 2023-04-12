import { useState } from 'react';
import { InputComponent } from '@/shared/ui/input';
import { ButtonComponent } from '@/shared/ui/button';
import ModalComponent from '@/shared/ui/modal';
import modalStyle from './modal.module.scss';
import rowStyle from './row.module.scss';

interface FilterModalProps {
    modalOpen: boolean;
    handleModalClose: () => void;
}

const FilterModal = ({ handleModalClose, modalOpen }: FilterModalProps) => {
    return (
        <ModalComponent isOpen={modalOpen} onClose={handleModalClose}>
            <div className={modalStyle.filter}>
                <div className={modalStyle.container}>
                    <h2 className={modalStyle.title}>More filters</h2>
                </div>
                <span className={modalStyle.line}></span>
                <div className={modalStyle.container}>
                    <h2 className={modalStyle.subtitle}>Total confirmed</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent placeholder="Min amount" />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent placeholder="Max amount" />
                    </div>
                    <span className={modalStyle.line}></span>
                    <h2 className={modalStyle.subtitle}>Total confirmed</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent placeholder="Min amount" />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent placeholder="Max amount" />
                    </div>
                    <span className={modalStyle.line}></span>
                    <h2 className={modalStyle.subtitle}>Total confirmed</h2>
                    <div className={modalStyle.wrapper}>
                        <InputComponent placeholder="Min amount" />
                        <span className={modalStyle.betweenLine}></span>
                        <InputComponent placeholder="Max amount" />
                    </div>
                    <span className={modalStyle.line}></span>
                    <div className={modalStyle.wrapper}>
                        <ButtonComponent
                            isPrimary
                            placeholder="Show results"
                            onClick={handleModalClose}
                        />
                        <ButtonComponent placeholder="Clear filters" />
                    </div>
                </div>
            </div>
        </ModalComponent>
    );
};

export const FilterRow = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={rowStyle.wrapper}>
            <h2 className={rowStyle.title}>Countries</h2>
            <button onClick={handleModalOpen}>Open my modal</button>
            <FilterModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
        </div>
    );
};
