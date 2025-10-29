

import * as db from '../../database.js';

export const TrainingApprovals = ({ user }) => {
    const approvals = db.getPendingTrainingApprovals();
    const users = db.getUsers();
    const modules = db.getTrainingModules();

    const getUser = (id) => users.find(u => u.id === id) || { firstName: 'Unknown', lastName: 'User' };
    const getModule = (id) => modules.find(m => m.id === id) || { title: 'Unknown Module' };

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Approvals</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-[var(--text-primary)]">${getUser(appr.userId).firstName} ${getUser(appr.userId).lastName}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Completed: <span class="font-semibold">${getModule(appr.moduleId).title}</span></p>
                                <p class="text-xs text-[var(--text-secondary)]">Submitted: ${new Date(appr.submittedAt).toLocaleString()}</p>
                            </div>
                            <div class="space-x-2">
                                <button data-action="approve-training" data-id="${appr.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                                <button data-action="deny-training" data-id="${appr.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)]">No training submissions require approval.</p>`}
            </div>
        </div>
    `;
};