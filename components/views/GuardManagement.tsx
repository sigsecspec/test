<<<<<<< HEAD
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
=======
import React from 'react';
import { User, UserRole } from '../../types';

interface GuardManagementProps {
  users: User[];
}

const GuardManagement: React.FC<GuardManagementProps> = ({ users }) => {
  // Filter out clients from the guard management view
  const guards = users.filter(u => u.role !== UserRole.Client);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Guard & Staff Roster</h2>
      <p className="text-[#787876] mb-6">A complete list of all active personnel in the system.</p>
      <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#535347]">
            <thead className="bg-[#535347]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Role / Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#535347]/50">
              {guards.map((guard) => (
                <tr key={guard.id} className="hover:bg-[#535347]/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#c4c4c4]">{guard.firstName} {guard.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#c4c4c4]">{guard.role}</div>
                    <div className="text-xs text-[#787876]">{guard.rank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guard.guardType ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#535347]/50 text-[#c4c4c4]">
                        {guard.guardType}
                      </span>
                    ) : (
                      <span className="text-xs text-[#787876]">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#aeae5a]/20 text-[#aeae5a]">
                      Level {guard.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{guard.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
};

export default GuardManagement;
