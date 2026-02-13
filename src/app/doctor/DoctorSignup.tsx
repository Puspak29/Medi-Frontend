import { useState } from "react"
import { type BasicResponse, type FormField } from "../../types/basicRes"
import { DynamicForm } from "../../components"
import routes from "../../routes"
import { toast } from "react-toastify"
import { doctorSignup } from "../../services/doctorServices"

const fieldValue: FormField[] = [
    { name: 'name', fullName: 'Name', required: true, type: 'text' },
    { name: 'email', fullName: 'Email', required: true, type: 'email' },
    { name: 'password', fullName: 'Password', required: true, type: 'password' },
    { name: 'confirmPassword', fullName: 'Confirm Password', required: true, type: 'password' },
    { name: 'uidByNMC', fullName: "Uid By NMC", required: true, type: 'text' },
    { name: 'specialization', fullName: 'Specialization', required: true, type: 'text' },
    { name: 'experience', fullName: "Experience (in years)", required: true, type: 'number' },
    { name: 'phoneNumber', fullName: "Phone Number", required: false, type: 'text' },
    { name: 'address', fullName: 'Address', required: false, type: 'text' },
]

function DoctorSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        uidByNMC: '',
        specialization: '',
        experience: 0,
        phoneNumber: '',
        address: '',
    });

    async function handleSubmit(){

        if(formData.password !== formData.confirmPassword){
            toast.error('Password and confirm password must be same.');
            return;
        }

        try{
            const response: BasicResponse = await doctorSignup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                uidByNMC: formData.uidByNMC,
                specialization: formData.specialization,
                experience: formData.experience,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
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
      title="Doctor Register"
      fields={fieldValue}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      submitText="Register"
      redirectText="Already have an account? "
      redirectLinkText="Login"
      redirectPath={routes.auth.doctor.login}
      />
    </>
  )
}

export default DoctorSignup
