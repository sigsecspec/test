import { UserRole } from './types.ts';
// FIX: Added missing type imports for the new training system.
import type { User, Mission, Client, Site, Alert, Application, Approval, ApplicationStatus, SpotCheck, HallOfFameEntry, SystemSettings, IncidentReport, Vehicle, PayrollRun, PayrollEntry, Promotion, Appeal, Contract, TrainingModule, UserTrainingProgress } from './types.ts';

// Let's define the shape of our database
interface Database {
  users: User[];
  missions: Mission[];
  clients: Client[];
  sites: Site[];
  alerts: Alert[];
  applications: Application[];
  approvals: Approval[];
  spotChecks: SpotCheck[];
  contracts: Contract[];
  hallOfFame: HallOfFameEntry[];
  systemSettings: SystemSettings;
  incidentReports: IncidentReport[];
  vehicles: Vehicle[];
  payrollRuns: PayrollRun[];
  payrollEntries: PayrollEntry[];
  promotions: Promotion[];
  appeals: Appeal[];
  // FIX: Added tables for the training system.
  trainingModules: TrainingModule[];
  userTrainingProgress: UserTrainingProgress[];
}

// Initial seed data
const initialData: Database = {
  users: [
    // Owner
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'm.white@signaturesecurityspecialist.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 5.0 },
    
    // Team 1 Operations
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'j.lyons@signaturesecurityspecialist.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-1' },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 't.moreno@signaturesecurityspecialist.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-1' },
    
    // Team 2 Operations
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'b.baker@signaturesecurityspecialist.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-2' },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'r.granum@signaturesecurityspecialist.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-2' },
  ],
  clients: [],
  missions: [],
  sites: [],
  alerts: [],
  applications: [],
  approvals: [],
  spotChecks: [],
  contracts: [],
  systemSettings: {
    companyName: 'Signature Security Specialists',
    payrollCycle: 'Bi-Weekly',
  },
  hallOfFame: [],
  incidentReports: [],
  vehicles: [],
  payrollRuns: [],
  payrollEntries: [],
  promotions: [],
  appeals: [],
  // FIX: Added seed data for training modules and an empty array for user progress.
  trainingModules: [
    { id: 'tm-1', title: 'Level 1 - Basic Security', type: 'guard', duration: '2 hours', content: 'Covers basic security procedures, customer service, incident reporting, and emergency response.', quiz: [{ q: 'What is the first step in an emergency?', a: 'Assess the situation' }] },
    { id: 'tm-2', title: 'Level 2 - Pepper Spray', type: 'guard', duration: '1.5 hours', content: 'Covers pepper spray usage, defensive tactics, and de-escalation.', quiz: [{ q: 'What is the effective range of pepper spray?', a: '10-15 feet' }] },
    { id: 'tm-3', title: 'Level 3 - Taser Certified', type: 'guard', duration: '3 hours', content: 'Covers Taser operation, use of force policies, and legal training.', quiz: [{ q: 'What does Taser stand for?', a: "Thomas A. Swift's Electric Rifle" }] },
    { id: 'tm-4', title: 'Level 4 - Baton Certified', type: 'guard', duration: '4 hours', content: 'Covers baton usage, comprehensive defensive tactics, and advanced use of force.', quiz: [{ q: 'What is the primary target area for a baton strike?', a: 'Large muscle groups' }] },
    { id: 'tm-5', title: 'Level 5 - Armed Security', type: 'guard', duration: '8 hours', content: 'Covers firearms proficiency, legal implications, and tactical training.', quiz: [{ q: 'What are the four universal firearm safety rules?', a: "Treat every firearm as if it's loaded; Never point a firearm at anything you are not willing to destroy; Keep your finger off the trigger until you are ready to shoot; Be sure of your target and what is beyond it." }] },
    { id: 'tm-lead-1', title: 'Lead Guard Principles', type: 'lead-guard', duration: '2 hours', content: 'Covers site leadership, team coordination, and client liaison.', quiz: [{ q: 'What is a key responsibility of a Lead Guard?', a: 'Client communication' }] },
    { id: 'tm-sup-1', title: 'Supervisor Training', type: 'supervisor', duration: '6 hours', content: 'Covers spot checks, quality assurance, and field oversight.', quiz: [{ q: 'How many spot checks are required per shift?', a: '3' }] },
    { id: 'tm-to-1', title: 'Training Officer Course', type: 'training-officer', duration: '4 hours', content: 'Covers training management and certification tracking.', quiz: [{ q: 'What is the main role of a Training Officer?', a: 'Manage guard training and certifications' }] },
  ],
  userTrainingProgress: [],
};

