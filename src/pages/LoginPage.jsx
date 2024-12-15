import React from 'react'
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useSession();

    const handleLoginSuccess = (userData) => {
        console.log("Logged in user data: ", userData);
        login(userData);
        if (!userData.is2faActive) {
            navigate('/setup-2fa');
        } else {
            navigate('/verify-2fa');
        }
    };
    return (
        <div className="bg-slate-900 h-screen">
            <div className="flex items-center justify-center h-screen">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
        </div>
    )
}

export default LoginPage;