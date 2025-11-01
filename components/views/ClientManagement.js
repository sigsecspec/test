
import { getClients, getUserById } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles } from '../../constants.js';

export const ClientManagement = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const canEditOnTeam = managementAndOpsRoles.includes(user.role);
    
    const allClients = getClients();
    const clients = allClients.filter(c => {
        if (canSeeAll) return true;
        // Show clients for the user's team if they are management/ops
        return c.teamId === user.teamId;
    });

    const canEditClient = (client) => {
        if (canSeeAll) return true;
        if (canEditOnTeam && client.teamId === user.teamId) return true;
        return false;
    };
    
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Client Management</h1>
             <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${clients.map(client => {
                             const contactUser = getUserById(client.userId);
                             const editButton = canEditClient(client) 
                                ? `<button data-action="open-user-details" data-id="${client.userId}" class="text-[var(--accent-primary)] hover:underline font-semibold">View / Edit Contact</button>`
                                : `<button data-action="open-user-details" data-id="${client.userId}" class="text-[var(--text-secondary)] hover:underline font-semibold">View Contact</button>`;

                             return `
                            <tr class="hover:bg-[var(--bg-tertiary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${client.companyName}</p></td>
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : 'N/A'}</p><p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${client.contactEmail}</p></td>
                                <td class="px-5 py-4 text-sm">
                                    ${editButton}
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
                 <div class="md:hidden space-y-3 p-3">
                    ${clients.map(client => {
                        const contactUser = getUserById(client.userId);
                        const editButtonText = canEditClient(client) ? "View / Edit Contact" : "View Contact";
                        return `
                        <div class="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">
                            <p class="font-bold text-[var(--text-primary)]">${client.companyName}</p>
                             <p class="text-sm text-[var(--text-secondary)]">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : client.contactEmail}</p>
                            <div class="mt-2 pt-2 border-t border-[var(--border-primary)] flex justify-end">
                                <button data-action="open-user-details" data-id="${client.userId}" class="text-sm text-[var(--accent-primary)] font-semibold">${editButtonText} &rarr;</button>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        </div>
    `;
};
