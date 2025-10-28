import React, { useState } from 'react';
import { User, Mission, Client, UserRole, Site, Alert, Application, Approval, SpotCheck, HallOfFameEntry, SystemSettings, IncidentReport, Vehicle, PayrollRun, Promotion, Appeal, Contract } from '../types.ts';
import Sidebar from './Sidebar.tsx';
import { ShieldIcon, LogoutIcon, MenuIcon } from './Icons.tsx';

// Import All View Components
import MissionBoard from './views/MissionBoard.tsx';
import PostMission from './views/PostMission.tsx';
import MyMissions from './views/MyMissions.tsx';
import GuardManagement from './views/GuardManagement.tsx';
import ClientManagement from './views/ClientManagement.tsx';
import MyProfile from './views/MyProfile.tsx';
import Training from './views/Training.tsx';
import MissionControl from './views/MissionControl.tsx';
import ActiveMissions from './views/ActiveMissions.tsx';
import Analytics from './views/Analytics.tsx';
import Approvals from './views/Approvals.tsx';
import SystemSettingsView from './views/SystemSettings.tsx';
import FieldOversight from './views/FieldOversight.tsx';
import TrainingApprovals from './views/TrainingApprovals.tsx';
import TrainingManagement from './views/TrainingManagement.tsx';
import SiteRoster from './views/SiteRoster.tsx';
import LiveControl from './views/LiveControl.tsx';
import Alerts from './views/Alerts.tsx';
import Applications from './views/Applications.tsx';
import Communications from './views/Communications.tsx';
import MySites from './views/MySites.tsx';
import Billing from './views/Billing.tsx';
import Earnings from './views/Earnings.tsx';
import ClientGuardRoster from './views/ClientGuardRoster.tsx';
import HallOfFame from './views/HallOfFame.tsx';
import Payroll from './views/Payroll.tsx';
import VehicleManagement from './views/VehicleManagement.tsx';
import Promotions from './views/Promotions.tsx';
import Appeals from './views/Appeals.tsx';
import MyContracts from './views/MyContracts.tsx';
import ContractApprovals from './views/ContractApprovals.tsx';


