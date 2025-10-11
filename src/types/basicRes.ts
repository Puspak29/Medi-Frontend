// import { type ReportCard } from "./reportcardType"

import React from "react"

export type BasicResponse = {
    success: boolean,
    message: string,
}

export type UserSignup = {
    name: string,
    email: string,
    password: string,
}

export type LoginFormProps = {
    role: 'user' | 'doctor',
    handleSubmit: (email: string, password: string) => Promise<any>,
    redirectPath: string,
}

export type FormField = {
    name: string, 
    fullName: string, 
    type: string, 
    required: boolean
}

export type DynamicFormProps = {
    title: string,
    fields: FormField[],
    handleSubmit: () => Promise<any>,
    formData: Record<string, any>,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    submitText?: string,
    redirectPath?: string,
    redirectText?: string,
    redirectLinkText?: string,
}