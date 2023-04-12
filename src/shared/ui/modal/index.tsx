import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';
import style from './style.module.scss';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const ModalComponent = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Modal"
                    className={style.modalContent}
                    overlayClassName={style.modalOverlay}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'tween', duration: 0.15 }}
                        className={style.modalBg}
                        onClick={onClose}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ type: 'tween', duration: 0.15 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ModalComponent;
