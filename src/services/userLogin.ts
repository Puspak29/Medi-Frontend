import API_URL from "../config/apiUrl";
import { type BasicResponse } from "../types/basicRes";

export type UserLoginData = {
    email: string,
    password: string,
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
        return data;
    }
    catch(err: any){
        return {
            success: false,
            message: 'something went wrong.',
        }
    }
}

export {
    userLogin,
}