const DB_KEY = 'sss_db';

// --- Internal DB Functions ---
const readDB = (): Database => {
  const dbString = localStorage.getItem(DB_KEY);
  if (!dbString) {
    writeDB(initialData);
    return initialData;
  }
  const db = JSON.parse(dbString);
  // Date hydration
  db.missions = (db.missions || []).map((m: any) => ({
      ...m,
      startTime: new Date(m.startTime),
      endTime: new Date(m.endTime),
      checkIns: (m.checkIns || []).map((ci: any) => ({ ...ci, time: new Date(ci.time) })),
      checkOuts: (m.checkOuts || []).map((co: any) => ({ ...co, time: new Date(co.time) })),
      reports: (m.reports || []).map((r: any) => ({ ...r, time: new Date(r.time) })),
  }));
   db.spotChecks = (db.spotChecks || []).map((sc: any) => ({
       ...sc,
       time: new Date(sc.time),
   }));
   db.incidentReports = (db.incidentReports || []).map((ir: any) => ({
      ...ir,
      timestamp: new Date(ir.timestamp),
   }));
    db.payrollRuns = (db.payrollRuns || []).map((pr: any) => ({
      ...pr,
      startDate: new Date(pr.startDate),
      endDate: new Date(pr.endDate),
    }));
    db.promotions = (db.promotions || []).map((p: any) => ({ ...p, dateApplied: new Date(p.dateApplied) }));
    db.appeals = (db.appeals || []).map((a: any) => ({ ...a, dateSubmitted: new Date(a.dateSubmitted) }));
    db.contracts = (db.contracts || []).map((c: any) => ({
      ...c,
      startDate: new Date(c.startDate),
      endDate: new Date(c.endDate),
    }));

  // Add new tables if they don't exist
  db.hallOfFame = db.hallOfFame || [];
  db.systemSettings = db.systemSettings || initialData.systemSettings;
  db.incidentReports = db.incidentReports || [];
  db.vehicles = db.vehicles || [];
  db.payrollRuns = db.payrollRuns || [];
  db.payrollEntries = db.payrollEntries || [];
  db.promotions = db.promotions || [];
  db.appeals = db.appeals || [];
  db.contracts = db.contracts || [];
  // FIX: Ensure training tables exist on load.
  db.trainingModules = db.trainingModules || [];
  db.userTrainingProgress = db.userTrainingProgress || [];


  return db;
};

const writeDB = (db: Database) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event('storage'));
};

