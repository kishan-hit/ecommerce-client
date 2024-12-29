import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Profile = () => {
  const { user } = useSession();
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setProfileData((prev) => ({ ...prev, phoneNumber: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfileData = {
      fullName: profileData.fullName || user?.name || '',
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      password: profileData.password,
    };

    console.log('Updated profile data:', updatedProfileData);

    setProfileData({
      fullName: updatedProfileData.fullName,
      phoneNumber: updatedProfileData.phoneNumber,
      address: updatedProfileData.address,
      password: updatedProfileData.password,
    });
  };

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 bg-white shadow-md p-8 rounded-lg space-y-4"
      >
        <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ''}
            disabled
            className="mt-2 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            international
            defaultCountry="IN"
            value={profileData.phoneNumber}
            onChange={handlePhoneChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            placeholder="Enter your street name and house number"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {!user?.googleId && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;

