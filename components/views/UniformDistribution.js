
import { getNeedsUniformUsers } from '../../database.js';

export const UniformDistribution = ({ user }) => {
    const usersNeedingUniforms = getNeedsUniformUsers(user.teamId);

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Uniform Distribution</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead class="bg-[var(--bg-tertiary)]">
                        <tr class="text-left text-[var(--text-secondary)] uppercase text-sm">
                            <th class="px-5 py-3 font-semibold">Name</th>
                            <th class="px-5 py-3 font-semibold">Role</th>
                            <th class="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${usersNeedingUniforms.length > 0 ? usersNeedingUniforms.map(u => `
                            <tr class="hover:bg-[var(--bg-tertiary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] font-semibold">${u.firstName} ${u.lastName}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${u.role}</td>
                                <td class="px-5 py-4 text-sm">
                                    <button data-action="mark-uniform-sent" data-id="${u.id}" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600">Mark as Sent</button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="3" class="text-center p-6 text-[var(--text-secondary)]">No users currently need a uniform.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
