import React, { useState } from 'react';
import type { User, Mission, IncidentReport, IncidentType, IncidentSeverity } from '../../types.ts';
import { XIcon, PlusCircleIcon } from '../Icons.tsx';

const incidentTypes: IncidentType[] = ['Theft', 'Medical', 'Property Damage', 'Trespassing', 'Disturbance', 'Other'];
const severities: IncidentSeverity[] = ['Low', 'Medium', 'High'];

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (report: string, incidents: Omit<IncidentReport, 'id' | 'missionId' | 'reportedById' | 'timestamp'>[]) => void;
    user: User;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
    const [summary, setSummary] = useState('');
    const [incidents, setIncidents] = useState<Omit<IncidentReport, 'id' | 'missionId' | 'reportedById' | 'timestamp'>[]>([]);
    const [showIncidentForm, setShowIncidentForm] = useState(false);
    const [currentIncident, setCurrentIncident] = useState({ type: incidentTypes[0], severity: severities[0], description: '' });

    if (!isOpen) return null;

    const handleAddIncident = () => {
        if (currentIncident.description) {
            setIncidents([...incidents, { ...currentIncident, reportedById: user.id }]);
            setCurrentIncident({ type: incidentTypes[0], severity: severities[0], description: '' });
            setShowIncidentForm(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(summary, incidents);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Submit Mission Report</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)]">Mission Summary</label>
                            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4}
                                className="mt-1 w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md text-[var(--text-primary)] p-2 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                                placeholder="Provide a general summary of the shift..." required
                            ></textarea>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-[var(--text-primary)]">Incident Log</h4>
                            {incidents.length > 0 && (
                                <ul className="mt-2 space-y-2 text-sm">
                                    {incidents.map((inc, i) => (
                                        <li key={i} className="bg-[var(--bg-primary)] p-2 rounded-md border border-[var(--border-tertiary)]">
                                            <strong className="text-[var(--accent-primary)]">{inc.type} ({inc.severity})</strong>: {inc.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {showIncidentForm ? (
                                <div className="mt-2 p-3 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md space-y-2">
                                    <select value={currentIncident.type} onChange={e => setCurrentIncident(p => ({...p, type: e.target.value as IncidentType}))} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md py-1 px-2 text-[var(--text-primary)]">
                                        {incidentTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                    <select value={currentIncident.severity} onChange={e => setCurrentIncident(p => ({...p, severity: e.target.value as IncidentSeverity}))} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md py-1 px-2 text-[var(--text-primary)]">
                                        {severities.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <textarea value={currentIncident.description} onChange={e => setCurrentIncident(p => ({...p, description: e.target.value}))} rows={3} placeholder="Describe the incident..." className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-2 text-[var(--text-primary)]"></textarea>
                                    <div className="flex justify-end space-x-2">
                                        <button type="button" onClick={() => setShowIncidentForm(false)} className="text-xs text-[var(--text-secondary)] font-semibold py-1 px-2 rounded-md hover:text-[var(--text-primary)]">Cancel</button>
                                        <button type="button" onClick={handleAddIncident} className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-md hover:bg-blue-500">Add Incident</button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setShowIncidentForm(true)} className="mt-2 flex items-center text-sm text-[var(--accent-primary)] font-semibold hover:text-opacity-80">
                                    <PlusCircleIcon className="h-5 w-5 mr-1"/> Log an Incident
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">
                            Submit Final Report
                        </button>
                    </div>
                </form>
                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><XIcon className="h-6 w-6"/></button>
            </div>
        </div>
    );
};

interface MyMissionCardProps {
    mission: Mission;
    onCheckIn: (id: string) => void;
    onCheckOut: (id: string) => void;
    onSubmitReport: (id: string, report: string, incidents: Omit<IncidentReport, 'id' | 'missionId' | 'timestamp'>[]) => void;
    user: User;
}

const MyMissionCard: React.FC<MyMissionCardProps> = ({ mission, onCheckIn, onCheckOut, onSubmitReport, user }) => {
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    const getStatusStyles = () => {
        switch(mission.status) {
            case 'Active': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'AwaitingReport': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
            default: return 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-primary)]';
        }
    };
    
    return (
        <>
            <div className={`bg-[var(--bg-secondary)] border ${getStatusStyles()} rounded-lg p-4 flex flex-col justify-between shadow-sm`}>
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{mission.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles().split(' ')[0]} ${getStatusStyles().split(' ')[1]}`}>
                            {mission.status}
                        </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{mission.site}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border-tertiary)]">
                    <div className="text-xs text-[var(--text-secondary)] mt-2">
                        <p>Start: {mission.startTime.toLocaleString(undefined, options)}</p>
                        <p>End: {mission.endTime.toLocaleString(undefined, options)}</p>
                    </div>
                    <div className="mt-4">
                        {mission.status === 'Claimed' && <button onClick={() => onCheckIn(mission.id)} className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-500 transition">Check In</button>}
                        {mission.status === 'Active' && <button onClick={() => onCheckOut(mission.id)} className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-500 transition">Check Out</button>}
                        {mission.status === 'AwaitingReport' && <button onClick={() => setReportModalOpen(true)} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-300 transition">Submit Report</button>}
                        {mission.status === 'Completed' && <p className="text-center text-sm text-green-600">Mission Completed</p>}
                    </div>
                </div>
            </div>
            <ReportModal 
                isOpen={isReportModalOpen} 
                onClose={() => setReportModalOpen(false)} 
                user={user}
                onSubmit={(summary, incidents) => {
                    onSubmitReport(mission.id, summary, incidents.map(inc => ({ ...inc, missionId: mission.id, reportedById: user.id })));
                }} 
            />
        </>
    );
};

interface MyMissionsProps {
  user: User;
  missions: Mission[];
  onCheckIn: (missionId: string) => void;
  onCheckOut: (missionId: string) => void;
  onSubmitReport: (missionId: string, report: string) => void;
  onAddIncidentReport: (reportData: Omit<IncidentReport, 'id' | 'timestamp'>) => void;
}
const MyMissions: React.FC<MyMissionsProps> = ({ user, missions, onCheckIn, onCheckOut, onSubmitReport, onAddIncidentReport }) => {
    const myMissions = missions.filter(m => m.claimedBy === user.id);

    const handleReportSubmit = (missionId: string, summary: string, incidents: Omit<IncidentReport, 'id' | 'timestamp'>[]) => {
        incidents.forEach(inc => onAddIncidentReport(inc));
        onSubmitReport(missionId, summary);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Mission Hub</h2>
            <p className="text-[var(--text-secondary)] mb-6">Manage your claimed missions, check in/out, and submit detailed post-mission reports.</p>
            
            {myMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myMissions.map(mission => (
                        <MyMissionCard 
                            key={mission.id} 
                            mission={mission} 
                            user={user}
                            onCheckIn={onCheckIn} 
                            onCheckOut={onCheckOut} 
                            onSubmitReport={handleReportSubmit} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <p className="text-[var(--text-secondary)]">You have not claimed any missions yet. Visit the Mission Board to find work.</p>
                </div>
            )}
        </div>
    );
};

export default MyMissions;