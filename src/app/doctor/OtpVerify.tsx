import { useState } from 'react'
import { DynamicForm } from '../../components'
import { type FormField } from '../../types/basicRes'
import { type OtpData } from '../../types/reportcardType'
import { toast } from 'react-toastify'
import { verifyOtp } from '../../services/doctorServices'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../routes'

const fieldValue: FormField[] = [
    { fullName: "Enter OTP", name: "otp", required: true, type: "text" }
]

function OtpVerify() {
    const location = useLocation();
    const navigate = useNavigate()
    const { email } = location.state;
    const [formData, setFormData] = useState<OtpData>({
        userEmail: email,
        otp: '',
        otpType: 'update'
    });

    async function handleVerifyOtp(){
        try{
            const responce = await verifyOtp(formData);
            if(responce.success){
                toast.success('Verified Successfully');
                navigate(routes.home);
            }
            else{
                toast.error('Verification failed');
            }
        }
        catch(err){
            toast.error('Verification failed');
        }
    }

  return (
    <div>
    <DynamicForm 
    title="OTP Verification"
    fields={fieldValue}
    formData={formData}
    handleSubmit={handleVerifyOtp}
    setFormData={setFormData}
    submitText='Verify'
    />
    </div>
  )
}

export default OtpVerify
