import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { reset2FA, verify2FA } from '../service/authApi';

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
    const [otp, setOtp] = useState("");

    const handleTokenVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await verify2FA(otp);
            onVerifySuccess(data);
        } catch (error) {
            setOtp("");
            toast.error("Invalid OTP");
        }
    }

    const handleReset = async (e) => {
        try {
            const { data } = await reset2FA();
            onResetSuccess(data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Toaster position='top-center' reverseOrder={true}></Toaster>
            <form onSubmit={handleTokenVerification} className='bg-white rounded-lg shadow-md w-full max-w-sm mx-auto'>
                <div className='pt-6'>
                    <h2 className='text-3xl text-center font-extralight'>
                        Validate OTP
                    </h2>
                </div>
                <hr className='text-gray-500 mt-6 mb-6' />
                <p className='text-center text-gray-600 text-lg font-light pl-4 pr-4'>
                    Please enter time based OTP to verify 2FA authentication
                </p>
                <div className='p-6'>
                    <div className='mb-4'>
                        <label className='text-gray-600 text-sm'>OTP</label>
                        <input
                            label='OTP'
                            type='text'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full p-2 rounded mt-2'
                            placeholder='Enter your OTP'
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mb-3">
                        Verify OTP
                    </button>
                    <button
                        type="button"
                        className="w-full bg-slate-500 text-white py-2 rounded-md"
                        onClick={handleReset}
                    >
                        Reset 2FA
                    </button>
                </div>
            </form>
        </>
    )
}

export default TwoFAVerification