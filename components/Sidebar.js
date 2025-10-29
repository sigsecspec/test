
import { UserRole } from '../types.js';
import * as Icons from './Icons.js';
import * as ROLES from '../constants.js';

const sidebarStructure = [
    {
        title: 'Main',
        roles: [...ROLES.allInternalRoles, ...ROLES.clientRole],
        items: [
            { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard', roles: [...ROLES.allInternalRoles, ...ROLES.clientRole] },
            { name: 'My Profile', icon: Icons.User, view: 'MyProfile', roles: [...ROLES.allInternalRoles, ...ROLES.clientRole] },
        ]
    },
    {
        title: 'Guard Portal',
        roles: ROLES.fieldRoles,
        items: [
            { name: 'Mission Board', icon: Icons.ClipboardList, view: 'MissionBoard', roles: ROLES.fieldRoles },
            { name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions', roles: ROLES.fieldRoles },
            { name: 'Training', icon: Icons.AcademicCap, view: 'Training', roles: ROLES.fieldRoles },
            { name: 'Earnings', icon: Icons.CreditCard, view: 'Earnings', roles: ROLES.fieldRoles },
            { name: 'Hall of Fame', icon: Icons.Trophy, view: 'HallOfFame', roles: ROLES.fieldRoles },
            { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: ROLES.fieldRoles },
        ]
    },
    {
        title: 'Client Portal',
        roles: ROLES.clientRole,
        items: [
            { name: 'Post Mission', icon: Icons.PlusCircle, view: 'PostMission', roles: ROLES.clientRole },
            { name: 'Active Missions', icon: Icons.Calendar, view: 'MyMissions', roles: ROLES.clientRole },
            { name: 'My Sites', icon: Icons.LocationMarker, view: 'MySites', roles: ROLES.clientRole },
            { name: 'My Contracts', icon: Icons.DocumentDuplicate, view: 'MyContracts', roles: ROLES.clientRole },
            { name: 'Billing', icon: Icons.CreditCard, view: 'Billing', roles: ROLES.clientRole },
            { name: 'Guard Roster', icon: Icons.Users, view: 'ClientGuardRoster', roles: ROLES.clientRole },
        ]
    },
    {
        title: 'Field Leadership',
        roles: ROLES.fieldLeadershipRoles,
        items: [
            { name: 'Field Oversight', icon: Icons.Eye, view: 'FieldOversight', roles: [UserRole.Supervisor] },
            { name: 'Training Approvals', icon: Icons.CheckCircle, view: 'TrainingApprovals', roles: [UserRole.Supervisor] },
            { name: 'Training Management', icon: Icons.AcademicCap, view: 'TrainingManagement', roles: [UserRole.TrainingOfficer] },
        ]
    },
    {
        title: 'Operations',
        roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles],
        items: [
            { name: 'Mission Control', icon: Icons.Map, view: 'MissionControl', roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles] },
            { name: 'Active Missions', icon: Icons.Flag, view: 'ActiveMissions', roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles] },
            { name: 'Guard Management', icon: Icons.Users, view: 'GuardManagement', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...ROLES.executiveRoles] },
            { name: 'Client Management', icon: Icons.Briefcase, view: 'ClientManagement', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Secretary, ...ROLES.executiveRoles] },
            { name: 'Site Roster', icon: Icons.LocationMarker, view: 'SiteRoster', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...ROLES.executiveRoles] },
            { name: 'Communications', icon: Icons.Mail, view: 'Communications', roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles] },
            { name: 'Alerts', icon: Icons.Bell, view: 'Alerts', roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles] },
            { name: 'Vehicle Management', icon: Icons.Truck, view: 'VehicleManagement', roles: [UserRole.OperationsManager, UserRole.Dispatch, ...ROLES.executiveRoles] },
        ]
    },
    {
        title: 'Administration',
        roles: [...ROLES.operationsRoles, ...ROLES.executiveRoles],
        items: [
            { name: 'Applications', icon: Icons.DocumentText, view: 'Applications', roles: [UserRole.OperationsManager, UserRole.Secretary, ...ROLES.executiveRoles] },
            { name: 'Approvals', icon: Icons.CheckCircle, view: 'Approvals', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...ROLES.executiveRoles] },
            { name: 'Contract Approvals', icon: Icons.DocumentDuplicate, view: 'ContractApprovals', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...ROLES.executiveRoles] },
            { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: [UserRole.OperationsDirector, ...ROLES.executiveRoles] },
            { name: 'Appeals', icon: Icons.Flag, view: 'Appeals', roles: [UserRole.OperationsDirector, ...ROLES.executiveRoles] },
        ]
    },
    {
        title: 'Executive',
        roles: ROLES.executiveRoles,
        items: [
            { name: 'Payroll', icon: Icons.CreditCard, view: 'Payroll', roles: [UserRole.OperationsDirector, ...ROLES.executiveRoles] },
            { name: 'Analytics', icon: Icons.ChartBar, view: 'Analytics', roles: [UserRole.OperationsDirector, ...ROLES.executiveRoles] },
            { name: 'Live Control', icon: Icons.Shield, view: 'LiveControl', roles: ROLES.executiveRoles },
            { name: 'System Settings', icon: Icons.Cog, view: 'SystemSettings', roles: [UserRole.Owner, UserRole.CoOwner] },
        ]
    },
];

export const Sidebar = ({ currentUser, activeView }) => {
    return `
        <div class="flex flex-col w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] h-full overflow-y-auto">
            <div class="flex items-center justify-center h-16 border-b border-[var(--border-primary)] flex-shrink-0 px-4">
                <div class="text-center">
                    <p class="font-bold text-md text-[var(--text-primary)]">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs text-[var(--text-secondary)]">${currentUser.role} - ${currentUser.rank}</p>
                </div>
            </div>
            <nav class="flex-1 py-4">
                ${sidebarStructure.map((group) => {
                    if (!group.roles.includes(currentUser.role)) return '';

                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                    if (accessibleItems.length === 0) return '';
                    
                    return `
                        <div>
                            <h3 class="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const activeClasses = 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-r-4 border-[var(--accent-primary)] font-bold';
                                    const inactiveClasses = 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]';
                                    return `
                                        <li>
                                            <a href="#" data-action="navigate" data-type="${item.view}" class="flex items-center px-4 py-3 text-sm font-medium transition-colors ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-6 h-6 mr-3 flex-shrink-0' })}
                                                <span>${item.name}</span>
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
            </nav>
        </div>
    `;
};
