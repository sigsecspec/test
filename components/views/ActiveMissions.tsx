import React, { useState } from 'react';
import type { User, Mission, Client, IncidentReport, IncidentSeverity } from '../../types.ts';
import { XIcon } from '../Icons.tsx';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
}
const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(5);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Rate Guard Performance</h3>
                <div className="flex justify-center my-4">
                    {[1,2,3,4,5].map(star => (
                        <button key={star} onClick={() => setRating(star)} className={`text-4xl ${star <= rating ? 'text-[var(--accent-primary)]' : 'text-[var(--border-secondary)]'}`}>★</button>
                    ))}
                </div>
                <button onClick={() => onSubmit(rating)} className="w-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 rounded-md hover:bg-opacity-90">Submit Rating</button>
                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};

interface ActiveMissionsProps {
    user: User;
    missions: Mission[];
    users: User[];
    clients: Client[];
    incidentReports: IncidentReport[];
    onRateMission: (missionId: string, rating: number) => void;
}

const ActiveMissions: React.FC<ActiveMissionsProps> = ({ user, missions, users, clients, incidentReports, onRateMission }) => {
    
    const [ratingMissionId, setRatingMissionId] = useState<string | null>(null);
    const clientProfile = clients.find(c => c.userId === user.id);
    const clientMissions = clientProfile ? missions.filter(m => m.clientId === clientProfile.id) : [];

    const getUserName = (userId: string | null) => {
        if (!userId) return <span className="text-[var(--text-secondary)]">Unclaimed</span>;
        const guard = users.find(u => u.id === userId);
        return guard ? `${guard.firstName} ${guard.lastName}` : 'Unknown Guard';
    };

    const getStatusStyles = (status: Mission['status']) => {
        switch(status) {
            case 'Open': return 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]';
            case 'Active': return 'bg-blue-100 text-blue-800';
            case 'AwaitingReport': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const getSeverityStyles = (severity: IncidentSeverity) => {
        switch(severity) {
            case 'High': return 'border-red-300 bg-red-50';
            case 'Medium': return 'border-yellow-300 bg-yellow-50';
            case 'Low': return 'border-blue-300 bg-blue-50';
        }
    };

    if (!clientProfile) {
        return (
             <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                <p className="text-[var(--text-secondary)]">Could not find a client profile associated with your user account.</p>
            </div>
        )
    }

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">My Active Missions</h2>
                <p className="text-[var(--text-secondary)] mb-6">Track the status of missions you've posted for {clientProfile.companyName}.</p>
                
                {clientMissions.length > 0 ? (
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[var(--border-primary)]">
                                <thead className="bg-[var(--bg-primary)]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Mission</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase">Assigned Guard</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border-tertiary)]">
                                    {clientMissions.map((mission) => {
                                        const relatedIncidents = incidentReports.filter(ir => mission.incidentIds?.includes(ir.id));
                                        return (
                                       <React.Fragment key={mission.id}>
                                        <tr className="hover:bg-[var(--bg-primary)]">
                                            <td className="px-6 py-4"><div className="text-sm font-medium text-[var(--text-primary)]">{mission.title}</div><div className="text-xs text-[var(--text-secondary)]">{mission.site}</div></td>
                                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{mission.startTime.toLocaleDateString()}</td>
                                            <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(mission.status)}`}>{mission.status}</span></td>
                                            <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{getUserName(mission.claimedBy)}</td>
                                            <td className="px-6 py-4 text-right">
                                                {mission.status === 'Completed' && !mission.clientRating && (
                                                    <button onClick={() => setRatingMissionId(mission.id)} className="text-[var(--accent-primary)] hover:text-opacity-80 text-xs font-semibold">Rate Guard</button>
                                                )}
                                                 {mission.clientRating && <span className="text-xs text-yellow-500">{mission.clientRating} ★</span>}
                                            </td>
                                        </tr>
                                        {(mission.report || relatedIncidents.length > 0) && (
                                            <tr className="bg-[var(--bg-primary)]">
                                                <td colSpan={5} className="px-6 py-3 space-y-2">
                                                    {mission.report && <>
                                                        <p className="text-xs text-[var(--text-secondary)] font-semibold">Guard Summary:</p>
                                                        <p className="text-sm text-[var(--text-primary)] italic">"{mission.report}"</p>
                                                    </>}
                                                    {relatedIncidents.length > 0 && <>
                                                         <p className="text-xs text-[var(--text-secondary)] font-semibold pt-2">Logged Incidents:</p>
                                                         <div className="space-y-2">
                                                            {relatedIncidents.map(inc => (
                                                                <div key={inc.id} className={`p-2 border rounded-md text-xs ${getSeverityStyles(inc.severity)}`}>
                                                                    <strong>{inc.type} ({inc.severity})</strong> @ {inc.timestamp.toLocaleTimeString()}: {inc.description}
                                                                </div>
                                                            ))}
                                                         </div>
                                                    </>}
                                                </td>
                                            </tr>
                                        )}
                                       </React.Fragment>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg"><p className="text-[var(--text-secondary)]">You have not posted any missions yet.</p></div>
                )}
            </div>
            {ratingMissionId && <RatingModal isOpen={!!ratingMissionId} onClose={() => setRatingMissionId(null)} onSubmit={rating => { onRateMission(ratingMissionId, rating); setRatingMissionId(null); }} />}
        </>
    );
};

export default ActiveMissions;