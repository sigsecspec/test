import React, { useState, useEffect } from 'react';
import { User, Mission } from '../../types';
import * as db from '../../database';

const ActiveMissions: React.FC<{ user: User }> = () => {
    const [activeMissions, setActiveMissions] = useState<Mission[]>([]);

    useEffect(() => {
        setActiveMissions(db.getMissions().filter(m => m.status === 'Active'));
    }, []);
    
    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Live Active Missions</h1>
             {activeMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeMissions.map(mission => (
                        <div key={mission.id} className="bg-white p-4 border rounded-lg shadow-sm">
                            <h3 className="font-bold">{mission.title}</h3>
                            <p className="text-sm text-gray-500">{mission.endTime.toLocaleTimeString()} (End)</p>
                            <div className="mt-2">
                                {mission.claimedBy.map(guardId => {
                                    const guard = db.getUserById(guardId);
                                    const checkedIn = mission.checkIns.some(c => c.guardId === guardId);
                                    return (
                                        <div key={guardId} className="flex items-center text-sm">
                                            <span className={`w-3 h-3 rounded-full mr-2 ${checkedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {guard?.firstName} {guard?.lastName}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No missions are currently active.</p>
            )}
        </div>
    );
};

export default ActiveMissions;
