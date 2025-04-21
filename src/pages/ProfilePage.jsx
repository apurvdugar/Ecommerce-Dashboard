import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@radix-ui/themes';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-32 w-32 rounded-full object-cover border-4 border-blue-600 mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
            <p className="text-lg text-gray-600 mb-6">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;