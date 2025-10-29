
import { Sidebar } from './Sidebar.js';
import * as Icons from './Icons.js';
// Import all views
import { MissionBoard } from './views/MissionBoard.js';
import { MyMissions } from './views/MyMissions.js';
import { Training } from './views/Training.js';
import { MyProfile } from './views/MyProfile.js';
import { PostMission } from './views/PostMission.js';
import { MySites } from './views/MySites.js';
import { Billing } from './views/Billing.js';
import { GuardManagement } from './views/GuardManagement.js';
import { ClientManagement } from './views/ClientManagement.js';
import { MissionControl } from './views/MissionControl.js';
import { ActiveMissions } from './views/ActiveMissions.js';
import { Analytics } from './views/Analytics.js';
import { Approvals } from './views/Approvals.js';
import { SystemSettings } from './views/SystemSettings.js';
import { FieldOversight } from './views/FieldOversight.js';
import { TrainingApprovals } from './views/TrainingApprovals.js';
import { TrainingManagement } from './views/TrainingManagement.js';
import { SiteRoster } from './views/SiteRoster.js';
import { LiveControl } from './views/LiveControl.js';
import { Alerts } from './views/Alerts.js';
import { Applications } from './views/Applications.js';
import { Communications } from './views/Communications.js';
import { Earnings } from './views/Earnings.js';
import { ClientGuardRoster } from './views/ClientGuardRoster.js';
import { HallOfFame } from './views/HallOfFame.js';
import { Payroll } from './views/Payroll.js';
import { VehicleManagement } from './views/VehicleManagement.js';
import { Promotions } from './views/Promotions.js';
import { Appeals } from './views/Appeals.js';
import { MyContracts } from './views/MyContracts.js';
import { ContractApprovals } from './views/ContractApprovals.js';

const DashboardView = (user) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
            <h2 class="text-2xl font-bold text-[var(--text-primary)]">Welcome back, ${user.firstName}!</h2>
            <p class="text-[var(--text-secondary)]">You are logged in as: <span class="font-semibold text-[var(--accent-primary)]">${user.role}</span></p>
            <p class="mt-4">Select an option from the sidebar to get started.</p>
        </div>
    </div>
`;

const renderActiveView = (view, user, state) => {
    switch (view) {
        case 'Dashboard': return DashboardView(user);
        case 'MissionBoard': return MissionBoard({ user });
        case 'MyMissions': return MyMissions({ user });
        case 'Training': return Training({ user });
        case 'MyProfile': return MyProfile({ user });
        case 'PostMission': return PostMission({ user });
        case 'MySites': return MySites({ user });
        case 'Billing': return Billing({ user });
        case 'GuardManagement': return GuardManagement({ user });
        case 'ClientManagement': return ClientManagement({ user });
        case 'MissionControl': return MissionControl({ user });
        case 'ActiveMissions': return ActiveMissions({ user });
        case 'Analytics': return Analytics({ user });
        case 'Approvals': return Approvals({ user });
        case 'SystemSettings': return SystemSettings({ user });
        case 'FieldOversight': return FieldOversight({ user });
        case 'TrainingApprovals': return TrainingApprovals({ user });
        case 'TrainingManagement': return TrainingManagement({ user });
        case 'SiteRoster': return SiteRoster({ user });
        case 'LiveControl': return LiveControl({ user });
        case 'Alerts': return Alerts({ user });
        case 'Applications': return Applications({ user });
        case 'Communications': return Communications({ user });
        case 'Earnings': return Earnings({ user });
        case 'ClientGuardRoster': return ClientGuardRoster({ user });
        case 'HallOfFame': return HallOfFame({ user });
        case 'Payroll': return Payroll({ user, selectedRunId: state.selectedPayrollRunId });
        case 'VehicleManagement': return VehicleManagement({ user });
        case 'Promotions': return Promotions({ user });
        case 'Appeals': return Appeals({ user });
        case 'MyContracts': return MyContracts({ user });
        case 'ContractApprovals': return ContractApprovals({ user });
        default: return DashboardView(user);
    }
};

export const DashboardScreen = (state) => `
    <div class="relative h-screen md:flex overflow-hidden bg-[var(--bg-primary)]">
        <div id="sidebar" class="fixed inset-y-0 left-0 z-40 transform -translate-x-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0">
            ${Sidebar({ currentUser: state.currentUser, activeView: state.activeView })}
        </div>

        <div class="flex-1 flex flex-col w-full">
            <header class="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)] shadow-sm sticky top-0 z-20 w-full">
                <div class="mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <button data-action="toggle-mobile-menu" class="md:hidden text-[var(--text-secondary)] mr-4 p-2 rounded-md hover:bg-[var(--border-tertiary)]">
                                ${Icons.Menu({ className: 'h-6 w-6' })}
                            </button>
                            ${Icons.Shield({ className: 'w-8 h-8 text-[var(--accent-primary)] mr-3' })}
                            <h1 class="text-lg font-bold text-[var(--text-primary)] hidden sm:block">
                                Signature Security <span class="font-light text-[var(--accent-primary)]">Specialists</span>
                            </h1>
                        </div>
                        <button data-action="logout" class="flex items-center bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition">
                            ${Icons.Logout({ className: 'w-5 h-5 md:mr-2' })}
                            <span class="hidden md:block">Logout</span>
                        </button>
                    </div>
                </div>
            </header>
            <main id="dashboard-content" class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                ${renderActiveView(state.activeView, state.currentUser, state)}
            </main>
        </div>
    </div>
`;
