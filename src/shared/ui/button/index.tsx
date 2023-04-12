import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';
import cn from 'classnames';
import style from './style.module.scss';

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isPrimary?: boolean;
    placeholder?: string;
};

export const ButtonComponent = forwardRef((props: InputProps, ref: Ref<HTMLButtonElement>) => {
    return (
        <button
            ref={ref}
            {...props}
            className={cn(style.button, {
                [style.primary]: props.isPrimary,
            })}
        >
            {props.placeholder}
        </button>
    );
});

ButtonComponent.displayName = 'ButtonComponent';
