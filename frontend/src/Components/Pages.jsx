import React from 'react';
import LoginForm from "./LoginForm.jsx"

const MainPage = () => {

    return (
        <div>
            Welcome to the chat!
        </div>
    )
}

const LoginPage = () => {
    return (
        <div>
            Welcome to the login page!
            <LoginForm />
        </div>
    )
}

const NotFoundPage = () => {
    return (
        <div>
            404 Not Found
        </div>
    )
}

export { MainPage, LoginPage, NotFoundPage };
