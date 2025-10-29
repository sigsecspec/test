import React, { useState, useEffect } from 'react';
import { User, Approval } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const Approvals: React.FC<{ user: User }> = () => {
    const [approvals, setApprovals] = useState<Approval[]>([]);

    useEffect(() => {
        setApprovals(db.getApprovals());
    }, []);

    const handleApprove = (id: string) => {
        // Here you would add logic to handle the approval based on type
        alert(`Approved item ${id}. (Functionality pending)`);
        db.removeApproval(id);
        setApprovals(db.getApprovals());
    };
    
    const handleDeny = (id: string) => {
        alert(`Denied item ${id}. (Functionality pending)`);
        db.removeApproval(id);
        setApprovals(db.getApprovals());
    };

    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Approval Queue</h1>
            <div className="space-y-4">
                {approvals.length > 0 ? approvals.map(appr => (
                    <div key={appr.id} className="bg-white p-4 border rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-bold">{appr.subject}</p>
                            <p className="text-sm text-gray-600">{appr.details}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleApprove(appr.id)} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                            <button onClick={() => handleDeny(appr.id)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                        </div>
                    </div>
                )) : <p>No items currently require approval.</p>}
            </div>
        </div>
    );
};

export default Approvals;
