import React from 'react';
import { User, Appeal } from '../../types';
import { FlagIcon } from '../Icons';

interface AppealsProps {
    user: User;
    users: User[];
    appeals: Appeal[];
    onUpdateAppealStatus: (id: string, status: 'Approved' | 'Denied') => void;
}

const Appeals: React.FC<AppealsProps> = ({ user, users, appeals, onUpdateAppealStatus }) => {
    
    const getUserName = (id: string) => {
      const u = users.find(usr => usr.id === id);
      return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
    }

    const pendingAppeals = appeals.filter(a => a.status === 'Pending');

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Appeals Queue</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review and process appeals from personnel.</p>
            
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                {pendingAppeals.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[var(--border-primary)]">
                            <thead className="bg-[var(--bg-primary)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Reason</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-tertiary)]">
                                {pendingAppeals.map(appeal => (
                                    <tr key={appeal.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">{getUserName(appeal.userId)}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{appeal.type}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-primary)] max-w-sm truncate">{appeal.reason}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{appeal.dateSubmitted.toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right text-sm space-x-2">
                                            <button onClick={() => onUpdateAppealStatus(appeal.id, 'Denied')} className="font-semibold text-red-600 hover:text-red-800">Deny</button>
                                            <button onClick={() => onUpdateAppealStatus(appeal.id, 'Approved')} className="font-semibold text-green-600 hover:text-green-800">Approve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-12 text-[var(--text-secondary)]">
                        <FlagIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Pending Appeals</h3>
                        <p className="mt-2">The appeals queue is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appeals;