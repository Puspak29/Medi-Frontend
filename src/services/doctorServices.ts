import API_URL from "../config/apiUrl";
import { type BasicResponse } from "../types/basicRes";
import { type ReportCardData, type OtpData } from "../types/reportcardType"

export type DoctorLoginData = {
    email: string,
    password: string,
}

export type DoctorSignupData = {
    name: string,
    email: string,
    password: string,
    uidByNMC: string,
    specialization: string,
    experience: number
}


async function doctorLogin(loginData: DoctorLoginData): Promise<BasicResponse>{
    try{
        const response = await fetch(`${API_URL}/auth/doctor/login`, {
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
            message: 'Something went wrong',
        }
    }
}

async function doctorSignup(signupData: DoctorSignupData): Promise<BasicResponse> {
    try{
        const response = await fetch(`${API_URL}/auth/doctor/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        const data: BasicResponse = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Signup failed, please try again',
        }
    }
}

async function generateReportCard(reportcardData: ReportCardData): Promise<BasicResponse> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Please login to continue',
            }
        }
        const response = await fetch(`${API_URL}/doctor/reportcard`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportcardData),
        });

        const data: BasicResponse = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Report creation failed',
        }
    }
}

async function getDoctorProfile(): Promise<BasicResponse & { doctor? : any }> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Please login to continue',
            }
        }
        const response = await fetch(`${API_URL}/doctor/profile`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data: BasicResponse & { doctor?: any } = await response.json();
        if(!data.success) localStorage.removeItem('token');
        return data;

    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to fetch user profile',
        }
    }
}

async function verifyOtp(otpData: OtpData): Promise<BasicResponse> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Please login to continue',
            }
        }
        const response = await fetch(`${API_URL}/doctor/reportcard/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpData)
        });

        const data: BasicResponse = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to verify OTP',
        }
    }
}

export {
    doctorLogin,
    generateReportCard,
    doctorSignup,
    getDoctorProfile,
    verifyOtp
}