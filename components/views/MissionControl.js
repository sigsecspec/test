
import { getMissions, getClients } from '../../database.js';
import { canAlwaysApproveRoles } from '../../constants.js';

export const MissionControl = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const missions = getMissions().filter(m => {
        if (!teamId) return true;
        const client = getClients().find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    });

    const statusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-800';
            case 'Claimed': return 'bg-blue-100 text-blue-800';
            case 'Active': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
        }
    };
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Mission Control</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-x-auto border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Title</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold">Time</th><th class="px-5 py-3 font-semibold">Guards</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${missions.map(mission => `
                             <tr class="hover:bg-[var(--bg-tertiary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap">${mission.title}</p></td>
                                <td class="px-5 py-4 text-sm"><span class="px-2 py-1 font-semibold rounded-full text-xs ${statusColor(mission.status)}">${mission.status}</span></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${new Date(mission.startTime).toLocaleDateString()}</td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${mission.claimedBy.length}/${mission.requiredGuards}</td>
                                <td class="px-5 py-4 text-sm"><button data-action="open-mission-details" data-id="${mission.id}" class="text-[var(--accent-primary)] hover:underline font-semibold">Details</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
                 <div class="md:hidden space-y-3 p-3">
                    ${missions.map(mission => `
                        <div class="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-primary)]">
                             <div class="flex justify-between items-start">
                                <p class="font-bold text-[var(--text-primary)]">${mission.title}</p>
                                <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${statusColor(mission.status)}">${mission.status}</span>
                            </div>
                            <p class="text-sm text-[var(--text-secondary)] mt-1">${new Date(mission.startTime).toLocaleString([], {dateStyle:'short', timeStyle:'short'})}</p>
                             <div class="flex justify-between items-center mt-2 pt-2 border-t border-[var(--border-primary)]">
                                <p class="text-sm text-[var(--text-secondary)]">Guards: ${mission.claimedBy.length}/${mission.requiredGuards}</p>
                                <button data-action="open-mission-details" data-id="${mission.id}" class="text-sm text-[var(--accent-primary)] font-semibold">Details &rarr;</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};
