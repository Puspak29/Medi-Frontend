import API_URL from "../config/apiUrl";
import { type BasicResponse } from "../types/basicRes";

export type DoctorLoginData = {
    email: string,
    password: string,
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
            message: 'Something went wrong.',
        }
    }
}

export {
    doctorLogin,
}