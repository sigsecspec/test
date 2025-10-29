import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import Sidebar from './Sidebar';
import * as Icons from './Icons';
// Import all views
import MissionBoard from './views/MissionBoard';
import MyMissions from './views/MyMissions';
import Training from './views/Training';
import MyProfile from './views/MyProfile';
import PostMission from './views/PostMission';
import MySites from './views/MySites';
import Billing from './views/Billing';
import GuardManagement from './views/GuardManagement';
import ClientManagement from './views/ClientManagement';
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
import Earnings from './views/Earnings';
import ClientGuardRoster from './views/ClientGuardRoster';
import HallOfFame from './views/HallOfFame';
import Payroll from './views/Payroll';
import VehicleManagement from './views/VehicleManagement';
import Promotions from './views/Promotions';
import Appeals from './views/Appeals';
import MyContracts from './views/MyContracts';
import ContractApprovals from './views/ContractApprovals';

interface DashboardScreenProps {
  currentUser: User;
  onLogout: () => void;
}

const DashboardView: React.FC<{ user: User }> = ({ user }) => {
    // A simple default dashboard view
    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Welcome back, {user.firstName}!</h2>
                <p className="text-[var(--text-secondary)]">You are logged in as: <span className="font-semibold text-[var(--accent-primary)]">{user.role}</span></p>
                <p className="mt-4">Select an option from the sidebar to get started.</p>
            </div>
        </div>
    );
};


const DashboardScreen: React.FC<DashboardScreenProps> = ({ currentUser, onLogout }) => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const renderActiveView = () => {
        switch (activeView) {
            case 'Dashboard': return <DashboardView user={currentUser} />;
            case 'MissionBoard': return <MissionBoard user={currentUser} />;
            case 'MyMissions': return <MyMissions user={currentUser} />;
            case 'Training': return <Training user={currentUser} />;
            case 'MyProfile': return <MyProfile user={currentUser} />;
            case 'PostMission': return <PostMission user={currentUser} />;
            case 'MySites': return <MySites user={currentUser} />;
            case 'Billing': return <Billing user={currentUser} />;
            case 'GuardManagement': return <GuardManagement user={currentUser} />;
            case 'ClientManagement': return <ClientManagement user={currentUser} />;
            case 'MissionControl': return <MissionControl user={currentUser} />;
            case 'ActiveMissions': return <ActiveMissions user={currentUser} />;
            case 'Analytics': return <Analytics user={currentUser} />;
            case 'Approvals': return <Approvals user={currentUser} />;
            case 'SystemSettings': return <SystemSettings user={currentUser} />;
            case 'FieldOversight': return <FieldOversight user={currentUser} />;
            case 'TrainingApprovals': return <TrainingApprovals user={currentUser} />;
            case 'TrainingManagement': return <TrainingManagement user={currentUser} />;
            case 'SiteRoster': return <SiteRoster user={currentUser} />;
            case 'LiveControl': return <LiveControl user={currentUser} />;
            case 'Alerts': return <Alerts user={currentUser} />;
            case 'Applications': return <Applications user={currentUser} />;
            case 'Communications': return <Communications user={currentUser} />;
            case 'Earnings': return <Earnings user={currentUser} />;
            case 'ClientGuardRoster': return <ClientGuardRoster user={currentUser} />;
            case 'HallOfFame': return <HallOfFame user={currentUser} />;
            case 'Payroll': return <Payroll user={currentUser} />;
            case 'VehicleManagement': return <VehicleManagement user={currentUser} />;
            case 'Promotions': return <Promotions user={currentUser} />;
            case 'Appeals': return <Appeals user={currentUser} />;
            case 'MyContracts': return <MyContracts user={currentUser} />;
            case 'ContractApprovals': return <ContractApprovals user={currentUser} />;
            default: return <DashboardView user={currentUser} />;
        }
    };

    return (
        <div className="relative h-screen md:flex overflow-hidden bg-[var(--bg-primary)]">
            <div className={`fixed inset-y-0 left-0 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0`}>
                <Sidebar currentUser={currentUser} activeView={activeView} setActiveView={setActiveView} />
            </div>

            <div className="flex-1 flex flex-col w-full">
                 <header className="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)] shadow-sm sticky top-0 z-20 w-full">
                  <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[var(--text-secondary)] mr-4 p-2 rounded-md hover:bg-[var(--border-tertiary)]">
                            {isMobileMenuOpen ? <Icons.X className="h-6 w-6"/> : <Icons.Menu className="h-6 w-6" />}
                        </button>
                        <Icons.Shield className='w-8 h-8 text-[var(--accent-primary)] mr-3' />
                        <h1 className="text-lg font-bold text-[var(--text-primary)] hidden sm:block">
                          Signature Security <span className="font-light text-[var(--accent-primary)]">Specialists</span>
                        </h1>
                      </div>
                      <button onClick={onLogout} className="flex items-center bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition">
                        <Icons.Logout className='w-5 h-5 md:mr-2' />
                        <span className="hidden md:block">Logout</span>
                      </button>
                    </div>
                  </div>
                </header>
                <main id="dashboard-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {renderActiveView()}
                </main>
            </div>
        </div>
    );
};

export default DashboardScreen;
