import API_URL from '../config/apiUrl'
import { type BasicResponse } from '../types/basicRes'

export type UserData = {
    name: string,
    email: string,
    password: string,
    dateofBirth: Date,
    phoneNumber?: string,
    address?: string,
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

type SlotType = {
  capacity: number;
  booked: number;
  disabled: boolean;
};

type SlotsObject = {
  slot1: SlotType;
  slot2: SlotType;
  slot3: SlotType;
  slot4: SlotType;
};

type AppointmentType = {
  _id: string;
  date: string;
  slots: SlotsObject;
};

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
        const response = await fetch(`${API_URL}/user/appointments/search?q=${query}`, {
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

async function getAppointmentsByUser(doctorId: string): Promise<BasicResponse & { appointments?: AppointmentType[] }> {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }
        const res = await fetch(`${API_URL}/user/appointments/book?doctorId=${doctorId}`, {
          method: "GET",
          headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (err: any) {
        return {
            success: false,
            message: 'Failed to fetch appointments',
        }
    }
}

async function bookAppointmentService(appointmentId: string, slotKey: string): Promise<BasicResponse> {
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }
        const res = await fetch(`${API_URL}/user/appointments/book`, {
          method: "POST",
          headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ appointmentId, slotName: slotKey }),
        });
        const data: BasicResponse = await res.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to book appointment',
        }
    }
}

async function getReportCard(reportId: string): Promise<BasicResponse & { reportCard?: any }> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Please login to continue',
            }
        }
        const response = await fetch(`${API_URL}/user/viewreport?reportId=${reportId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const data: BasicResponse & { reportCard?: any } = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to fetch report card',
        }
    }
}

async function updateProfile(profileData: any): Promise<BasicResponse> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                success: false,
                message: 'Unauthorized',
            }
        }
        const response = await fetch(`${API_URL}/user/profile/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });
        const data: BasicResponse = await response.json();
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'Failed to update profile',
        }
    }
}

export {
    userSignup,
    userLogin,
    getUserReportCards,
    searchDoctors,
    getAppointmentsByUser,
    bookAppointmentService,
    getReportCard,
    updateProfile,
};