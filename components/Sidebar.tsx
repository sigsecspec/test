import { Icons } from './Icons.js';
import { UserRole } from '../types.js';
import { allInternalRoles, clientRole, fieldRoles, operationsRoles, executiveRoles, managementRoles } from '../constants.js';

interface NavItem {
    name: string;
    icon: ({ className }: { className?: string; }) => string;
    view: string;
    roles: string[];
}

interface NavGroup {
    title: string;
    roles: string[];
    items: NavItem[];
}

const getSidebarStructure = (currentUser: any): NavGroup[] => [
    {
        title: 'Main',
        roles: [...allInternalRoles, ...clientRole],
        items: [
            { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard', roles: [...allInternalRoles, ...clientRole] },
            { name: 'My Profile', icon: Icons.User, view: 'MyProfile', roles: [...allInternalRoles, ...clientRole] },
        ]
    },
    {
        title: 'Guard Portal',
        roles: fieldRoles,
        items: [
            { name: 'Mission Board', icon: Icons.ClipboardList, view: 'MissionBoard', roles: fieldRoles },
            { name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions', roles: fieldRoles },
            { name: 'Training', icon: Icons.AcademicCap, view: 'Training', roles: fieldRoles },
            { name: 'Earnings', icon: Icons.CreditCard, view: 'Earnings', roles: fieldRoles },
            { name: 'Hall of Fame', icon: Icons.Trophy, view: 'HallOfFame', roles: fieldRoles },
            { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: fieldRoles },
        ]
    },
    {
        title: 'Client Portal',
        roles: clientRole,
        items: [
            { name: 'Post Mission', icon: Icons.PlusCircle, view: 'PostMission', roles: clientRole },
            { name: 'Active Missions', icon: Icons.Calendar, view: 'MyMissions', roles: clientRole },
            { name: 'My Sites', icon: Icons.LocationMarker, view: 'MySites', roles: clientRole },
            { name: 'My Contracts', icon: Icons.DocumentDuplicate, view: 'MyContracts', roles: clientRole },
            { name: 'Billing', icon: Icons.CreditCard, view: 'Billing', roles: clientRole },
            { name: 'Guard Roster', icon: Icons.Users, view: 'ClientGuardRoster', roles: clientRole },
        ]
    },
    {
        title: 'Field Leadership',
        roles: [UserRole.Supervisor, UserRole.TrainingOfficer],
        items: [
            { name: 'Field Oversight', icon: Icons.Eye, view: 'FieldOversight', roles: [UserRole.Supervisor] },
            { name: 'Training Management', icon: Icons.AcademicCap, view: 'TrainingManagement', roles: [UserRole.Supervisor, UserRole.TrainingOfficer] },
        ]
    },
    {
        title: 'Operations',
        roles: [...operationsRoles, ...executiveRoles, ...managementRoles],
        items: [
            { name: 'Mission Control', icon: Icons.Map, view: 'MissionControl', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Active Missions', icon: Icons.Flag, view: 'ActiveMissions', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Guard Management', icon: Icons.Users, view: 'GuardManagement', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Client Management', icon: Icons.Briefcase, view: 'ClientManagement', roles: [...operationsRoles, ...managementRoles, ...executiveRoles] },
            { name: 'Site Roster', icon: Icons.LocationMarker, view: 'SiteRoster', roles: [...operationsRoles, ...executiveRoles] },
            { name: 'Communications', icon: Icons.Mail, view: 'Communications', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Alerts', icon: Icons.Bell, view: 'Alerts', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Vehicle Management', icon: Icons.Truck, view: 'VehicleManagement', roles: [...operationsRoles, UserRole.Dispatch, ...executiveRoles] },
        ]
    },
    {
        title: 'Administration',
        roles: [...operationsRoles, ...executiveRoles, ...managementRoles],
        items: [
            { name: 'Applications', icon: Icons.DocumentText, view: 'Applications', roles: [...operationsRoles, UserRole.Secretary, ...executiveRoles] },
            { name: 'Contract Approvals', icon: Icons.DocumentDuplicate, view: 'ContractApprovals', roles: [...operationsRoles, ...managementRoles, ...executiveRoles] },
            { name: 'Site Approvals', icon: Icons.CheckCircle, view: 'SiteApprovals', roles: [...operationsRoles, ...executiveRoles] },
            { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: [...operationsRoles, ...executiveRoles] },
            { name: 'Appeals', icon: Icons.Flag, view: 'Appeals', roles: [UserRole.OperationsDirector, ...executiveRoles] },
            { name: 'Uniform Distribution', icon: Icons.Truck, view: 'UniformDistribution', roles: [UserRole.Secretary, ...operationsRoles, ...executiveRoles]},
        ]
    },
    {
        title: 'Executive',
        roles: executiveRoles,
        items: [
            { name: 'Team Management', icon: Icons.Users, view: 'TeamManagement', roles: executiveRoles },
            { name: 'Payroll', icon: Icons.CreditCard, view: 'Payroll', roles: [...executiveRoles] },
            { name: 'Analytics', icon: Icons.ChartBar, view: 'Analytics', roles: [...executiveRoles] },
            { name: 'Live Control', icon: Icons.Shield, view: 'LiveControl', roles: executiveRoles },
            { name: 'System Settings', icon: Icons.Cog, view: 'SystemSettings', roles: [UserRole.Owner] },
        ]
    },
];

export const Sidebar = ({ currentUser, activeView, isCollapsed = false }) => {
    const sidebarStructure = getSidebarStructure(currentUser);
    const containerClasses = isCollapsed 
        ? "w-20 bg-[var(--accent-secondary)] text-[var(--text-light)] h-full overflow-y-auto flex flex-col items-center py-4 space-y-4 collapsed-sidebar" 
        : "w-64 bg-[var(--accent-secondary)] text-[var(--text-light)] h-full overflow-y-auto flex flex-col";
    
    return `
        <div class="${containerClasses}">
            <div class="flex items-center justify-center h-16 border-b border-white/10 flex-shrink-0 px-4 w-full">
                <div class="text-center ${isCollapsed ? 'hidden' : ''}">
                    <p class="font-bold text-md">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs opacity-70">${currentUser.role}</p>
                </div>
                <div class="${isCollapsed ? '' : 'hidden'} text-center">
                    ${Icons.Shield({ className: "w-8 h-8 text-[var(--accent-primary)]"})}
                </div>
            </div>
            <nav class="flex-1 ${isCollapsed ? '' : 'py-4'}">
                ${sidebarStructure.map((group) => {
                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                    if (accessibleItems.length === 0) return '';
                    return `
                        <div>
                            <h3 class="${isCollapsed ? 'hidden' : ''} px-4 pt-4 pb-2 text-xs font-semibold uppercase opacity-50 tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const activeClasses = 'bg-black/20 text-white font-bold';
                                    const inactiveClasses = 'text-white/70 hover:bg-black/20 hover:text-white';
                                    const linkClasses = `flex items-center text-sm font-medium transition-colors ${isCollapsed ? 'justify-center p-4 rounded-lg' : 'px-4 py-3'}`;
                                    return `
                                        <li>
                                            <a href="#" title="${item.name}" data-action="navigate" data-type="${item.view}" class="${linkClasses} ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-6 h-6 flex-shrink-0' })}
                                                <span class="ml-3 ${isCollapsed ? 'sidebar-text absolute left-20 bg-[var(--accent-secondary)] px-3 py-1 rounded-md' : ''}">${item.name}</span>
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
            </nav>
             <div class="flex-shrink-0 p-4 border-t border-white/10 ${isCollapsed ? 'hidden' : ''}">
                <button data-action="logout" class="w-full flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors">
                    ${Icons.Logout({ className: "w-5 h-5 mr-2" })}
                    Logout
                </button>
            </div>
        </div>
    `;
};

type BottomNavItem = {
    name: string;
    icon: ({ className }: { className?: string; }) => string;
    view?: string;
    action?: string;
};

export const BottomNavBar = ({ currentUser, activeView }) => {
    let primaryNav: BottomNavItem[] = [
        { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard' },
    ];

    if (fieldRoles.includes(currentUser.role)) {
        primaryNav.push({ name: 'Missions', icon: Icons.ClipboardList, view: 'MissionBoard' });
        primaryNav.push({ name: 'Training', icon: Icons.AcademicCap, view: 'Training' });
    } else if (clientRole.includes(currentUser.role)) {
        primaryNav.push({ name: 'Post', icon: Icons.PlusCircle, view: 'PostMission' });
        primaryNav.push({ name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions' });
    } else if ([...operationsRoles, ...executiveRoles, ...managementRoles].includes(currentUser.role)) {
        primaryNav.push({ name: 'Control', icon: Icons.Map, view: 'MissionControl' });
        primaryNav.push({ name: 'Guards', icon: Icons.Users, view: 'GuardManagement' });
    }
    
    primaryNav.push({ name: 'Menu', icon: Icons.Menu, action: 'open-mobile-menu' });


    return `
        <div class="bottom-nav fixed bottom-0 left-0 right-0 h-20 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] md:hidden z-40">
            <div class="grid h-full max-w-lg grid-cols-${primaryNav.length} mx-auto font-medium">
                ${primaryNav.map(item => {
                    const isActive = activeView === item.view;
                    const Icon = item.icon;
                    return `
                        <button type="button" data-action="${item.action || 'navigate'}" data-type="${item.view || ''}" class="inline-flex flex-col items-center justify-center px-2 hover:bg-[var(--bg-tertiary)] group">
                            ${Icon({ className: `w-6 h-6 mb-1 ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}` })}
                            <span class="text-xs ${isActive ? 'text-[var(--accent-primary)] font-bold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}">${item.name}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};

export const MobileMenu = ({ currentUser, activeView }) => {
    const sidebarStructure = getSidebarStructure(currentUser);
    return `
    <div class="fixed inset-0 bg-black/60 z-50 md:hidden animate-in" data-action="close-mobile-menu">
        <div class="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-[var(--accent-secondary)] text-white shadow-xl flex flex-col" style="animation: slideIn 0.3s ease-out forwards;" data-menu-panel>
            <div class="flex items-center justify-between h-16 border-b border-white/10 px-4 flex-shrink-0">
                <div>
                    <p class="font-bold">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs opacity-70">${currentUser.role}</p>
                </div>
                <button data-action="close-mobile-menu" class="p-2 -mr-2">
                    ${Icons.X({ className: "w-6 h-6" })}
                </button>
            </div>
            <nav class="flex-1 overflow-y-auto py-4">
                ${sidebarStructure.map((group) => {
                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                    if (accessibleItems.length === 0) return '';
                    return `
                        <div>
                            <h3 class="px-4 pt-4 pb-2 text-xs font-semibold uppercase opacity-50 tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const linkClasses = `flex items-center text-sm font-medium transition-colors px-4 py-3 rounded-md mx-2`;
                                    const activeClasses = 'bg-black/20 text-white font-bold';
                                    const inactiveClasses = 'text-white/70 hover:bg-black/20 hover:text-white';
                                    return `
                                        <li>
                                            <a href="#" data-action="navigate" data-type="${item.view}" class="${linkClasses} ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-6 h-6 flex-shrink-0 mr-3' })}
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
            <div class="p-4 border-t border-white/10 flex-shrink-0">
                <button data-action="logout" class="w-full flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors">
                    ${Icons.Logout({ className: "w-5 h-5 mr-3" })}
                    Logout
                </button>
            </div>
        </div>
    </div>
    `;
};
