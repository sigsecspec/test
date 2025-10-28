import React from 'react';
import type { Mission, User, Client } from '../../types';

interface LiveControlProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
}

const LiveControl: React.FC<LiveControlProps> = ({ missions, users, clients }) => {
    
    // For dispatch, "Live" means currently claimed missions.
    const liveMissions = missions.filter(m => m.status === 'Claimed');

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
        hour: '2-digit',
        minute: '2-digit'
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Live Control</h2>
            <p className="text-[#787876] mb-6">Monitor and manage all active guard assignments in real-time.</p>

            {liveMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMissions.map(mission => (
                        <div key={mission.id} className="bg-[#0f0f0f] border border-blue-900/50 rounded-lg p-4 shadow-lg">
                             <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-blue-300">{mission.title}</h3>
                                 <span className="text-xs font-semibold text-blue-300">ACTIVE</span>
                            </div>
                            <p className="text-sm text-[#787876] mt-1">{mission.site}</p>
                            <div className="mt-4 pt-4 border-t border-[#535347]/50 text-sm">
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Guard:</strong> {getUserName(mission.claimedBy)}</p>
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Client:</strong> {getClientName(mission.clientId)}</p>
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Time:</strong> {mission.startTime.toLocaleString(undefined, options)} - {mission.endTime.toLocaleString(undefined, options)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <p className="text-[#787876]">There are no guards currently on active missions.</p>
                </div>
            )}
        </div>
    );
};

export default LiveControl;
