import API_URL from '../config/apiUrl'
import { type BasicResponse } from '../types/basicRes'

export type UserData = {
    name: string,
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
            message: 'something went wrong.',
        }
    }
    
}

export {
    userSignup,
};