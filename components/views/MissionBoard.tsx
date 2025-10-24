import React from 'react';
import type { User, Mission } from '../../types';
import { getMissions, claimMission } from '../../database';

interface MissionBoardProps {
  user: User;
}

const MissionCard: React.FC<{mission: Mission, userLevel: number, onClaim: (missionId: string) => void}> = ({ mission, userLevel, onClaim }) => {
    const isEligible = userLevel >= mission.requiredLevel;
    const canClaim = mission.status === 'Open' && isEligible;
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return (
        <div className={`bg-[#0f0f0f] border ${isEligible ? 'border-[#535347]' : 'border-red-900/50'} rounded-lg p-4 flex flex-col justify-between`}>
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
                    <p>{mission.startTime.toLocaleString(undefined, options)}</p>
                    <p>{mission.endTime.toLocaleString(undefined, options)}</p>
                </div>
                {canClaim && (
                    <button 
                        onClick={() => onClaim(mission.id)}
                        className="w-full mt-4 bg-[#aeae5a] text-[#0f0f0f] font-bold py-2 rounded-md hover:bg-opacity-90 transition">
                        Claim Mission
                    </button>
                )}
                {!isEligible && mission.status === 'Open' && (
                     <p className="text-center text-xs text-red-400 mt-4">Your level is too low for this mission.</p>
                )}
            </div>
        </div>
    );
};

const MissionBoard: React.FC<MissionBoardProps> = ({ user }) => {
    const [missions, setMissions] = React.useState<Mission[]>([]);
    
    const fetchMissions = () => {
        setMissions(getMissions());
    }

    React.useEffect(() => {
        fetchMissions();
        const handleStorageChange = () => fetchMissions();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClaim = (missionId: string) => {
        claimMission(missionId, user.id);
        fetchMissions(); // Re-fetch to update UI
    }

    const openMissions = missions.filter(m => m.status === 'Open');

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Mission Board</h2>
            <p className="text-[#787876] mb-6">Available missions matching your qualifications will appear here. First come, first served.</p>
            
            {openMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {openMissions.map(mission => (
                        <MissionCard key={mission.id} mission={mission} userLevel={user.level} onClaim={handleClaim} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-[#0f0f0f] border border-[#535347] rounded-lg">
                    <p className="text-[#787876]">No open missions at this time. Please check back later.</p>
                </div>
            )}
        </div>
    );
};

export default MissionBoard;