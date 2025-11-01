import { getUserById, getUserTrainingProgress, getTrainingModules, getCollection } from '../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles } from '../constants.js';
import { Icons } from './Icons.js';

export const UserDetailsModal = ({ userId, currentUser }) => {
    const user = getUserById(userId);
    if (!user) return '';
    const teams = getCollection('teams');
    const userTrainings = getUserTrainingProgress(userId);
    const allModules = getTrainingModules();

    const canAlwaysEdit = canAlwaysApproveRoles.includes(currentUser.role);
    const isManagerOfUser = managementAndOpsRoles.includes(currentUser.role) && user.teamId === currentUser.teamId;
    const canEdit = canAlwaysEdit || isManagerOfUser;

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--border-primary)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--border-primary)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">${user.firstName} ${user.lastName}</h2>
                <p class="text-[var(--text-secondary)]">${user.role} - ${user.rank}</p>
            </div>
            <form id="user-details-form" data-user-id="${user.id}">
                <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                    <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--accent-secondary)]">Profile Details</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Rating:</strong> ${user.performanceRating.toFixed(2)}</p>
                            <div class="flex items-center">
                                <label for="user-level" class="font-bold mr-2">Level:</label>
                                <input id="user-level" name="level" type="number" min="1" max="5" value="${user.level}" ${!canEdit ? 'disabled' : ''} class="w-20 p-1 border rounded-md bg-white disabled:bg-gray-100" />
                            </div>
                             <div class="flex items-center">
                                <label for="user-team" class="font-bold mr-2">Team:</label>
                                <select id="user-team" name="teamId" ${!canEdit ? 'disabled' : ''} class="p-1 border rounded-md bg-white disabled:bg-gray-100">
                                    ${teams.map(t => `<option value="${t.id}" ${user.teamId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                     <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--accent-secondary)]">Training & Certifications</h3>
                        <ul class="space-y-1 text-sm bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">
                        ${allModules.map(mod => {
                            const prog = userTrainings.find(p => p.moduleId === mod.id);
                            const status = prog ? prog.status : 'Not Started';
                            const color = { 'Approved': 'text-green-600', 'Pending Approval': 'text-yellow-600', 'Failed': 'text-red-600', 'Denied': 'text-red-800'}[status] || 'text-gray-500';
                            return `<li class="flex justify-between items-center py-1"><span class="text-[var(--text-primary)]">${mod.title}</span><span class="font-semibold px-2 py-0.5 rounded-full text-xs ${color.replace('text-', 'bg-').replace('-600', '/10').replace('-800', '/10')}">${status}</span></li>`
                        }).join('')}
                        </ul>
                    </div>
                </div>
                <div class="p-4 bg-[var(--bg-tertiary)] border-t border-[var(--border-primary)] flex justify-end items-center space-x-3 flex-shrink-0">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-100 border border-[var(--border-secondary)]">Close</button>
                    ${canEdit ? `<button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)]">Save Changes</button>` : ''}
                </div>
            </form>
        </div>
    </div>
    `;
};
