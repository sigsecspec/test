import React from 'react';
import { Client, User } from '../../types';

interface ClientGuardRosterProps {
    client: Client;
    allGuards: User[];
    onUpdateList: (clientId: string, guardId: string, list: 'whitelist' | 'blacklist', action: 'add' | 'remove') => void;
}

const ClientGuardRoster: React.FC<ClientGuardRosterProps> = ({ client, allGuards, onUpdateList }) => {
    
    const getGuardStatus = (guardId: string) => {
        if (client.whitelist.includes(guardId)) return 'Whitelisted';
        if (client.blacklist.includes(guardId)) return 'Blacklisted';
        return 'Neutral';
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Manage Guard Roster</h2>
            <p className="text-[var(--text-secondary)] mb-6">Whitelist preferred guards to give them priority access to your missions, or blacklist guards to prevent them from claiming your missions.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border-primary)]">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Guard</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {allGuards.map(guard => {
                                const status = getGuardStatus(guard.id);
                                return (
                                <tr key={guard.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-[var(--text-primary)]">{guard.firstName} {guard.lastName}</div>
                                        <div className="text-xs text-[var(--text-secondary)]">{guard.rank} | Rating: {guard.performanceRating.toFixed(1)} ★</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            status === 'Whitelisted' ? 'bg-green-100 text-green-800' :
                                            status === 'Blacklisted' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>{status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        {status !== 'Whitelisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'whitelist', 'add')} className="font-semibold text-green-600 hover:text-green-800">Whitelist</button>}
                                        {status === 'Whitelisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'whitelist', 'remove')} className="font-semibold text-gray-500 hover:text-gray-700">Remove</button>}
                                        {status !== 'Blacklisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'blacklist', 'add')} className="font-semibold text-red-600 hover:text-red-800">Blacklist</button>}
                                        {status === 'Blacklisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'blacklist', 'remove')} className="font-semibold text-gray-500 hover:text-gray-700">Remove</button>}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientGuardRoster;