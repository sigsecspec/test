import React, { useState, useEffect, useMemo } from 'react';
import { User, Mission, UserRole, Client } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const MissionDetailsModal: React.FC<{ mission: Mission, onClose: () => void, user: User }> = ({ mission, onClose, user }) => {
    const isGuard = user.role !== UserRole.Client;

    const handleCheckIn = () => {
        db.missionCheckIn(mission.id, user.id);
        onClose(); // In a real app, this would refresh data
    };

    const handleCheckOut = () => {
        db.missionCheckOut(mission.id, user.id);
        onClose();
    };
    
    const handleSubmitReport = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const report = (e.currentTarget.elements.namedItem('report') as HTMLTextAreaElement).value;
        db.submitMissionReport(mission.id, user.id, report);
        onClose();
    };

    const userCheckedIn = mission.checkIns.some(c => c.guardId === user.id);
    const userCheckedOut = mission.checkOuts.some(c => c.guardId === user.id);
    const userReported = mission.reports.some(r => r.guardId === user.id);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">{mission.title}</h2>
                <p><strong>Status:</strong> {mission.status}</p>
                <p><strong>Time:</strong> {mission.startTime.toLocaleString()} to {mission.endTime.toLocaleString()}</p>
                <p><strong>Description:</strong> {mission.description || "N/A"}</p>
                
                {isGuard && mission.status === 'Claimed' && !userCheckedIn && (
                    <button onClick={handleCheckIn} className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Check In</button>
                )}
                {isGuard && mission.status === 'Active' && userCheckedIn && !userCheckedOut && (
                     <button onClick={handleCheckOut} className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Check Out</button>
                )}
                 {isGuard && mission.status === 'AwaitingReport' && userCheckedOut && !userReported && (
                     <form onSubmit={handleSubmitReport} className="mt-4">
                        <textarea name="report" required className="w-full border rounded p-2" placeholder="Enter your end-of-shift report"></textarea>
                        <button type="submit" className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Submit Report</button>
                    </form>
                )}
                
                <button onClick={onClose} className="mt-4 w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300">Close</button>
            </div>
        </div>
    );
};

const MyMissions: React.FC<{ user: User }> = ({ user }) => {
    const [myMissions, setMyMissions] = useState<Mission[]>([]);
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

    useEffect(() => {
        const allMissions = db.getMissions();
        if (user.role === UserRole.Client) {
            const client = db.getClients().find(c => c.userId === user.id);
            if (client) {
                setMyMissions(allMissions.filter(m => m.clientId === client.id));
            }
        } else {
            setMyMissions(allMissions.filter(m => m.claimedBy.includes(user.id)));
        }
    }, [user]);

    const categorizedMissions = useMemo(() => {
        const now = new Date();
        return {
            upcoming: myMissions.filter(m => m.startTime > now && (m.status === 'Claimed' || m.status === 'Open')),
            active: myMissions.filter(m => m.status === 'Active' || (m.startTime <= now && m.endTime > now && m.status !== 'Completed')),
            past: myMissions.filter(m => m.endTime <= now || m.status === 'Completed' || m.status === 'Cancelled'),
        };
    }, [myMissions]);

    const MissionList: React.FC<{ title: string, missions: Mission[] }> = ({ title, missions }) => (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
            {missions.length > 0 ? (
                <div className="space-y-3">
                    {missions.map(mission => (
                        <div key={mission.id} onClick={() => setSelectedMission(mission)} className="bg-white p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
                            <p className="font-bold">{mission.title}</p>
                            <p className="text-sm text-gray-500">{mission.startTime.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${mission.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{mission.status}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No missions in this category.</p>
            )}
        </div>
    );

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Missions</h1>
            <div className="space-y-8">
                <MissionList title="Active Missions" missions={categorizedMissions.active} />
                <MissionList title="Upcoming Missions" missions={categorizedMissions.upcoming} />
                <MissionList title="Past Missions" missions={categorizedMissions.past} />
            </div>
            {selectedMission && <MissionDetailsModal mission={selectedMission} onClose={() => setSelectedMission(null)} user={user} />}
        </div>
    );
};

export default MyMissions;
