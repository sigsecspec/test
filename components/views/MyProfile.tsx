import React from 'react';
import { User } from '../../types';
import * as Icons from '../Icons';

const MyProfile: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="animate-in max-w-2xl mx-auto" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            <div className="bg-white p-6 border rounded-lg shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <Icons.User className="w-10 h-10 text-gray-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Role:</span>
                        <span className="font-semibold text-gray-800">{user.role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Rank:</span>
                        <span className="font-semibold text-gray-800">{user.rank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Level:</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{user.level}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Performance Rating:</span>
                        <span className="font-semibold text-green-600">{user.performanceRating.toFixed(2)} / 5.00</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Weekly Hours:</span>
                        <span className="font-semibold text-gray-800">{user.weeklyHours.toFixed(1)} / 40</span>
                    </div>
                     <div>
                        <span className="font-medium text-gray-600">Certifications:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {user.certifications.map(cert => (
                               <span key={cert} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">{cert}</span>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