// --- Public API ---
export const initializeDB = () => { readDB(); };
export const getUserByEmail = (email: string): User | undefined => readDB().users.find(u => u.email.toLowerCase() === email.toLowerCase());
export const getUserById = (id: string): User | undefined => readDB().users.find(u => u.id === id);
export const getUsers = (roles?: UserRole[]): User[] => {
    const db = readDB();
    if (!roles) return db.users;
    return db.users.filter(u => roles.includes(u.role));
};
export const getMissions = (): Mission[] => readDB().missions.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
export const getClients = (): Client[] => readDB().clients;
export const getClientById = (id: string): Client | undefined => readDB().clients.find(c => c.id === id);
export const getSites = (): Site[] => readDB().sites || [];
export const getAlerts = (): Alert[] => readDB().alerts.filter(a => !a.acknowledged) || [];
export const getApplications = (): Application[] => readDB().applications.filter(a => a.status === 'Pending') || [];
export const getApprovals = (): Approval[] => readDB().approvals || [];
export const getSpotChecksForMission = (missionId: string): SpotCheck[] => readDB().spotChecks.filter(sc => sc.missionId === missionId);
export const getHallOfFameEntries = (): HallOfFameEntry[] => readDB().hallOfFame || [];
export const getSystemSettings = (): SystemSettings => readDB().systemSettings;
export const getIncidentReports = (): IncidentReport[] => readDB().incidentReports || [];
export const getVehicles = (): Vehicle[] => readDB().vehicles || [];
export const getPayrollRuns = (): PayrollRun[] => readDB().payrollRuns.sort((a, b) => b.startDate.getTime() - a.startDate.getTime()) || [];
export const getPayrollEntriesForRun = (runId: string): PayrollEntry[] => readDB().payrollEntries.filter(p => p.payrollRunId === runId) || [];
export const getPromotions = (): Promotion[] => readDB().promotions || [];
export const getAppeals = (): Appeal[] => readDB().appeals || [];
export const getContracts = (): Contract[] => readDB().contracts;

export const addContract = (contractData: Omit<Contract, 'id' | 'status'>): void => {
    const db = readDB();
    const newContract: Contract = {
        ...contractData,
        id: `contract-${Date.now()}`,
        status: 'Pending'
    };
    db.contracts.push(newContract);
    db.approvals.push({ id: `appr-${Date.now()}`, type: 'Contract', subject: `New Contract: ${contractData.title}`, details: `Client ID: ${contractData.clientId}`, requesterId: 'system' });
    writeDB(db);
};

export const updateContractStatus = (contractId: string, status: 'Active' | 'Cancelled'): void => {
    const db = readDB();
    const contract = db.contracts.find(c => c.id === contractId);
    if (contract) {
        contract.status = status;
        writeDB(db);
    }
};

export const addApplication = (appData: Omit<Application, 'id' | 'status'>): void => {
    const db = readDB();
    const newApplication: Application = {
        ...appData,
        id: `app-${Date.now()}`,
        status: 'Pending',
    };
    db.applications.push(newApplication);
    writeDB(db);
};

export const addMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy' | 'checkIns' | 'checkOuts' | 'reports'>): Mission => {
    const db = readDB();
    const contract = db.contracts.find(c => c.id === missionData.contractId);
    if (!contract || contract.status !== 'Active') {
        console.error("Cannot add mission to inactive contract");
        return missionData as Mission;
    }
    
    const missionDuration = (missionData.endTime.getTime() - missionData.startTime.getTime()) / 3600000;
    const missionCost = missionDuration * missionData.payRate * missionData.requiredGuards;
    
    const missionsOnContract = db.missions.filter(m => m.contractId === missionData.contractId && m.status !== 'Cancelled');
    const spentBudget = missionsOnContract.reduce((acc, m) => {
        const duration = (m.endTime.getTime() - m.startTime.getTime()) / 3600000;
        return acc + (duration * m.payRate * m.requiredGuards);
    }, 0);
    const remainingBudget = contract.totalBudget - spentBudget;
    
    if (missionCost > remainingBudget) {
        db.alerts.push({ id: `alert-${Date.now()}`, severity: 'High', message: `Mission "${missionData.title}" exceeds contract budget.`, time: new Date().toISOString(), acknowledged: false });
    }

    const newMission: Mission = { 
        ...missionData, 
        id: `mission-${Date.now()}`, 
        status: 'Open', 
        claimedBy: [], 
        checkIns: [],
        checkOuts: [],
        reports: [],
        incidentIds: [] 
    };
    db.missions.push(newMission);
    writeDB(db);
    return newMission;
};

