import { useState } from 'react'
import { userSignup } from '../../services/userServices'
import { toast } from 'react-toastify'
import { type BasicResponse, type FormField } from '../../types/basicRes'
import routes from '../../routes'
import { DynamicForm } from '../../components'

const fieldValue: FormField[] = [
    { name: 'name', fullName: 'Name', required: true, type: 'text' },
    { name: 'email', fullName: 'Email', required: true, type: 'email' },
    { name: 'password', fullName: 'Password', required: true, type: 'password' },
    { name: 'confirmPassword', fullName: 'Confirm Password', required: true, type: 'password' },
    { name: 'dateofBirth', fullName: 'Date of Birth', required: true, type: 'date' },
    { name: 'aadhaar', fullName: 'Aadhaar No.', required: true, type: 'number' },
]

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateofBirth: new Date(),
        aadhaar: '',
    });

    async function handleSubmit(){

        if(formData.password !== formData.confirmPassword){
            toast.error('Password and confirm password must be same.');
            return;
        }

        try{
            const response: BasicResponse = await userSignup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                dateofBirth: formData.dateofBirth,
                aadhaar: formData.aadhaar,
            });

            if(response.success){
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }
        }
        catch(err){
            toast.error('Signup failed, please try again.');
        }
    }
  return (
    <>
     <DynamicForm 
     title="User Signup" 
     fields={fieldValue} 
     formData={formData} 
     setFormData={setFormData} 
     handleSubmit={handleSubmit} 
     submitText='Register'
     redirectText="Already have an account? "
     redirectLinkText="Login" 
     redirectPath={routes.auth.user.login}
     />
    </>
  )
}

export default Signup
