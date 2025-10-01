import API_URL from '../config/apiUrl'
import { type BasicResponse } from '../types/basicRes'

export type UserData = {
    name: string,
    email: string,
    password: string,
    dateofBirth: Date,
    aadhaar: string,
}

export type UserLoginData = {
    email: string,
    password: string,
}

async function userSignup(userData: UserData): Promise<BasicResponse>{
    try{
        const response = await fetch(`${API_URL}/auth/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data: BasicResponse = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Something went wrong.',
        }
    }
    
}

async function userLogin(loginData: UserLoginData): Promise<BasicResponse>{
    try{
        const response = await fetch(`${API_URL}/auth/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data: BasicResponse & { token: string; user: any } = await response.json();
        if(data.token) localStorage.setItem('token', data.token);
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Something went wrong.',
        }
    }
}

async function getUserProfile(): Promise<BasicResponse & { user? : any }> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Please login to continue.',
            }
        }
        const response = await fetch(`${API_URL}/user/profile`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data: BasicResponse & { user?: any } = await response.json();
        return data;

    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to fetch user profile.',
        }
    }
}

export {
    userSignup,
    userLogin,
    getUserProfile,
};