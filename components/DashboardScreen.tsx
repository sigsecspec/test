import React from 'react';
import { UserRole } from '../types';

interface DashboardScreenProps {
  userRole: UserRole;
  onLogout: () => void;
}

const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);


const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

const DashboardScreen: React.FC<DashboardScreenProps> = ({ userRole, onLogout }) => {
  const getDashboardTitle = (role: UserRole) => {
    switch(role) {
      case UserRole.Owner:
      case UserRole.CoOwner:
        return "Company Control";
      case UserRole.OperationsDirector:
        return "Standards & Senior Approvals";
      case UserRole.OperationsManager:
        return "Daily Operations";
      case UserRole.Dispatch:
        return "Live Control";
      case UserRole.Secretary:
        return "Admin Support";
      case UserRole.Supervisor:
        return "Field Oversight";
      case UserRole.TrainingOfficer:
        return "Training & Readiness";
      case UserRole.FlexOfficer:
      case UserRole.BaseOfficer:
      case UserRole.LeadGuard:
      case UserRole.SeasonalOfficer:
        return "Frontline";
      case UserRole.Client:
        return "Service Consumer";
      default:
        return "Dashboard";
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#0f0f0f] border-b border-[#535347] shadow-lg shadow-[#aeae5a]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShieldIcon className="w-8 h-8 text-[#aeae5a] mr-3" />
              <h1 className="text-lg font-bold text-[#c4c4c4]">
                Signature Security <span className="font-light text-[#aeae5a]">Specialists</span>
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition"
            >
              <LogoutIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#c4c4c4]">Welcome to your Dashboard</h2>
          <p className="text-[#787876]">You are logged in as: <span className="font-semibold text-[#aeae5a]">{userRole}</span></p>
          <p className="text-lg text-[#c4c4c4] mt-2">Dashboard View: <span className="font-semibold text-[#aeae5a]">{getDashboardTitle(userRole)}</span></p>
        </div>
        
        <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#c4c4c4] border-b border-[#535347] pb-2 mb-4">System Status</h3>
          <p className="text-[#787876]">
            This is a placeholder for your role-specific dashboard content. All systems are currently operational.
            Based on your role as <span className="text-[#aeae5a]">{userRole}</span>, you would see relevant information here, such as mission feeds, analytics, user management, or incident reports.
          </p>
        </div>
      </main>

      <footer className="text-center py-4 text-[#535347] text-sm border-t border-[#535347]">
            <p>&copy; {new Date().getFullYear()} Signature Security Specialists. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardScreen;
