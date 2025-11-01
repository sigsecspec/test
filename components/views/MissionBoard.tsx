import { getMissions, getClients, getUserTrainingProgress, getTrainingModules } from '../../database.js';
import { Icons } from '../Icons.js';

export const MissionBoard = ({ user }) => {
    const missions = getMissions(user.teamId);
    const clients = getClients();
    const trainingProgress = getUserTrainingProgress(user.id);
    const allTrainingModules = getTrainingModules();
    const availableMissions = missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));
    
    const MissionCard = ({ mission, user, client }) => {
        const isClaimedByUser = mission.claimedBy.includes(user.id);
        const isFull = mission.claimedBy.length >= mission.requiredGuards;
        const isBlacklisted = client && client.blacklist.includes(user.id);
        const requiredTraining = allTrainingModules.find(tm => tm.id === mission.requiredTrainingId);
        const userTraining = trainingProgress.find(p => p.moduleId === mission.requiredTrainingId);

        let status;
        let buttonText;
        let canClaim = false;

        if (isClaimedByUser) {
            status = 'Claimed By You';
            buttonText = 'Claimed';
        } else if (isFull) {
            status = 'Full';
            buttonText = 'Full';
        } else if (isBlacklisted) {
            status = 'Unavailable';
            buttonText = 'Unavailable';
        } else if (!userTraining) {
            status = 'Training Required';
            buttonText = 'Go to Training';
        } else if (userTraining.status === 'Pending Approval') {
            status = 'Training Pending';
            buttonText = 'Pending';
        } else if (userTraining.status === 'Failed') {
            status = 'Training Failed';
            buttonText = 'Retake';
        } else if (userTraining.status === 'Denied') {
            status = 'Training Denied';
            buttonText = 'Denied';
        } else if (userTraining.status === 'Approved') {
            status = 'Available';
            buttonText = 'Claim Mission';
            canClaim = true;
        } else {
            status = 'Unavailable';
            buttonText = 'Unavailable';
        }
        
        const actionButton = () => {
             if (status === 'Training Required' || status === 'Training Failed') {
                return `<button data-action="navigate" data-type="Training" class="w-full md:w-auto px-4 py-2 text-sm font-bold rounded-md transition-colors bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]">${buttonText}</button>`;
            }
            return `<button data-action="claim-mission" data-id="${mission.id}" ${!canClaim ? 'disabled' : ''} class="w-full md:w-auto px-4 py-2 text-sm font-bold rounded-md transition-colors ${canClaim ? 'bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]' : 'bg-[var(--border-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'}">${buttonText}</button>`;
        }

        return `
            <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[var(--accent-primary)]/50 transition-all duration-200">
                <div>
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${status}</span>
                    </div>
                    <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                    <div class="text-sm text-[var(--text-secondary)] mt-2 space-y-1 bg-[var(--bg-tertiary)] p-3 rounded-md border border-[var(--border-tertiary)]">
                        <p><strong>Pay:</strong> <span class="text-[var(--text-primary)] font-semibold">$${mission.payRate}/hr</span></p>
                        <p><strong>Time:</strong> <span class="text-[var(--text-primary)] font-semibold">${new Date(mission.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span></p>
                        <p><strong>Training:</strong> <span class="text-[var(--text-primary)] font-semibold">${requiredTraining?.title || 'N/A'}</span></p>
                    </div>
                </div>
                <div class="mt-4 flex flex-col md:flex-row justify-between items-center gap-3">
                    <button data-action="open-mission-details" data-id="${mission.id}" class="text-sm font-semibold text-[var(--accent-primary)] hover:underline">View Details</button>
                    ${actionButton()}
                </div>
            </div>
        `;
    };
    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h1 class="text-3xl font-bold text-[var(--text-primary)]">Mission Board</h1>
                <p class="text-[var(--text-secondary)] text-sm md:text-base">Available Missions: ${availableMissions.length}</p>
            </div>
            ${availableMissions.length > 0 ? `
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${availableMissions.map(mission => MissionCard({ mission, user, client: clients.find(c => c.id === mission.clientId) })).join('')}
                </div>
            ` : `
                <div class="text-center py-16 bg-[var(--bg-secondary)] border border-dashed border-[var(--border-secondary)] rounded-lg shadow-sm">
                    ${Icons.ClipboardList({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                    <h2 class="mt-4 text-xl font-semibold text-[var(--text-primary)]">No Missions Available</h2>
                    <p class="mt-1 text-[var(--text-secondary)]">Check back later for new opportunities on your team's board.</p>
                </div>
            `}
        </div>
    `;
};
