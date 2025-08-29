import API_URL from '../config/apiUrl'

type UserData = {
    name: string,
    email: string,
    password: string,
}

async function userSignup(userData: UserData){
    const response = await fetch(`${API_URL}/auth/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if(!response.ok){
        console.error('Failed to sign up user:', response.statusText);
    }
}

export {
    userSignup,
};