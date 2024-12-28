import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    console.log("Form submitted")
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget.elements;
    setValidated(true);
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-md p-8 rounded-lg">
          <h1 className="text-3xl font-semibold mb-6">Your profile</h1>
          <form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Your name</label>
              <input
                type="text"
                fullName="fullName"
                defaultValue={user.fullName}
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              <div className="text-xs text-red-500">Please enter a name</div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="mt-2 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone number</label>
              <input
                type="text"
                name="phoneNumber"
                defaultValue={user.phoneNumber}
                placeholder="Enter your phone number"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={user.address}
                placeholder="Enter your street name and house number"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                minLength={6}
                required
                placeholder="Password"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              <div className="text-xs text-red-500">Please enter a valid password</div>
              <p className="text-xs text-gray-500">Password should have at least 6 characters</p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile