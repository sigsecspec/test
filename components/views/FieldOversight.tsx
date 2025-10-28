import React, { useState } from 'react';
import type { Mission, User, Client, SpotCheck } from '../../types';
import { getSpotChecksForMission } from '../../database';
import { XIcon } from '../Icons';

interface SpotCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (status: SpotCheck['status'], notes: string) => void;
}
const SpotCheckModal: React.FC<SpotCheckModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [status, setStatus] = useState<SpotCheck['status']>('Guard Present');
    const [notes, setNotes] = useState('');
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Log Spot Check</h3>
                <div className="space-y-4">
                    <select value={status} onChange={e => setStatus(e.target.value as SpotCheck['status'])} className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]">
                        <option>Guard Present</option>
                        <option>Guard Absent</option>
                        <option>Uniform OK</option>
                        <option>Issue Reported</option>
                    </select>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="Add notes..." className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md py-2 px-3 text-[#c4c4c4]"></textarea>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={() => onSubmit(status, notes)} className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Log Check</button>
                </div>
                 <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};

interface FieldOversightProps {
    missions: Mission[];
    users: User[];
    clients: Client[];
    supervisorId: string;
    onAddSpotCheck: (spotCheck: Omit<SpotCheck, 'id' | 'time'>) => void;
}

const FieldOversight: React.FC<FieldOversightProps> = ({ missions, users, clients, supervisorId, onAddSpotCheck }) => {
    
    const [checkingMissionId, setCheckingMissionId] = useState<string|null>(null);
    const activeMissions = missions.filter(m => m.status === 'Active');

    const getUserName = (userId: string | null) => {
        if (!userId) return 'N/A';
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown Guard';
    };

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Field Oversight</h2>
                <p className="text-[#787876] mb-6">Monitor all currently active and assigned missions.</p>

                {activeMissions.length > 0 ? (
                    <div className="space-y-6">
                        {activeMissions.map((mission) => {
                            const spotChecks = getSpotChecksForMission(mission.id);
                            return (
                            <div key={mission.id} className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-[#c4c4c4]">{mission.title} @ {mission.site}</h3>
                                        <p className="text-sm text-[#787876]">Guard: {getUserName(mission.claimedBy)}</p>
                                    </div>
                                    <button onClick={() => setCheckingMissionId(mission.id)} className="bg-blue-600 text-white font-bold py-1 px-3 text-sm rounded-md hover:bg-blue-500">Log Spot Check</button>
                                </div>
                                {spotChecks.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-[#535347]/50">
                                        <h4 className="text-xs font-semibold text-[#787876]">Spot Check Log:</h4>
                                        <ul className="text-xs text-[#c4c4c4] list-disc list-inside">
                                            {spotChecks.map(sc => <li key={sc.id}>{sc.time.toLocaleTimeString()}: {sc.status} - {sc.notes}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )})}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                        <p className="text-[#787876]">No missions are currently active.</p>
                    </div>
                )}
            </div>
            {checkingMissionId && 
                <SpotCheckModal 
                    isOpen={!!checkingMissionId}
                    onClose={() => setCheckingMissionId(null)}
                    onSubmit={(status, notes) => {
                        onAddSpotCheck({ missionId: checkingMissionId, supervisorId, status, notes });
                        setCheckingMissionId(null);
                    }}
                />
            }
        </>
    );
};

export default FieldOversight;
