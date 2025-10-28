import React, { useState, useEffect } from 'react';
import { User, Mission, Client, Site, Alert, Application, Approval, SpotCheck } from './types';
import DashboardScreen from './components/DashboardScreen';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import { 
  initializeDB, 
  getUserByEmail, 
  getUsers, 
  getMissions, 
  getClients, 
  getSites,
  getAlerts,
  getApplications,
  getApprovals,
  getSpotChecksForMission,
  claimMission as dbClaimMission,
  addMission as dbAddMission,
  updateApplicationStatus as dbUpdateApplicationStatus,
  removeApproval as dbRemoveApproval,
  acknowledgeAlert as dbAcknowledgeAlert,
  addSite as dbAddSite,
  missionCheckIn as dbMissionCheckIn,
  missionCheckOut as dbMissionCheckOut,
  submitMissionReport as dbSubmitMissionReport,
  rateMission as dbRateMission,
  addSpotCheck as dbAddSpotCheck,
  updateUserRank as dbUpdateUserRank,
  updateUserCertifications as dbUpdateUserCertifications,
  updateClientGuardList as dbUpdateClientGuardList,
} from './database';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const loadData = () => {
    setUsers(getUsers());
    setMissions(getMissions());
    setClients(getClients());
    setSites(getSites());
    setAlerts(getAlerts());
    setApplications(getApplications());
    setApprovals(getApprovals());
  };

  useEffect(() => {
    initializeDB();
    loadData();
    setIsLoading(false);
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = (email: string) => {
    const user = getUserByEmail(email);
    if (user) setCurrentUser(user);
    setLoginModalOpen(false);
  };

  const handleLogout = () => setCurrentUser(null);

  const handleClaimMission = (missionId: string, guardId: string) => {
    dbClaimMission(missionId, guardId);
    loadData();
  };

  const handleAddMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => {
    dbAddMission(missionData);
    loadData();
  };

  const handleUpdateApplication = (appId: string, status: 'Approved' | 'Denied') => {
    dbUpdateApplicationStatus(appId, status);
    loadData();
  };

  const handleProcessApproval = (approvalId: string) => {
    dbRemoveApproval(approvalId);
    loadData();
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    dbAcknowledgeAlert(alertId);
    loadData();
  };

  const handleAddSite = (siteData: Omit<Site, 'id'>) => {
    dbAddSite(siteData);
    loadData();
  };

  const handleMissionCheckIn = (missionId: string) => { dbMissionCheckIn(missionId); loadData(); };
  const handleMissionCheckOut = (missionId: string) => { dbMissionCheckOut(missionId); loadData(); };
  const handleSubmitReport = (missionId: string, report: string) => { dbSubmitMissionReport(missionId, report); loadData(); };
  const handleRateMission = (missionId: string, rating: number) => { dbRateMission(missionId, rating); loadData(); };
  const handleAddSpotCheck = (spotCheck: Omit<SpotCheck, 'id' | 'time'>) => { dbAddSpotCheck(spotCheck); loadData(); };
  const handleUpdateRank = (userId: string, rank: string, level: number) => { dbUpdateUserRank(userId, rank, level); loadData(); };
  const handleUpdateCerts = (userId: string, certs: string[]) => { dbUpdateUserCertifications(userId, certs); loadData(); };
  const handleUpdateClientGuardList = (clientId: string, guardId: string, list: 'whitelist' | 'blacklist', action: 'add' | 'remove') => {
    dbUpdateClientGuardList(clientId, guardId, list, action);
    loadData();
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c4c4c4]">Loading System...</div>
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {currentUser ? (
        <DashboardScreen 
          user={currentUser} 
          users={users}
          missions={missions}
          clients={clients}
          sites={sites}
          alerts={alerts}
          applications={applications}
          approvals={approvals}
          onLogout={handleLogout}
          onClaimMission={handleClaimMission}
          onAddMission={handleAddMission}
          onUpdateApplication={handleUpdateApplication}
          onProcessApproval={handleProcessApproval}
          onAcknowledgeAlert={handleAcknowledgeAlert}
          onAddSite={handleAddSite}
          onCheckIn={handleMissionCheckIn}
          onCheckOut={handleMissionCheckOut}
          onSubmitReport={handleSubmitReport}
          onRateMission={handleRateMission}
          onAddSpotCheck={handleAddSpotCheck}
          onUpdateRank={handleUpdateRank}
          onUpdateCerts={handleUpdateCerts}
          onUpdateClientGuardList={handleUpdateClientGuardList}
        />
      ) : (
        <>
            <HomePage onOpenLoginModal={() => setLoginModalOpen(true)} />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
                users={users} 
                onLogin={handleLogin}
            />
        </>
      )}
    </div>
  );
};

export default App;
