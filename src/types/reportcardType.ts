export type ReportCard = {
    userEmail: string,
    condition: string,
    description?: string,
    treatment: string,
    date?: Date,
    supportingDocuments?: string,
}

export type ReportCardProp = {
    handleSubmit: (props: ReportCard) => Promise<any>,
    
} 