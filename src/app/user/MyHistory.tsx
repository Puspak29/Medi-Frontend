import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { type User } from './UserProfile';
import { getUserProfile } from '../../services/userServices';
import { AllReportCards, Heading } from '../../components';

function MyHistory() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (effectRan.current) return;
            try{
                const response = await getUserProfile();
                if (response.success) {
                    setUser(response.user);
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
    console.log(user?.medicalHistory);

    if(loading) return <p>Loading...</p>;
  return (
    <div>
        <Heading title="Reportcards" />
        {user && (
            <>
            { user.medicalHistory.length > 0 ? (
                user.medicalHistory.map((report)=> <AllReportCards key={`${report._id}`} props={report} />)
            ) : (
                <p> No records available.</p>
            )}
            </>
        )}
      
    </div>
  )
}

export default MyHistory
