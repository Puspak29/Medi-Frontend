import { useState } from 'react'
import { toast } from 'react-toastify';
import { type BasicResponse, type FormField } from '../types/basicRes';
import { type ReportCardData, type ReportCardProp } from '../types/reportcardType';
import { DynamicForm } from './';
import { useAuth } from '../context/AuthContextProvider';


const fieldValue: FormField[] = [
  { name: 'userEmail', fullName: 'User Email', type: 'email', required: true },
  { name: 'condition', fullName: 'Condition', type: 'text', required: true },
  { name: 'treatment', fullName: 'Treatment', type: 'text', required: true },
  { name: 'description', fullName: 'Description', type: 'text', required: true },
  { name: 'supportingDocuments', fullName: 'Supporting Documents', type: 'text', required: false }
]

function ReportCardForm(props: ReportCardProp) {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState<ReportCardData>({
        doctorId: currentUser?.id,
        userEmail: '',
        otpType: 'update',
        condition: '',
        treatment: '',
        description: '',
        date: new Date(),
        supportingDocument: '',
    });

    async function propSubmit(){
        try{
            const response: BasicResponse = await props.handleSubmit(
                formData
            );
            // console.log(formData);
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
    <DynamicForm title='Report Card Form' fields={fieldValue} handleSubmit={propSubmit} formData={formData} setFormData={setFormData} />
    </>
  )
}

export default ReportCardForm
