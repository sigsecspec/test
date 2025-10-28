import React from 'react';
import { DocumentTextIcon } from '../Icons';

interface Application {
  id: string;
  type: string;
  name: string;
  status: string;
}

interface ApplicationsProps {
    applications: Application[];
}

const Applications: React.FC<ApplicationsProps> = ({ applications }) => {
    return (
         <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Pending Applications</h2>
            <p className="text-[#787876] mb-6">Manage all incoming applications for guards, staff, and clients.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Applicant Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Application Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-[#535347]/10">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#c4c4c4]">{app.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">{app.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{app.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-[#aeae5a] hover:text-opacity-80">Review</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-12">
                                        <DocumentTextIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                                        <h3 className="text-xl font-semibold text-[#c4c4c4]">No Pending Applications</h3>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Applications;