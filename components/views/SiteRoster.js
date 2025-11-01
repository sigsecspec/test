
import { getSites } from '../../database.js';

export const SiteRoster = ({ user }) => {
     const sites = getSites();
     return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">All Client Sites</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
             <ul class="divide-y divide-[var(--border-primary)]">
                ${sites.map(site => `<li class="py-2"><p class="font-semibold text-[var(--text-primary)]">${site.name}</p><p class="text-sm text-[var(--text-secondary)]">${site.address}</p></li>`).join('')}
             </ul>
        </div>
    </div>
    `;
};
