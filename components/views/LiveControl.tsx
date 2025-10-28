import React from 'react';
import type { Mission, User, Client } from '../../types.ts';

interface LiveControlProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
}

const LiveControl: React.FC<LiveControlProps> = ({ missions, users, clients }) => {
    
    const liveMissions = missions.filter(m => ['Claimed', 'Active', 'AwaitingReport'].includes(m.status));

    const getGuardNames = (guardIds: string[]) => {
        if (!guardIds || guardIds.length === 0) return 'N/A';
        return guardIds.map(id => {
            const user = users.find(u => u.id === id);
            return user ? `${user.firstName} ${user.lastName}` : 'Unknown Guard';
        }).join(', ');
    };

    const getClientName = (clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };
    
    const getStatusInfo = (mission: Mission) => {
        switch(mission.status) {
            case 'Claimed': return { style: 'border-gray-300 text-gray-500', label: 'AWAITING CHECK-IN'};
            // Fix: Property 'checkInTime' does not exist on type 'Mission'. Use `checkIns[0].time` instead.
            case 'Active': return { style: 'border-blue-300 text-blue-600', label: `ACTIVE SINCE ${mission.checkIns[0]?.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`};
            case 'AwaitingReport': return { style: 'border-yellow-400 text-yellow-600', label: 'AWAITING REPORT'};
            default: return { style: 'border-gray-300 text-gray-500', label: mission.status.toUpperCase() };
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Live Control</h2>
            <p className="text-[var(--text-secondary)] mb-6">Monitor and manage all active guard assignments in real-time.</p>

            {liveMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMissions.map(mission => {
                        const statusInfo = getStatusInfo(mission);
                        return (
                        <div key={mission.id} className={`bg-[var(--bg-secondary)] border ${statusInfo.style} rounded-lg p-4 shadow-sm flex flex-col`}>
                             <div className="flex justify-between items-start">
                                <h3 className={`text-lg font-bold text-[var(--text-primary)]`}>{mission.title}</h3>
                                 <span className={`text-xs font-semibold ${statusInfo.style}`}>{statusInfo.label}</span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mt-1 flex-grow">{mission.site}</p>
                            <div className="mt-4 pt-4 border-t border-[var(--border-tertiary)] text-sm">
                                {/* Fix: `mission.claimedBy` is an array of strings. `getGuardNames` handles an array. */}
                                <p className="text-[var(--text-primary)]"><strong className="font-medium text-[var(--text-secondary)]">Guard:</strong> {getGuardNames(mission.claimedBy)}</p>
                                <p className="text-[var(--text-primary)]"><strong className="font-medium text-[var(--text-secondary)]">Client:</strong> {getClientName(mission.clientId)}</p>
                                <p className="text-[var(--text-primary)]"><strong className="font-medium text-[var(--text-secondary)]">Time:</strong> {mission.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {mission.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                    )})}
                </div>
            ) : (
                 <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <p className="text-[var(--text-secondary)]">There are no guards currently on active missions.</p>
                </div>
            )}
        </div>
    );
};

export default LiveControl;