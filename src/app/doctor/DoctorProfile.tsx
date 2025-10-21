import { useState, useEffect, useRef } from 'react'
import { getDoctorProfile } from '../../services/doctorServices';
import { toast } from 'react-toastify';
import { Heading } from '../../components';

export type Doctor = {
    name: string,
    email: string,
    uidByNMC: string,
    specialization: string,
    experience: number,
}

function DoctorProfile() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            if (effectRan.current) return;
            try{
                const response = await getDoctorProfile();
                if (response.success) {
                    setDoctor(response.doctor);
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
        fetchDoctorProfile();
        effectRan.current = true;
    }, []);

    // console.log(doctor);

  if(loading) return <p>Loading...</p>;
  return (
    <>
    <Heading title="Doctor Profile" />
    {doctor ? (
        <div>
            <h2>Name: {doctor.name}</h2>
            <p>Email: {doctor.email}</p>
            <p>UID by NMC: {doctor.uidByNMC}</p>
            <p>Specialization: {doctor.specialization}</p>
            <p>Experience: {doctor.experience} years</p>
        </div>

    ) : (
        <p>No doctor data available</p>
    )}
    </>
  )
}

export default DoctorProfile
