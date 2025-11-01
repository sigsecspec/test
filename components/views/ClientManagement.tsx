import { getClients, getUserById, User } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const ClientManagement = ({ user }: { user: User }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const canEditOnTeam = managementAndOpsRoles.includes(user.role);
    
    const allClients = getClients();
    const clients = allClients.filter(c => {
        if (canSeeAll) return true;
        return c.teamId === user.teamId;
    });

    const canEditClient = (client: { teamId: string | null }) => {
        if (canSeeAll) return true;
        if (canEditOnTeam && client.teamId === user.teamId) return true;
        return false;
    };
    
    const renderTable = () => `
       <div class="hidden md:block">
            <table class="min-w-full leading-normal">
                <thead><tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                <tbody>
                    ${clients.map(client => {
                         const contactUser = getUserById(client.userId);
                         const buttonClass = canEditClient(client)
                            ? `text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]`
                            : `text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]`;
                         const buttonText = canEditClient(client) ? `View / Edit` : `View`;
                         return `
                        <tr class="border-b border-[var(--color-border)]">
                            <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${client.companyName}</p></td>
                            <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : 'N/A'}</p><p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${client.contactEmail}</p></td>
                            <td class="px-5 py-4 text-sm"><button data-action="open-user-details" data-id="${client.userId}" class="font-semibold ${buttonClass} transition-colors">${buttonText}</button></td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    const renderMobileCards = () => `
        <div class="md:hidden space-y-3 p-4">
            ${clients.map(client => {
                const contactUser = getUserById(client.userId);
                const buttonText = canEditClient(client) ? "View / Edit Contact" : "View Contact";
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)]">${client.companyName}</p>
                            <p class="text-sm text-[var(--color-text-muted)]">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : client.contactEmail}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-end">
                        <button data-action="open-user-details" data-id="${client.userId}" class="text-sm text-[var(--color-accent)] font-semibold">${buttonText} &rarr;</button>
                    </div>
                </div>
            `}).join('')}
        </div>
    `;

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Client Management</h1>
                <div class="relative w-full md:w-72">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        ${Icons.Search({ className: "w-5 h-5 text-[var(--color-text-muted)]" })}
                    </span>
                    <input type="text" id="client-search-input" placeholder="Search by name, company, or email..." class="block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] py-2.5 pl-10 pr-3 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0" />
                </div>
            </div>

             <div id="client-list-container" class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable()}
                ${renderMobileCards()}
            </div>
        </div>
    `;
};