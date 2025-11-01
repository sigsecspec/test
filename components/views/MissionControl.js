
import { getMissions, getClients, getUserById } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles, executiveRoles, canApproveMissions } from '../../constants.js';
import { Icons } from '../Icons.js';

export const MissionControl = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const allClients = getClients();
    const missions = getMissions().filter(m => {
        if (!teamId) return true;
        const client = allClients.find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    }).sort((a,b) => (a.status === 'Pending Approval' ? -1 : 1) - (b.status === 'Pending Approval' ? -1 : 1) || b.startTime.getTime() - a.startTime.getTime());

    const statusPill = (status) => {
        let className = '';
        switch (status) {
            case 'Open': className = 'status-green'; break;
            case 'Claimed': className = 'status-blue'; break;
            case 'Active': className = 'status-yellow'; break;
            case 'Completed': className = 'status-purple'; break;
            case 'Cancelled': className = 'status-red'; break;
            case 'Pending Approval': className = 'status-yellow'; break;
            default: className = 'status-gray';
        }
        return `<span class="status-pill ${className}">${status.replace(' Approval', '')}</span>`;
    };

    const renderTable = () => `
        <table class="min-w-full leading-normal hidden md:table">
            <thead>
                <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                    <th class="px-5 py-3 font-semibold">Mission</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Date</th>
                    <th class="px-5 py-3 font-semibold text-center">Guards</th>
                    <th class="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${missions.map((mission, i) => {
                    const client = allClients.find(c => c.id === mission.clientId);
                    const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                    const isOwner = executiveRoles.includes(user.role);
                    return `
                     <tr class="border-b border-[var(--color-border)] animate-in ${mission.status === 'Cancelled' ? 'opacity-50' : ''}" style="animation-delay: ${i*30}ms; opacity: 0;">
                        <td class="px-5 py-4 text-sm">
                            <p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)] whitespace-no-wrap">${client?.companyName || 'N/A'}</p>
                        </td>
                        <td class="px-5 py-4 text-sm">${statusPill(mission.status)}</td>
                        <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${new Date(mission.startTime).toLocaleDateString()}</td>
                        <td class="px-5 py-4 text-sm text-center text-[var(--color-text-muted)]">${mission.claimedBy.length} / ${mission.requiredGuards}</td>
                        <td class="px-5 py-4 text-sm text-right whitespace-nowrap space-x-2">
                           ${mission.status === 'Pending Approval' && canApproveMissions.includes(user.role) ? `
                                <button data-action="approve-mission" data-id="${mission.id}" class="font-semibold text-green-500 hover:text-green-400 transition-colors">Approve</button>
                                <button data-action="deny-mission" data-id="${mission.id}" class="font-semibold text-red-500 hover:text-red-400 transition-colors">Deny</button>
                           ` : `
                            <button data-action="open-mission-details" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Details</button>
                            ${mission.status !== 'Completed' && mission.status !== 'Cancelled' && canManage ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">Edit</button>
                                <button data-action="cancel-mission" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-red-500 transition-colors">Cancel</button>
                            ` : ''}
                            ${isOwner ? `<button data-action="delete-mission-permanently" data-id="${mission.id}" class="font-semibold text-red-700 hover:text-red-500 transition-colors">Delete</button>` : ''}
                           `}
                        </td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;

    const renderMobileCards = () => `
        <div class="md:hidden space-y-4 p-4">
            ${missions.map((mission, i) => {
                const client = allClients.find(c => c.id === mission.clientId);
                const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                const isOwner = executiveRoles.includes(user.role);
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] animate-in ${mission.status === 'Cancelled' ? 'opacity-50' : ''}" style="animation-delay: ${i*30}ms; opacity: 0;">
                     <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)]">${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                        </div>
                        ${statusPill(mission.status)}
                    </div>
                    <div class="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <div class="flex justify-between items-center">
                             <div class="text-sm">
                                <p class="text-[var(--color-text-muted)]">Guards: <span class="font-semibold text-[var(--color-text-base)]">${mission.claimedBy.length}/${mission.requiredGuards}</span></p>
                                <p class="text-[var(--color-text-muted)]">${new Date(mission.startTime).toLocaleString([], {month:'short', day:'numeric', hour:'numeric', minute:'2-digit'})}</p>
                            </div>
                            <div class="whitespace-nowrap space-x-2">
                                <button data-action="open-mission-details" data-id="${mission.id}" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-border)] text-[var(--color-text-base)]">Details</button>
                            </div>
                        </div>
                        ${mission.status === 'Pending Approval' && canApproveMissions.includes(user.role) ? `
                         <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex gap-2">
                            <button data-action="approve-mission" data-id="${mission.id}" class="w-full text-center px-3 py-1.5 rounded-md text-xs font-semibold bg-green-500/20 text-green-400">Approve</button>
                            <button data-action="deny-mission" data-id="${mission.id}" class="w-full text-center px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500/20 text-red-400">Deny</button>
                         </div>
                        ` : `
                        ${(canManage && mission.status !== 'Completed' && mission.status !== 'Cancelled') || isOwner ? `
                        <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-end gap-2">
                            ${canManage && mission.status !== 'Completed' && mission.status !== 'Cancelled' ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]">${Icons.Pencil({className:"w-4 h-4"})}</button>
                                <button data-action="cancel-mission" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-yellow-500/20 text-yellow-400">${Icons.X({className:"w-4 h-4"})}</button>
                            `: ''}
                            ${isOwner ? `<button data-action="delete-mission-permanently" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-red-500/20 text-red-400">Delete</button>` : ''}
                        </div>
                        `: ''}
                        `}
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Mission Control</h1>
                 <button data-action="navigate" data-type="PostMission" class="px-4 py-2 flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                     ${Icons.PlusCircle({className: "w-5 h-5"})}
                     Create Mission
                 </button>
            </div>
            <div class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable()}
                ${renderMobileCards()}
            </div>
        </div>
    `;
};
