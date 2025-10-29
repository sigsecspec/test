<<<<<<< HEAD
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
=======
import React from 'react';
import type { User, Mission, Client } from '../../types';

interface ActiveMissionsProps {
    user: User;
    missions: Mission[];
    users: User[];
    clients: Client[];
}

const ActiveMissions: React.FC<ActiveMissionsProps> = ({ user, missions, users, clients }) => {
    
    const clientProfile = clients.find(c => c.userId === user.id);
    const clientMissions = clientProfile ? missions.filter(m => m.clientId === clientProfile.id) : [];

    const getUserName = (userId: string | null) => {
        if (!userId) return <span className="text-[#787876]">Unclaimed</span>;
        const guard = users.find(u => u.id === userId);
        return guard ? `${guard.firstName} ${guard.lastName}` : 'Unknown Guard';
    };

     const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    if (!clientProfile) {
        return (
             <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                <p className="text-[#787876]">Could not find a client profile associated with your user account.</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">My Active Missions</h2>
            <p className="text-[#787876] mb-6">Track the status of missions you've posted for {clientProfile.companyName}.</p>
            
            {clientMissions.length > 0 ? (
                 <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#535347]">
                            <thead className="bg-[#535347]/20">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Mission</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Assigned Guard</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#535347]/50">
                                {clientMissions.map((mission) => (
                                    <tr key={mission.id} className="hover:bg-[#535347]/10">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-[#c4c4c4]">{mission.title}</div>
                                            <div className="text-xs text-[#787876]">{mission.site}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">
                                            {mission.startTime.toLocaleDateString(undefined, options)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                mission.status === 'Open' ? 'bg-[#aeae5a]/20 text-[#aeae5a]' : 'bg-[#787876]/20 text-[#787876]'
                                            }`}>
                                                {mission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">
                                            {getUserName(mission.claimedBy)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            ) : (
                <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <p className="text-[#787876]">You have not posted any missions yet.</p>
                </div>
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
            )}
        </div>
    );
};

<<<<<<< HEAD
export default ActiveMissions;
=======
export default ActiveMissions;
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
