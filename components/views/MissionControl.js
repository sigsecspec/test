
import * as db from '../../database.js';

export const MissionControl = ({ user }) => {
    const missions = db.getMissions();
    
    const statusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-800';
            case 'Claimed': return 'bg-blue-100 text-blue-800';
            case 'Active': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
        }
    };

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Mission Control</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-x-auto border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead>
                         <tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm">
                            <th class="px-5 py-3 font-semibold">Title</th>
                            <th class="px-5 py-3 font-semibold">Status</th>
                            <th class="px-5 py-3 font-semibold">Time</th>
                            <th class="px-5 py-3 font-semibold">Guards</th>
                            <th class="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${missions.map(mission => `
                             <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap">${mission.title}</p></td>
                                <td class="px-5 py-4 text-sm">
                                    <span class="px-2 py-1 font-semibold rounded-full text-xs ${statusColor(mission.status)}">${mission.status}</span>
                                </td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${mission.startTime.toLocaleDateString()}</td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${mission.claimedBy.length}/${mission.requiredGuards}</td>
                                <td class="px-5 py-4 text-sm">
                                    <button class="text-[var(--accent-primary)] hover:underline font-semibold">Details</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
