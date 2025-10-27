import API_URL from "../config/apiUrl";
import { type BasicResponse } from "../types/basicRes";

async function checkAuth(): Promise<{ auth: boolean, details: any | null }> {
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return {
                auth: false,
                details: null
            }
        }
        const response = await fetch(`${API_URL}/auth`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data: BasicResponse = await response.json();
        if(!data.success) localStorage.removeItem('token');
        return {
            auth: data.success,
            details: data.success ? data.details : null
        };

    }
    catch(err: any){
        return {
            auth: false,
            details: null
        }
    }
}

export default checkAuth;