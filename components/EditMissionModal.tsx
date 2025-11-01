import { getMissionById, getSites, getContracts, getTrainingModules, getUserById, getClients } from '../database.js';
import { Icons } from './Icons.js';

export const EditMissionModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';

    const client = getClients().find(c => c.id === mission.clientId);
    if (!client) return `<div>Error: Client not found for this mission.</div>`;

    const sites = getSites().filter(s => s.clientId === client.id);
    const contracts = getContracts().filter(c => c.clientId === client.id && c.status === 'Active');
    const trainingModules = getTrainingModules().filter(m => !m.title.includes("Officer") && !m.title.includes("Supervisor") && !m.title.includes("Lead"));
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-tertiary)]";

    const formatDateTimeLocal = (date) => {
        if (!date) return '';
        const d = new Date(date);
        // Adjust for timezone offset to display correctly in the input
        const d_tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        return d_tz.toISOString().slice(0, 16);
    }

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-4xl border border-[var(--border-primary)] max-h-[90vh] flex flex-col" data-modal-content>
            <div class="p-6 border-b border-[var(--border-primary)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">Edit Mission</h2>
            </div>
            <form id="edit-mission-form" data-mission-id="${mission.id}" class="p-8 space-y-6 overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" value="${mission.title}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Contract</label><select name="contractId" required class="${inputStyles} bg-white">${contracts.map(c => `<option value="${c.id}" ${mission.contractId === c.id ? 'selected' : ''}>${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Site</label><select name="siteId" required class="${inputStyles} bg-white">${sites.map(s => `<option value="${s.id}" ${mission.siteId === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Training</label><select name="requiredTrainingId" required class="${inputStyles} bg-white">${trainingModules.map(t => `<option value="${t.id}" ${mission.requiredTrainingId === t.id ? 'selected' : ''}>${t.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" value="${formatDateTimeLocal(mission.startTime)}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" value="${formatDateTimeLocal(mission.endTime)}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="${mission.payRate}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="${mission.requiredGuards}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="${mission.requiredLevel}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Assign Site Lead (Optional)</label><select name="leadGuardId" class="${inputStyles} bg-white"><option value="">Select a Lead Guard</option>${client.whitelist.map(gId => getUserById(gId)).filter(Boolean).map(g => `<option value="${g.id}" ${mission.leadGuardId === g.id ? 'selected' : ''}>${g.firstName} ${g.lastName}</option>`).join('')}</select></div>
                </div>
                <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Description / Instructions</label><textarea name="description" rows="4" class="${inputStyles}">${mission.description || ''}</textarea></div>
                <div class="flex justify-end items-center gap-4 pt-4 border-t border-[var(--border-tertiary)]">
                    <button type="button" data-action="close-modal" class="px-6 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                    <button type="submit" class="inline-flex items-center px-6 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-[var(--accent-secondary)] hover:bg-[var(--accent-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">${Icons.Pencil({ className: "w-5 h-5 mr-2" })} Save Changes</button>
                </div>
            </form>
        </div>
    </div>
    `;
};