
import { getApplications } from '../../database.js';

export const Applications = ({ user }) => {
    const applications = getApplications();
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">New Applications</h1>
            <div class="space-y-4">
                ${applications.length > 0 ? applications.map(app => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex flex-col md:flex-row justify-between md:items-center gap-4"><div><p class="font-bold text-lg text-[var(--text-primary)]">${app.data.firstName ? `${app.data.firstName} ${app.data.lastName}` : app.data.companyName}</p><p class="text-sm text-[var(--text-secondary)]">${app.type}</p></div><div class="space-x-2 flex-shrink-0 self-end md:self-center"><button data-action="approve-application" data-id="${app.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button><button data-action="deny-application" data-id="${app.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--text-secondary)] p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-primary)]">No pending applications.</p>`}
            </div>
        </div>
    `;
};
