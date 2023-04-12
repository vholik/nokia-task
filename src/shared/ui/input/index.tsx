import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import style from './style.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputComponent = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    return <input type="text" ref={ref} {...props} className={style.input} />;
});

InputComponent.displayName = 'InputComponent';
