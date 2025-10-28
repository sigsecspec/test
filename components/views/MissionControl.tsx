import React, { useState, useEffect } from 'react';
import type { Mission, User, Client, Site } from '../../types';
import { XIcon } from '../Icons';

const EditMissionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    mission: Mission;
    clients: Client[];
    sites: Site[];
    onSave: (missionId: string, data: Partial<Mission>) => void;
}> = ({ isOpen, onClose, mission, clients, sites, onSave }) => {
    const [missionData, setMissionData] = useState(mission);
    
    useEffect(() => {
        setMissionData(mission);
    }, [mission]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMissionData(prev => ({...prev, [name]: value }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMissionData(prev => ({...prev, [name]: new Date(value) }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(mission.id, missionData);
        onClose();
    };
    
    const clientSites = sites.filter(s => s.clientId === missionData.clientId);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                 <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Edit Mission: {mission.title}</h3>
                 <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <input name="title" value={missionData.title} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <select name="site" value={missionData.site} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        {clientSites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <input name="startTime" type="datetime-local" value={missionData.startTime.toISOString().substring(0,16)} onChange={handleDateChange} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <input name="endTime" type="datetime-local" value={missionData.endTime.toISOString().substring(0,16)} onChange={handleDateChange} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <input name="payRate" type="number" value={missionData.payRate} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                    <textarea name="description" value={missionData.description} onChange={handleChange} rows={3} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]" />
                 </div>
                 <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Save Changes</button>
                </div>
                 <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </form>
        </div>
    )
};


interface MissionControlProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
    sites: Site[];
    onUpdateMission: (missionId: string, data: Partial<Mission>) => void;
    onCancelMission: (missionId: string) => void;
}

const MissionControl: React.FC<MissionControlProps> = ({ missions, users, clients, sites, onUpdateMission, onCancelMission }) => {
    const [editingMission, setEditingMission] = useState<Mission|null>(null);

    const handleCancel = (mission: Mission) => {
        if (window.confirm(`Are you sure you want to cancel the mission "${mission.title}"?`)) {
            onCancelMission(mission.id);
        }
    };

    const getUserName = (userId: string | null) => {
        if (!userId) return 'N/A';
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown Guard';
    };

    const getClientName = (clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
        <>
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
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {missions.map((mission) => (
                                <tr key={mission.id} className="hover:bg-[#535347]/10">
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-[#c4c4c4]">{mission.title}</div><div className="text-xs text-[#787876]">{mission.site}</div></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{getClientName(mission.clientId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">{mission.startTime.toLocaleString(undefined, options)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ mission.status === 'Open' ? 'bg-[#aeae5a]/20 text-[#aeae5a]' : mission.status === 'Claimed' || mission.status === 'Active' ? 'bg-blue-900/40 text-blue-300' : mission.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-[#787876]/20 text-[#787876]' }`}>{mission.status}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{getUserName(mission.claimedBy)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        {mission.status !== 'Completed' && mission.status !== 'Cancelled' && (
                                            <>
                                                <button onClick={() => setEditingMission(mission)} className="text-[#aeae5a] hover:text-opacity-80 font-semibold">Edit</button>
                                                <button onClick={() => handleCancel(mission)} className="text-red-400 hover:text-red-300 font-semibold ml-4">Cancel</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {editingMission && <EditMissionModal isOpen={!!editingMission} onClose={() => setEditingMission(null)} mission={editingMission} clients={clients} sites={sites} onSave={onUpdateMission} />}
        </>
    );
};

export default MissionControl;