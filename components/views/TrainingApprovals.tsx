import React from 'react';
import { User, UserRole } from '../../types.ts';
import { AcademicCapIcon } from '../Icons.tsx';


interface TrainingApprovalsProps {
    users: User[];
}

const TrainingApprovals: React.FC<TrainingApprovalsProps> = ({ users }) => {
    
    // There is no data source for pending training approvals in the database.
    // To be fully functional with "actual local data", this view should show an empty state.
    const guardsNeedingApproval: User[] = [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Training Approvals</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review and approve completed training modules for guards.</p>
            
            {guardsNeedingApproval.length > 0 ? (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <ul className="divide-y divide-[var(--border-tertiary)]">
                        {guardsNeedingApproval.map(guard => (
                            <li key={guard.id} className="p-4 hover:bg-[var(--bg-primary)] flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{guard.firstName} {guard.lastName}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">Submitted 'Level 3 Taser Certification' for review.</p>
                                </div>
                                <button className="bg-transparent border border-[var(--border-secondary)] text-xs text-[var(--accent-primary)] font-semibold py-1 px-3 rounded-md hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)] transition">
                                    Review
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <AcademicCapIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Pending Approvals</h3>
                    <p className="text-[var(--text-secondary)] mt-2">All training submissions have been reviewed.</p>
                </div>
            )}
        </div>
    );
};

export default TrainingApprovals;