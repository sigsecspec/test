import React from 'react';
import type { User } from '../../types';
import { AcademicCapIcon } from '../Icons';

interface TrainingProps {
    user: User;
}

const Training: React.FC<TrainingProps> = ({ user }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Training Center</h2>
            <p className="text-[#787876] mb-6">Manage your certifications and complete new training modules to unlock more mission types.</p>
            
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 mb-6">
                 <h3 className="text-xl font-semibold text-[#c4c4c4] border-b border-[#535347] pb-2 mb-4">My Certifications</h3>
                 <div className="flex flex-wrap gap-2">
                    {user.certifications.length > 0 ? (
                        user.certifications.map(cert => (
                            <span key={cert} className="px-3 py-1 text-sm rounded-full bg-[#535347]/50 text-[#c4c4c4]">
                                {cert}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#787876]">You do not have any certifications on file. Complete training modules to earn them.</p>
                    )}
                </div>
            </div>

            <div className="text-center py-12 bg-[#0f0f0f] border border-dashed border-[#535347] rounded-lg">
                <AcademicCapIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                <h3 className="text-xl font-semibold text-[#c4c4c4]">New Training Modules Coming Soon</h3>
                <p className="text-[#787876] mt-2">Check back later for interactive training content and new certification opportunities.</p>
            </div>
        </div>
    );
};

export default Training;
