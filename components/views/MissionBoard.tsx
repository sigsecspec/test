import React from 'react';
import type { User, Mission, Client } from '../../types.ts';
import { getUserById } from '../../database.ts';

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
}> = ({ mission, user, client, onClaim }) => {
    const isEligibleLevel = user.level >= mission.requiredLevel;
    const isBlacklisted = client?.blacklist.includes(user.id) ?? false;
    const missionDuration = (mission.endTime.getTime() - mission.startTime.getTime()) / 3600000;
    const willExceedHours = (user.weeklyHours + missionDuration) > 40;

    const canClaim = mission.status === 'Open' && isEligibleLevel && !isBlacklisted;
    const claimedByUser = mission.claimedBy ? getUserById(mission.claimedBy) : null;

    let eligibilityMessage = "";
    let warningMessage = "";
    if (mission.status === 'Open') {
        if (!isEligibleLevel) eligibilityMessage = "Your security level is too low for this mission.";
        else if (isBlacklisted) eligibilityMessage = "You are blacklisted by this client for this mission.";
        
        if (canClaim && willExceedHours) {
          warningMessage = `Note: Claiming results in overtime (${missionDuration.toFixed(1)} hrs) and requires approval.`;
        }
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return (
        <div className={`bg-[var(--bg-secondary)] border ${!eligibilityMessage || mission.status !== 'Open' ? 'border-[var(--border-primary)]' : 'border-red-500/50'} rounded-lg p-4 flex flex-col justify-between shadow-sm`}>
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
                <div className="flex justify-between items-center text-sm text-[var(--text-primary)]"><span><strong className="text-[var(--accent-primary)]">${mission.payRate}/hr</strong></span><span>Level {mission.requiredLevel}+</span></div>
                <div className="text-xs text-[var(--text-secondary)] mt-2"><p>Start: {mission.startTime.toLocaleString(undefined, options)}</p><p>End: {mission.endTime.toLocaleString(undefined, options)}</p></div>
                {mission.status === 'Claimed' && claimedByUser && (<p className="text-center text-sm text-[var(--text-secondary)] mt-4">Claimed by: <span className="font-semibold text-[var(--text-primary)]">{claimedByUser.firstName} {claimedByUser.lastName}</span></p>)}
                {mission.status === 'Open' && (
                    <>
                        {canClaim ? (
                            <>
                                <button onClick={() => onClaim(mission.id)} className="w-full mt-4 bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2 rounded-md hover:bg-opacity-90 transition">Claim Mission</button>
                                {warningMessage && <p className="text-center text-xs text-yellow-600 mt-2">{warningMessage}</p>}
                            </>
                        ) : (
                            <p className="text-center text-xs text-red-500 mt-4">{eligibilityMessage}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const MissionBoard: React.FC<MissionBoardProps> = ({ user, missions, clients, onClaimMission }) => {
    
    const sortedMissions = [...missions].sort((a, b) => {
        const aClient = clients.find(c => c.id === a.clientId);
        const bClient = clients.find(c => c.id === b.clientId);
        const aIsWhitelisted = aClient?.whitelist.includes(user.id) ?? false;
        const bIsWhitelisted = bClient?.whitelist.includes(user.id) ?? false;

        if (aIsWhitelisted && !bIsWhitelisted) return -1;
        if (!aIsWhitelisted && bIsWhitelisted) return 1;
        return a.startTime.getTime() - b.startTime.getTime();
    });

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Mission Board</h2>
            <p className="text-[var(--text-secondary)] mb-6">Missions from clients who have whitelisted you appear first.</p>
            
            {sortedMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedMissions.map(mission => (
                        <MissionCard key={mission.id} mission={mission} user={user} client={clients.find(c => c.id === mission.clientId)} onClaim={() => onClaimMission(mission.id, user.id)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <p className="text-[var(--text-secondary)]">No missions posted at this time. Please check back later.</p>
                </div>
            )}
        </div>
    );
};

export default MissionBoard;