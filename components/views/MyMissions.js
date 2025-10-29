
import { UserRole } from '../../types.js';
import * as db from '../../database.js';

const MissionCard = ({ mission, user }) => {
    const isGuard = user.role !== UserRole.Client;
    const hasCheckedIn = mission.checkIns?.some(c => c.guardId === user.id);
    const hasCheckedOut = mission.checkOuts?.some(c => c.guardId === user.id);

    let actions = '';
    if (isGuard && mission.status === 'Active') {
        if (!hasCheckedIn) {
            actions = `<button data-action="check-in" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-green-500 text-white hover:bg-green-600">Check In</button>`;
        } else if (!hasCheckedOut) {
            actions = `<button data-action="check-out" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-red-500 text-white hover:bg-red-600">Check Out</button>`;
        }
    } else if (isGuard && mission.status === 'Claimed' && new Date() >= mission.startTime) {
         actions = `<button data-action="check-in" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-green-500 text-white hover:bg-green-600">Check In</button>`;
    }


    return `
        <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-bold text-[var(--text-primary)]">${mission.title}</p>
                    <p class="text-sm text-[var(--text-secondary)]">${mission.startTime.toLocaleString()}</p>
                    <span class="text-xs px-2 py-0.5 rounded-full ${mission.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${mission.status}</span>
                </div>
                <div class="flex-shrink-0">
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
        ` : `
            <p class="text-[var(--text-secondary)] italic">No missions in this category.</p>
        `}
    </div>
`;


export const MyMissions = ({ user }) => {
    const allMissions = db.getMissions();
    let myMissions = [];

    if (user.role === UserRole.Client) {
        const client = db.getClients().find(c => c.userId === user.id);
        if (client) {
            myMissions = allMissions.filter(m => m.clientId === client.id);
        }
    } else {
        myMissions = allMissions.filter(m => m.claimedBy.includes(user.id));
    }

    const now = new Date();
    const categorizedMissions = {
        active: myMissions.filter(m => m.status === 'Active' || (m.startTime <= now && m.endTime > now && (m.status === 'Claimed'))).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        upcoming: myMissions.filter(m => m.startTime > now && (m.status === 'Claimed' || m.status === 'Open')).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        past: myMissions.filter(m => m.endTime <= now || m.status === 'Completed' || m.status === 'Cancelled' || m.status === 'AwaitingReport').sort((a,b) => b.startTime.getTime() - a.startTime.getTime()),
    };

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Missions</h1>
            <div class="space-y-8">
                ${MissionList({ title: "Active Missions", missions: categorizedMissions.active, user })}
                ${MissionList({ title: "Upcoming Missions", missions: categorizedMissions.upcoming, user })}
                ${MissionList({ title: "Past Missions", missions: categorizedMissions.past, user })}
            </div>
        </div>
    `;
};