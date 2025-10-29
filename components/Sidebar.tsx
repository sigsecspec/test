import React from 'react';
import { UserRole } from '../types.ts';
import { 
    HomeIcon, ClipboardListIcon, CalendarIcon, UserIcon, AcademicCapIcon, 
    PlusCircleIcon, LocationMarkerIcon, CreditCardIcon, CogIcon, UsersIcon, 
    ChartBarIcon, BriefcaseIcon, CheckCircleIcon, EyeIcon, MapIcon, 
    BellIcon, DocumentTextIcon, MailIcon, TrophyIcon, FlagIcon, ArrowUpTrayIcon,
    DocumentDuplicateIcon
} from './Icons.tsx';

// A new icon for Vehicle Management
const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125V6.75a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6.75v10.5a1.125 1.125 0 001.125 1.125z" />
    </svg>
);

interface SidebarProps {
  userRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const getDashboardTitle = (role: UserRole) => {
    switch(role) {
      case UserRole.Owner: return "Company Control";
      case UserRole.CoOwner: return "Company Control";
      case UserRole.DeputyChief: return "Admin Support"; // Secretary
      case UserRole.Commander: return "Live Control"; // Dispatch
      case UserRole.OperationsDirector: return "Strategic Oversight";
      case UserRole.OperationsManager: return "Daily Operations";
      case UserRole.Dispatch: return "Live Control";
      case UserRole.Secretary: return "Admin Support";
      case UserRole.Supervisor: return "Field Command";
      case UserRole.TrainingOfficer: return "Training Command";
      case UserRole.LeadGuard: return "Site Command";
      case UserRole.Guard: return "Field Operations";
      case UserRole.Client: return "Client Portal";
      default: return "Dashboard";
    }
}

// Define nav items for each specific role
const baseNavItems: { [key in UserRole]?: { name: string; icon: React.FC<any> }[] } = {
    [UserRole.Guard]: [
        { name: 'Mission Board', icon: ClipboardListIcon },
        { name: 'Mission Hub', icon: CalendarIcon },
        { name: 'My Earnings', icon: CreditCardIcon },
        { name: 'My Profile', icon: UserIcon },
        { name: 'Training', icon: AcademicCapIcon },
        { name: 'Promotions', icon: ArrowUpTrayIcon },
    ],
    [UserRole.LeadGuard]: [ { name: 'Site Roster', icon: UsersIcon } ],
    [UserRole.TrainingOfficer]: [ { name: 'Training Management', icon: AcademicCapIcon } ],
    [UserRole.Supervisor]: [
        { name: 'Field Oversight', icon: EyeIcon },
        { name: 'Training Approvals', icon: CheckCircleIcon },
    ],
    [UserRole.Dispatch]: [
        { name: 'Live Control', icon: MapIcon },
        { name: 'Alerts', icon: BellIcon },
    ],
     [UserRole.Commander]: [ // Inherits Dispatch
        { name: 'Live Control', icon: MapIcon },
        { name: 'Alerts', icon: BellIcon },
    ],
    [UserRole.Secretary]: [
        { name: 'Applications', icon: DocumentTextIcon },
        { name: 'Communications', icon: MailIcon },
    ],
    [UserRole.DeputyChief]: [ // Inherits Secretary
        { name: 'Applications', icon: DocumentTextIcon },
        { name: 'Communications', icon: MailIcon },
    ],
    [UserRole.OperationsManager]: [
        { name: 'User Management', icon: UsersIcon },
        { name: 'Client Management', icon: BriefcaseIcon },
        { name: 'Mission Control', icon: ClipboardListIcon },
        { name: 'Vehicle Management', icon: TruckIcon },
    ],
    [UserRole.OperationsDirector]: [
        { name: 'Approvals', icon: CheckCircleIcon },
        { name: 'Contract Approvals', icon: DocumentDuplicateIcon },
        { name: 'Payroll', icon: CreditCardIcon },
    ],
    [UserRole.Owner]: [
        { name: 'Analytics', icon: ChartBarIcon },
        { name: 'System Settings', icon: CogIcon },
        { name: 'Appeals', icon: FlagIcon },
    ],
    [UserRole.Client]: [
        { name: 'Post Mission', icon: PlusCircleIcon },
        { name: 'Active Missions', icon: ClipboardListIcon },
        { name: 'My Contracts', icon: DocumentDuplicateIcon },
        { name: 'My Sites', icon: LocationMarkerIcon },
        { name: 'Guard Roster', icon: UsersIcon },
        { name: 'Billing', icon: CreditCardIcon },
        { name: 'My Profile', icon: UserIcon },
    ],
};

// Define the hierarchy for permission inheritance based on the spec
// A role inherits all permissions from the roles listed in its array.
const roleHierarchy: { [key in UserRole]: UserRole[] } = {
    [UserRole.Owner]: [UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander, UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard, UserRole.Guard],
    [UserRole.CoOwner]: [UserRole.DeputyChief, UserRole.Commander, UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard, UserRole.Guard],
    [UserRole.DeputyChief]: [UserRole.Secretary, UserRole.Guard], // Is Secretary
    [UserRole.Commander]: [UserRole.Dispatch, UserRole.Guard], // Is Dispatch
    [UserRole.OperationsDirector]: [UserRole.OperationsManager, UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard, UserRole.Guard],
    [UserRole.OperationsManager]: [UserRole.Secretary, UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard, UserRole.Guard],
    [UserRole.Dispatch]: [UserRole.Guard],
    [UserRole.Secretary]: [UserRole.Guard],
    [UserRole.Supervisor]: [UserRole.TrainingOfficer, UserRole.LeadGuard, UserRole.Guard],
    [UserRole.TrainingOfficer]: [UserRole.LeadGuard, UserRole.Guard],
    [UserRole.LeadGuard]: [UserRole.Guard],
    [UserRole.Guard]: [],
    [UserRole.Client]: [],
};


// Define the master order of all possible navigation items
const masterNavOrder: string[] = [
  'Dashboard',
  // Guard Section
  'Mission Board',
  'Mission Hub',
  'My Earnings',
  'Training',
  'Promotions',
  // Lead Guard Section
  'Site Roster',
  // Supervisor Section
  'Field Oversight',
  // Training Officer Section
  'Training Management',
  'Training Approvals',
  // Client Section
  'Post Mission',
  'Active Missions',
  'My Contracts',
  'My Sites',
  'Guard Roster',
  'Billing',
  // Dispatch Section
  'Live Control',
  'Alerts',
  // Secretary Section
  'Applications',
  'Communications',
  // Operations Section
  'Mission Control',
  'User Management',
  'Client Management',
  'Vehicle Management',
  'Approvals',
  'Contract Approvals',
  'Payroll',
  // Executive Section
  'Analytics',
  'System Settings',
  'Appeals',
  // Universal Section
  'My Profile',
  'Hall of Fame',
];

// Combine all nav items into a single map for easy lookup
const allNavItems = new Map<string, { name: string; icon: React.FC<any> }>();
allNavItems.set('Dashboard', { name: 'Dashboard', icon: HomeIcon });
Object.values(baseNavItems).flat().forEach(item => {
    if (!allNavItems.has(item.name)) {
        allNavItems.set(item.name, item);
    }
});
allNavItems.set('Hall of Fame', { name: 'Hall of Fame', icon: TrophyIcon });
// Ensure My Profile is available if not defined elsewhere
if (!allNavItems.has('My Profile')) {
    allNavItems.set('My Profile', { name: 'My Profile', icon: UserIcon });
}


// Function to generate the full list of nav items based on inheritance
const getNavItemsForRole = (role: UserRole) => {
    const rolesToInclude = new Set<UserRole>();
    const queue: UserRole[] = [role];
    const visited = new Set<UserRole>();

    while (queue.length > 0) {
        const currentRole = queue.shift()!;
        if (visited.has(currentRole)) {
            continue;
        }
        visited.add(currentRole);
        rolesToInclude.add(currentRole);

        const inheritedRoles = roleHierarchy[currentRole] || [];
        for (const inheritedRole of inheritedRoles) {
            if (!visited.has(inheritedRole)) {
                queue.push(inheritedRole);
            }
        }
    }

    const permittedItems = new Set<string>();
    rolesToInclude.forEach(r => {
        (baseNavItems[r] || []).forEach(item => {
            permittedItems.add(item.name);
        });
    });

    // Add universal items
    permittedItems.add('Dashboard');
    permittedItems.add('Hall of Fame');
    // My Profile is universal for all internal roles
    if (role !== UserRole.Client) {
        permittedItems.add('My Profile');
    }

    // Filter the master list based on permissions and return in the correct order
    return masterNavOrder
        .map(name => allNavItems.get(name))
        .filter(item => item && permittedItems.has(item.name)) as { name: string; icon: React.FC<any> }[];
};


const Sidebar: React.FC<SidebarProps> = ({ userRole, activeView, setActiveView }) => {
    const items = getNavItemsForRole(userRole);

    return (
        <div className="flex flex-col w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)]">
            <div className="flex items-center justify-center h-16 border-b border-[var(--border-primary)] flex-shrink-0">
                <h1 className="text-lg font-bold text-[var(--text-primary)]">
                    <span className="font-light text-[var(--accent-primary)]">SSS</span> Dashboard
                </h1>
            </div>
            <div className="flex-grow overflow-y-auto">
                 <div className="p-4 border-b border-[var(--border-primary)]">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">{getDashboardTitle(userRole)}</h2>
                    <p className="text-sm text-[var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">{userRole}</p>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <ul>
                        {items.map(item => (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setActiveView(item.name); }}
                                    className={`flex items-center px-3 py-2.5 my-1 rounded-md transition-all duration-200 text-sm ${
                                        activeView === item.name
                                            ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold shadow-lg'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                                    }`}
                                     style={activeView === item.name ? {'--tw-shadow-color': 'var(--accent-primary)'} as React.CSSProperties : {}}
                                >
                                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
             <footer className="text-center p-4 text-[var(--text-secondary)] text-xs border-t border-[var(--border-primary)]">
                <p>&copy; {new Date().getFullYear()} SSS</p>
                <p>Version 1.1.0</p>
            </footer>
        </div>
    );
};

export default Sidebar;
