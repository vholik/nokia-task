import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';
import cn from 'classnames';
import style from './style.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    property?: 'focused' | 'primary' | null;
};

export const ButtonComponent = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
        <button
            ref={ref}
            {...props}
            className={cn(style.button, {
                [style.primary]: props.property === 'primary',
                [style.focused]: props.property === 'focused',
            })}
        >
            {props.value}
        </button>
    );
});

ButtonComponent.displayName = 'ButtonComponent';
