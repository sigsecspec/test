import { UserRole } from '../types.js';
import { getMissionById, getLeadGuardAssignment, getSpotCheckByMissionId, User } from '../database.js';
import { TrainingModal } from './TrainingModal.js';
import { ContractModal } from './ContractModal.js';
import { SiteModal } from './SiteModal.js';
import { MissionDetailsModal } from './MissionDetailsModal.js';
import { UserDetailsModal } from './UserDetailsModal.js';

import { Sidebar, BottomNavBar, MobileMenu } from './Sidebar.js';

import { DashboardView } from './views/Dashboard.js';
import { MyProfile } from './views/MyProfile.js';
import { MissionBoard } from './views/MissionBoard.js';
import { MyMissions } from './views/MyMissions.js';
import { Training } from './views/Training.js';
import { Earnings } from './views/Earnings.js';
import { HallOfFame } from './views/HallOfFame.js';
import { Promotions } from './views/Promotions.js';
import { PostMission } from './views/PostMission.js';
import { MySites } from './views/MySites.js';
import { MyContracts } from './views/MyContracts.js';
import { Billing } from './views/Billing.js';
import { ClientGuardRoster } from './views/ClientGuardRoster.js';
import { FieldOversight } from './views/FieldOversight.js';
import { TrainingManagement } from './views/TrainingManagement.js';
import { MissionControl } from './views/MissionControl.js';
import { ActiveMissions } from './views/ActiveMissions.js';
import { GuardManagement } from './views/GuardManagement.js';
import { ClientManagement } from './views/ClientManagement.js';
import { SiteRoster } from './views/SiteRoster.js';
import { Communications } from './views/Communications.js';
import { Alerts } from './views/Alerts.js';
import { VehicleManagement } from './views/VehicleManagement.js';
import { Applications } from './views/Applications.js';
import { ContractApprovals } from './views/ContractApprovals.js';
import { SiteApprovals } from './views/SiteApprovals.js';
import { Appeals } from './views/Appeals.js';
import { UniformDistribution } from './views/UniformDistribution.js';
import { TeamManagement } from './views/TeamManagement.js';
import { Payroll } from './views/Payroll.js';
import { Analytics } from './views/Analytics.js';
import { LiveControl } from './views/LiveControl.js';
import { SystemSettings } from './views/SystemSettings.js';
import { GuardMissionDashboard, LeadGuardMissionDashboard, SupervisorSpotCheckDashboard } from './views/MissionDashboards.js';

interface DashboardScreenProps {
    currentUser: User;
    activeView: string;
    activeMissionId: string | null;
    selectedPayrollRunId: string | null;
    selectedModal: { type: string | null, id: string | null };
    isMobileMenuOpen: boolean;
}

