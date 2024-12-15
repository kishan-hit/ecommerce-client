import React from 'react';
import { useNavigate } from 'react-router-dom';
import TwoFASetup from '../components/TwoFASetup';

const Setup2FA = () => {
    const navigate = useNavigate();
    const handleSetupComplete = () => {
        navigate('/verify-2fa');
    }
    return (
        <div className="bg-slate-900 h-screen">
            <div className="flex items-center justify-center h-screen">
                <TwoFASetup onSetupComplete={handleSetupComplete} />
            </div>
        </div>
    )
}

export default Setup2FA;