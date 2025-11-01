
import { getClients } from '../../database.js';
import { canAlwaysApproveRoles } from '../../constants.js';

export const ClientManagement = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const clients = getClients().filter(c => teamId ? c.teamId === teamId : true);
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Client Management</h1>
             <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact Email</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${clients.map(client => `
                            <tr class="hover:bg-[var(--bg-tertiary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${client.companyName}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${client.contactEmail}</td>
                                <td class="px-5 py-4 text-sm"><button class="text-[var(--accent-primary)] hover:underline font-semibold">View Contracts</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
                 <div class="md:hidden space-y-3 p-3">
                    ${clients.map(client => `
                        <div class="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">
                            <p class="font-bold text-[var(--text-primary)]">${client.companyName}</p>
                            <p class="text-sm text-[var(--text-secondary)]">${client.contactEmail}</p>
                            <button class="mt-2 text-sm text-[var(--accent-primary)] font-semibold">View Contracts &rarr;</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};
