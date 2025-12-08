import { useContext, createContext, useState } from "react";

type ReportsContextType = {
    reports: any[] | null,
    setReports: React.Dispatch<React.SetStateAction<any[] | null>>,
}

export const ReportsContext = createContext<ReportsContextType>({
    reports: null,
    setReports: () => {},
});

export const useReports = () => {
    return useContext(ReportsContext);
}

export const ReportsProvider = ({ children }: { children: React.ReactNode }) => {
    const [reports, setReports] = useState<any[] | null>(null);

    const value: ReportsContextType = {
        reports,
        setReports,
    }

    return (
        <ReportsContext.Provider value={value}>
            {children}
        </ReportsContext.Provider>
    )
}