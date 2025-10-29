
import * as db from '../../database.js';
import * as Icons from '../Icons.js';

const MissionCard = ({ mission, user, client }) => {
    const isClaimedByUser = mission.claimedBy.includes(user.id);
    const isFull = mission.claimedBy.length >= mission.requiredGuards;
    const canClaim = !isClaimedByUser && !isFull && client && !client.blacklist.includes(user.id);
    const isBlacklisted = client && client.blacklist.includes(user.id);

    let buttonText = "Claim Mission";
    if (isClaimedByUser) buttonText = "Claimed";
    else if (isFull) buttonText = "Full";
    else if (isBlacklisted) buttonText = "Unavailable";


    return `
        <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
            <div>
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${mission.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${mission.status}</span>
                </div>
                <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                <div class="text-sm text-[var(--text-secondary)] mt-2 space-y-1">
                    <p><strong>Pay:</strong> <span class="text-[var(--text-primary)]">$${mission.payRate}/hr</span></p>
                    <p><strong>Time:</strong> <span class="text-[var(--text-primary)]">${mission.startTime.toLocaleString()} - ${mission.endTime.toLocaleString()}</span></p>
                    <p><strong>Required Level:</strong> <span class="text-[var(--text-primary)]">${mission.requiredLevel}+</span></p>
                </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <p class="text-sm font-medium text-[var(--text-primary)]">${mission.claimedBy.length} / ${mission.requiredGuards} Guards</p>
                <button 
                    data-action="claim-mission"
                    data-id="${mission.id}"
                    ${!canClaim ? 'disabled' : ''}
                    class="px-4 py-2 text-sm font-bold rounded-md transition-colors ${canClaim ? 'bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]' : 'bg-[var(--border-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'}"
                >
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
};

export const MissionBoard = ({ user }) => {
    const missions = db.getMissions();
    const clients = db.getClients();
    const availableMissions = missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-[var(--text-primary)]">Mission Board</h1>
                <p class="text-[var(--text-secondary)]">Available Missions: ${availableMissions.length}</p>
            </div>
            
            ${availableMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${availableMissions.map(mission => MissionCard({
                        mission,
                        user,
                        client: clients.find(c => c.id === mission.clientId),
                    })).join('')}
                </div>
            ` : `
                <div class="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-sm">
                    ${Icons.ClipboardList({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                    <h2 class="mt-4 text-xl font-semibold text-[var(--text-primary)]">No Missions Available</h2>
                    <p class="mt-1 text-[var(--text-secondary)]">Check back later for new opportunities.</p>
                </div>
            `}
        </div>
    `;
};