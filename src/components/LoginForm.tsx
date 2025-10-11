import { useState } from 'react'
import { toast } from 'react-toastify';
import { type BasicResponse, type LoginFormProps, type FormField } from '../types/basicRes';
import { DynamicForm } from './';

const fieldValue: FormField[] = [
  { name: 'email', fullName: 'Email', type: 'email', required: true },
  { name: 'password', fullName: 'Password', type: 'password', required: true }
]

function LoginForm(props: LoginFormProps) {

  const title: string = props.role === 'user' ? 'User Login' : 'Doctor Login';
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    async function propSubmit(){
        try{
            const response: BasicResponse = await props.handleSubmit(
                formData.email,
                formData.password
            );

            if(response.success){
                toast.success(response.message);
            }
            else{
                toast.error(response.message);
            }
        }
        catch(err){
            toast.error('Login failed, please try again.');
        }
    }
  return (
    <>
    <DynamicForm 
    title={title} 
    fields={fieldValue} 
    handleSubmit={propSubmit} 
    formData={formData} 
    setFormData={setFormData} 
    redirectText="Don't have an account?" 
    redirectLinkText=' Signup'
    redirectPath={props.redirectPath}
    />
    </>
  )
}

export default LoginForm
