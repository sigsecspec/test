import React from 'react';
import { UserRole } from '../types';
import { 
    HomeIcon, ClipboardListIcon, CalendarIcon, UserIcon, AcademicCapIcon, 
    PlusCircleIcon, LocationMarkerIcon, CreditCardIcon, CogIcon, UsersIcon, 
    ChartBarIcon, BriefcaseIcon, CheckCircleIcon, EyeIcon, MapIcon, 
    BellIcon, DocumentTextIcon, MailIcon, TrophyIcon 
} from './Icons';

interface SidebarProps {
  userRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const getDashboardTitle = (role: UserRole) => {
    switch(role) {
      case UserRole.Owner:
      case UserRole.CoOwner:
      case UserRole.DeputyChief:
      case UserRole.Commander:
        return "Company Control";
      case UserRole.OperationsDirector:
        return "Strategic Oversight";
      case UserRole.OperationsManager:
        return "Daily Operations";
      case UserRole.Dispatch:
        return "Live Control";
      case UserRole.Secretary:
        return "Admin Support";
      case UserRole.Supervisor:
        return "Field Oversight";
      case UserRole.TrainingOfficer:
        return "Training Management";
      case UserRole.LeadGuard:
      case UserRole.Guard:
        return "Frontline Operations";
      case UserRole.Client:
        return "Client Portal";
      default:
        return "Dashboard";
    }
}

const managementNav = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Guard Management', icon: UsersIcon },
    { name: 'Client Management', icon: BriefcaseIcon },
    { name: 'Mission Control', icon: ClipboardListIcon },
    { name: 'Approvals', icon: CheckCircleIcon },
    { name: 'Analytics', icon: ChartBarIcon },
    { name: 'Hall of Fame', icon: TrophyIcon },
    { name: 'System Settings', icon: CogIcon },
];

const navItems: { [key: string]: { name: string; icon: React.FC<any> }[] } = {
    [UserRole.Owner]: managementNav,
    [UserRole.CoOwner]: managementNav,
    [UserRole.DeputyChief]: managementNav,
    [UserRole.Commander]: managementNav,
    [UserRole.OperationsDirector]: managementNav,
    [UserRole.OperationsManager]: managementNav,
    [UserRole.Supervisor]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Field Oversight', icon: EyeIcon },
        { name: 'Training Approvals', icon: AcademicCapIcon },
        { name: 'My Missions', icon: CalendarIcon },
        { name: 'Mission Board', icon: ClipboardListIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.TrainingOfficer]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Training Management', icon: AcademicCapIcon },
        { name: 'User Management', icon: UsersIcon },
        { name: 'My Missions', icon: CalendarIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.LeadGuard]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Mission Board', icon: ClipboardListIcon },
        { name: 'My Missions', icon: CalendarIcon },
        { name: 'Site Roster', icon: UsersIcon },
        { name: 'My Earnings', icon: CreditCardIcon },
        { name: 'My Profile', icon: UserIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.Guard]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Mission Board', icon: ClipboardListIcon },
        { name: 'My Missions', icon: CalendarIcon },
        { name: 'My Earnings', icon: CreditCardIcon },
        { name: 'My Profile', icon: UserIcon },
        { name: 'Training', icon: AcademicCapIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.Dispatch]: [
        { name: 'Live Control', icon: MapIcon },
        { name: 'Mission Board', icon: ClipboardListIcon },
        { name: 'Guard Management', icon: UsersIcon },
        { name: 'Alerts', icon: BellIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.Secretary]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Applications', icon: DocumentTextIcon },
        { name: 'User Management', icon: UsersIcon },
        { name: 'Communications', icon: MailIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
    [UserRole.Client]: [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Post Mission', icon: PlusCircleIcon },
        { name: 'Active Missions', icon: ClipboardListIcon },
        { name: 'My Sites', icon: LocationMarkerIcon },
        { name: 'Guard Roster', icon: UsersIcon },
        { name: 'Billing', icon: CreditCardIcon },
        { name: 'My Profile', icon: UserIcon },
        { name: 'Hall of Fame', icon: TrophyIcon },
    ],
};

const Sidebar: React.FC<SidebarProps> = ({ userRole, activeView, setActiveView }) => {
    const items = navItems[userRole] || navItems[UserRole.Guard];

    return (
        <div className="flex flex-col w-64 bg-[#0f0f0f] border-r border-[#535347]">
            <div className="flex items-center justify-center h-16 border-b border-[#535347] flex-shrink-0">
                <h1 className="text-lg font-bold text-[#c4c4c4]">
                    <span className="font-light text-[#aeae5a]">SSS</span> Dashboard
                </h1>
            </div>
            <div className="flex-grow overflow-y-auto">
                 <div className="p-4 border-b border-[#535347]">
                    <h2 className="text-lg font-semibold text-[#c4c4c4] whitespace-nowrap overflow-hidden text-ellipsis">{getDashboardTitle(userRole)}</h2>
                    <p className="text-sm text-[#787876] whitespace-nowrap overflow-hidden text-ellipsis">{userRole}</p>
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
                                            ? 'bg-[#aeae5a] text-[#0f0f0f] font-bold shadow-lg shadow-[#aeae5a]/20'
                                            : 'text-[#c4c4c4] hover:bg-[#535347]/50 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
             <footer className="text-center p-4 text-[#535347] text-xs border-t border-[#535347]">
                <p>&copy; {new Date().getFullYear()} SSS</p>
                <p>Version 1.0.0</p>
            </footer>
        </div>
    );
};

export default Sidebar;