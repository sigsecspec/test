import { getMissions, getClients, getUserById } from '../../database.js';
import { canAlwaysApproveRoles } from '../../constants.js';

export const ActiveMissions = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const activeMissions = getMissions().filter(m => {
        if (m.status !== 'Active') return false;
        if (!teamId) return true;
        const client = getClients().find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    });
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Live Active Missions</h1>
             ${activeMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${activeMissions.map(mission => {
                        const missionContent = mission.claimedBy.map(guardId => {
                            const guard = getUserById(guardId);
                            const checkedIn = mission.checkIns && mission.checkIns[guardId];
                            return `<div class="flex items-center text-sm text-[var(--color-text-muted)]"><span class="w-3 h-3 rounded-full mr-2 ${checkedIn ? 'bg-green-500' : 'bg-[var(--color-text-muted)]'}"></span> ${guard?.firstName} ${guard?.lastName}</div>`;
                        }).join('');
                        return `<div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm"><h3 class="font-bold text-[var(--color-text-base)]">${mission.title}</h3><p class="text-sm text-[var(--color-text-muted)]">${new Date(mission.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (End)</p><div class="mt-2">${missionContent}</div></div>`;
                    }).join('')}
                </div>
            ` : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No missions are currently active.</p>`}
        </div>
    `;
};