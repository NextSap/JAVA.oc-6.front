import React from 'react';

type CheckBoxProps = {
    label?: string;
    register?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox = (props: CheckBoxProps) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <div className="flex items-center gap-2">
            <input {...props} {...props.register} type="checkbox" onClick={() => setChecked(!checked)}
                   className="form-checkbox h-4 w-4 text-gray-600 hover:cursor-pointer" checked={checked}/>
            {props.label && <label onClick={() => setChecked(!checked)} className="text-[17px]" htmlFor={props.id}>{props.label}</label>}
        </div>
    );
};

export default CheckBox;