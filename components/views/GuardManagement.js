
import * as db from '../../database.js';
import * as ROLES from '../../constants.js';

export const GuardManagement = ({ user }) => {
    const guards = db.getUsers(ROLES.fieldRoles);

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Guard Management</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm">
                            <th class="px-5 py-3 font-semibold">Name</th>
                            <th class="px-5 py-3 font-semibold">Rank</th>
                            <th class="px-5 py-3 font-semibold">Level</th>
                            <th class="px-5 py-3 font-semibold">Rating</th>
                            <th class="px-5 py-3 font-semibold">Weekly Hours</th>
                            <th class="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${guards.map(guard => `
                            <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm">
                                    <p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p>
                                    <p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${guard.email}</p>
                                </td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.rank}</td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.level}</td>
                                <td class="px-5 py-4 text-sm text-green-600 font-semibold">${guard.performanceRating.toFixed(2)}</td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.weeklyHours.toFixed(1)}</td>
                                <td class="px-5 py-4 text-sm">
                                    <button class="text-[var(--accent-primary)] hover:underline font-semibold">View</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
