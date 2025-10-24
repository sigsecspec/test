import React from 'react';
import type { Mission, User, Client } from '../../types';

interface MissionControlProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
}

const MissionControl: React.FC<MissionControlProps> = ({ missions, users, clients }) => {

    const getUserName = (userId: string | null) => {
        if (!userId) return 'N/A';
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown Guard';
    };

    const getClientName = (clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };
    
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Mission Control</h2>
            <p className="text-[#787876] mb-6">A high-level overview of all missions in the system.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Mission / Site</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Assigned Guard</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {missions.map((mission) => (
                                <tr key={mission.id} className="hover:bg-[#535347]/10">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-[#c4c4c4]">{mission.title}</div>
                                        <div className="text-xs text-[#787876]">{mission.site}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">
                                        {getClientName(mission.clientId)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">
                                        {mission.startTime.toLocaleString(undefined, options)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            mission.status === 'Open' ? 'bg-[#aeae5a]/20 text-[#aeae5a]' : 
                                            mission.status === 'Claimed' ? 'bg-blue-900/40 text-blue-300' :
                                            'bg-[#787876]/20 text-[#787876]'
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
        </div>
    );
};

export default MissionControl;