// import { type ReportCard } from "./reportcardType"

import React from "react"

export type BasicResponse = {
    success: boolean,
    message: string,
    token?: string,
    details?: {
        id: string,
        email: string,
        role: string,
        name: string,
        aadhaar?: number,
        dateofBirth?: Date,
        medicalHistoryCount?: number,
        latestMedicalHistory?: any,
        createdAt?: Date,
        lastDoctor?: any,

        specialization?: string,
        experience?: number,
        uidByNMC?: string,
        patientCount?: number,
        rating?: number,
        lastPatient?: any
    } | null,
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

export type CurrentUser = {
    id: string,
    email: string,
    role: string,
    name?: string,
    aadhaar?: string,
    dateofBirth?: Date,
    medicalHistoryCount?: number,
    latestMedicalHistory?: any[] | null,
    createdAt?: Date,
    lastDoctor?: any | null,

    specialization?: string,
    experience?: number,
    uidByNMC?: string,
    patientCount?: number,
    rating?: number,
    lastPatient?: any | null,
}

export type ProfileField = {
    name: string,
    fullName: string,
    type: string,
    value: string | Date
}

export type ProfileProps = {
    title: string,
    fields: ProfileField[],
}