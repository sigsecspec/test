
import * as db from '../../database.js';
import * as Icons from './Icons.js';

export const ContractModal = ({ user }) => {
    const client = db.getClients().find(c => c.userId === user.id);
    if (!client) return ''; // Should not happen if button is shown correctly

    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";

    return `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-lg p-6 border border-[var(--border-primary)]" onclick="event.stopPropagation()">
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Create New Contract</h2>
            <form id="contract-form" class="space-y-4">
                <input type="hidden" name="clientId" value="${client.id}" />
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Contract Title</label>
                    <input name="title" placeholder="e.g., Downtown Office Security" required class="${inputStyles}" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                        <input name="startDate" type="date" required class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                        <input name="endDate" type="date" required class="${inputStyles}" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Total Budget ($)</label>
                    <input name="totalBudget" type="number" min="0" step="100" placeholder="50000" required class="${inputStyles}" />
                </div>
                 <div class="flex justify-end space-x-3 pt-4">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit for Approval</button>
                </div>
            </form>
        </div>
    </div>
    `;
}