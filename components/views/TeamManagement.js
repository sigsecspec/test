
import { getCollection } from '../../database.js';

export const TeamManagement = ({ user }) => {
    const teams = getCollection('teams');
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Team Management</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <p class="text-[var(--text-primary)]">This page is for managing operational teams.</p>
                <ul class="mt-4 space-y-2">
                    ${teams.map(team => `<li class="p-2 bg-gray-100 rounded-md">${team.name}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
};
