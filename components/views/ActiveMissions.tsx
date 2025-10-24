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
            )}
        </div>
    );
};

export default ActiveMissions;