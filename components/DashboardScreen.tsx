import React, { useState } from 'react';
import { User, Mission, Client, UserRole } from '../types';
import Sidebar from './Sidebar';
import { ShieldIcon, LogoutIcon, MenuIcon } from './Icons';

// Import All View Components
import MissionBoard from './views/MissionBoard';
import PostMission from './views/PostMission';
import MyMissions from './views/MyMissions';
import GuardManagement from './views/GuardManagement';
import ClientManagement from './views/ClientManagement';
import MyProfile from './views/MyProfile';
import Training from './views/Training';
import MissionControl from './views/MissionControl';
import ActiveMissions from './views/ActiveMissions';
import Analytics from './views/Analytics';
import Approvals from './views/Approvals';
import SystemSettings from './views/SystemSettings';
import FieldOversight from './views/FieldOversight';
import TrainingApprovals from './views/TrainingApprovals';
import TrainingManagement from './views/TrainingManagement';
import SiteRoster from './views/SiteRoster';
import LiveControl from './views/LiveControl';
import Alerts from './views/Alerts';
import Applications from './views/Applications';
import Communications from './views/Communications';
import MySites from './views/MySites';
import Billing from './views/Billing';


interface DashboardScreenProps {
  user: User;
  users: User[];
  missions: Mission[];
  clients: Client[];
  sites: any[];
  alerts: any[];
  applications: any[];
  approvals: any[];
  onLogout: () => void;
  onClaimMission: (missionId: string, guardId: string) => void;
  onAddMission: (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  user, users, missions, clients, sites, alerts, applications, approvals, onLogout, onClaimMission, onAddMission 
}) => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return (
          <>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-[#c4c4c4]">Welcome, {user.firstName}!</h2>
              <p className="text-[#787876]">You are logged in as: <span className="font-semibold text-[#aeae5a]">{user.role}</span></p>
            </div>
            {/* Render Analytics as the default dashboard view for management */}
            {[UserRole.Owner, UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander, UserRole.OperationsDirector, UserRole.OperationsManager].includes(user.role) 
              ? <Analytics users={users} missions={missions} clients={clients} />
              : <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#c4c4c4] border-b border-[#535347] pb-2 mb-4">System Status</h3>
                  <p className="text-[#787876]">
                    All systems are currently operational. Select an item from the sidebar to begin.
                  </p>
                </div>
            }
          </>
        );
      // Guard & Lead Views
      case 'Mission Board':
        return <MissionBoard user={user} missions={missions} onClaimMission={onClaimMission} />;
      case 'My Missions':
        return <MyMissions user={user} missions={missions} />;
      case 'My Profile':
        return <MyProfile user={user} />;
      case 'Training':
          return <Training user={user} />;
      case 'Site Roster':
        return <SiteRoster user={user} missions={missions} users={users} />;
      // Client Views
      case 'Post Mission':
        return <PostMission clients={clients} onAddMission={onAddMission} user={user} />;
      case 'Active Missions':
        return <ActiveMissions user={user} missions={missions} users={users} clients={clients} />;
      case 'My Sites':
        return <MySites user={user} clients={clients} sites={sites} />;
      case 'Billing':
        return <Billing user={user} missions={missions} clients={clients} />;
      // Management Views
      case 'Guard Management':
      case 'Guard Roster': // Re-use component for different sidebar names
      case 'User Management':
        return <GuardManagement users={users} />;
       case 'Client Management':
        return <ClientManagement clients={clients} />;
      case 'Mission Control':
        return <MissionControl missions={missions} users={users} clients={clients} />;
      case 'Approvals':
        return <Approvals approvals={approvals} />;
      case 'Analytics':
        return <Analytics users={users} missions={missions} clients={clients} />;
      case 'System Settings':
        return <SystemSettings />;
      // Supervisor Views
      case 'Field Oversight':
        return <FieldOversight missions={missions} users={users} clients={clients} />;
      case 'Training Approvals':
        return <TrainingApprovals users={users} />;
      // Training Officer Views
      case 'Training Management':
        return <TrainingManagement users={users} />;
      // Dispatch Views
      case 'Live Control':
        return <LiveControl missions={missions} users={users} clients={clients} />;
      case 'Alerts':
        return <Alerts alerts={alerts} />;
      // Secretary Views
      case 'Applications':
        return <Applications applications={applications} />;
      case 'Communications':
        return <Communications />;
      default:
        return (
          <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#c4c4c4]">{activeView}</h3>
            <p className="text-[#787876]">This view is ready for implementation.</p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      {/* Mobile menu overlay */}
       <div 
        className={`fixed inset-0 bg-black/60 z-30 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <Sidebar userRole={user.role} activeView={activeView} setActiveView={(view) => { setActiveView(view); setSidebarOpen(false); }} onLogout={onLogout}/>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
         <Sidebar userRole={user.role} activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
      </div>
      
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-[#0f0f0f] border-b border-[#535347] shadow-lg shadow-[#aeae5a]/5 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                 <button className="md:hidden text-[#c4c4c4] mr-4" onClick={() => setSidebarOpen(true)}>
                    <MenuIcon className="h-6 w-6"/>
                 </button>
                <ShieldIcon className="w-8 h-8 text-[#aeae5a] mr-3" />
                <h1 className="text-lg font-bold text-[#c4c4c4] hidden sm:block">
                  Signature Security <span className="font-light text-[#aeae5a]">Specialists</span>
                </h1>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition"
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