import { useState, useEffect, useRef } from 'react'
import { getUserProfile } from '../../services/userServices';
import { toast } from 'react-toastify';
import { Heading } from '../../components';

export type User = {
    name: string,
    email: string,
    dateofBirth: Date,
    aadhaar: string,
    medicalHistory: any[],
}

function UserProfile() {
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
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            catch(err){
                toast.error('Failed to fetch user profile, please try again.');
            }
            finally{
                setLoading(false);
            }
            
        };
        fetchUserProfile();
        effectRan.current = true;
    }, []);

    // console.log(user);

  if(loading) return <p>Loading...</p>;
  return (
    <>
    <Heading title="User Profile" />
    {user ? (
        <div>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Date of Birth: {" "}
                {user.dateofBirth
                ? new Date(user.dateofBirth).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    })
                : "Not provided"}
            </p>
            <p>Aadhaar: {user.aadhaar}</p>
            <p>
                Medical History: {" "}
                {user.medicalHistory && user.medicalHistory.length > 0 ?
                    <ul>
                        {user.medicalHistory.map(entry => <li key={entry._id}>{entry.condition}</li>)}
                    </ul>
                 :
                    'No medical history available.'
                }
            </p>
        </div>

    ) : (
        <p>No user data available</p>
    )}
    </>
  )
}

export default UserProfile
