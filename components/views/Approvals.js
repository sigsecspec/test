
import * as db from '../../database.js';

export const Approvals = ({ user }) => {
    const approvals = db.getApprovals();

    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Approval Queue</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <p class="font-bold text-[var(--text-primary)]">${appr.subject}</p>
                            <p class="text-sm text-[var(--text-secondary)]">${appr.details}</p>
                        </div>
                        <div class="space-x-2">
                            <button class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                            <button class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)]">No items currently require approval.</p>`}
            </div>
        </div>
    `;
};