export const claimMission = (missionId: string, guardId: string): { success: boolean, message: string } => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    const guard = db.users.find(u => u.id === guardId);
    const client = db.clients.find(c => c.id === mission?.clientId);

    if (!mission || !guard || !client) return { success: false, message: "Invalid data." };
    if (mission.status !== 'Open') return { success: false, message: "Mission is not available." };
    if (mission.claimedBy.length >= mission.requiredGuards) return { success: false, message: "All slots for this mission are filled." };
    if (mission.claimedBy.includes(guardId)) return { success: false, message: "You have already claimed this mission." };
    if (client.blacklist.includes(guardId)) return { success: false, message: "You are blacklisted by this client." };

    const missionDuration = (mission.endTime.getTime() - mission.startTime.getTime()) / 3600000;
    if (guard.weeklyHours + missionDuration > 40) {
         db.alerts.push({ id: `alert-${Date.now()}`, severity: 'Medium', message: `Guard ${guard.firstName} ${guard.lastName} exceeded 40hr week limit.`, time: new Date().toISOString(), acknowledged: false });
    }
    
    mission.claimedBy.push(guardId);
    if (mission.claimedBy.length === mission.requiredGuards) {
        mission.status = 'Claimed';
    }
    
    writeDB(db);
    return { success: true, message: "Mission claimed!" };
};

export const updateApplicationStatus = (applicationId: string, status: ApplicationStatus): void => {
    const db = readDB();
    const application = db.applications.find(a => a.id === applicationId);
    if (!application) return;
    
    application.status = status;
    if (status === 'Approved') {
        if (application.type === 'New Guard' || application.type === 'New Supervisor') {
            const newUserData = application.data as Partial<User>;
            const id = `user-${Date.now()}`;
            db.users.push({
                id,
                firstName: newUserData.firstName || 'N/A', lastName: newUserData.lastName || 'N/A', email: newUserData.email || `${id}@sss.com`,
                role: newUserData.role || UserRole.Guard, rank: newUserData.rank || 'OFC (Officer)', level: newUserData.level || 1, certifications: newUserData.certifications || [],
                weeklyHours: 0, performanceRating: 0
            });
        } else if (application.type === 'New Client') {
            const newClientData = application.data as Partial<Client>;
            const clientId = `client-${Date.now()}`;
            const userId = `user-${Date.now() + 1}`;

            // Create a new User for the Client to log in with
            db.users.push({
                id: userId,
                firstName: newClientData.companyName || 'Client',
                lastName: 'Account',
                email: newClientData.contactEmail || `${userId}@unknown.com`,
                role: UserRole.Client,
                rank: 'Client',
                level: 0,
                certifications: [],
                weeklyHours: 0,
                performanceRating: 0,
            });

            // Create the Client profile and link it to the new User
            db.clients.push({
                id: clientId,
                companyName: newClientData.companyName || 'New Client',
                contactEmail: newClientData.contactEmail || 'no-email@provided.com',
                userId: userId, // Link to the created user
                whitelist: [],
                blacklist: [],
            });
        }
    }
    writeDB(db);
};

export const removeApproval = (approvalId: string): void => {
    const db = readDB();
    db.approvals = db.approvals.filter(a => a.id !== approvalId);
    writeDB(db);
};

export const acknowledgeAlert = (alertId: string): void => {
    const db = readDB();
    const alert = db.alerts.find(a => a.id === alertId);
    if (alert) alert.acknowledged = true;
    writeDB(db);
};

export const addSite = (siteData: Omit<Site, 'id'>): Site => {
    const db = readDB();
    const newSite: Site = { ...siteData, id: `site-${Date.now()}` };
    db.sites.push(newSite);
    writeDB(db);
    return newSite;
};

export const missionCheckIn = (missionId: string, guardId: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && (mission.status === 'Claimed' || mission.status === 'Active')) {
        if (mission.checkIns.length === 0) {
            mission.status = 'Active';
        }
        if (!mission.checkIns.some(c => c.guardId === guardId)) {
            mission.checkIns.push({ guardId, time: new Date() });
            writeDB(db);
        }
    }
};

