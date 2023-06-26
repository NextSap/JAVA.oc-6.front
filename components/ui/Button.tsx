import React from 'react';
import {twMerge} from "tailwind-merge";

type ButtonProps = {
    children: string
    errorMessage?: string;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <button
        className={twMerge("bg-gray-200 p-1 rounded hover:bg-gray-300 duration-150", props.className)} {...props}>{props.children}</button>;
};

export default Button;