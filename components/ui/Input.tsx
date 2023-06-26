import React from 'react';

type InputProps = {
    label?: string;
    errorMessage?: string | undefined;
    register?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
    return (
        <div className="flex flex-col">
            {props.label && <label className="text-[17px] mb-1" htmlFor={props.id}>{props.label}</label>}
            <input  className="border rounded text-[15px] mb-0.5 p-1 focus:outline-black hover:border-gray-600 duration-300" {...props} {...props.register} />
            {props.errorMessage && <span className="text-red-500 text-[14px]">Error: {props.errorMessage}</span>}
        </div>
    );
};

export default Input;