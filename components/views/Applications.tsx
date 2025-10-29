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
            </div>
        </div>
    );
};

export default Applications;
