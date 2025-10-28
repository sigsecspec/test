import React from 'react';
import { CheckCircleIcon, UserIcon } from '../Icons.tsx';
import { Approval, User } from '../../types.ts';


interface ApprovalsProps {
    approvals: Approval[];
    users: User[];
    onProcessApproval: (approvalId: string) => void;
}

const Approvals: React.FC<ApprovalsProps> = ({ approvals, users, onProcessApproval }) => {
    
    const getRequesterName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'System';
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Approval Queue</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review and process pending requests that require management approval.</p>
             <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-sm">
                {approvals.length > 0 ? (
                    <ul className="divide-y divide-[var(--border-primary)]">
                        {approvals.map(item => (
                            <li key={item.id} className="p-4 hover:bg-[var(--bg-primary)]">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="flex items-center mb-3 sm:mb-0">
                                        <div className="p-2 rounded-full bg-[var(--bg-primary)] mr-4">
                                            <UserIcon className="h-6 w-6 text-[var(--accent-primary)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--text-primary)]">{item.subject}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{item.type} | Requested by: {getRequesterName(item.requesterId)}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => onProcessApproval(item.id)}
                                            className="w-1/2 sm:w-auto bg-transparent border border-[var(--border-secondary)] text-xs text-red-600 font-semibold py-1 px-3 rounded-md hover:bg-red-50 hover:border-red-600 transition">
                                            Deny
                                        </button>
                                        <button 
                                            onClick={() => onProcessApproval(item.id)}
                                            className="w-1/2 sm:w-auto bg-transparent border border-[var(--border-secondary)] text-xs text-[var(--accent-primary)] font-semibold py-1 px-3 rounded-md hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)] transition">
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                     <div className="text-center py-12">
                        <CheckCircleIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">Approval Queue is Empty</h3>
                        <p className="text-[var(--text-secondary)] mt-2">There are no pending items that require your attention.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default Approvals;