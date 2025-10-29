
import * as db from '../../database.js';

export const ActiveMissions = ({ user }) => {
    const activeMissions = db.getMissions().filter(m => m.status === 'Active');
    
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Active Missions</h1>
             ${activeMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${activeMissions.map(mission => {
                        const missionContent = mission.claimedBy.map(guardId => {
                            const guard = db.getUserById(guardId);
                            const checkedIn = mission.checkIns.some(c => c.guardId === guardId);
                            return `
                                <div class="flex items-center text-sm text-[var(--text-secondary)]">
                                    <span class="w-3 h-3 rounded-full mr-2 ${checkedIn ? 'bg-green-500' : 'bg-[var(--text-secondary)]'}"></span>
                                    ${guard?.firstName} ${guard?.lastName}
                                </div>
                            `;
                        }).join('');

                        return `
                        <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                            <h3 class="font-bold text-[var(--text-primary)]">${mission.title}</h3>
                            <p class="text-sm text-[var(--text-secondary)]">${mission.endTime.toLocaleTimeString()} (End)</p>
                            <div class="mt-2">
                                ${missionContent}
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            ` : `
                <p class="text-[var(--text-secondary)]">No missions are currently active.</p>
            `}
        </div>
    `;
};