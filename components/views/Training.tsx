import React, { useState, useEffect } from 'react';
import { User, TrainingModule, UserTrainingProgress } from '../../types';
import * as db from '../../database';

// FIX: Destructure user from props to make it available in the component.
const Training: React.FC<{ user: User }> = ({ user }) => {
    const [modules, setModules] = useState<TrainingModule[]>([]);
    const [progress, setProgress] = useState<UserTrainingProgress[]>([]);

    useEffect(() => {
        setModules(db.getTrainingModules());
        setProgress(db.getUserTrainingProgress(user.id));
    }, [user.id]);

    const getModuleProgress = (moduleId: string) => {
        return progress.find(p => p.moduleId === moduleId);
    };

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Training Center</h1>
            <div className="space-y-4">
                {modules.map(module => {
                    const prog = getModuleProgress(module.id);
                    let statusColor = 'bg-gray-200 text-gray-800';
                    if (prog?.status === 'Approved' || prog?.status === 'Passed') statusColor = 'bg-green-100 text-green-800';
                    if (prog?.status === 'Pending Approval') statusColor = 'bg-yellow-100 text-yellow-800';
                    if (prog?.status === 'Failed') statusColor = 'bg-red-100 text-red-800';
                    
                    return (
                        <div key={module.id} className="bg-white p-4 border rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{module.title}</h3>
                                <p className="text-sm text-gray-500">{module.content}</p>
                            </div>
                            <div className="text-right">
                                {prog ? (
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}>{prog.status}</span>
                                ) : (
                                     <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Training</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Training;