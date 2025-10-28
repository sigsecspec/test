import React, { useState, useEffect } from 'react';
import { User, Mission, Client, Site, Alert, Application, Approval, SpotCheck, HallOfFameEntry, SystemSettings } from './types';
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
  getHallOfFameEntries,
  getSystemSettings,
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
  updateMission as dbUpdateMission,
  cancelMission as dbCancelMission,
  updateUser as dbUpdateUser,
  deleteUser as dbDeleteUser,
  addClient as dbAddClient,
  updateClient as dbUpdateClient,
  deleteClient as dbDeleteClient,
  updateSite as dbUpdateSite,
  deleteSite as dbDeleteSite,
  updateSystemSettings as dbUpdateSystemSettings,
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
  const [hallOfFameEntries, setHallOfFameEntries] = useState<HallOfFameEntry[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(null);
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
    setHallOfFameEntries(getHallOfFameEntries());
    setSystemSettings(getSystemSettings());
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

  const handleClaimMission = (missionId: string, guardId: string) => { dbClaimMission(missionId, guardId); loadData(); };
  const handleAddMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => { dbAddMission(missionData); loadData(); };
  const handleUpdateApplication = (appId: string, status: 'Approved' | 'Denied') => { dbUpdateApplicationStatus(appId, status); loadData(); };
  const handleProcessApproval = (approvalId: string) => { dbRemoveApproval(approvalId); loadData(); };
  const handleAcknowledgeAlert = (alertId: string) => { dbAcknowledgeAlert(alertId); loadData(); };
  const handleAddSite = (siteData: Omit<Site, 'id'>) => { dbAddSite(siteData); loadData(); };
  const handleMissionCheckIn = (missionId: string) => { dbMissionCheckIn(missionId); loadData(); };
  const handleMissionCheckOut = (missionId: string) => { dbMissionCheckOut(missionId); loadData(); };
  const handleSubmitReport = (missionId: string, report: string) => { dbSubmitMissionReport(missionId, report); loadData(); };
  const handleRateMission = (missionId: string, rating: number) => { dbRateMission(missionId, rating); loadData(); };
  const handleAddSpotCheck = (spotCheck: Omit<SpotCheck, 'id' | 'time'>) => { dbAddSpotCheck(spotCheck); loadData(); };
  const handleUpdateRank = (userId: string, rank: string, level: number) => { dbUpdateUserRank(userId, rank, level); loadData(); };
  const handleUpdateCerts = (userId: string, certs: string[]) => { dbUpdateUserCertifications(userId, certs); loadData(); };
  const handleUpdateClientGuardList = (clientId: string, guardId: string, list: 'whitelist' | 'blacklist', action: 'add' | 'remove') => { dbUpdateClientGuardList(clientId, guardId, list, action); loadData(); };
  
  const handleUpdateMission = (missionId: string, data: Partial<Mission>) => { dbUpdateMission(missionId, data); loadData(); };
  const handleCancelMission = (missionId: string) => { dbCancelMission(missionId); loadData(); };
  const handleUpdateUser = (userId: string, data: Partial<User>) => { dbUpdateUser(userId, data); loadData(); };
  const handleDeleteUser = (userId: string) => { dbDeleteUser(userId); loadData(); };
  const handleAddClient = (data: Omit<Client, 'id' | 'userId' | 'whitelist' | 'blacklist'>, userId?: string) => { dbAddClient(data, userId); loadData(); };
  const handleUpdateClient = (clientId: string, data: Partial<Client>) => { dbUpdateClient(clientId, data); loadData(); };
  const handleDeleteClient = (clientId: string) => { dbDeleteClient(clientId); loadData(); };
  const handleUpdateSite = (siteId: string, data: Partial<Site>) => { dbUpdateSite(siteId, data); loadData(); };
  const handleDeleteSite = (siteId: string) => { dbDeleteSite(siteId); loadData(); };
  const handleUpdateSystemSettings = (settings: SystemSettings) => { dbUpdateSystemSettings(settings); loadData(); };

  if (isLoading || !systemSettings) {
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
          hallOfFameEntries={hallOfFameEntries}
          systemSettings={systemSettings}
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
          onUpdateMission={handleUpdateMission}
          onCancelMission={handleCancelMission}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          onAddClient={handleAddClient}
          onUpdateClient={handleUpdateClient}
          onDeleteClient={handleDeleteClient}
          onUpdateSite={handleUpdateSite}
          onDeleteSite={handleDeleteSite}
          onUpdateSystemSettings={handleUpdateSystemSettings}
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