import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { getUserReportCards } from '../../services/userServices';
import { AllReportCards, Heading } from '../../components';

function MyHistory() {
    const [reports, setReports] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (effectRan.current) return;
            try{
                const response = await getUserReportCards();
                if (response.success) {
                    setReports(response.medicalHistory ?? null);
                    toast.success("Reportcard fetched successfully");
                } else {
                    toast.error(response.message);
                }
            }
            catch(err){
                toast.error('Failed to fetch reportcards, please try again');
            }
            finally{
                setLoading(false);
            }
            
        };
        fetchUserProfile();
        effectRan.current = true;
    }, []);

    if(loading) return <p>Loading...</p>;
  return (
    <div>
        <Heading title="Reportcards" />
        {reports && (
            <>
            { reports.length > 0 ? (
                reports.map((report)=> <AllReportCards key={`${report._id}`} props={report} />)
            ) : (
                <p> No records available.</p>
            )}
            </>
        )}
      
    </div>
  )
}

export default MyHistory