interface DashboardScreenProps {
  user: User;
  users: User[];
  missions: Mission[];
  clients: Client[];
  sites: Site[];
  alerts: Alert[];
  applications: Application[];
  approvals: Approval[];
  contracts: Contract[];
  hallOfFameEntries: HallOfFameEntry[];
  systemSettings: SystemSettings;
  incidentReports: IncidentReport[];
  vehicles: Vehicle[];
  payrollRuns: PayrollRun[];
  promotions: Promotion[];
  appeals: Appeal[];
  onLogout: () => void;
  onClaimMission: (missionId: string, guardId: string) => void;
  onAddMission: (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy' | 'checkIns' | 'checkOuts' | 'reports'>) => void;
  onUpdateApplication: (appId: string, status: 'Approved' | 'Denied') => void;
  onProcessApproval: (approvalId: string) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onAddSite: (siteData: Omit<Site, 'id'>) => void;
  onCheckIn: (missionId: string, guardId: string) => void;
  onCheckOut: (missionId: string, guardId: string) => void;
  onSubmitReport: (missionId: string, guardId: string, report: string) => void;
  onAddIncidentReport: (reportData: Omit<IncidentReport, 'id' | 'timestamp'>) => void;
  onRateMission: (missionId: string, rating: number) => void;
  onAddSpotCheck: (spotCheck: Omit<SpotCheck, 'id' | 'time'>) => void;
  onUpdateRank: (userId: string, rank: string, level: number) => void;
  onUpdateCerts: (userId: string, certs: string[]) => void;
  onUpdateClientGuardList: (clientId: string, guardId: string, list: 'whitelist' | 'blacklist', action: 'add' | 'remove') => void;
  onUpdateMission: (missionId: string, data: Partial<Mission>) => void;
  onCancelMission: (missionId: string) => void;
  onUpdateUser: (userId: string, data: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
  onAddClient: (data: Omit<Client, 'id' | 'userId' | 'whitelist' | 'blacklist'>, userId?: string) => void;
  onUpdateClient: (clientId: string, data: Partial<Client>) => void;
  onDeleteClient: (clientId: string) => void;
  onUpdateSite: (siteId: string, data: Partial<Site>) => void;
  onDeleteSite: (siteId: string) => void;
  onUpdateSystemSettings: (settings: SystemSettings) => void;
  onAddVehicle: (data: Omit<Vehicle, 'id'>) => void;
  onUpdateVehicle: (id: string, data: Partial<Vehicle>) => void;
  onCreatePayrollRun: (startDate: Date, endDate: Date) => void;
  onApprovePayrollRun: (id: string) => void;
  onConfirmPayment: (entryId: string) => void;
  onAddPromotion: (data: Omit<Promotion, 'id'|'status'|'dateApplied'>) => void;
  onUpdatePromotionStatus: (id: string, status: 'Approved' | 'Denied') => void;
  onAddAppeal: (data: Omit<Appeal, 'id'|'status'|'dateSubmitted'>) => void;
  onUpdateAppealStatus: (id: string, status: 'Approved' | 'Denied') => void;
  onAddContract: (contractData: Omit<Contract, 'id'|'status'>) => void;
  onUpdateContractStatus: (contractId: string, status: 'Active' | 'Cancelled') => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  const { 
    user, users, missions, clients, sites, alerts, applications, approvals, contracts, hallOfFameEntries, systemSettings, 
    incidentReports, vehicles, payrollRuns, promotions, appeals, onLogout, 
    ...handlers
  } = props;
  const [activeView, setActiveView] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return (
          <>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Welcome, {user.firstName}!</h2>
              <p className="text-[var(--text-secondary)]">You are logged in as: <span className="font-semibold text-[var(--accent-primary)]">{user.role}</span></p>
            </div>
            {[UserRole.Owner, UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander, UserRole.OperationsDirector, UserRole.OperationsManager].includes(user.role) 
              ? <Analytics users={users} missions={missions} clients={clients} />
              : <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-2 mb-4">System Status</h3>
                  <p className="text-[var(--text-secondary)]">
                    All systems are currently operational. Select an item from the sidebar to begin.
                  </p>
                </div>
            }
          </>
        );
      // Guard & Lead Views
      case 'Mission Board':
        return <MissionBoard user={user} missions={missions} onClaimMission={handlers.onClaimMission} clients={clients} />;
      case 'Mission Hub':
        return <MyMissions user={user} missions={missions} onCheckIn={handlers.onCheckIn} onCheckOut={handlers.onCheckOut} onSubmitReport={handlers.onSubmitReport} onAddIncidentReport={handlers.onAddIncidentReport} />;
      case 'My Profile':
        return <MyProfile user={user} />;
      case 'Training':
          return <Training user={user} onAddAppeal={handlers.onAddAppeal} />;
      case 'Site Roster':
        return <SiteRoster user={user} missions={missions} users={users} />;
      case 'My Earnings':
        return <Earnings user={user} payrollRuns={payrollRuns} onConfirmPayment={handlers.onConfirmPayment} />;
      case 'Promotions':
        return <Promotions user={user} users={users} promotions={promotions} onAddPromotion={handlers.onAddPromotion} onUpdatePromotionStatus={handlers.onUpdatePromotionStatus} />;
      // Client Views
      case 'Post Mission':
        return <PostMission clients={clients} contracts={contracts} onAddMission={handlers.onAddMission} user={user} sites={sites} />;
      case 'Active Missions':
        return <ActiveMissions user={user} missions={missions} users={users} clients={clients} incidentReports={incidentReports} onRateMission={handlers.onRateMission} />;
      case 'My Sites':
        return <MySites user={user} clients={clients} sites={sites} onAddSite={handlers.onAddSite} onUpdateSite={handlers.onUpdateSite} onDeleteSite={handlers.onDeleteSite} />;
      case 'My Contracts':
        const client = clients.find(c => c.userId === user.id);
        return client ? <MyContracts client={client} contracts={contracts} onAddContract={handlers.onAddContract} /> : null;
      case 'Billing':
        return <Billing user={user} missions={missions} clients={clients} />;
      case 'Guard Roster': // For Client
        const clientForRoster = clients.find(c => c.userId === user.id);
        return clientForRoster ? <ClientGuardRoster client={clientForRoster} allGuards={users.filter(u => u.role === UserRole.Guard || u.role === UserRole.LeadGuard)} onUpdateList={handlers.onUpdateClientGuardList}/> : null;
      // Management Views
      case 'User Management':
        return <GuardManagement users={users} onUpdateUser={handlers.onUpdateUser} onDeleteUser={handlers.onDeleteUser} />;
       case 'Client Management':
        return <ClientManagement clients={clients} users={users} onAddClient={handlers.onAddClient} onUpdateClient={handlers.onUpdateClient} onDeleteClient={handlers.onDeleteClient} />;
      case 'Mission Control':
        return <MissionControl missions={missions} users={users} clients={clients} sites={sites} onUpdateMission={handlers.onUpdateMission} onCancelMission={handlers.onCancelMission}/>;
      case 'Approvals':
        return <Approvals approvals={approvals} users={users} onProcessApproval={handlers.onProcessApproval} />;
      case 'Contract Approvals':
        return <ContractApprovals contracts={contracts} clients={clients} onUpdateContractStatus={handlers.onUpdateContractStatus} />;
      case 'Analytics':
        return <Analytics users={users} missions={missions} clients={clients} />;
      case 'System Settings':
        return <SystemSettingsView systemSettings={systemSettings} onUpdateSystemSettings={handlers.onUpdateSystemSettings} />;
      case 'Payroll':
        return <Payroll payrollRuns={payrollRuns} users={users} onCreatePayrollRun={handlers.onCreatePayrollRun} onApprovePayrollRun={handlers.onApprovePayrollRun} />;
      case 'Vehicle Management':
        return <VehicleManagement vehicles={vehicles} missions={missions} onAddVehicle={handlers.onAddVehicle} onUpdateVehicle={handlers.onUpdateVehicle} />;
      case 'Appeals':
        return <Appeals user={user} users={users} appeals={appeals} onUpdateAppealStatus={handlers.onUpdateAppealStatus} />;
      // Supervisor Views
      case 'Field Oversight':
        return <FieldOversight missions={missions} users={users} clients={clients} supervisorId={user.id} onAddSpotCheck={handlers.onAddSpotCheck} />;
      case 'Training Approvals':
        return <TrainingApprovals users={users} />;
      // Training Officer Views
      case 'Training Management':
        return <TrainingManagement users={users} onUpdateCerts={handlers.onUpdateCerts} />;
      // Dispatch Views
      case 'Live Control':
        return <LiveControl missions={missions} users={users} clients={clients} />;
      case 'Alerts':
        return <Alerts alerts={alerts} onAcknowledge={handlers.onAcknowledgeAlert} />;
      // Secretary Views
      case 'Applications':
        return <Applications applications={applications} user={user} onUpdateApplication={handlers.onUpdateApplication} />;
      case 'Communications':
        return <Communications />;
      case 'Hall of Fame':
        return <HallOfFame users={users} hallOfFameEntries={hallOfFameEntries} />;
      default:
        return (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{activeView}</h3>
            <p className="text-[var(--text-secondary)]">This view is ready for implementation.</p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      <div 
        className={`fixed inset-0 bg-black/60 z-30 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>
      <div className={`fixed top-0 left-0 bottom-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <Sidebar userRole={user.role} activeView={activeView} setActiveView={(view) => { setActiveView(view); setSidebarOpen(false); }} onLogout={onLogout}/>
      </div>
      <div className="hidden md:flex md:flex-shrink-0">
         <Sidebar userRole={user.role} activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)] shadow-sm sticky top-0 z-20 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                 <button className="md:hidden text-[var(--text-secondary)] mr-4" onClick={() => setSidebarOpen(true)}>
                    <MenuIcon className="h-6 w-6"/>
                 </button>
                <ShieldIcon className="w-8 h-8 text-[var(--accent-primary)] mr-3" />
                <h1 className="text-lg font-bold text-[var(--text-primary)] hidden sm:block">
                  Signature Security <span className="font-light text-[var(--accent-primary)]">Specialists</span>
                </h1>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition"
                aria-label="Logout"
              >
                <LogoutIcon className="w-5 h-5 md:mr-2" />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardScreen;