import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { type BasicResponse } from '../../types/basicRes';
import { doctorLogin } from '../../services/doctorServices';
import { LoginForm } from '../../components/index';

function DoctorLogin() {

    const navigate = useNavigate();

    async function handleDoctorLogin(email: string, password: string): Promise<BasicResponse>{
        try{
            const response: BasicResponse = await doctorLogin({
                email,
                password,
            });

            if(response.success){
                navigate(routes.home);
            }
            return response;
        }
        catch(err){
            return { success: false, message: 'Login failed, please try again.' };
        }
    }
  return (
    <>
        <LoginForm role='doctor' handleSubmit={handleDoctorLogin} redirectPath={routes.auth.doctor.signup} />
    </>
  )
}

export default DoctorLogin
