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