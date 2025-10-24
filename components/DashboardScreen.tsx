import React, { useState } from 'react';
import { User } from '../types';
import Sidebar from './Sidebar';
import { ShieldIcon, LogoutIcon, MenuIcon } from './Icons';

// Import View Components
import MissionBoard from './views/MissionBoard';
import PostMission from './views/PostMission';

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onLogout }) => {
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
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#c4c4c4] border-b border-[#535347] pb-2 mb-4">System Status</h3>
              <p className="text-[#787876]">
                This is a placeholder for your role-specific dashboard content. All systems are currently operational.
                Based on your role as <span className="text-[#aeae5a]">{user.role}</span>, you would see relevant information here, such as mission feeds, analytics, user management, or incident reports.
              </p>
            </div>
          </>
        );
      case 'Mission Board':
        return <MissionBoard user={user} />;
      case 'Post Mission':
        return <PostMission />;
      // Add other views here as they are created
      default:
        return (
          <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#c4c4c4]">{activeView}</h3>
            <p className="text-[#787876]">Content for {activeView} is under construction.</p>
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