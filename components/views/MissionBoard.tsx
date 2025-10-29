import React, { useState, useEffect, useMemo } from 'react';
import { User, Mission, Client } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const MissionCard: React.FC<{ mission: Mission, onClaim: (id: string) => void, user: User, client: Client | undefined }> = ({ mission, onClaim, user, client }) => {
    const isClaimedByUser = mission.claimedBy.includes(user.id);
    const isFull = mission.claimedBy.length >= mission.requiredGuards;
    const canClaim = !isClaimedByUser && !isFull && client && !client.blacklist.includes(user.id);

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-800">{mission.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${mission.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{mission.status}</span>
                </div>
                <p className="text-sm text-gray-500">{client?.companyName}</p>
                <div className="text-sm text-gray-600 mt-2">
                    <p><strong>Pay:</strong> ${mission.payRate}/hr</p>
                    <p><strong>Time:</strong> {mission.startTime.toLocaleString()} - {mission.endTime.toLocaleString()}</p>
                    <p><strong>Required Level:</strong> {mission.requiredLevel}+</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">{mission.claimedBy.length} / {mission.requiredGuards} Guards</p>
                <button 
                    onClick={() => onClaim(mission.id)}
                    disabled={!canClaim}
                    className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${canClaim ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    {isClaimedByUser ? "Claimed" : isFull ? "Full" : "Claim Mission"}
                </button>
            </div>
        </div>
    );
};


const MissionBoard: React.FC<{ user: User }> = ({ user }) => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    const refreshData = () => {
        setMissions(db.getMissions());
        setClients(db.getClients());
    };

    useEffect(() => {
        refreshData();
        window.addEventListener('storage', refreshData);
        return () => window.removeEventListener('storage', refreshData);
    }, []);

    const handleClaimMission = (missionId: string) => {
        const result = db.claimMission(missionId, user.id);
        if (result.success) {
            alert('Mission claimed successfully!');
            refreshData();
        } else {
            alert(`Failed to claim mission: ${result.message}`);
        }
    };
    
    const availableMissions = useMemo(() => {
        return missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));
    }, [missions]);

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Mission Board</h1>
                <p className="text-gray-500">Available Missions: {availableMissions.length}</p>
            </div>
            
            {availableMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableMissions.map(mission => (
                        <MissionCard 
                            key={mission.id}
                            mission={mission}
                            onClaim={handleClaimMission}
                            user={user}
                            client={clients.find(c => c.id === mission.clientId)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white border rounded-lg">
                    <Icons.ClipboardList className="w-16 h-16 mx-auto text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">No Missions Available</h2>
                    <p className="mt-1 text-gray-500">Check back later for new opportunities.</p>
                </div>
            )}
        </div>
    );
};

export default MissionBoard;
