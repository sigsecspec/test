import React from 'react';
import { User } from '../../types.ts';
import { UserIcon } from '../Icons.tsx';

interface MyProfileProps {
    user: User;
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Profile</h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
                <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-full bg-[var(--border-tertiary)] mb-4">
                        <UserIcon className="w-24 h-24 text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{user.firstName} {user.lastName}</h3>
                    <p className="text-[var(--text-secondary)]">{user.email}</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-[var(--text-secondary)]">Role</h4>
                        <p className="text-lg text-[var(--text-primary)]">{user.role}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[var(--text-secondary)]">Rank</h4>
                        <p className="text-lg text-[var(--text-primary)]">{user.rank}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-[var(--text-secondary)]">Security Level</h4>
                        <p className="text-lg font-bold text-[var(--accent-primary)]">Level {user.level}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-[var(--text-secondary)]">Certifications</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user.certifications.length > 0 ? (
                                user.certifications.map(cert => (
                                    <span key={cert} className="px-3 py-1 text-sm rounded-full bg-[var(--border-tertiary)] text-[var(--text-primary)]">
                                        {cert}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-[var(--text-secondary)]">No certifications on file.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;