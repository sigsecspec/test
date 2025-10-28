import React, { useState } from 'react';
import type { PayrollRun, User } from '../../types';
import { getPayrollEntriesForRun } from '../../database';
import { XIcon } from '../Icons';

interface PayrollProps {
    payrollRuns: PayrollRun[];
    users: User[];
    onCreatePayrollRun: (startDate: Date, endDate: Date) => void;
    onApprovePayrollRun: (runId: string) => void;
}

const PayrollDetailsModal: React.FC<{ run: PayrollRun; users: User[]; onClose: () => void }> = ({ run, users, onClose }) => {
    const entries = getPayrollEntriesForRun(run.id);
    const getUserName = (userId: string) => users.find(u => u.id === userId)?.firstName + ' ' + users.find(u => u.id === userId)?.lastName || 'Unknown';
    
    return (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-4xl shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Payroll Details: {run.startDate.toLocaleDateString()} - {run.endDate.toLocaleDateString()}</h3>
                <div className="max-h-[60vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)] sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Guard</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Missions</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Hours</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Total Pay</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {entries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="px-4 py-2 text-sm text-[var(--text-primary)]">{getUserName(entry.userId)}</td>
                                    <td className="px-4 py-2 text-sm text-right text-[var(--text-primary)]">1</td>
                                    <td className="px-4 py-2 text-sm text-right text-[var(--text-primary)]">{entry.hours.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-sm text-right font-semibold text-[var(--accent-primary)]">${entry.totalPay.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-sm text-center font-semibold">
                                        {entry.paymentConfirmed ? <span className="text-green-600">Confirmed</span> : <span className="text-yellow-600">Unconfirmed</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};

const Payroll: React.FC<PayrollProps> = ({ payrollRuns, users, onCreatePayrollRun, onApprovePayrollRun }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);

    const handleCreateRun = () => {
        if (startDate && endDate) {
            onCreatePayrollRun(new Date(startDate), new Date(endDate));
            setStartDate('');
            setEndDate('');
        }
    };
    
    const getStatusStyles = (status: PayrollRun['status']) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-blue-100 text-blue-800';
            case 'Paid': return 'bg-green-100 text-green-800';
        }
    }

    return (
        <>
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Payroll Management</h2>
            <p className="text-[var(--text-secondary)] mb-6">Create, review, and approve payroll runs for all personnel.</p>
            
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 mb-6 shadow-sm">
                <h3 className="font-semibold text-[var(--text-primary)]">Create New Payroll Run</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md py-2 px-3 text-[var(--text-primary)]" />
                    <button onClick={handleCreateRun} className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold rounded-md hover:bg-opacity-90">Generate Run</button>
                </div>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-[var(--border-primary)]">
                    <thead className="bg-[var(--bg-primary)]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Period</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Total Amount</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-tertiary)]">
                        {payrollRuns.map(run => (
                            <tr key={run.id}>
                                <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{run.startDate.toLocaleDateString()} - {run.endDate.toLocaleDateString()}</td>
                                <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(run.status)}`}>{run.status}</span></td>
                                <td className="px-6 py-4 text-right text-sm font-semibold text-[var(--accent-primary)]">${run.totalAmount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right text-sm space-x-4">
                                    <button onClick={() => setSelectedRun(run)} className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)]">View</button>
                                    {run.status === 'Pending' && <button onClick={() => onApprovePayrollRun(run.id)} className="font-semibold text-[var(--accent-primary)] hover:text-opacity-80">Approve</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        {selectedRun && <PayrollDetailsModal run={selectedRun} users={users} onClose={() => setSelectedRun(null)} />}
        </>
    );
};

export default Payroll;