import React from 'react';
import { User, UserRole } from '../../types';
import { AcademicCapIcon } from '../Icons';


interface TrainingApprovalsProps {
    users: User[];
}

const TrainingApprovals: React.FC<TrainingApprovalsProps> = ({ users }) => {
    
    // There is no data source for pending training approvals in the database.
    // To be fully functional with "actual local data", this view should show an empty state.
    const guardsNeedingApproval: User[] = [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Training Approvals</h2>
            <p className="text-[#787876] mb-6">Review and approve completed training modules for guards.</p>
            
            {guardsNeedingApproval.length > 0 ? (
                <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <ul className="divide-y divide-[#535347]/50">
                        {guardsNeedingApproval.map(guard => (
                            <li key={guard.id} className="p-4 hover:bg-[#535347]/10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#c4c4c4]">{guard.firstName} {guard.lastName}</p>
                                    <p className="text-xs text-[#787876]">Submitted 'Level 3 Taser Certification' for review.</p>
                                </div>
                                <button className="bg-transparent border border-[#535347] text-xs text-[#aeae5a] font-semibold py-1 px-3 rounded-md hover:bg-[#aeae5a]/20 hover:border-[#aeae5a] transition">
                                    Review
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <AcademicCapIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                    <h3 className="text-xl font-semibold text-[#c4c4c4]">No Pending Approvals</h3>
                    <p className="text-[#787876] mt-2">All training submissions have been reviewed.</p>
                </div>
            )}
        </div>
    );
};

export default TrainingApprovals;