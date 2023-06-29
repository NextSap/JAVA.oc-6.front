import React from 'react';
import {twMerge} from "tailwind-merge";

type ButtonProps = {
    children: string
    errormessage?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <button
        {...props}
        className={twMerge(`bg-gray-200 p-1 rounded hover:bg-gray-300 duration-150 cursor-pointer ${props.className}`)}>
        {props.children}
    </button>;
};

export default Button;