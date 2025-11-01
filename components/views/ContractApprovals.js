
import { getContracts, getClients } from '../../database.js';
import { canAlwaysApproveRoles } from '../../constants.js';

export const ContractApprovals = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const contracts = getContracts().filter(c => c.status !== 'Active');
    const clients = getClients();

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.companyName : 'Unknown Client';
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Contract Approvals</h1>
            <div class="space-y-4">
                ${contracts.length > 0 ? contracts.map(contract => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Client: ${getClientName(contract.clientId)}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Status: <span class="font-semibold">${contract.status}</span></p>
                            </div>
                            <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                ${contract.status === 'Ready for Review' ? `
                                    <button data-action="approve-contract" data-id="${contract.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                                    <button data-action="deny-contract" data-id="${contract.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                                ` : ''}
                                ${contract.status === 'Pending' ? `
                                    <button data-action="review-contract" data-id="${contract.id}" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">Mark as Reviewed</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)] p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-primary)]">No contracts require approval.</p>`}
            </div>
        </div>
    `;
};
