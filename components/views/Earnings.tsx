import React from 'react';
import type { User, PayrollRun, PayrollEntry } from '../../types.ts';
import { getPayrollEntriesForRun } from '../../database.ts';
import { CreditCardIcon } from '../Icons.tsx';

interface EarningsProps {
    user: User;
    payrollRuns: PayrollRun[];
    onConfirmPayment: (entryId: string) => void;
}

const Earnings: React.FC<EarningsProps> = ({ user, payrollRuns, onConfirmPayment }) => {
    let allEntries: PayrollEntry[] = [];
    payrollRuns.forEach(run => {
        allEntries.push(...getPayrollEntriesForRun(run.id));
    });

    const myEntries = allEntries.filter(e => e.userId === user.id);
    const totalEarnings = myEntries.reduce((acc, entry) => acc + entry.totalPay, 0);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">My Earnings</h2>
            <p className="text-[var(--text-secondary)] mb-6">Track your pay for completed missions and confirm receipt of payment.</p>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Total Estimated Earnings</h3>
                <p className="text-4xl font-bold text-[var(--accent-primary)] mt-2">${totalEarnings.toFixed(2)}</p>
                <p className="text-sm text-[var(--text-secondary)]">Based on {myEntries.length} paid mission entries.</p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] p-4 border-b border-[var(--border-primary)]">Paystub Breakdown</h3>
                {myEntries.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[var(--bg-primary)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Pay Period</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Hours</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Pay</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-tertiary)]">
                                {myEntries.map(entry => {
                                    const run = payrollRuns.find(r => r.id === entry.payrollRunId);
                                    return(
                                    <tr key={entry.id}>
                                        <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{run ? `${run.startDate.toLocaleDateString()} - ${run.endDate.toLocaleDateString()}` : 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{entry.hours.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-[var(--text-primary)]">${entry.totalPay.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center">
                                            {run?.status === 'Approved' && !entry.paymentConfirmed && (
                                                <button onClick={() => onConfirmPayment(entry.id)} className="text-xs bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600">
                                                    Confirm Receipt
                                                </button>
                                            )}
                                            {entry.paymentConfirmed && (
                                                 <span className="text-xs font-semibold text-green-600">Paid & Confirmed</span>
                                            )}
                                            {run?.status === 'Pending' && (
                                                 <span className="text-xs font-semibold text-yellow-600">Processing</span>
                                            )}
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-12 text-[var(--text-secondary)]">
                         <CreditCardIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Earnings Yet</h3>
                        <p className="mt-2">Complete missions to see your earnings here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Earnings;