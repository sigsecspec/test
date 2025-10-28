import React, { useState, useEffect } from 'react';
import { Client, Contract } from '../../types';
import { DocumentDuplicateIcon, XIcon } from '../Icons';

interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    onSave: (contractData: Omit<Contract, 'id' | 'status'>) => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, clientId, onSave }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalBudget, setTotalBudget] = useState(10000);
    const [companyCommission, setCompanyCommission] = useState(0.07);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            clientId,
            title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalBudget: Number(totalBudget),
            companyCommission: Number(companyCommission),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Create New Contract</h3>
                <div className="space-y-4">
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Contract Title (e.g., 'Q4 Retail Security')" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} placeholder="Total Budget" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                        <input type="number" step="0.01" value={companyCommission} onChange={e => setCompanyCommission(Number(e.target.value))} placeholder="Commission (e.g., 0.07)" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Submit for Approval</button>
                </div>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6" /></button>
            </form>
        </div>
    );
};


interface MyContractsProps {
    client: Client;
    contracts: Contract[];
    onAddContract: (data: Omit<Contract, 'id' | 'status'>) => void;
}

const MyContracts: React.FC<MyContractsProps> = ({ client, contracts, onAddContract }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const myContracts = contracts.filter(c => c.clientId === client.id);
    
    const getStatusStyles = (status: Contract['status']) => {
        switch(status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">My Contracts</h2>
                        <p className="text-[var(--text-secondary)]">Manage your service contracts with SSS.</p>
                    </div>
                    <button onClick={() => setModalOpen(true)} className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">New Contract</button>
                </div>

                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Period</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Budget</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {myContracts.map(contract => (
                                <tr key={contract.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">{contract.title}</td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{contract.startDate.toLocaleDateString()} - {contract.endDate.toLocaleDateString()}</td>
                                    <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(contract.status)}`}>{contract.status}</span></td>
                                    <td className="px-6 py-4 text-right text-sm font-semibold text-[var(--accent-primary)]">${contract.totalBudget.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ContractModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} clientId={client.id} onSave={onAddContract} />
        </>
    );
};

export default MyContracts;
