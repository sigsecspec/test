import React from 'react';
import { CheckCircleIcon, UserIcon } from '../Icons';

interface Approval {
    id: string;
    type: string;
    subject: string;
    details: string;
}

interface ApprovalsProps {
    approvals: Approval[];
}

const Approvals: React.FC<ApprovalsProps> = ({ approvals }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Approval Queue</h2>
            <p className="text-[#787876] mb-6">Review and process pending requests and applications.</p>
             <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg">
                {approvals.length > 0 ? (
                    <ul className="divide-y divide-[#535347]/50">
                        {approvals.map(item => (
                            <li key={item.id} className="p-4 hover:bg-[#535347]/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-full bg-[#535347]/30 mr-4">
                                            <UserIcon className="h-6 w-6 text-[#aeae5a]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#c4c4c4]">{item.subject}</p>
                                            <p className="text-xs text-[#787876]">{item.type} - {item.details}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-transparent border border-[#535347] text-xs text-red-400 font-semibold py-1 px-3 rounded-md hover:bg-red-900/30 hover:border-red-400 transition">Deny</button>
                                        <button className="bg-transparent border border-[#535347] text-xs text-[#aeae5a] font-semibold py-1 px-3 rounded-md hover:bg-[#aeae5a]/20 hover:border-[#aeae5a] transition">Approve</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                     <div className="text-center py-12">
                        <CheckCircleIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                        <h3 className="text-xl font-semibold text-[#c4c4c4]">Approval Queue is Empty</h3>
                        <p className="text-[#787876] mt-2">There are no pending items that require your attention.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default Approvals;