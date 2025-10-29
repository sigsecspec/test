<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { User, Application } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const Applications: React.FC<{ user: User }> = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    const refreshData = () => {
        setApplications(db.getApplications());
    };
    
    useEffect(refreshData, []);

    const handleUpdateStatus = (id: string, status: 'Approved' | 'Denied') => {
        db.updateApplicationStatus(id, status);
        refreshData();
    };

    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">New Applications</h1>
            <div className="space-y-4">
                {applications.length > 0 ? applications.map(app => (
                    <div key={app.id} className="bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg">{app.data.firstName ? `${app.data.firstName} ${app.data.lastName}` : app.data.companyName}</p>
                                <p className="text-sm text-gray-500">{app.type}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleUpdateStatus(app.id, 'Approved')} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                                <button onClick={() => handleUpdateStatus(app.id, 'Denied')} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                )) : <p>No pending applications.</p>}
=======
import React from 'react';
import { DocumentTextIcon } from '../Icons';

interface Application {
  id: string;
  type: string;
  name: string;
  status: string;
}

interface ApplicationsProps {
    applications: Application[];
}

const Applications: React.FC<ApplicationsProps> = ({ applications }) => {
    return (
         <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Pending Applications</h2>
            <p className="text-[#787876] mb-6">Manage all incoming applications for guards, staff, and clients.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Applicant Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Application Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-[#535347]/10">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#c4c4c4]">{app.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">{app.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{app.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-[#aeae5a] hover:text-opacity-80">Review</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-12">
                                        <DocumentTextIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                                        <h3 className="text-xl font-semibold text-[#c4c4c4]">No Pending Applications</h3>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
            </div>
        </div>
    );
};

export default Applications;