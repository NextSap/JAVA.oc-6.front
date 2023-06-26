import React from 'react';

type FormProps = {
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<'form'>;

const Form = (props: FormProps) => {
    return (
        <form {...props} className="flex flex-col gap-5 w-96 p-8 border border-gray-600 rounded-2xl">
            {props.children}
        </form>
    );
};

export default Form;