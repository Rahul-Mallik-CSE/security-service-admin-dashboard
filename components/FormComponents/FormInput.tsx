"use client";

import { useFormContext } from "react-hook-form";

type TInputsProps = {
    type: string;
    name: string;
    label: string; 
    placeholder?: string;
}

const FormInput = ({ type, name, label, placeholder }: TInputsProps) => {
    const {register} = useFormContext();
    return (
        <div className="w-full mb-3">
            <label className="block text-heading font-semibold text-[16px] mb-2">{label ? label : null}</label>
            <input type={type} placeholder={placeholder} className='py-4 text-heading px-4 outline-none border border-gray-400 rounded-xl appearance-none w-full' {...register(name, {required: true})}/>
        </div>
    )
}

export default FormInput
