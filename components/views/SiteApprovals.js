
import { getPendingSiteApprovals, getClients } from '../../database.js';

export const SiteApprovals = ({ user }) => {
    const approvals = getPendingSiteApprovals(user.teamId);
    const clients = getClients();
    const getClient = (id) => clients.find(c => c.id === id) || { companyName: 'Unknown Client' };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Site Approvals</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-[var(--text-primary)]">${appr.siteName}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Client: <span class="font-semibold">${getClient(appr.clientId).companyName}</span></p>
                                <p class="text-xs text-[var(--text-secondary)]">Address: ${appr.siteAddress}</p>
                            </div>
                            <div class="space-x-2 flex-shrink-0">
                                <button data-action="approve-site" data-id="${appr.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                                <button data-action="deny-site" data-id="${appr.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)] p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-primary)]">No new sites require approval.</p>`}
            </div>
        </div>
    `;
};
