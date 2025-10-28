import React from 'react';
import { Client, Contract } from '../../types';
import { DocumentDuplicateIcon } from '../Icons';

interface ContractApprovalsProps {
    contracts: Contract[];
    clients: Client[];
    onUpdateContractStatus: (contractId: string, status: 'Active' | 'Cancelled') => void;
}

const ContractApprovals: React.FC<ContractApprovalsProps> = ({ contracts, clients, onUpdateContractStatus }) => {
    const pendingContracts = contracts.filter(c => c.status === 'Pending');

    const getClientName = (clientId: string) => {
        return clients.find(c => c.id === clientId)?.companyName || 'Unknown Client';
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Contract Approvals</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review and approve new client contracts.</p>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                {pendingContracts.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[var(--border-primary)]">
                            <thead className="bg-[var(--bg-primary)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Contract</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Budget</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-tertiary)]">
                                {pendingContracts.map(contract => (
                                    <tr key={contract.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">{getClientName(contract.clientId)}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{contract.title}</td>
                                        <td className="px-6 py-4 text-right text-sm font-semibold text-[var(--accent-primary)]">${contract.totalBudget.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-sm space-x-2">
                                            <button onClick={() => onUpdateContractStatus(contract.id, 'Cancelled')} className="font-semibold text-red-600 hover:text-red-800">Deny</button>
                                            <button onClick={() => onUpdateContractStatus(contract.id, 'Active')} className="font-semibold text-green-600 hover:text-green-800">Approve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-12 text-[var(--text-secondary)]">
                        <DocumentDuplicateIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Pending Contracts</h3>
                        <p className="mt-2">All new contracts have been reviewed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractApprovals;
