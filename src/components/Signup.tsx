import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userSignup } from '../services/userSignup'
import { toast } from 'react-toastify'
import { type BasicResponse } from '../types/basicRes'
import routes from '../routes'

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateofBirth: new Date(),
        aadhaar: '',
    });

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

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
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateofBirth" className="block text-gray-700 font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateofBirth"
              name="dateofBirth"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.dateofBirth.toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, [e.target.name]: new Date(e.target.value)})}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="aadhaar" className="block text-gray-700 font-bold mb-2">
              Aadhaar No.
            </label>
            <input
              type="number"
              id="aadhaar"
              name="aadhaar"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.aadhaar}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="border rounded w-full py-2 px-3"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>

            <p>
              Have an account? 
              <Link to={routes.auth.user.login} className="text-blue-500"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
