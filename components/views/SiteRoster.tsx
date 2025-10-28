import React from 'react';
import { User, Mission } from '../../types';

interface SiteRosterProps {
    user: User;
    missions: Mission[];
    users: User[];
}

const SiteRoster: React.FC<SiteRosterProps> = ({ user, missions, users }) => {
    
    // Find missions the current lead guard has claimed
    const myClaimedMissions = missions.filter(m => m.claimedBy === user.id);
    const mySites = [...new Set(myClaimedMissions.map(m => m.site))];

    // Find all missions at those same sites
    const siteMissions = missions.filter(m => mySites.includes(m.site) && m.status === 'Claimed');
    
    // Get unique user IDs of guards at those sites
    const guardIdsOnSite = [...new Set(siteMissions.map(m => m.claimedBy).filter(Boolean))];
    const guardsOnSite = users.filter(u => guardIdsOnSite.includes(u.id));

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">My Site Rosters</h2>
            <p className="text-[var(--text-secondary)] mb-6">View other guards assigned to the same sites as your current missions.</p>

            {mySites.length > 0 ? (
                mySites.map(site => {
                    const guardsForSite = guardsOnSite.filter(g => siteMissions.some(m => m.site === site && m.claimedBy === g.id));
                    return (
                        <div key={site} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 mb-4">{site}</h3>
                            <ul className="divide-y divide-[var(--border-tertiary)]">
                                {guardsForSite.map(guard => (
                                    <li key={guard.id} className="py-2">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{guard.firstName} {guard.lastName} - <span className="text-[var(--text-secondary)]">{guard.rank}</span></p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
                    <p className="text-[var(--text-secondary)]">You are not currently assigned to any missions as a Lead Guard.</p>
                </div>
            )}
        </div>
    );
};

export default SiteRoster;