import { getUsers, User } from '../../database.js';
import { canAlwaysApproveRoles, fieldRoles } from '../../constants.js';

export const GuardManagement = ({ user }: { user: User }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const guards = getUsers(fieldRoles)
        .filter(g => teamId ? g.teamId === teamId : true)
        .sort((a,b) => (a.status === 'Active' ? -1 : 1) - (b.status === 'Active' ? -1 : 1) || a.lastName.localeCompare(b.lastName));

    const getStatusPill = (status: User['status']) => {
        switch(status) {
            case 'Active': return 'status-green';
            case 'Suspended': return 'status-yellow';
            case 'Terminated': return 'status-red';
            default: return 'status-gray';
        }
    }

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Guard Management</h1>
            
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <div class="hidden md:block">
                    <table class="min-w-full leading-normal">
                        <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="text-left text-[var(--color-text-muted)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Name</th><th class="px-5 py-3 font-semibold">Rank</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold">Weekly Hours</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                        <tbody class="divide-y divide-[var(--color-border)]">
                            ${guards.map(guard => `
                                <tr class="hover:bg-[var(--color-bg-surface-raised)] ${guard.status !== 'Active' ? 'opacity-60' : ''}">
                                    <td class="px-5 py-4 text-sm">
                                        <p class="text-[var(--color-text-base)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p>
                                        <p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${guard.email}</p>
                                    </td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${guard.rank} (Lvl ${guard.level})</td>
                                    <td class="px-5 py-4 text-sm"><span class="status-pill ${getStatusPill(guard.status)}">${guard.status}</span></td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-accent)] font-semibold">${guard.performanceRating.toFixed(2)}</td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${guard.weeklyHours.toFixed(1)}</td>
                                    <td class="px-5 py-4 text-sm"><button data-action="open-user-details" data-id="${guard.id}" class="text-[var(--color-accent)] hover:underline font-semibold">View / Edit</button></td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="md:hidden space-y-4 p-4">
                    ${guards.map(guard => `
                        <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg shadow border border-[var(--color-border)] ${guard.status !== 'Active' ? 'opacity-60' : ''}">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-bold text-[var(--color-text-base)]">${guard.firstName} ${guard.lastName}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">${guard.rank}</p>
                                </div>
                                <span class="status-pill ${getStatusPill(guard.status)}">${guard.status}</span>
                            </div>
                            <div class="flex justify-between items-center mt-3 pt-3 border-t border-[var(--color-border)]">
                                <div class="text-sm">
                                    <span class="font-semibold text-[var(--color-accent)]">${guard.performanceRating.toFixed(2)}</span>
                                    <span class="text-[var(--color-text-muted)]"> | Lvl ${guard.level}</span>
                                </div>
                                <button data-action="open-user-details" data-id="${guard.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] text-xs font-bold rounded-md">Details</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};