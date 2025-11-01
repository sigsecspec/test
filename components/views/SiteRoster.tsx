import { getSites } from '../../database.js';

export const SiteRoster = ({ user }) => {
     const sites = getSites();
     return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">All Client Sites</h1>
        <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
             <ul class="divide-y divide-[var(--color-border)]">
                ${sites.map(site => `<li class="py-2"><p class="font-semibold text-[var(--color-text-base)]">${site.name}</p><p class="text-sm text-[var(--color-text-muted)]">${site.address}</p></li>`).join('')}
             </ul>
        </div>
    </div>
    `;
};