import { UserRole } from './types';
import type { User, Mission, Client, Site, Alert, Application, Approval, ApplicationStatus, SpotCheck, HallOfFameEntry, SystemSettings } from './types';

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
}

// Initial seed data
const initialData: Database = {
  users: [
    { id: 'user-1', firstName: 'Admin', lastName: 'Owner', email: 'owner@sss.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-2', firstName: 'Jane', lastName: 'Doe', email: 'coowner@sss.com', role: UserRole.CoOwner, rank: 'ASST CHF (Asst. Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-3', firstName: 'John', lastName: 'Smith', email: 'director@sss.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8 },
    { id: 'user-4', firstName: 'Emily', lastName: 'Jones', email: 'manager@sss.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 5, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.9 },
    { id: 'user-5', firstName: 'Robert', lastName: 'Brown', email: 'secretary@sss.com', role: UserRole.Secretary, rank: 'N/A', level: 1, certifications: ['Admin'], weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-6', firstName: 'Mike', lastName: 'Davis', email: 'supervisor@sss.com', role: UserRole.Supervisor, rank: 'SGT (Sergeant)', level: 4, certifications: ['Level 4', 'Supervision'], guardType: 'Base', weeklyHours: 16, performanceRating: 4.7 },
    { id: 'user-7', firstName: 'Sarah', lastName: 'Wilson', email: 'training@sss.com', role: UserRole.TrainingOfficer, rank: 'CPL (Corporal)', level: 4, certifications: ['Level 4', 'Instructor'], guardType: 'Base', weeklyHours: 40, performanceRating: 4.9 },
    { id: 'user-8', firstName: 'David', lastName: 'Clark', email: 'leadguard@sss.com', role: UserRole.LeadGuard, rank: 'CPL (Corporal)', level: 3, certifications: ['Level 3', 'Lead'], guardType: 'Base', weeklyHours: 8, performanceRating: 4.6 },
    { id: 'user-9', firstName: 'Chris', lastName: 'Taylor', email: 'guard@sss.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 2, certifications: ['Level 2'], guardType: 'Flex', weeklyHours: 32, performanceRating: 4.3 },
    { id: 'user-10', firstName: 'Jessica', lastName: 'Miller', email: 'dispatch@sss.com', role: UserRole.Dispatch, rank: 'N/A', level: 1, certifications: ['Dispatch'], weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-11', firstName: 'Kevin', lastName: 'Harris', email: 'client@sss.com', role: UserRole.Client, rank: 'N/A', level: 0, certifications: [], weeklyHours: 0, performanceRating: 0 },
  ],
  clients: [
      { id: 'client-1', companyName: 'Downtown Mall', contactEmail: 'security@downtownmall.com', userId: 'user-11', whitelist: ['user-8'], blacklist: [] },
      { id: 'client-2', companyName: 'TechCorp HQ', contactEmail: 'ops@techcorp.com', userId: null, whitelist: [], blacklist: ['user-9'] },
  ],
  missions: [
      { id: 'mission-1', clientId: 'client-1', title: 'Weekend Patrol', site: 'Main Entrance', description: 'Standard patrol duties for the main entrance and surrounding area.', startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), endTime: new Date(Date.now() + (2 * 24 + 8) * 60 * 60 * 1000), payRate: 28, requiredLevel: 2, status: 'Open', claimedBy: null },
      { id: 'mission-2', clientId: 'client-2', title: 'Overnight Watch', site: 'TechCorp Main Lobby', description: 'Monitor security cameras and perform hourly checks of the main lobby.', startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), endTime: new Date(Date.now() + (1 * 24 + 8) * 60 * 60 * 1000), payRate: 32, requiredLevel: 3, status: 'Claimed', claimedBy: 'user-8' },
      { id: 'mission-3', clientId: 'client-1', title: 'Event Security', site: 'West Wing', description: 'Provide crowd control for a special event in the west wing.', startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), endTime: new Date(Date.now() - (1 * 24 - 6) * 60 * 60 * 1000), payRate: 35, requiredLevel: 4, status: 'Completed', claimedBy: 'user-6', report: 'Event was successful, no major incidents to report.', clientRating: 5 },
      { id: 'mission-4', clientId: 'client-1', title: 'Morning Shift', site: 'Main Entrance', description: 'Morning patrol duties.', startTime: new Date(Date.now() - 8 * 60 * 60 * 1000), endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), payRate: 28, requiredLevel: 2, status: 'Active', claimedBy: 'user-9', checkInTime: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  ],
  sites: [
    { id: 'site-1', clientId: 'client-1', name: 'Main Entrance', address: '123 Commerce St, Downtown' },
    { id: 'site-2', clientId: 'client-1', name: 'West Wing', address: '123 Commerce St, Downtown' },
    { id: 'site-3', clientId: 'client-1', name: 'Loading Bay', address: '125 Commerce St, Downtown (Rear)' },
    { id: 'site-4', clientId: 'client-2', name: 'TechCorp Main Lobby', address: '456 Innovation Drive' },
  ],
  alerts: [
    { id: 'alert-1', severity: 'High', message: 'Guard D. Clark missed hourly check-in at Downtown Mall.', time: '2 mins ago', acknowledged: false },
    { id: 'alert-2', severity: 'Medium', message: 'New last-minute mission posted by TechCorp HQ.', time: '5 mins ago', acknowledged: false },
    { id: 'alert-3', severity: 'Low', message: 'Guard C. Taylor is approaching 40-hour weekly limit.', time: '25 mins ago', acknowledged: true },
  ],
  applications: [
    { id: 'app-1', type: 'New Guard', name: 'Laura Evans', status: 'Pending', data: { firstName: 'Laura', lastName: 'Evans', email: 'laura.e@example.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 1, certifications: ['Level 1'], guardType: 'Flex' } },
    { id: 'app-2', type: 'New Client', name: 'Global Logistics Inc.', status: 'Pending', data: { companyName: 'Global Logistics Inc.', contactEmail: 'contact@globallogistics.com' } },
  ],
  approvals: [
    { id: 'approval-1', type: 'Promotion', subject: 'Promote Chris Taylor to CPL', details: 'Consistently high ratings and 50+ missions completed.', requesterId: 'user-6' },
    { id: 'approval-2', type: 'Overtime', subject: 'Approve 8 hours OT for D. Clark', details: 'Emergency coverage needed for TechCorp HQ mission.', requesterId: 'user-10' },
  ],
  spotChecks: [
      { id: 'sc-1', missionId: 'mission-4', supervisorId: 'user-6', time: new Date(Date.now() - 4 * 60 * 60 * 1000), status: 'Guard Present', notes: 'Guard performing duties as expected.'}
  ],
  systemSettings: {
    companyName: 'Signature Security Specialists',
    payrollCycle: 'Bi-Weekly',
  },
  hallOfFame: [
    { id: 'hof-1', month: 'August 2024', userId: 'user-6', award: 'Guard of the Month', reason: 'For exceptional performance during the Downtown Mall event, receiving multiple client commendations.' },
    { id: 'hof-2', month: 'August 2024', userId: 'user-8', award: 'Top Performer', reason: 'Completed the most missions (22) with a perfect 5.0 average client rating.' },
    { id: 'hof-3', month: 'July 2024', userId: 'user-9', award: 'Guard of the Month', reason: 'For identifying and resolving a critical security vulnerability at TechCorp HQ.' },
    { id: 'hof-4', month: 'June 2024', userId: 'user-8', award: 'Guard of the Month', reason: 'Consistently high performance and dedication, exceeding weekly hour expectations safely.' },
  ],
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
  db.missions = db.missions.map((m: any) => ({
      ...m,
      startTime: new Date(m.startTime),
      endTime: new Date(m.endTime),
      checkInTime: m.checkInTime ? new Date(m.checkInTime) : undefined,
      checkOutTime: m.checkOutTime ? new Date(m.checkOutTime) : undefined,
  }));
   db.spotChecks = db.spotChecks.map((sc: any) => ({
       ...sc,
       time: new Date(sc.time),
   }));
  db.hallOfFame = db.hallOfFame || initialData.hallOfFame;
  db.systemSettings = db.systemSettings || initialData.systemSettings;
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


export const addMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>): Mission => {
    const db = readDB();
    const newMission: Mission = { ...missionData, id: `mission-${Date.now()}`, status: 'Open', claimedBy: null };
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