export const missionCheckOut = (missionId: string, guardId: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'Active' && mission.checkIns.some(c => c.guardId === guardId) && !mission.checkOuts.some(c => c.guardId === guardId)) {
        mission.checkOuts.push({ guardId, time: new Date() });

        const checkIn = mission.checkIns.find(c => c.guardId === guardId);
        if (checkIn) {
            const duration = (new Date().getTime() - checkIn.time.getTime()) / 3600000;
            const guard = db.users.find(u => u.id === guardId);
            if (guard) guard.weeklyHours += duration;
        }

        if (mission.checkOuts.length >= mission.claimedBy.length) {
            mission.status = 'AwaitingReport';
        }
        writeDB(db);
    }
};

export const submitMissionReport = (missionId: string, guardId: string, report: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && (mission.status === 'AwaitingReport' || mission.status === 'Active')) {
        mission.reports.push({ guardId, report, time: new Date() });
        if (mission.reports.length >= mission.checkOuts.length && mission.checkOuts.length > 0) {
            mission.status = 'Completed';
        }
        writeDB(db);
    }
};

export const addIncidentReport = (reportData: Omit<IncidentReport, 'id' | 'timestamp'>) => {
    const db = readDB();
    const newReport: IncidentReport = {
        ...reportData,
        id: `inc-${Date.now()}`,
        timestamp: new Date(),
    };
    db.incidentReports.push(newReport);
    const mission = db.missions.find(m => m.id === reportData.missionId);
    if (mission) {
        if (!mission.incidentIds) mission.incidentIds = [];
        mission.incidentIds.push(newReport.id);
    }
    writeDB(db);
};

export const rateMission = (missionId: string, rating: number) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if(mission && mission.status === 'Completed' && !mission.clientRating) {
        mission.clientRating = rating;
        mission.claimedBy.forEach(guardId => {
            const guard = db.users.find(u => u.id === guardId);
            if(guard) {
                const completedMissions = db.missions.filter(m => m.claimedBy.includes(guard.id) && m.clientRating);
                const totalRating = completedMissions.reduce((sum, m) => sum + (m.clientRating || 0), 0);
                guard.performanceRating = totalRating / completedMissions.length;
            }
        });
        writeDB(db);
    }
};

export const addSpotCheck = (spotCheckData: Omit<SpotCheck, 'id' | 'time'>) => {
    const db = readDB();
    const newSpotCheck: SpotCheck = { ...spotCheckData, id: `sc-${Date.now()}`, time: new Date() };
    db.spotChecks.push(newSpotCheck);
    writeDB(db);
};

export const updateUserRank = (userId: string, newRank: string, newLevel: number) => {
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (user) {
        user.rank = newRank;
        user.level = newLevel;
        writeDB(db);
    }
};

export const updateUserCertifications = (userId: string, certifications: string[]) => {
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (user) {
        user.certifications = certifications;
        writeDB(db);
    }
};

export const updateMission = (missionId: string, missionData: Partial<Omit<Mission, 'id'>>): Mission | undefined => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission) {
        Object.assign(mission, missionData);
        if (typeof mission.startTime === 'string') mission.startTime = new Date(mission.startTime);
        if (typeof mission.endTime === 'string') mission.endTime = new Date(mission.endTime);
        writeDB(db);
        return mission;
    }
    return undefined;
};

export const cancelMission = (missionId: string): void => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission) {
        mission.status = 'Cancelled';
        writeDB(db);
    }
};

export const updateUser = (userId: string, userData: Partial<User>): void => {
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    if (user) {
        Object.assign(user, userData);
        writeDB(db);
    }
};

export const deleteUser = (userId: string): void => {
    const db = readDB();
    if (userId === 'user-1') return;
    db.users = db.users.filter(u => u.id !== userId);
    db.missions.forEach(m => {
        const index = m.claimedBy.indexOf(userId);
        if (index > -1) {
            m.claimedBy.splice(index, 1);
            if (m.status === 'Claimed') {
                m.status = 'Open';
            }
        }
    });
    writeDB(db);
};