export const DashboardScreen = ({ currentUser, activeView, activeMissionId, selectedPayrollRunId, selectedModal, isMobileMenuOpen }: DashboardScreenProps) => {
    let viewContent = '';

    if (activeMissionId) {
        const mission = getMissionById(activeMissionId);
        if (mission) {
            const leadAssignment = getLeadGuardAssignment(mission.id);
            const isLead = leadAssignment && leadAssignment.userId === currentUser.id;
            const isSupervisor = currentUser.role === UserRole.Supervisor;
            const spotCheck = getSpotCheckByMissionId(mission.id);

            if (spotCheck && isSupervisor && spotCheck.supervisorId === currentUser.id) {
                viewContent = SupervisorSpotCheckDashboard({ user: currentUser, mission, spotCheck });
            } else if (isLead) {
                viewContent = LeadGuardMissionDashboard({ user: currentUser, mission });
            } else {
                viewContent = GuardMissionDashboard({ user: currentUser, mission });
            }
        } else {
             viewContent = `<p>Error: Mission not found.</p>`;
        }
    } else {
        const viewMap: { [key: string]: () => string } = {
            'Dashboard': () => DashboardView({ user: currentUser }),
            'MyProfile': () => MyProfile({ user: currentUser }),
            'MissionBoard': () => MissionBoard({ user: currentUser }),
            'MyMissions': () => MyMissions({ user: currentUser }),
            'Training': () => Training({ user: currentUser }),
            'Earnings': () => Earnings({ user: currentUser }),
            'HallOfFame': () => HallOfFame({ user: currentUser }),
            'Promotions': () => Promotions({ user: currentUser }),
            'PostMission': () => PostMission({ user: currentUser }),
            'MySites': () => MySites({ user: currentUser }),
            'MyContracts': () => MyContracts({ user: currentUser }),
            'Billing': () => Billing({ user: currentUser }),
            'ClientGuardRoster': () => ClientGuardRoster({ user: currentUser }),
            'FieldOversight': () => FieldOversight({ user: currentUser }),
            'TrainingManagement': () => TrainingManagement({ user: currentUser }),
            'MissionControl': () => MissionControl({ user: currentUser }),
            'ActiveMissions': () => ActiveMissions({ user: currentUser }),
            'GuardManagement': () => GuardManagement({ user: currentUser }),
            'ClientManagement': () => ClientManagement({ user: currentUser }),
            'SiteRoster': () => SiteRoster({ user: currentUser }),
            'Communications': () => Communications({ user: currentUser }),
            'Alerts': () => Alerts({ user: currentUser }),
            'VehicleManagement': () => VehicleManagement({ user: currentUser }),
            'Applications': () => Applications({ user: currentUser }),
            'ContractApprovals': () => ContractApprovals({ user: currentUser }),
            'SiteApprovals': () => SiteApprovals({ user: currentUser }),
            'Appeals': () => Appeals({ user: currentUser }),
            'UniformDistribution': () => UniformDistribution({ user: currentUser }),
            'TeamManagement': () => TeamManagement({ user: currentUser }),
            'Payroll': () => Payroll({ user: currentUser, selectedRunId: selectedPayrollRunId }),
            'Analytics': () => Analytics({ user: currentUser }),
            'LiveControl': () => LiveControl({ user: currentUser }),
            'SystemSettings': () => SystemSettings({ user: currentUser }),
        };
        viewContent = viewMap[activeView] ? viewMap[activeView]() : `<div>View "${activeView}" not found.</div>`;
    }

    let modalHtml = '';
    if (selectedModal.type === 'Training' && selectedModal.id) modalHtml = TrainingModal({ moduleId: selectedModal.id });
    if (selectedModal.type === 'Contract') modalHtml = ContractModal({ user: currentUser });
    if (selectedModal.type === 'Site') modalHtml = SiteModal({ user: currentUser });
    if (selectedModal.type === 'MissionDetails' && selectedModal.id) modalHtml = MissionDetailsModal({ missionId: selectedModal.id, user: currentUser });
    if (selectedModal.type === 'UserDetails' && selectedModal.id) modalHtml = UserDetailsModal({ userId: selectedModal.id, currentUser });

    return `
        <div class="h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col md:flex-row overflow-hidden">
            <!-- Desktop Sidebar -->
            <div class="hidden lg:flex flex-shrink-0">
                ${Sidebar({ currentUser, activeView, isCollapsed: false })}
            </div>
            <!-- Tablet Collapsed Sidebar -->
            <div class="hidden md:flex lg:hidden flex-shrink-0">
                ${Sidebar({ currentUser, activeView, isCollapsed: true })}
            </div>

            <div class="flex-1 flex flex-col overflow-hidden">
                <main id="dashboard-content" class="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6">
                    ${viewContent}
                </main>
            </div>

            <!-- Mobile Bottom Nav -->
            ${BottomNavBar({ currentUser, activeView })}

            <!-- Mobile Slide-out Menu -->
            ${isMobileMenuOpen ? MobileMenu({ currentUser, activeView }) : ''}

            <!-- Modals -->
            ${modalHtml}
        </div>
    `;
};
