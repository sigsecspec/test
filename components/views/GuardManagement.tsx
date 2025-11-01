import { getUsers } from '../../database.js';
import { canAlwaysApproveRoles, fieldRoles } from '../../constants.js';

export const GuardManagement = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const guards = getUsers(fieldRoles).filter(g => teamId ? g.teamId === teamId : true);
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Guard Management</h1>
            
            {/* Desktop & Tablet Table */}
            <div class="hidden md:block bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Name</th><th class="px-5 py-3 font-semibold">Rank</th><th class="px-5 py-3 font-semibold">Level</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold">Weekly Hours</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${guards.map(guard => `
                            <tr class="hover:bg-[var(--bg-tertiary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p><p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${guard.email}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.rank}</td><td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.level}</td>
                                <td class="px-5 py-4 text-sm text-green-600 font-semibold">${guard.performanceRating.toFixed(2)}</td><td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.weeklyHours.toFixed(1)}</td>
                                <td class="px-5 py-4 text-sm"><button data-action="open-user-details" data-id="${guard.id}" class="text-[var(--accent-primary)] hover:underline font-semibold">View / Edit</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div class="md:hidden space-y-4">
                ${guards.map(guard => `
                    <div class="bg-[var(--bg-secondary)] p-4 rounded-lg shadow border border-[var(--border-primary)]">
                        <div>
                            <p class="font-bold text-[var(--text-primary)]">${guard.firstName} ${guard.lastName}</p>
                            <p class="text-xs text-[var(--text-secondary)]">${guard.rank}</p>
                        </div>
                        <div class="flex justify-between items-center mt-3 pt-3 border-t border-[var(--border-primary)]">
                            <div class="text-sm">
                                <span class="font-semibold text-green-600">${guard.performanceRating.toFixed(2)}</span>
                                <span class="text-[var(--text-secondary)]"> | Lvl ${guard.level}</span>
                            </div>
                            <button data-action="open-user-details" data-id="${guard.id}" class="px-3 py-1 bg-[var(--accent-secondary)] text-white text-xs font-bold rounded-md">Details</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
