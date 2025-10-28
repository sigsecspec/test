import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { XIcon } from '../Icons';

const allCertifications = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Supervision', 'Instructor', 'Lead', 'Tactical', 'First Aid/CPR', 'Fire Safety', 'Defensive Tactics'];

interface ManageCertsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdate: (userId: string, certs: string[]) => void;
}
const ManageCertsModal: React.FC<ManageCertsModalProps> = ({ isOpen, onClose, user, onUpdate }) => {
    const [certs, setCerts] = useState(new Set(user.certifications));
    if (!isOpen) return null;

    const handleToggle = (cert: string) => {
        const newCerts = new Set(certs);
        if (newCerts.has(cert)) newCerts.delete(cert);
        else newCerts.add(cert);
        setCerts(newCerts);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Manage Certifications for {user.firstName}</h3>
                <div className="grid grid-cols-2 gap-2">
                    {allCertifications.map(cert => (
                        <label key={cert} className="flex items-center space-x-2">
                            <input type="checkbox" checked={certs.has(cert)} onChange={() => handleToggle(cert)} className="form-checkbox h-4 w-4 bg-[var(--bg-primary)] border-[var(--border-secondary)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]" />
                            <span className="text-sm text-[var(--text-primary)]">{cert}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={() => { onUpdate(user.id, Array.from(certs)); onClose(); }} className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save</button>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};


interface TrainingManagementProps {
    users: User[];
    onUpdateCerts: (userId: string, certs: string[]) => void;
}

const TrainingManagement: React.FC<TrainingManagementProps> = ({ users, onUpdateCerts }) => {
    const [selectedUser, setSelectedUser] = useState<User|null>(null);
    const guards = users.filter(u => u.role !== UserRole.Client && u.role !== UserRole.Secretary && u.role !== UserRole.Dispatch);

    return (
        <>
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Training & Certification Management</h2>
            <p className="text-[var(--text-secondary)] mb-6">Oversee the certification status of all personnel.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Personnel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Certifications</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {guards.map((guard) => (
                                <tr key={guard.id} className="hover:bg-[var(--bg-primary)]">
                                    <td className="px-6 py-4"><div className="text-sm font-medium text-[var(--text-primary)]">{guard.firstName} {guard.lastName}</div></td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                                        <div className="flex flex-wrap gap-1 text-xs">
                                            {guard.certifications.length > 0 ? guard.certifications.join(', ') : 'None'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => setSelectedUser(guard)} className="text-[var(--accent-primary)] hover:text-opacity-80 font-semibold text-sm">Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {selectedUser && <ManageCertsModal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} user={selectedUser} onUpdate={onUpdateCerts} />}
        </>
    );
};

export default TrainingManagement;