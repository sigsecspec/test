
import * as db from '../../database.js';

export const MySites = ({ user }) => {
    const client = db.getClients().find(c => c.userId === user.id);
    const sites = client ? db.getSites().filter(s => s.clientId === client.id) : [];

    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Sites</h1>
             <div class="space-y-4">
                ${sites.map(site => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <p class="font-bold text-[var(--text-primary)]">${site.name}</p>
                        <p class="text-sm text-[var(--text-secondary)]">${site.address}</p>
                    </div>
                `).join('')}
                 <button class="w-full text-center p-4 border-2 border-dashed border-[var(--border-secondary)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors">
                    Add New Site
                </button>
            </div>
        </div>
    `;
};