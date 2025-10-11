import { useState } from "react"
import { type FormField } from "../../types/basicRes"
import { DynamicForm } from "../../components"

const fieldValue: FormField[] = [
    { name: 'name', fullName: 'Name', required: true, type: 'text' },
    { name: 'uidByNMC', fullName: "Uid By NMC", required: true, type: 'text' },
    { name: 'email', fullName: 'Email', required: true, type: 'email' },
    { name: 'password', fullName: 'Password', required: true, type: 'password' },
    { name: 'specialization', fullName: 'Specialization', required: true, type: 'text' },
    { name: 'experience', fullName: 'Experience', required: true, type: 'number' }
]

function DoctorSignup() {
    const [formData, setFormData] = useState({
        name: '',
        uidByNMC: '',
        email: '',
        password: '',
        specialization: '',
        experience: 0,
    });
  return (
    <>
      <DynamicForm 
      title="Doctor Register"
      fields={fieldValue}
      handleSubmit={async () => Promise.resolve()}
      formData={formData}
      setFormData={setFormData}
      />
    </>
  )
}

export default DoctorSignup
