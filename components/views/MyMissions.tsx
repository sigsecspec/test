import { getMissions, getClients } from '../../database.js';
import { clientRole } from '../../constants.js';

export const MyMissions = ({ user }) => {
    const allMissions = getMissions();
    let myMissions = [];
    if (user.role === 'Client') {
        const client = getClients().find(c => c.userId === user.id);
        if (client) myMissions = allMissions.filter(m => m.clientId === client.id);
    } else {
        myMissions = allMissions.filter(m => m.claimedBy.includes(user.id));
    }
    const now = new Date();
    const categorizedMissions = {
        // FIX: Use .getTime() for date subtraction to satisfy TypeScript's type checker for arithmetic operations.
        active: myMissions.filter(m => m.status === 'Active').sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        upcoming: myMissions.filter(m => m.startTime > now && (m.status === 'Claimed' || m.status === 'Open')).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        past: myMissions.filter(m => m.endTime <= now || m.status === 'Completed' || m.status === 'Cancelled').sort((a,b) => b.startTime.getTime() - a.startTime.getTime()),
    };
    const MissionCard = ({ mission, user }) => {
        const isGuard = !clientRole.includes(user.role);
        let actions = '';
        const canStartMission = new Date() >= new Date(mission.startTime);

        if (isGuard) {
             if(mission.status === 'Active') {
                actions = `<button data-action="view-mission-dashboard" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-blue-500 text-white hover:bg-blue-600">Open Dashboard</button>`;
            } else if (canStartMission && mission.status !== 'Completed' && mission.status !== 'Cancelled') {
                actions = `<button data-action="start-mission" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-green-500 text-white hover:bg-green-600">Start Mission</button>`;
            }
        }
        return `
            <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div class="flex-grow">
                        <p class="font-bold text-[var(--text-primary)]">${mission.title}</p>
                        <p class="text-sm text-[var(--text-secondary)]">${new Date(mission.startTime).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'})}</p>
                        <span class="text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${mission.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${mission.status}</span>
                    </div>
                    <div class="flex-shrink-0 flex items-center gap-2">
                        <button data-action="open-mission-details" data-id="${mission.id}" class="text-sm font-semibold text-[var(--accent-primary)] hover:underline">Details</button>
                        ${actions}
                    </div>
                </div>
            </div>
        `;
    };
    const MissionList = ({ title, missions, user }) => `
        <div>
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-3">${title}</h2>
            ${missions.length > 0 ? `
                <div class="space-y-3">
                    ${missions.map(mission => MissionCard({ mission, user })).join('')}
                </div>
            ` : `<p class="text-[var(--text-secondary)] italic p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-tertiary)]">No missions in this category.</p>`}
        </div>
    `;
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Missions</h1>
            <div class="space-y-8">
                ${MissionList({ title: "Active Missions", missions: categorizedMissions.active, user })}
                ${MissionList({ title: "Upcoming Missions", missions: categorizedMissions.upcoming, user })}
                ${MissionList({ title: "Past Missions", missions: categorizedMissions.past, user })}
            </div>
        </div>
    `;
};