export const addClient = (clientData: Omit<Client, 'id' | 'userId' | 'whitelist' | 'blacklist'>, linkedUserId?: string): Client => {
    const db = readDB();
    const newClient: Client = {
        ...clientData,
        id: `client-${Date.now()}`,
        userId: linkedUserId || null,
        whitelist: [],
        blacklist: [],
    };
    db.clients.push(newClient);
    writeDB(db);
    return newClient;
};

export const updateClient = (clientId: string, clientData: Partial<Client>): void => {
    const db = readDB();
    const client = db.clients.find(c => c.id === clientId);
    if (client) {
        Object.assign(client, clientData);
        writeDB(db);
    }
};

export const deleteClient = (clientId: string): void => {
    const db = readDB();
    db.clients = db.clients.filter(c => c.id !== clientId);
    db.missions.forEach(m => {
        if (m.clientId === clientId) {
            m.status = 'Cancelled';
        }
    });
    writeDB(db);
};

export const updateSite = (siteId: string, siteData: Partial<Site>): void => {
    const db = readDB();
    const site = db.sites.find(s => s.id === siteId);
    if (site) {
        Object.assign(site, siteData);
        writeDB(db);
    }
};

export const deleteSite = (siteId: string): void => {
    const db = readDB();
    db.sites = db.sites.filter(s => s.id !== siteId);
    writeDB(db);
};

export const updateSystemSettings = (settings: SystemSettings): void => {
    const db = readDB();
    db.systemSettings = settings;
    writeDB(db);
};

export const updateClientGuardList = (clientId: string, guardId: string, listType: 'whitelist' | 'blacklist', action: 'add' | 'remove') => {
    const db = readDB();
    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    const otherList = listType === 'whitelist' ? client.blacklist : client.whitelist;
    const list = client[listType];

    if (action === 'add') {
        const indexInOther = otherList.indexOf(guardId);
        if (indexInOther > -1) otherList.splice(indexInOther, 1);
    }

    const indexInList = list.indexOf(guardId);
    if (action === 'add' && indexInList === -1) {
        list.push(guardId);
    } else if (action === 'remove' && indexInList > -1) {
        list.splice(indexInList, 1);
    }
    
    writeDB(db);
};

// Vehicle Management
export const addVehicle = (vehicleData: Omit<Vehicle, 'id'>): void => {
    const db = readDB();
    const newVehicle: Vehicle = { ...vehicleData, id: `veh-${Date.now()}` };
    db.vehicles.push(newVehicle);
    writeDB(db);
};

export const updateVehicle = (vehicleId: string, data: Partial<Vehicle>): void => {
    const db = readDB();
    const vehicle = db.vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        Object.assign(vehicle, data);
    }
    writeDB(db);
};

// Payroll Management
export const createPayrollRun = (startDate: Date, endDate: Date): void => {
    const db = readDB();
    const runId = `pr-${Date.now()}`;
    const missionsInPeriod = db.missions.filter(m => m.status === 'Completed' && m.checkOuts.length > 0 && m.checkOuts[0].time >= startDate && m.checkOuts[0].time <= endDate);
    
    let totalAmount = 0;
    const newEntries: PayrollEntry[] = [];

    missionsInPeriod.forEach(mission => {
        mission.checkOuts.forEach(checkout => {
            const checkin = mission.checkIns.find(ci => ci.guardId === checkout.guardId);
            if (!checkin) return;
            
            const alreadyProcessed = db.payrollEntries.some(e => e.missionId === mission.id && e.userId === checkout.guardId);
            if (alreadyProcessed) return;

            const hours = (checkout.time.getTime() - checkin.time.getTime()) / 3600000;
            const totalPay = hours * mission.payRate;
            totalAmount += totalPay;
            newEntries.push({
                id: `pe-${mission.id}-${checkout.guardId}`,
                payrollRunId: runId,
                userId: checkout.guardId,
                missionId: mission.id,
                hours,
                payRate: mission.payRate,
                totalPay,
                paymentConfirmed: false,
            });
        })
    });

    const newRun: PayrollRun = {
        id: runId,
        startDate,
        endDate,
        status: 'Pending',
        totalAmount
    };

    db.payrollRuns.push(newRun);
    db.payrollEntries.push(...newEntries);
    writeDB(db);
};

