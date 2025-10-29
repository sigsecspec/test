import React, { useState, useEffect } from 'react';
import { User, Contract } from '../../types';
import * as db from '../../database';

const ContractApprovals: React.FC<{ user: User }> = () => {
    const [pendingContracts, setPendingContracts] = useState<Contract[]>([]);
    
    const refreshData = () => {
        setPendingContracts(db.getContracts().filter(c => c.status === 'Pending'));
    };
    
    useEffect(refreshData, []);

    const handleApproval = (id: string, status: 'Active' | 'Cancelled') => {
        db.updateContractStatus(id, status);
        refreshData();
    };

    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Pending Contract Approvals</h1>
            <div className="space-y-4">
                {pendingContracts.length > 0 ? pendingContracts.map(contract => (
                     <div key={contract.id} className="bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg">{contract.title}</p>
                                <p className="text-sm text-gray-600">Budget: ${contract.totalBudget.toLocaleString()}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleApproval(contract.id, 'Active')} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                                <button onClick={() => handleApproval(contract.id, 'Cancelled')} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                )) : <p>No contracts are pending approval.</p>}
            </div>
        </div>
    );
};

export default ContractApprovals;
