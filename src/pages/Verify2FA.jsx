import React from 'react';
import { useNavigate } from 'react-router-dom';
import TwoFAVerification from '../components/TwoFAVerification';

const Verify2FA = () => {
    const navigate = useNavigate();
    const handleVerification = async (data) => {
        if (data) {
            navigate('/')
        }
    }

    const handleReset = async (data) => {
        if (data) {
            navigate('/setup-2fa');
        }
    }
    return (
        <>
            <div className="bg-slate-900 h-screen">
                <div className="flex items-center justify-center h-screen">
                    <TwoFAVerification onVerifySuccess={handleVerification} onResetSuccess={handleReset} />
                </div>
            </div>
        </>
    )
}

export default Verify2FA;