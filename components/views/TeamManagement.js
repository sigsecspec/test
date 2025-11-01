import { getCollection } from '../../database.js';

export const TeamManagement = ({ user }) => {
    const teams = getCollection('teams');
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Team Management</h1>
            <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
                <p class="text-[var(--color-text-base)]">This page is for managing operational teams.</p>
                <ul class="mt-4 space-y-2">
                    ${teams.map(team => `<li class="p-2 bg-[var(--color-bg-surface-raised)] rounded-md text-[var(--color-text-base)]">${team.name}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
};