export const approvePayrollRun = (runId: string): void => {
    const db = readDB();
    const run = db.payrollRuns.find(r => r.id === runId);
    if (run && run.status === 'Pending') {
        run.status = 'Approved';
        writeDB(db);
    }
};

export const confirmPayment = (entryId: string): void => {
    const db = readDB();
    const entry = db.payrollEntries.find(e => e.id === entryId);
    if(entry) {
        entry.paymentConfirmed = true;
    }
    const run = db.payrollRuns.find(r => r.id === entry?.payrollRunId);
    if(run && run.status === 'Approved') {
      const allConfirmed = db.payrollEntries.filter(e => e.payrollRunId === run.id).every(e => e.paymentConfirmed);
      if(allConfirmed) {
        run.status = 'Paid';
      }
    }
    writeDB(db);
};


// Promotions & Appeals
export const addPromotion = (promotionData: Omit<Promotion, 'id' | 'status' | 'dateApplied'>): void => {
    const db = readDB();
    const newPromotion: Promotion = { ...promotionData, id: `promo-${Date.now()}`, status: 'Pending', dateApplied: new Date() };
    db.promotions.push(newPromotion);
    writeDB(db);
};

export const updatePromotionStatus = (promotionId: string, status: 'Approved' | 'Denied'): void => {
    const db = readDB();
    const promotion = db.promotions.find(p => p.id === promotionId);
    if (promotion) {
        promotion.status = status;
        if (status === 'Approved') {
            const user = db.users.find(u => u.id === promotion.userId);
            if (user) {
                user.role = promotion.toRole;
                user.rank = promotion.toRole === UserRole.Supervisor ? 'SGT (Sergeant)' : 'CPL (Corporal)';
            }
        }
        writeDB(db);
    }
};

export const addAppeal = (appealData: Omit<Appeal, 'id' | 'status' | 'dateSubmitted'>): void => {
    const db = readDB();
    const newAppeal: Appeal = { ...appealData, id: `appeal-${Date.now()}`, status: 'Pending', dateSubmitted: new Date() };
    db.appeals.push(newAppeal);
    writeDB(db);
};

export const updateAppealStatus = (appealId: string, status: 'Approved' | 'Denied'): void => {
    const db = readDB();
    const appeal = db.appeals.find(a => a.id === appealId);
    if (appeal) {
        appeal.status = status;
        // Logic to handle approved appeal would go here, e.g., re-opening an application
        writeDB(db);
    }
};

// FIX: Added missing training functions
export const getTrainingModules = (): TrainingModule[] => readDB().trainingModules || [];

export const getUserTrainingProgress = (userId: string): UserTrainingProgress[] => {
    return readDB().userTrainingProgress.filter(p => p.userId === userId) || [];
};

export const completeTraining = (userId: string, moduleId: string, passed: boolean): void => {
    const db = readDB();
    let progress = db.userTrainingProgress.find(p => p.userId === userId && p.moduleId === moduleId);

    if (progress) {
        if (progress.status === 'Passed' || progress.status === 'Pending Approval') return; // Cannot retake passed/pending
        progress.attempts += 1;
        progress.status = passed ? 'Pending Approval' : 'Failed';
    } else {
        progress = {
            userId,
            moduleId,
            status: passed ? 'Pending Approval' : 'Failed',
            attempts: 1,
        };
        db.userTrainingProgress.push(progress);
    }

    if (passed) {
        const module = db.trainingModules.find(m => m.id === moduleId);
        const user = db.users.find(u => u.id === userId);
        if (module && user) {
             db.approvals.push({
                id: `appr-train-${Date.now()}`,
                type: 'Training',
                subject: `Training Completed: ${module.title}`,
                details: `${user.firstName} ${user.lastName} has passed the quiz and is awaiting approval.`,
                requesterId: userId,
            });
        }
    }
    
    writeDB(db);
};