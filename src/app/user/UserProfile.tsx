import { Heading } from '../../components';
import MedicalProfile from './MedicalProfile';
import { useAuth } from '../../context/AuthContextProvider';

export type User = {
    name: string,
    email: string,
    dateofBirth: Date,
    aadhaar: string,
    medicalHistory: any[],
}

function UserProfile() {
    const { currentUser } = useAuth();
  return (
    <>
    <Heading title="User Profile" />
    { currentUser?.role === 'user' ? (
        <MedicalProfile />

    ) : (
        <p>No user data available</p>
    )}
    </>
  )
}

export default UserProfile
