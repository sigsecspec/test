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
    
    const entriesByUser = entries.reduce((acc, entry) => {
        acc[entry.userId] = acc[entry.userId] || { total: 0, missions: 0 };
        acc[entry.userId].total += entry.totalPay;
        acc[entry.userId].missions += 1;
        return acc;
    }, {} as Record<string, { total: number; missions: number }>);

    return (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Payroll Details: {run.startDate.toLocaleDateString()} - {run.endDate.toLocaleDateString()}</h3>
                <div className="max-h-[60vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20 sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-[#c4c4c4] uppercase">Guard</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-[#c4c4c4] uppercase">Missions</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-[#c4c4c4] uppercase">Total Pay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {Object.entries(entriesByUser).map(([userId, data]) => (
                                <tr key={userId}>
                                    <td className="px-4 py-2 text-sm text-[#c4c4c4]">{getUserName(userId)}</td>
                                    <td className="px-4 py-2 text-sm text-right text-[#c4c4c4]">{data.missions}</td>
                                    <td className="px-4 py-2 text-sm text-right font-semibold text-[#aeae5a]">${data.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
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
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'Approved': return 'bg-blue-500/20 text-blue-300';
            case 'Paid': return 'bg-green-500/20 text-green-400';
        }
    }

    return (
        <>
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Payroll Management</h2>
            <p className="text-[#787876] mb-6">Create, review, and approve payroll runs for all personnel.</p>
            
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#c4c4c4]">Create New Payroll Run</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <button onClick={handleCreateRun} className="bg-[#aeae5a] text-[#0f0f0f] font-bold rounded-md hover:bg-opacity-90">Generate Run</button>
                </div>
            </div>

            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-[#535347]">
                    <thead className="bg-[#535347]/20">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Period</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase">Total Amount</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#535347]/50">
                        {payrollRuns.map(run => (
                            <tr key={run.id}>
                                <td className="px-6 py-4 text-sm text-[#c4c4c4]">{run.startDate.toLocaleDateString()} - {run.endDate.toLocaleDateString()}</td>
                                <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(run.status)}`}>{run.status}</span></td>
                                <td className="px-6 py-4 text-right text-sm font-semibold text-[#aeae5a]">${run.totalAmount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right text-sm space-x-4">
                                    <button onClick={() => setSelectedRun(run)} className="font-semibold text-[#c4c4c4] hover:text-[#aeae5a]">View</button>
                                    {run.status === 'Pending' && <button onClick={() => onApprovePayrollRun(run.id)} className="font-semibold text-[#aeae5a] hover:text-opacity-80">Approve</button>}
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
