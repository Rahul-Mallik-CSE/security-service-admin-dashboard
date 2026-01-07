/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";


type TFromHandlerProps = {
    onSubmit: SubmitHandler<any>,
    children: any;
}

const FormHandler = ({ onSubmit, children }: TFromHandlerProps) => {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {
                    children
                }
            </form>
        </FormProvider>
    )
}

export default FormHandler
