

import * as db from '../../database.js';

export const Training = ({ user }) => {
    const modules = db.getTrainingModules();
    const progress = db.getUserTrainingProgress(user.id);

    const getModuleProgress = (moduleId) => {
        return progress.find(p => p.moduleId === moduleId);
    };

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Center</h1>
            <div class="space-y-4">
                ${modules.map(module => {
                    const prog = getModuleProgress(module.id);
                    let statusColor = 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
                    let statusText = prog?.status || 'Not Started';

                    if (prog?.status === 'Approved' || prog?.status === 'Passed') statusColor = 'bg-green-100 text-green-800';
                    if (prog?.status === 'Pending Approval') statusColor = 'bg-yellow-100 text-yellow-800';
                    if (prog?.status === 'Failed') statusColor = 'bg-red-100 text-red-800';
                    
                    return `
                        <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-4">
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg text-[var(--text-primary)]">${module.title}</h3>
                                <p class="text-sm text-[var(--text-secondary)]">${module.content}</p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                ${prog ? `
                                    <span class="px-3 py-1 text-sm font-semibold rounded-full ${statusColor}">${statusText}</span>
                                ` : `
                                     <button data-action="start-training" data-id="${module.id}" class="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-bold rounded-md hover:bg-[var(--accent-secondary-hover)]">Start Training</button>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};