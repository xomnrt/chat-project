import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
const loginPath = '/api/v1/login';
const signUpPath = '/api/v1/signup';

export const AuthProvider = ({children}) => {
    const currentLocalUser = localStorage.getItem('userData');
    const initialUserData = currentLocalUser === undefined ? null : JSON.parse(currentLocalUser);

    const [userData, setUserData] = useState(initialUserData);

    const saveUserData = (usernameAndToken) => {
        setUserData(usernameAndToken);
        localStorage.setItem('userData', JSON.stringify(usernameAndToken));
    }

    const logIn = async (username, password) => {
        const response = await axios.post(loginPath, { username, password });

        saveUserData(response.data)
    }

    const signUp = async (username, password) => {
        const response = await axios.post(signUpPath, { username, password });

        saveUserData(response.data)
    }

    const context = {
        sendLoginData: logIn,
        sendSignupData: signUp,
        isLoggedIn: () => !!userData,
        userData,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
