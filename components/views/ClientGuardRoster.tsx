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
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Manage Guard Roster</h2>
            <p className="text-[#787876] mb-6">Whitelist preferred guards to give them priority access to your missions, or blacklist guards to prevent them from claiming your missions.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#535347]">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Guard</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {allGuards.map(guard => {
                                const status = getGuardStatus(guard.id);
                                return (
                                <tr key={guard.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-[#c4c4c4]">{guard.firstName} {guard.lastName}</div>
                                        <div className="text-xs text-[#787876]">{guard.rank} | Rating: {guard.performanceRating.toFixed(1)} ★</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            status === 'Whitelisted' ? 'bg-green-500/20 text-green-400' :
                                            status === 'Blacklisted' ? 'bg-red-500/20 text-red-400' :
                                            'bg-[#535347]/50 text-[#c4c4c4]'
                                        }`}>{status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        {status !== 'Whitelisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'whitelist', 'add')} className="font-semibold text-green-400 hover:text-green-300">Whitelist</button>}
                                        {status === 'Whitelisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'whitelist', 'remove')} className="font-semibold text-gray-400 hover:text-gray-200">Remove</button>}
                                        {status !== 'Blacklisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'blacklist', 'add')} className="font-semibold text-red-400 hover:text-red-300">Blacklist</button>}
                                        {status === 'Blacklisted' && <button onClick={() => onUpdateList(client.id, guard.id, 'blacklist', 'remove')} className="font-semibold text-gray-400 hover:text-gray-200">Remove</button>}
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
