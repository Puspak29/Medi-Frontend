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
        <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col'>
            <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Name: {doctor.name}</div>
                <div className='text-lg font-semibold'>Email: {doctor.email}</div>
                <div className='text-lg font-semibold'>UID by NMC: {doctor.uidByNMC}</div>
                <div className='text-lg font-semibold'>Specialization: {doctor.specialization}</div>
                <div className='text-lg font-semibold'>Experience: {doctor.experience} years</div>
            </div>
        </div>

    ) : (
        <p>No doctor data available</p>
    )}
    </>
  )
}

export default DoctorProfile
