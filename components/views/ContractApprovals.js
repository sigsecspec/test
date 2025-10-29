
import * as db from '../../database.js';

export const ContractApprovals = ({ user }) => {
    const pendingContracts = db.getContracts().filter(c => c.status === 'Pending');
    
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Pending Contract Approvals</h1>
            <div class="space-y-4">
                ${pendingContracts.length > 0 ? pendingContracts.map(contract => `
                     <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Budget: $${contract.totalBudget.toLocaleString()}</p>
                            </div>
                            <div class="space-x-2">
                                <button data-action="approve-contract" data-id="${contract.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                                <button data-action="deny-contract" data-id="${contract.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)]">No contracts are pending approval.</p>`}
            </div>
        </div>
    `;
};
