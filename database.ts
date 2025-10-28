import { UserRole } from './types';
import type { User, Mission, Client, Site, Alert, Application, Approval, ApplicationStatus, SpotCheck, HallOfFameEntry, SystemSettings, IncidentReport, Vehicle, PayrollRun, PayrollEntry } from './types';

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
  hallOfFame: HallOfFameEntry[];
  systemSettings: SystemSettings;
  incidentReports: IncidentReport[];
  vehicles: Vehicle[];
  payrollRuns: PayrollRun[];
  payrollEntries: PayrollEntry[];
}

// Initial seed data
const initialData: Database = {
  users: [
    { id: 'user-1', firstName: 'Admin', lastName: 'Owner', email: 'owner@sss.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-2', firstName: 'Jane', lastName: 'Doe', email: 'coowner@sss.com', role: UserRole.CoOwner, rank: 'ASST CHF (Asst. Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-3', firstName: 'John', lastName: 'Smith', email: 'director@sss.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-4', firstName: 'Emily', lastName: 'Jones', email: 'manager@sss.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 5, certifications: ['Management'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-5', firstName: 'Robert', lastName: 'Brown', email: 'secretary@sss.com', role: UserRole.Secretary, rank: 'N/A', level: 1, certifications: ['Admin'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-6', firstName: 'Mike', lastName: 'Davis', email: 'supervisor@sss.com', role: UserRole.Supervisor, rank: 'SGT (Sergeant)', level: 4, certifications: ['Level 4', 'Supervision'], guardType: 'Base', weeklyHours: 0, performanceRating: 0 },
    { id: 'user-7', firstName: 'Sarah', lastName: 'Wilson', email: 'training@sss.com', role: UserRole.TrainingOfficer, rank: 'CPL (Corporal)', level: 4, certifications: ['Level 4', 'Instructor'], guardType: 'Base', weeklyHours: 0, performanceRating: 0 },
    { id: 'user-8', firstName: 'David', lastName: 'Clark', email: 'leadguard@sss.com', role: UserRole.LeadGuard, rank: 'CPL (Corporal)', level: 3, certifications: ['Level 3', 'Lead'], guardType: 'Base', weeklyHours: 0, performanceRating: 0 },
    { id: 'user-9', firstName: 'Chris', lastName: 'Taylor', email: 'guard@sss.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 2, certifications: ['Level 2'], guardType: 'Flex', weeklyHours: 0, performanceRating: 0 },
    { id: 'user-10', firstName: 'Jessica', lastName: 'Miller', email: 'dispatch@sss.com', role: UserRole.Dispatch, rank: 'N/A', level: 1, certifications: ['Dispatch'], weeklyHours: 0, performanceRating: 0 },
    { id: 'user-11', firstName: 'Kevin', lastName: 'Harris', email: 'client@sss.com', role: UserRole.Client, rank: 'N/A', level: 0, certifications: [], weeklyHours: 0, performanceRating: 0 },
  ],
  clients: [],
  missions: [],
  sites: [],
  alerts: [],
  applications: [],
  approvals: [],
  spotChecks: [],
  systemSettings: {
    companyName: 'Signature Security Specialists',
    payrollCycle: 'Bi-Weekly',
  },
  hallOfFame: [],
  incidentReports: [],
  vehicles: [],
  payrollRuns: [],
  payrollEntries: [],
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
      checkInTime: m.checkInTime ? new Date(m.checkInTime) : undefined,
      checkOutTime: m.checkOutTime ? new Date(m.checkOutTime) : undefined,
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
  // Add new tables if they don't exist
  db.hallOfFame = db.hallOfFame || [];
  db.systemSettings = db.systemSettings || initialData.systemSettings;
  db.incidentReports = db.incidentReports || [];
  db.vehicles = db.vehicles || [];
  db.payrollRuns = db.payrollRuns || [];
  db.payrollEntries = db.payrollEntries || [];

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


export const addMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>): Mission => {
    const db = readDB();
    const newMission: Mission = { ...missionData, id: `mission-${Date.now()}`, status: 'Open', claimedBy: null, incidentIds: [] };
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
    if (client.blacklist.includes(guardId)) return { success: false, message: "You are blacklisted by this client." };

    const missionDuration = (mission.endTime.getTime() - mission.startTime.getTime()) / 3600000;
    if (guard.weeklyHours + missionDuration > 40) {
        // Allow override but create alert
         db.alerts.push({ id: `alert-${Date.now()}`, severity: 'Medium', message: `Guard ${guard.firstName} ${guard.lastName} exceeded 40hr week limit.`, time: 'now', acknowledged: false });
    }
    
    mission.status = 'Claimed';
    mission.claimedBy = guardId;
    writeDB(db);
    return { success: true, message: "Mission claimed!" };
};

export const updateApplicationStatus = (applicationId: string, status: ApplicationStatus): void => {
    const db = readDB();
    const application = db.applications.find(a => a.id === applicationId);
    if (!application) return;
    
    application.status = status;
    if (status === 'Approved') {
        const id = `user-${Date.now()}`;
        if (application.type === 'New Guard' || application.type === 'New Supervisor') {
            const newUserData = application.data as Partial<User>;
            db.users.push({
                id,
                firstName: newUserData.firstName || 'N/A', lastName: newUserData.lastName || 'N/A', email: newUserData.email || `${id}@sss.com`,
                role: newUserData.role || UserRole.Guard, rank: newUserData.rank || 'OFC (Officer)', level: newUserData.level || 1, certifications: newUserData.certifications || [],
                guardType: newUserData.guardType || 'Flex', weeklyHours: 0, performanceRating: 0
            });
        } else if (application.type === 'New Client') {
            const newClientData = application.data as Partial<Client>;
            db.clients.push({
                id: `client-${Date.now()}`,
                companyName: newClientData.companyName || 'New Client',
                contactEmail: newClientData.contactEmail || `contact@${Date.now()}.com`,
                userId: null, // Initially no user linked
                whitelist: [], blacklist: []
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

export const missionCheckIn = (missionId: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'Claimed') {
        mission.status = 'Active';
        mission.checkInTime = new Date();
        writeDB(db);
    }
};

export const missionCheckOut = (missionId: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'Active') {
        mission.status = 'AwaitingReport';
        mission.checkOutTime = new Date();
        const duration = (mission.checkOutTime.getTime() - (mission.checkInTime?.getTime() || mission.startTime.getTime())) / 3600000;
        const guard = db.users.find(u => u.id === mission.claimedBy);
        if (guard) guard.weeklyHours += duration;
        writeDB(db);
    }
};

export const submitMissionReport = (missionId: string, report: string) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'AwaitingReport') {
        mission.status = 'Completed';
        mission.report = report;
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
        const guard = db.users.find(u => u.id === mission.claimedBy);
        if(guard) {
            const completedMissions = db.missions.filter(m => m.claimedBy === guard.id && m.clientRating);
            const totalRating = completedMissions.reduce((sum, m) => sum + (m.clientRating || 0), 0);
            guard.performanceRating = totalRating / completedMissions.length;
        }
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
        if (m.claimedBy === userId) {
            m.claimedBy = null;
            m.status = 'Open';
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
    const missionsInPeriod = db.missions.filter(m => m.status === 'Completed' && m.checkOutTime && m.checkOutTime >= startDate && m.checkOutTime <= endDate);
    
    let totalAmount = 0;
    const newEntries: PayrollEntry[] = [];

    missionsInPeriod.forEach(mission => {
        if (!mission.checkOutTime || !mission.checkInTime || !mission.claimedBy) return;

        // Check if this mission is already in another payroll run
        const alreadyProcessed = db.payrollEntries.some(e => e.missionId === mission.id);
        if (alreadyProcessed) return;

        const hours = (mission.checkOutTime.getTime() - mission.checkInTime.getTime()) / 3600000;
        const totalPay = hours * mission.payRate;
        totalAmount += totalPay;
        newEntries.push({
            id: `pe-${mission.id}`,
            payrollRunId: runId,
            userId: mission.claimedBy,
            missionId: mission.id,
            hours,
            payRate: mission.payRate,
            totalPay,
        });
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
    if (run) {
        run.status = 'Approved'; // Can be extended to 'Paid' later
        writeDB(db);
    }
};