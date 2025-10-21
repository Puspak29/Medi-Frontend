import React from 'react'
import { type DynamicFormProps } from '../types/basicRes'
import { Link } from 'react-router-dom';

function DynamicForm(props: DynamicFormProps) {

    function propSubmit(e: React.FormEvent) {
        e.preventDefault();

        props.handleSubmit();
    }


  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form onSubmit={propSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {props.title}
          </h2>

          {props.fields.map((field) => (
                <div className="mb-4" key={field.name}>
                    <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
                    {field.fullName}
                    </label>
                    <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="border rounded w-full py-2 px-3"
                    required={field.required}
                    value={field.type === 'date' ? props.formData[field.name].toISOString().split('T')[0] : (props.formData[field.name] || '')}
                    onChange={(e) => field.type === 'date' ? 
                      props.setFormData({...props.formData, [e.target.name]: new Date(e.target.value)}) : 
                      props.setFormData({...props.formData, [e.target.name]: e.target.value})
                    }
                    />
                </div>
          ))}


          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {props.submitText || 'Submit'}
            </button>

          {props.redirectPath ? (
            <p>
              {props.redirectText}
              <Link to={props.redirectPath} className="text-blue-500">{props.redirectLinkText}</Link>
            </p>
          ): null }
          </div>
        </form>
      </div>
    </div>
  )
}

export default DynamicForm
