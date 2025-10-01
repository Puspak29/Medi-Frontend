import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { type BasicResponse } from '../../types/basicRes';
import { userLogin } from '../../services/userServices';
import { LoginForm } from '../../components/index';

function Login() {
   
  const navigate = useNavigate();

    async function handleUserLogin(email: string, password: string): Promise<BasicResponse>{
        try{
            const response: BasicResponse = await userLogin({
                email,
                password,
            });

            if(response.success){
              navigate(routes.user.profile);
            }
            return response;
        }
        catch(err){
            return { success: false, message: 'Login failed, please try again.' };
        }
    }
  return (
    <>
        <LoginForm role='user' handleSubmit={handleUserLogin} redirectPath={routes.auth.user.login} />
    </>
  )
}

export default Login
