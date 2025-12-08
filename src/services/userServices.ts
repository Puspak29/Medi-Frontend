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

type SearchResultType = {
  _id: string;
  name: string;
  specialization: string;
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

        const data: BasicResponse = await response.json();
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

async function getUserReportCards(): Promise<BasicResponse & { medicalHistory?: any[] }>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Unauthorized',
            };
        }
        const response = await fetch(`${API_URL}/user/reportcards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data: BasicResponse & { medicalHistory?: any[] } = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Something went wrong.',
        }
    }
}

async function searchDoctors(query: string): Promise<BasicResponse & { doctors?: SearchResultType[] }> {
    try{
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/user/appointments?q=${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
        });

        const data: BasicResponse & { doctors?: SearchResultType[] } = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Search failed, please try again',
        }
    }
}

export {
    userSignup,
    userLogin,
    getUserReportCards,
    searchDoctors
};