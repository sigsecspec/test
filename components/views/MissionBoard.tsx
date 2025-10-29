<<<<<<< HEAD
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
=======
import React from 'react';
import type { User, Mission } from '../../types';
import { getUserById } from '../../database';

interface MissionBoardProps {
  user: User;
  missions: Mission[];
  onClaimMission: (missionId: string, guardId: string) => void;
}

const MissionCard: React.FC<{
    mission: Mission;
    userLevel: number;
    onClaim: (missionId: string) => void;
}> = ({ mission, userLevel, onClaim }) => {
    const isEligible = userLevel >= mission.requiredLevel;
    const canClaim = mission.status === 'Open' && isEligible;
    const claimedByUser = mission.claimedBy ? getUserById(mission.claimedBy) : null;

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return (
        <div className={`bg-[#0f0f0f] border ${isEligible || mission.status !== 'Open' ? 'border-[#535347]' : 'border-red-900/50'} rounded-lg p-4 flex flex-col justify-between shadow-lg`}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#c4c4c4]">{mission.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        mission.status === 'Open' ? 'bg-[#aeae5a]/20 text-[#aeae5a]' : 'bg-[#787876]/20 text-[#787876]'
                    }`}>
                        {mission.status}
                    </span>
                </div>
                <p className="text-sm text-[#787876] mt-1">{mission.site}</p>
                <p className="text-sm text-[#c4c4c4] mt-4">{mission.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#535347]/50">
                <div className="flex justify-between items-center text-sm text-[#c4c4c4]">
                    <span><strong className="text-[#aeae5a]">${mission.payRate}/hr</strong></span>
                    <span>Level {mission.requiredLevel}+</span>
                </div>
                <div className="text-xs text-[#787876] mt-2">
                    <p>Start: {mission.startTime.toLocaleString(undefined, options)}</p>
                    <p>End: {mission.endTime.toLocaleString(undefined, options)}</p>
                </div>

                {mission.status === 'Claimed' && claimedByUser && (
                     <p className="text-center text-sm text-[#787876] mt-4">
                        Claimed by: <span className="font-semibold text-[#c4c4c4]">{claimedByUser.firstName} {claimedByUser.lastName}</span>
                    </p>
                )}

                {canClaim && (
                    <button 
                        onClick={() => onClaim(mission.id)}
                        className="w-full mt-4 bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 rounded-md hover:bg-opacity-90 transition">
                        Claim Mission
                    </button>
                )}
                {!isEligible && mission.status === 'Open' && (
                     <p className="text-center text-xs text-red-400 mt-4">Your security level is too low for this mission.</p>
                )}
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
            </div>
        </div>
    );
};

<<<<<<< HEAD

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
=======
const MissionBoard: React.FC<MissionBoardProps> = ({ user, missions, onClaimMission }) => {
    
    // Display all missions, not just open ones, so users can see claimed missions too.
    const allMissions = missions;

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Mission Board</h2>
            <p className="text-[#787876] mb-6">Available missions matching your qualifications will appear here. First come, first served.</p>
            
            {allMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMissions.map(mission => (
                        <MissionCard key={mission.id} mission={mission} userLevel={user.level} onClaim={() => onClaimMission(mission.id, user.id)} />
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
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