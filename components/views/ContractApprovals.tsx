

import { getContracts, getClients } from '../../database.js';
// FIX: Import 'managementRoles' to resolve 'Cannot find name' error.
import { canAlwaysApproveRoles, managementAndOpsRoles, operationsRoles, executiveRoles, managementRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const ContractApprovals = ({ user }) => {
    const clients = getClients();
    
    const canApprove = canAlwaysApproveRoles.includes(user.role);
    const canReview = managementAndOpsRoles.includes(user.role);
    const canCreate = executiveRoles.includes(user.role);

    // Filter which contracts are visible and actionable for the current user
    const contracts = getContracts().filter((c) => {
        if (c.status === 'Active' || c.status === 'Denied') return false; // Ignore completed contracts
        
        // Find the client to check teamId
        const client = clients.find(cl => cl.id === c.clientId);
        const isOnTeam = client && client.teamId === user.teamId;

        if (canApprove) return true; // Owner/Co-Owner sees all 'Pending' and 'Ready for Review'
        if (canReview && c.status === 'Pending' && isOnTeam) return true; // Mgmt/Ops only sees 'Pending' for their team
        
        return false;
    });

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };

    const renderButtons = (contract) => {
        let buttons = '';
        if (canApprove) {
            // Owner/Co-Owner can approve or deny any non-active contract
             if (contract.status === 'Pending' || contract.status === 'Ready for Review') {
                buttons = `
                    <button data-action="approve-contract" data-id="${contract.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button>
                    <button data-action="deny-contract" data-id="${contract.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Deny</button>
                `;
            }
        } else if (canReview && contract.status === 'Pending') {
            // Mgmt/Ops can only review 'Pending' contracts
            buttons = `<button data-action="review-contract" data-id="${contract.id}" class="px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-secondary-hover)]">Mark as Reviewed</button>`;
        }
        return buttons;
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Contract Approvals</h1>
                 ${canCreate ? `
                <button data-action="open-admin-contract-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                    ${Icons.PlusCircle({className: "w-5 h-5"})} Create Contract
                </button>
                ` : ''}
            </div>
            <div class="space-y-4">
                ${contracts.length > 0 ? contracts.map(contract => {
                    const statusColor = contract.status === 'Ready for Review' ? 'text-blue-400' : 'text-yellow-400';
                    return `
                    <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-lg text-[var(--color-text-base)]">${contract.title}</p>
                                <p class="text-sm text-[var(--color-text-muted)]">Client: ${getClientName(contract.clientId)}</p>
                                <p class="text-sm text-[var(--color-text-muted)]">Status: <span class="font-semibold ${statusColor}">${contract.status}</span></p>
                                <p class="text-xs text-[var(--color-text-muted)] mt-1">Submitted: ${new Date(contract.startDate).toLocaleDateString()}</p>
                            </div>
                            <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                ${renderButtons(contract)}
                            </div>
                        </div>
                    </div>
                `}).join('') : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No contracts require approval at this time.</p>`}
            </div>
        </div>
    `;
};