import { getMissionById, getClientById, getSiteById, getTrainingModules, getUserById, getLeadGuardAssignment } from '../database.js';
import { fieldRoles } from '../constants.js';
import { Icons } from './Icons.js';

export const MissionDetailsModal = ({ missionId, user }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';
    const client = getClientById(mission.clientId);
    const site = getSiteById(mission.siteId);
    const requiredTraining = getTrainingModules().find(tm => tm.id === mission.requiredTrainingId);
    const guards = mission.claimedBy.map(id => getUserById(id)).filter(Boolean);
    const leadGuard = getLeadGuardAssignment(mission.id);
    const isGuard = fieldRoles.includes(user.role);

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--border-primary)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--border-primary)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">${mission.title}</h2>
                <p class="text-[var(--text-secondary)]">${client.companyName} at ${site.name}</p>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--accent-secondary)]">Mission Details</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">
                        <p><strong>Pay Rate:</strong> $${mission.payRate}/hr</p>
                        <p><strong>Level Req:</strong> ${mission.requiredLevel}</p>
                        <p><strong>Start Time:</strong> ${new Date(mission.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> ${new Date(mission.endTime).toLocaleString()}</p>
                        <p class="sm:col-span-2"><strong>Location:</strong> ${site.address}</p>
                        <p class="sm:col-span-2"><strong>Training Req:</strong> ${requiredTraining.title}</p>
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--accent-secondary)]">Instructions</h3>
                    <p class="text-sm text-[var(--text-secondary)] whitespace-pre-wrap bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-primary)]">${mission.description || 'No specific instructions provided.'}</p>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--accent-secondary)]">Assigned Guards (${guards.length}/${mission.requiredGuards})</h3>
                    <ul class="space-y-2">
                        ${guards.map(g => `
                            <li class="flex items-center text-sm p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-primary)]">
                                ${Icons.User({className: 'w-5 h-5 mr-3 text-[var(--text-secondary)]'})}
                                <span class="font-semibold">${g.firstName} ${g.lastName} ${leadGuard?.userId === g.id ? '<span class="ml-2 text-xs font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-full">LEAD</span>' : ''}</span>
                            </li>
                        `).join('')}
                        ${guards.length === 0 ? '<li class="text-sm text-[var(--text-secondary)] italic p-3 bg-[var(--bg-tertiary)] rounded-lg border border-dashed border-[var(--border-primary)]">No guards have claimed this mission yet.</li>' : ''}
                    </ul>
                </div>
            </div>
            <div class="p-4 bg-[var(--bg-tertiary)] border-t border-[var(--border-primary)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-100 border border-[var(--border-secondary)]">Close</button>
                ${isGuard && !mission.claimedBy.includes(user.id) && mission.claimedBy.length < mission.requiredGuards ? `<button data-action="claim-mission" data-id="${mission.id}" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)]">Claim Mission</button>` : ''}
            </div>
        </div>
    </div>
    `;
};
