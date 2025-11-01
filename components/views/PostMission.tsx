import { getClients, getSites, getContracts, getTrainingModules, getUserById } from '../../database.js';
import { Icons } from '../Icons.js';

export const PostMission = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return `<div class="text-center p-8 bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-primary)]">Your client profile could not be loaded. Please contact support.</div>`;
    const sites = getSites().filter(s => s.clientId === client.id);
    const contracts = getContracts().filter(c => c.clientId === client.id && c.status === 'Active');
    const trainingModules = getTrainingModules().filter(m => !m.title.includes("Officer") && !m.title.includes("Supervisor") && !m.title.includes("Lead"));
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-tertiary)]";
    return `
        <div class="animate-in max-w-4xl mx-auto" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Post a New Mission</h1>
            <form id="post-mission-form" class="bg-[var(--bg-secondary)] p-8 border border-[var(--border-primary)] rounded-lg shadow-md space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Contract</label><select name="contractId" required class="${inputStyles} bg-white"><option value="">Select a contract</option>${contracts.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Site</label><select name="siteId" required class="${inputStyles} bg-white"><option value="">Select a site</option>${sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Training</label><select name="requiredTrainingId" required class="${inputStyles} bg-white"><option value="">Select Training</option>${trainingModules.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="25" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Assign Site Lead (Optional)</label><select name="leadGuardId" class="${inputStyles} bg-white"><option value="">Select a Lead Guard</option>${client.whitelist.map(gId => getUserById(gId)).filter(Boolean).map(g => `<option value="${g.id}">${g.firstName} ${g.lastName}</option>`).join('')}</select></div>
                </div>
                <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Description / Instructions</label><textarea name="description" rows="4" class="${inputStyles}"></textarea></div>
                <div class="text-right"><button type="submit" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--accent-secondary)] hover:bg-[var(--accent-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">${Icons.PlusCircle({ className: "w-5 h-5 mr-2" })} Post Mission</button></div>
            </form>
        </div>
    `;
};
