import React from 'react';
<<<<<<< HEAD
import { User } from '../../types';

const TrainingManagement: React.FC<{ user: User }> = () => {
    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Training Management</h1>
             <div className="bg-white p-6 border rounded-lg shadow-sm">
                <p>This view will allow Training Officers to create and manage training modules and quizzes.</p>
                <p className="text-gray-500 mt-2">(Feature under development)</p>
=======
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
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default TrainingManagement;
=======
export default TrainingManagement;
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
