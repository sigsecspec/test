import React from 'react';
import type { Mission, User, Client } from '../../types';

interface LiveControlProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
}

const LiveControl: React.FC<LiveControlProps> = ({ missions, users, clients }) => {
    
    const liveMissions = missions.filter(m => ['Claimed', 'Active', 'AwaitingReport'].includes(m.status));

    const getUserName = (userId: string | null) => {
        if (!userId) return 'N/A';
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown Guard';
    };

    const getClientName = (clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };
    
    const getStatusInfo = (mission: Mission) => {
        switch(mission.status) {
            case 'Claimed': return { style: 'border-gray-600 text-gray-400', label: 'AWAITING CHECK-IN'};
            case 'Active': return { style: 'border-blue-900/50 text-blue-300', label: `ACTIVE SINCE ${mission.checkInTime?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`};
            case 'AwaitingReport': return { style: 'border-yellow-700/50 text-yellow-400', label: 'AWAITING REPORT'};
            default: return { style: 'border-gray-600 text-gray-400', label: mission.status.toUpperCase() };
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Live Control</h2>
            <p className="text-[#787876] mb-6">Monitor and manage all active guard assignments in real-time.</p>

            {liveMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMissions.map(mission => {
                        const statusInfo = getStatusInfo(mission);
                        return (
                        <div key={mission.id} className={`bg-[#0f0f0f] border ${statusInfo.style} rounded-lg p-4 shadow-lg flex flex-col`}>
                             <div className="flex justify-between items-start">
                                <h3 className={`text-lg font-bold ${statusInfo.style}`}>{mission.title}</h3>
                                 <span className={`text-xs font-semibold ${statusInfo.style}`}>{statusInfo.label}</span>
                            </div>
                            <p className="text-sm text-[#787876] mt-1 flex-grow">{mission.site}</p>
                            <div className="mt-4 pt-4 border-t border-[#535347]/50 text-sm">
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Guard:</strong> {getUserName(mission.claimedBy)}</p>
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Client:</strong> {getClientName(mission.clientId)}</p>
                                <p className="text-[#c4c4c4]"><strong className="font-medium text-[#787876]">Time:</strong> {mission.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {mission.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                    )})}
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