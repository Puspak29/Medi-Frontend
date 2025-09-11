import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes';
import { type BasicResponse } from '../types/basicRes';
import { userLogin } from '../services/userLogin';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        try{
            const response: BasicResponse = await userLogin({
                email: formData.email,
                password: formData.password,
            });

            if(response.success){
                toast.success(response.message);
            }
            else{
                toast.error(response.message);
            }
        }
        catch(err){
            toast.error('login failed, please try again.');
        }
    }
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

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

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p>
              Don't have an account? 
              <Link to={routes.auth.user.signup} className="text-blue-500"> Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
