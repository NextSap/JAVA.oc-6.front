import React from 'react';

type ButtonProps = {
    children: string
    errorMessage?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <button className="bg-gray-200 p-1 rounded hover:bg-gray-300 duration-150" {...props}>{props.children}</button>;
};

export default Button;