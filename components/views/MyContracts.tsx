import React, { useState, useEffect } from 'react';
import { User, Contract } from '../../types';
import * as db from '../../database';

// FIX: Destructure user from props to make it available in the component.
const MyContracts: React.FC<{ user: User }> = ({ user }) => {
    const [contracts, setContracts] = useState<Contract[]>([]);

    useEffect(() => {
        const client = db.getClients().find(c => c.userId === user.id);
        if (client) {
            setContracts(db.getContracts().filter(c => c.clientId === client.id));
        }
    }, [user.id]);
    
     const getStatusColor = (status: Contract['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Contracts</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">New Contract</button>
            </div>
             <div className="space-y-4">
                {contracts.map(contract => (
                    <div key={contract.id} className="bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{contract.title}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>{contract.status}</span>
                        </div>
                        <p className="text-sm text-gray-600">Budget: ${contract.totalBudget.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Expires: {contract.endDate.toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyContracts;
