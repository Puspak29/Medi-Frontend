import React, { useContext, createContext, useEffect, useState } from "react";
import { type CurrentUser } from "../types/basicRes";
import checkAuth from "../services/checkAuth";

interface AuthContextType {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    currentUser: CurrentUser | null,
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>,
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    currentUser: null,
    setCurrentUser: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try{
                const { auth, details } = await checkAuth();
                setCurrentUser(details);
                setIsAuth(auth);
            }
            catch(err){
                setCurrentUser(null);
                setIsAuth(false);
            }
        };

        checkAuthentication();
    }, []);

    const value: AuthContextType = {
        isAuth,
        setIsAuth,
        currentUser,
        setCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};