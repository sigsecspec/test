import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';
import * as ROLES from '../../constants';

const GuardManagement: React.FC<{ user: User }> = () => {
    const [guards, setGuards] = useState<User[]>([]);

    useEffect(() => {
        // FIX: Pass roles to getUsers to filter in the database layer, which is more efficient and fixes the missing argument error.
        setGuards(db.getUsers(ROLES.fieldRoles));
    }, []);

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Guard Management</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Rank</th>
                            <th className="px-5 py-3">Level</th>
                            <th className="px-5 py-3">Rating</th>
                            <th className="px-5 py-3">Weekly Hours</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guards.map(guard => (
                            <tr key={guard.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{guard.firstName} {guard.lastName}</p>
                                    <p className="text-gray-600 whitespace-no-wrap text-xs">{guard.email}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">{guard.rank}</td>
                                <td className="px-5 py-4 text-sm">{guard.level}</td>
                                <td className="px-5 py-4 text-sm">{guard.performanceRating.toFixed(2)}</td>
                                <td className="px-5 py-4 text-sm">{guard.weeklyHours.toFixed(1)}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuardManagement;
