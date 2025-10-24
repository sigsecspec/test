import React from 'react';
import { User } from '../../types';
import { UserIcon } from '../Icons';

interface MyProfileProps {
    user: User;
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-6">My Profile</h2>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-full bg-[#535347]/30 mb-4">
                        <UserIcon className="w-24 h-24 text-[#aeae5a]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#c4c4c4]">{user.firstName} {user.lastName}</h3>
                    <p className="text-[#787876]">{user.email}</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-[#787876]">Role</h4>
                        <p className="text-lg text-[#c4c4c4]">{user.role}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[#787876]">Rank</h4>
                        <p className="text-lg text-[#c4c4c4]">{user.rank}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-[#787876]">Security Level</h4>
                        <p className="text-lg font-bold text-[#aeae5a]">Level {user.level}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-[#787876]">Certifications</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user.certifications.length > 0 ? (
                                user.certifications.map(cert => (
                                    <span key={cert} className="px-3 py-1 text-sm rounded-full bg-[#535347]/50 text-[#c4c4c4]">
                                        {cert}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-[#787876]">No certifications on file.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;