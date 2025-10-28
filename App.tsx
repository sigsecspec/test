import React, { useState, useEffect } from 'react';
import { User, Mission, Client, Site, Alert, Application, Approval, SpotCheck, HallOfFameEntry, SystemSettings, IncidentReport, Vehicle, PayrollRun, PayrollEntry, Promotion, Appeal, UserRole } from './types.ts';
import DashboardScreen from './components/DashboardScreen.tsx';
import HomePage from './components/HomePage.tsx';
import LoginModal from './components/LoginModal.tsx';
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
  getIncidentReports,
  getVehicles,
  getPayrollRuns,
  getPromotions,
  getAppeals,
  claimMission as dbClaimMission,
  addMission as dbAddMission,
  updateApplicationStatus as dbUpdateApplicationStatus,
  removeApproval as dbRemoveApproval,
  acknowledgeAlert as dbAcknowledgeAlert,
  addSite as dbAddSite,
  missionCheckIn as dbMissionCheckIn,
  missionCheckOut as dbMissionCheckOut,
  submitMissionReport as dbSubmitMissionReport,
  addIncidentReport as dbAddIncidentReport,
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
  addVehicle as dbAddVehicle,
  updateVehicle as dbUpdateVehicle,
  createPayrollRun as dbCreatePayrollRun,
  approvePayrollRun as dbApprovePayrollRun,
  confirmPayment as dbConfirmPayment,
  addPromotion as dbAddPromotion,
  updatePromotionStatus as dbUpdatePromotionStatus,
  addAppeal as dbAddAppeal,
  updateAppealStatus as dbUpdateAppealStatus,
} from './database.ts';

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
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [appeals, setAppeals] = useState<Appeal[]>([]);
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
    setIncidentReports(getIncidentReports());
    setVehicles(getVehicles());
    setPayrollRuns(getPayrollRuns());
    setPromotions(getPromotions());
    setAppeals(getAppeals());
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
    const result = dbClaimMission(missionId, guardId);
    if (!result.success) {
      alert(`Mission Claim Failed: ${result.message}`);
    }
    loadData(); 
  };
  const handleAddMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => { dbAddMission(missionData); loadData(); };
  const handleUpdateApplication = (appId: string, status: 'Approved' | 'Denied') => { dbUpdateApplicationStatus(appId, status); loadData(); };
  const handleProcessApproval = (approvalId: string) => { dbRemoveApproval(approvalId); loadData(); };
  const handleAcknowledgeAlert = (alertId: string) => { dbAcknowledgeAlert(alertId); loadData(); };
  const handleAddSite = (siteData: Omit<Site, 'id'>) => { dbAddSite(siteData); loadData(); };
  const handleMissionCheckIn = (missionId: string) => { dbMissionCheckIn(missionId); loadData(); };
  const handleMissionCheckOut = (missionId: string) => { dbMissionCheckOut(missionId); loadData(); };
  const handleSubmitReport = (missionId: string, report: string) => { dbSubmitMissionReport(missionId, report); loadData(); };
  const handleAddIncidentReport = (reportData: Omit<IncidentReport, 'id' | 'timestamp'>) => { dbAddIncidentReport(reportData); loadData(); };
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
  const handleAddVehicle = (data: Omit<Vehicle, 'id'>) => { dbAddVehicle(data); loadData(); };
  const handleUpdateVehicle = (id: string, data: Partial<Vehicle>) => { dbUpdateVehicle(id, data); loadData(); };
  const handleCreatePayrollRun = (startDate: Date, endDate: Date) => { dbCreatePayrollRun(startDate, endDate); loadData(); };
  const handleApprovePayrollRun = (id: string) => { dbApprovePayrollRun(id); loadData(); };
  const handleConfirmPayment = (entryId: string) => { dbConfirmPayment(entryId); loadData(); };
  const handleAddPromotion = (data: Omit<Promotion, 'id' | 'status' | 'dateApplied'>) => { dbAddPromotion(data); loadData(); };
  const handleUpdatePromotionStatus = (id: string, status: 'Approved' | 'Denied') => { dbUpdatePromotionStatus(id, status); loadData(); };
  const handleAddAppeal = (data: Omit<Appeal, 'id' | 'status' | 'dateSubmitted'>) => { dbAddAppeal(data); loadData(); };
  const handleUpdateAppealStatus = (id: string, status: 'Approved' | 'Denied') => { dbUpdateAppealStatus(id, status); loadData(); };


  if (isLoading || !systemSettings) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-700">Loading System...</div>
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
          incidentReports={incidentReports}
          vehicles={vehicles}
          payrollRuns={payrollRuns}
          promotions={promotions}
          appeals={appeals}
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
          onAddIncidentReport={handleAddIncidentReport}
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
          onAddVehicle={handleAddVehicle}
          onUpdateVehicle={handleUpdateVehicle}
          onCreatePayrollRun={handleCreatePayrollRun}
          onApprovePayrollRun={handleApprovePayrollRun}
          onConfirmPayment={handleConfirmPayment}
          onAddPromotion={handleAddPromotion}
          onUpdatePromotionStatus={handleUpdatePromotionStatus}
          onAddAppeal={handleAddAppeal}
          onUpdateAppealStatus={handleUpdateAppealStatus}
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