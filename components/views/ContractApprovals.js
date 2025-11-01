
import { getContracts, getClients } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles } from '../../constants.js';

export const ContractApprovals = ({ user }) => {
    const clients = getClients();
    
    const canApprove = canAlwaysApproveRoles.includes(user.role);
    const canReview = managementAndOpsRoles.includes(user.role);

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
                    <button data-action="approve-contract" data-id="${contract.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                    <button data-action="deny-contract" data-id="${contract.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button>
                `;
            }
        } else if (canReview && contract.status === 'Pending') {
            // Mgmt/Ops can only review 'Pending' contracts
            buttons = `<button data-action="review-contract" data-id="${contract.id}" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600">Mark as Reviewed</button>`;
        }
        return buttons;
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Contract Approvals</h1>
            <div class="space-y-4">
                ${contracts.length > 0 ? contracts.map(contract => {
                    const statusColor = contract.status === 'Ready for Review' ? 'text-blue-600' : 'text-yellow-600';
                    return `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Client: ${getClientName(contract.clientId)}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Status: <span class="font-semibold ${statusColor}">${contract.status}</span></p>
                                <p class="text-xs text-[var(--text-secondary)] mt-1">Submitted: ${new Date(contract.startDate).toLocaleDateString()}</p>
                            </div>
                            <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                ${renderButtons(contract)}
                            </div>
                        </div>
                    </div>
                `}).join('') : `<p class="text-[var(--text-secondary)] p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-primary)]">No contracts require approval at this time.</p>`}
            </div>
        </div>
    `;
};
