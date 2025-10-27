import React from 'react'
import { type DynamicFormProps } from '../types/basicRes'
import { Link } from 'react-router-dom';

function DynamicForm(props: DynamicFormProps) {

    function propSubmit(e: React.FormEvent) {
        e.preventDefault();

        props.handleSubmit();
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
            {props.title}
          </h2>
        <form onSubmit={propSubmit} className="space-y-4">
          {props.fields.map((field) => (
            <>
            {field.type === 'dropdown' ? (
              <div className="mb-4" key={field.name}>
                <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
                  {field.fullName}
                </label>
                <select 
                name={field.name} 
                id={field.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                value={props.formData[field.name] || "Normal"}
                onChange={(e)=> props.setFormData({...props.formData, [e.target.name]: e.target.value})}
                >
                  <option value="Normal">Normal</option>
                  <option value="Critical">Critical</option>
                  <option value="Attention Needed">Attention Needed</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>
            ): (
                <div className="mb-4" key={field.name}>
                    <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
                    {field.fullName}
                    </label>
                    <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                    required={field.required}
                    placeholder={`Enter ${field.fullName.toLowerCase()}`}
                    value={field.type === 'date' ? props.formData[field.name].toISOString().split('T')[0] : (props.formData[field.name] || '')}
                    onChange={(e) => field.type === 'date' ? 
                      props.setFormData({...props.formData, [e.target.name]: new Date(e.target.value)}) : 
                      props.setFormData({...props.formData, [e.target.name]: e.target.value})
                    }
                    />
                </div>
              )}
           </>   
          ))}

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition-all"
            >
              {props.submitText || 'Submit'}
            </button>

        </form>
          {props.redirectPath ? (
            <p className='text-center text-sm text-gray-600 mt-4'>
              {props.redirectText}
              <Link to={props.redirectPath} className="text-blue-500">{props.redirectLinkText}</Link>
            </p>
          ): null }
      </div>
    </div>
  )
}

export default DynamicForm
