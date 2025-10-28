import React from 'react';
import { DocumentTextIcon } from '../Icons.tsx';
import { Application } from '../../types.ts';

interface ApplicationsProps {
    applications: Application[];
    onUpdateApplication: (appId: string, status: 'Approved' | 'Denied') => void;
}

const Applications: React.FC<ApplicationsProps> = ({ applications, onUpdateApplication }) => {
    return (
         <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Pending Applications</h2>
            <p className="text-[var(--text-secondary)] mb-6">Manage all incoming applications for guards, staff, and clients.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Applicant Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Application Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-[var(--bg-primary)]">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">{app.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">{app.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                             <button onClick={() => onUpdateApplication(app.id, 'Denied')} className="text-red-600 hover:text-red-800">Deny</button>
                                            <button onClick={() => onUpdateApplication(app.id, 'Approved')} className="text-[var(--accent-primary)] hover:text-opacity-80">Approve</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-12">
                                        <DocumentTextIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Pending Applications</h3>
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