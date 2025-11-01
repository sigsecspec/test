

import { Icons } from '../Icons.js';
import { adminRoles, executiveRoles, managementRoles, fieldRoles, clientRole } from '../../constants.js';
import { getApplications, getMissions, getPendingTrainingApprovals, getPendingSiteApprovals, getContracts, getAlerts, getUserTrainingProgress, getClients } from '../../database.js';

export const DashboardView = ({ user }) => {
    const isAdmin = [...adminRoles, ...executiveRoles, ...managementRoles].includes(user.role);
    const isGuard = fieldRoles.includes(user.role);
    const isClient = clientRole.includes(user.role);

    const StatCard = ({ title, value, icon, color }) => `
        <div class="bg-white p-4 rounded-lg shadow border border-[var(--border-primary)] flex items-center">
            <div class="p-3 rounded-full ${color.bg} ${color.text} mr-4">${icon({ className: "w-6 h-6" })}</div>
            <div>
                <p class="text-sm text-[var(--text-secondary)]">${title}</p>
                <p class="text-2xl font-bold text-[var(--text-primary)]">${value}</p>
            </div>
        </div>
    `;

    const AdminDashboard = () => {
        const pendingApps = getApplications().length;
        const activeMissions = getMissions().filter(m => m.status === 'Active').length;
        const pendingApprovals = getPendingTrainingApprovals().length + getPendingSiteApprovals().length + getContracts().filter(c => c.status === 'Pending').length;
        const alerts = getAlerts().filter(a => a.severity === 'High').length;
        
        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${StatCard({ title: "Pending Applications", value: pendingApps, icon: Icons.DocumentText, color: { bg: 'bg-blue-100', text: 'text-blue-600' } })}
                ${StatCard({ title: "Active Missions", value: activeMissions, icon: Icons.Flag, color: { bg: 'bg-yellow-100', text: 'text-yellow-600' } })}
                ${StatCard({ title: "Pending Approvals", value: pendingApprovals, icon: Icons.CheckCircle, color: { bg: 'bg-purple-100', text: 'text-purple-600' } })}
                ${StatCard({ title: "High-Priority Alerts", value: alerts, icon: Icons.Bell, color: { bg: 'bg-red-100', text: 'text-red-600' } })}
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow border border-[var(--border-primary)]">
                    <h2 class="font-bold text-lg mb-2">Actionable Items</h2>
                     <p class="text-sm text-[var(--text-secondary)]">A feed of approvals, new missions, and other tasks would appear here.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow border border-[var(--border-primary)]">
                     <h2 class="font-bold text-lg mb-2">Recent Alerts</h2>
                     <p class="text-sm text-[var(--text-secondary)]">A list of the latest system alerts.</p>
                </div>
            </div>
        `;
    };

    const GuardDashboard = () => {
        const upcomingMissions = getMissions().filter(m => m.claimedBy.includes(user.id) && new Date(m.startTime) > new Date()).length;
        const trainingProgress = getUserTrainingProgress(user.id);
        const pendingTraining = trainingProgress.filter(p => p.status === 'Pending Approval').length;
        const failedTraining = trainingProgress.filter(p => p.status === 'Failed').length;

        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${StatCard({ title: "Upcoming Missions", value: upcomingMissions, icon: Icons.Calendar, color: { bg: 'bg-blue-100', text: 'text-blue-600' } })}
                ${StatCard({ title: "Performance Rating", value: user.performanceRating.toFixed(2), icon: Icons.Trophy, color: { bg: 'bg-green-100', text: 'text-green-600' } })}
                ${StatCard({ title: "Approvals Pending", value: pendingTraining, icon: Icons.CheckCircle, color: { bg: 'bg-yellow-100', text: 'text-yellow-600' } })}
                ${StatCard({ title: "Failed Trainings", value: failedTraining, icon: Icons.AcademicCap, color: { bg: 'bg-red-100', text: 'text-red-600' } })}
            </div>
             <div class="bg-white p-4 rounded-lg shadow border border-[var(--border-primary)]">
                <h2 class="font-bold text-lg mb-2">Your Next Mission</h2>
                <p class="text-sm text-[var(--text-secondary)]">Details about your next scheduled mission would appear here.</p>
            </div>
        `;
    };

    const ClientDashboard = () => {
        const client = getClients().find(c => c.userId === user.id);
        const activeMissions = client ? getMissions().filter(m => m.clientId === client.id && m.status === 'Active').length : 0;
        const openMissions = client ? getMissions().filter(m => m.clientId === client.id && m.status === 'Open').length : 0;
        const activeContracts = client ? getContracts().filter(c => c.clientId === client.id && c.status === 'Active').length : 0;
        
        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${StatCard({ title: "Active Missions", value: activeMissions, icon: Icons.Flag, color: { bg: 'bg-yellow-100', text: 'text-yellow-600' } })}
                ${StatCard({ title: "Open Missions", value: openMissions, icon: Icons.ClipboardList, color: { bg: 'bg-blue-100', text: 'text-blue-600' } })}
                ${StatCard({ title: "Active Contracts", value: activeContracts, icon: Icons.DocumentDuplicate, color: { bg: 'bg-green-100', text: 'text-green-600' } })}
                <button data-action="navigate" data-type="PostMission" class="bg-[var(--accent-secondary)] text-white rounded-lg shadow hover:bg-[var(--accent-secondary-hover)] flex items-center justify-center p-4">
                    ${Icons.PlusCircle({className:"w-8 h-8 mr-3"})}
                    <span class="text-xl font-bold">Post Mission</span>
                </button>
            </div>
             <div class="bg-white p-4 rounded-lg shadow border border-[var(--border-primary)]">
                <h2 class="font-bold text-lg mb-2">Contract Overview</h2>
                <p class="text-sm text-[var(--text-secondary)]">A summary of your current contract budget and usage would be displayed here.</p>
            </div>
        `;
    };

    let content = '';
    if (isAdmin) content = AdminDashboard();
    else if (isGuard) content = GuardDashboard();
    else if (isClient) content = ClientDashboard();
    
    return `
        <div class="animate-in">
             <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome back, ${user.firstName}!</h1>
             <p class="text-[var(--text-secondary)] mb-6">This is your central command. Here's a snapshot of your current operations.</p>
             ${content}
        </div>
    `;
};