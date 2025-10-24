import React from 'react';
import { User, UserRole } from '../../types';

interface TrainingManagementProps {
    users: User[];
}

const TrainingManagement: React.FC<TrainingManagementProps> = ({ users }) => {
    const guards = users.filter(u => u.role !== UserRole.Client);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Training & Certification Management</h2>
            <p className="text-[#787876] mb-6">Oversee the certification status of all personnel.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Personnel</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Certifications</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {guards.map((guard) => (
                                <tr key={guard.id} className="hover:bg-[#535347]/10">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-[#c4c4c4]">{guard.firstName} {guard.lastName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">
                                        {guard.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">
                                        <div className="flex flex-wrap gap-1">
                                            {guard.certifications.length > 0 ? guard.certifications.join(', ') : 'None'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrainingManagement;