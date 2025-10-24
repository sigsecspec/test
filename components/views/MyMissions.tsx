import React from 'react';
import type { User, Mission } from '../../types';
import { getMissions } from '../../database';

interface MyMissionsProps {
  user: User;
}

const MyMissionCard: React.FC<{mission: Mission}> = ({ mission }) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return (
        <div className={`bg-[#0f0f0f] border border-[#535347] rounded-lg p-4 flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#c4c4c4]">{mission.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-[#aeae5a]/20 text-[#aeae5a]`}>
                        {mission.status}
                    </span>
                </div>
                <p className="text-sm text-[#787876] mt-1">{mission.site}</p>
                <p className="text-sm text-[#c4c4c4] mt-4">{mission.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#535347]/50">
                <div className="flex justify-between items-center text-sm text-[#c4c4c4]">
                    <span>Pay: <strong className="text-[#aeae5a]">${mission.payRate}/hr</strong></span>
                    <span>Required Level: {mission.requiredLevel}</span>
                </div>
                <div className="text-xs text-[#787876] mt-2">
                    <p>Start: {mission.startTime.toLocaleString(undefined, options)}</p>
                    <p>End: {mission.endTime.toLocaleString(undefined, options)}</p>
                </div>
            </div>
        </div>
    );
};


const MyMissions: React.FC<MyMissionsProps> = ({ user }) => {
    const [myMissions, setMyMissions] = React.useState<Mission[]>([]);
    
    const fetchMissions = () => {
        const allMissions = getMissions();
        setMyMissions(allMissions.filter(m => m.claimedBy === user.id));
    }

    React.useEffect(() => {
        fetchMissions();
        const handleStorageChange = () => fetchMissions();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [user.id]);


    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">My Missions</h2>
            <p className="text-[#787876] mb-6">Here are the missions you have claimed. Be sure to check in on time.</p>
            
            {myMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myMissions.map(mission => (
                        <MyMissionCard key={mission.id} mission={mission} />
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