import React, { useState } from 'react';
import type { User, Mission } from '../../types';
import { XIcon } from '../Icons';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (report: string) => void;
}
const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [report, setReport] = useState('');
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(report);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-[#c4c4c4] mb-4">Submit Mission Report</h3>
                <form onSubmit={handleSubmit}>
                    <textarea value={report} onChange={e => setReport(e.target.value)} rows={6}
                        className="w-full bg-[#1a1a1a] border border-[#535347] rounded-md text-[#c4c4c4] p-2 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a]"
                        placeholder="Detail any incidents or observations..." required
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 px-4 rounded-md hover:bg-opacity-90">
                            Submit Report
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
    onSubmitReport: (id: string, report: string) => void;
}
const MyMissionCard: React.FC<MyMissionCardProps> = ({ mission, onCheckIn, onCheckOut, onSubmitReport }) => {
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
            <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} onSubmit={(report) => onSubmitReport(mission.id, report)} />
        </>
    );
};


interface MyMissionsProps {
  user: User;
  missions: Mission[];
  onCheckIn: (missionId: string) => void;
  onCheckOut: (missionId: string) => void;
  onSubmitReport: (missionId: string, report: string) => void;
}
const MyMissions: React.FC<MyMissionsProps> = ({ user, missions, onCheckIn, onCheckOut, onSubmitReport }) => {
    const myMissions = missions.filter(m => m.claimedBy === user.id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">My Missions</h2>
            <p className="text-[#787876] mb-6">Here are the missions you have claimed. Be sure to check in on time.</p>
            
            {myMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myMissions.map(mission => (
                        <MyMissionCard key={mission.id} mission={mission} onCheckIn={onCheckIn} onCheckOut={onCheckOut} onSubmitReport={onSubmitReport} />
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
