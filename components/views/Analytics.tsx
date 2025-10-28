import React from 'react';
import { User, Mission, Client, UserRole } from '../../types.ts';
import { UsersIcon, BriefcaseIcon, ClipboardListIcon, CheckCircleIcon } from '../Icons.tsx';

interface AnalyticsProps {
    users: User[];
    missions: Mission[];
    clients: Client[];
}

const StatCard: React.FC<{ title: string; value: number | string; icon: React.FC<any> }> = ({ title, value, icon: Icon }) => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-5 flex items-center shadow-sm">
        <div className="p-3 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mr-4">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        </div>
    </div>
);

const Analytics: React.FC<AnalyticsProps> = ({ users, missions, clients }) => {
    const totalGuards = users.filter(u => u.role !== UserRole.Client).length;
    const totalClients = clients.length;
    const openMissions = missions.filter(m => m.status === 'Open').length;
    const claimedMissions = missions.filter(m => m.status === 'Claimed').length;

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">System Analytics</h2>
            <p className="text-[var(--text-secondary)] mb-6">A real-time snapshot of company operations.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Personnel" value={totalGuards} icon={UsersIcon} />
                <StatCard title="Active Clients" value={totalClients} icon={BriefcaseIcon} />
                <StatCard title="Open Missions" value={openMissions} icon={ClipboardListIcon} />
                <StatCard title="Claimed Missions" value={claimedMissions} icon={CheckCircleIcon} />
            </div>
        </div>
    );
};

export default Analytics;