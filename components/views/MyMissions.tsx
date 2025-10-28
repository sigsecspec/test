import React, { useState } from 'react';
import type { User, Mission, IncidentReport, IncidentType, IncidentSeverity } from '../../types';
import { XIcon, PlusCircleIcon } from '../Icons';

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
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Submit Mission Report</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        <div>
                            <label className="block text-sm font-medium text-[#c4c4c4]">Mission Summary</label>
                            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4}
                                className="mt-1 w-full bg-[#1a1a1a] border border-[#535347] rounded-md text-[#c4c4c4] p-2 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a]"
                                placeholder="Provide a general summary of the shift..." required
                            ></textarea>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-[#c4c4c4]">Incident Log</h4>
                            {incidents.length > 0 && (
                                <ul className="mt-2 space-y-2 text-sm">
                                    {incidents.map((inc, i) => (
                                        <li key={i} className="bg-[#1a1a1a] p-2 rounded-md border border-[#535347]/50">
                                            <strong className="text-[#aeae5a]">{inc.type} ({inc.severity})</strong>: {inc.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {showIncidentForm ? (
                                <div className="mt-2 p-3 bg-[#1a1a1a] border border-[#535347] rounded-md space-y-2">
                                    <select value={currentIncident.type} onChange={e => setCurrentIncident(p => ({...p, type: e.target.value as IncidentType}))} className="w-full bg-[#0f0f0f] border border-[#535347] rounded-md py-1 px-2 text-[#c4c4c4]">
                                        {incidentTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                    <select value={currentIncident.severity} onChange={e => setCurrentIncident(p => ({...p, severity: e.target.value as IncidentSeverity}))} className="w-full bg-[#0f0f0f] border border-[#535347] rounded-md py-1 px-2 text-[#c4c4c4]">
                                        {severities.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <textarea value={currentIncident.description} onChange={e => setCurrentIncident(p => ({...p, description: e.target.value}))} rows={3} placeholder="Describe the incident..." className="w-full bg-[#0f0f0f] border border-[#535347] rounded-md p-2 text-[#c4c4c4]"></textarea>
                                    <div className="flex justify-end space-x-2">
                                        <button type="button" onClick={() => setShowIncidentForm(false)} className="text-xs text-[#787876] font-semibold py-1 px-2 rounded-md hover:text-[#c4c4c4]">Cancel</button>
                                        <button type="button" onClick={handleAddIncident} className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-md hover:bg-blue-500">Add Incident</button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setShowIncidentForm(true)} className="mt-2 flex items-center text-sm text-[#aeae5a] font-semibold hover:text-opacity-80">
                                    <PlusCircleIcon className="h-5 w-5 mr-1"/> Log an Incident
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">
                            Submit Final Report
                        </button>
                    </div>
                </form>
                <button onClick={onClose} className="absolute top-3 right-3 text-[#787876] hover:text-[#c4c4c4]"><XIcon className="h-6 w-6"/></button>
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
            case 'Active': return 'bg-blue-900/40 text-blue-300 border-blue-500/50';
            case 'AwaitingReport': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
            default: return 'bg-[#535347]/50 text-[#c4c4c4] border-[#535347]';
        }
    };
    
    return (
        <>
            <div className={`bg-[#0f0f0f] border ${getStatusStyles()} rounded-lg p-4 flex flex-col justify-between shadow-lg`}>
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[#c4c4c4]">{mission.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles().split(' ')[0]} ${getStatusStyles().split(' ')[1]}`}>
                            {mission.status}
                        </span>
                    </div>
                    <p className="text-sm text-[#787876] mt-1">{mission.site}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#535347]/50">
                    <div className="text-xs text-[#787876] mt-2">
                        <p>Start: {mission.startTime.toLocaleString(undefined, options)}</p>
                        <p>End: {mission.endTime.toLocaleString(undefined, options)}</p>
                    </div>
                    <div className="mt-4">
                        {mission.status === 'Claimed' && <button onClick={() => onCheckIn(mission.id)} className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-500 transition">Check In</button>}
                        {mission.status === 'Active' && <button onClick={() => onCheckOut(mission.id)} className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-500 transition">Check Out</button>}
                        {mission.status === 'AwaitingReport' && <button onClick={() => setReportModalOpen(true)} className="w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-400 transition">Submit Report</button>}
                        {mission.status === 'Completed' && <p className="text-center text-sm text-green-400">Mission Completed</p>}
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
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Mission Hub</h2>
            <p className="text-[#787876] mb-6">Manage your claimed missions, check in/out, and submit detailed post-mission reports.</p>
            
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
                <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <p className="text-[#787876]">You have not claimed any missions yet. Visit the Mission Board to find work.</p>
                </div>
            )}
        </div>
    );
};

export default MyMissions;