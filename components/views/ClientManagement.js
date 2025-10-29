
import * as db from '../../database.js';

export const ClientManagement = ({ user }) => {
    const clients = db.getClients();

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Client Management</h1>
             <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm">
                            <th class="px-5 py-3 font-semibold">Company Name</th>
                            <th class="px-5 py-3 font-semibold">Contact Email</th>
                            <th class="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clients.map(client => `
                            <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm">
                                    <p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${client.companyName}</p>
                                </td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${client.contactEmail}</td>
                                <td class="px-5 py-4 text-sm">
                                    <button class="text-[var(--accent-primary)] hover:underline font-semibold">View Contracts</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};