import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import { SearchIcon } from '@/shared/images';
import style from './style.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputComponent = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    if (props.inputMode === 'search') {
        return (
            <div className={style.inputWrapper}>
                <SearchIcon />
                <input type="text" ref={ref} {...props} className={style.input} />
            </div>
        );
    }

    return <input type="text" ref={ref} {...props} className={style.input} />;
});

InputComponent.displayName = 'InputComponent';
