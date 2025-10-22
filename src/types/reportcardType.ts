export type ReportCardData = {
    doctorId?: string, 
    userEmail: string, 
    otpType: string, 
    condition: string, 
    treatment: string, 
    description: string, 
    date: Date,
    supportingDocument?: string
}

export type ReportCardProp = {
    handleSubmit: (props: ReportCardData) => Promise<any>,
    
} 

export type OtpData = {
    userEmail: string, 
    otp: string, 
    otpType: string,
} 