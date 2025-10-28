import React from 'react';
import type { User, Mission, Client, UserTrainingProgress } from '../../types.ts';
import { getUserById, getUserTrainingProgress } from '../../database.ts';

interface MissionBoardProps {
  user: User;
  missions: Mission[];
  clients: Client[];
  onClaimMission: (missionId: string, guardId: string) => void;
}

const MissionCard: React.FC<{
    mission: Mission;
    user: User;
    client: Client | undefined;
    onClaim: (missionId: string) => void;
    userProgress: UserTrainingProgress[];
}> = ({ mission, user, client, onClaim, userProgress }) => {
    
    // Eligibility Checks
    const isEligibleLevel = user.level >= mission.requiredLevel;
    const isBlacklisted = client?.blacklist.includes(user.id) ?? false;
    const missionDuration = (mission.endTime.getTime() - mission.startTime.getTime()) / 3600000;
    const willExceedHours = (user.weeklyHours + missionDuration) > 40;
    const isFull = mission.claimedBy.length >= mission.requiredGuards;
    const hasClaimed = mission.claimedBy.includes(user.id);

    // Training Status Check
    const requiredTrainings = mission.requiredTraining || [];
    const hasAllTraining = requiredTrainings.every(reqId => 
        userProgress.some(p => p.moduleId === reqId && p.status === 'Passed')
    );
    const hasPendingTraining = requiredTrainings.some(reqId =>
        userProgress.some(p => p.moduleId === reqId && p.status === 'Pending Approval')
    );

    let trainingStatus: 'OK' | 'Needed' | 'Pending' = 'OK';
    if (!hasAllTraining) {
        trainingStatus = hasPendingTraining ? 'Pending' : 'Needed';
    }

    const canClaim = mission.status === 'Open' && isEligibleLevel && !isBlacklisted && !isFull && !hasClaimed && trainingStatus === 'OK';

    let eligibilityMessage = "";
    let warningMessage = "";
    if (mission.status === 'Open') {
        if (!isEligibleLevel) eligibilityMessage = "Your security level is too low.";
        else if (isBlacklisted) eligibilityMessage = "You are blacklisted by this client.";
        else if (isFull) eligibilityMessage = "This mission is fully staffed.";
        else if (hasClaimed) eligibilityMessage = "You have already claimed this mission.";
        else if (trainingStatus === 'Needed') eligibilityMessage = "Additional training required.";
        else if (trainingStatus === 'Pending') eligibilityMessage = "Training approval is pending.";
        
        if (canClaim && willExceedHours) {
          warningMessage = `Note: Claiming results in overtime (${missionDuration.toFixed(1)} hrs) and requires approval.`;
        }
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    const getCardBorderColor = () => {
        if (!eligibilityMessage || mission.status !== 'Open' || canClaim) return 'border-[var(--border-primary)]';
        if (trainingStatus === 'Needed') return 'border-blue-500/50';
        if (trainingStatus === 'Pending') return 'border-yellow-500/50';
        return 'border-red-500/50';
    }

    return (
        <div className={`bg-[var(--bg-secondary)] border ${getCardBorderColor()} rounded-lg p-4 flex flex-col justify-between shadow-sm`}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{mission.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ mission.status === 'Open' ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]' }`}>
                        {mission.status}
                    </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{mission.site}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-tertiary)]">
                <div className="flex justify-between items-center text-sm text-[var(--text-primary)]">
                    <span><strong className="text-[var(--accent-primary)]">${mission.payRate}/hr</strong></span>
                    <span>Level {mission.requiredLevel}+</span>
                    <span>Guards: {mission.claimedBy.length}/{mission.requiredGuards}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2"><p>Start: {mission.startTime.toLocaleString(undefined, options)}</p><p>End: {mission.endTime.toLocaleString(undefined, options)}</p></div>
                
                {mission.status === 'Open' && (
                    <>
                        {canClaim ? (
                            <>
                                <button onClick={() => onClaim(mission.id)} className="w-full mt-4 bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 rounded-md hover:bg-opacity-90 transition">Claim Mission</button>
                                {warningMessage && <p className="text-center text-xs text-yellow-600 mt-2">{warningMessage}</p>}
                            </>
                        ) : (
                            <p className="text-center text-xs text-red-500 mt-4 h-4">{eligibilityMessage}</p>
                        )}
                    </>
                )}
                 {mission.status !== 'Open' && mission.claimedBy.length > 0 && (
                    <div className="mt-4 text-center">
                        <p className="text-xs text-[var(--text-secondary)]">Assigned Guards:</p>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">
                          {mission.claimedBy.map(id => getUserById(id)?.firstName).join(', ')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const MissionBoard: React.FC<MissionBoardProps> = ({ user, missions, clients, onClaimMission }) => {
    
    // Guards should only see missions from their team
    const teamMissions = missions.filter(m => !m.teamId || m.teamId === user.teamId);

    const sortedMissions = [...teamMissions].sort((a, b) => {
        const aClient = clients.find(c => c.id === a.clientId);
        const bClient = clients.find(c => c.id === b.clientId);
        const aIsWhitelisted = aClient?.whitelist.includes(user.id) ?? false;
        const bIsWhitelisted = bClient?.whitelist.includes(user.id) ?? false;

        if (aIsWhitelisted && !bIsWhitelisted) return -1;
        if (!aIsWhitelisted && bIsWhitelisted) return 1;
        return a.startTime.getTime() - b.startTime.getTime();
    });

    const userProgress = getUserTrainingProgress(user.id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Mission Board</h2>
            <p className="text-[var(--text-secondary)] mb-6">Missions from clients who have whitelisted you appear first. Go to the Training tab to unlock more missions.</p>
            
            {sortedMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedMissions.map(mission => (
                        <MissionCard key={mission.id} mission={mission} user={user} client={clients.find(c => c.id === mission.clientId)} onClaim={() => onClaimMission(mission.id, user.id)} userProgress={userProgress} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <p className="text-[var(--text-secondary)]">No missions posted for your team at this time. Please check back later.</p>
                </div>
            )}
        </div>
    );
};

export default MissionBoard;
