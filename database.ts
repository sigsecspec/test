import { UserRole } from './types';
import type { User, Mission, Client } from './types';

// Let's define the shape of our database
interface Site {
  id: string;
  clientId: string;
  name: string;
  address: string;
}

interface Alert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  message: string;
  time: string;
}

interface Application {
  id: string;
  type: string;
  name: string;
  status: string;
}

interface Approval {
  id: string;
  type: string;
  subject: string;
  details: string;
}

interface Database {
  users: User[];
  missions: Mission[];
  clients: Client[];
  sites: Site[];
  alerts: Alert[];
  applications: Application[];
  approvals: Approval[];
}

// Initial seed data
const initialData: Database = {
  users: [
    { id: 'user-1', firstName: 'Admin', lastName: 'Owner', email: 'owner@sss.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'] },
    { id: 'user-2', firstName: 'Jane', lastName: 'Doe', email: 'coowner@sss.com', role: UserRole.CoOwner, rank: 'ASST CHF (Asst. Chief)', level: 5, certifications: ['All'] },
    { id: 'user-3', firstName: 'John', lastName: 'Smith', email: 'director@sss.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'] },
    { id: 'user-4', firstName: 'Emily', lastName: 'Jones', email: 'manager@sss.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 5, certifications: ['Management'] },
    { id: 'user-5', firstName: 'Robert', lastName: 'Brown', email: 'secretary@sss.com', role: UserRole.Secretary, rank: 'N/A', level: 1, certifications: ['Admin'] },
    { id: 'user-6', firstName: 'Mike', lastName: 'Davis', email: 'supervisor@sss.com', role: UserRole.Supervisor, rank: 'SGT (Sergeant)', level: 4, certifications: ['Level 4', 'Supervision'], guardType: 'Base' },
    { id: 'user-7', firstName: 'Sarah', lastName: 'Wilson', email: 'training@sss.com', role: UserRole.TrainingOfficer, rank: 'CPL (Corporal)', level: 4, certifications: ['Level 4', 'Instructor'], guardType: 'Base' },
    { id: 'user-8', firstName: 'David', lastName: 'Clark', email: 'leadguard@sss.com', role: UserRole.LeadGuard, rank: 'CPL (Corporal)', level: 3, certifications: ['Level 3', 'Lead'], guardType: 'Base' },
    { id: 'user-9', firstName: 'Chris', lastName: 'Taylor', email: 'guard@sss.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 2, certifications: ['Level 2'], guardType: 'Flex' },
    { id: 'user-10', firstName: 'Jessica', lastName: 'Miller', email: 'dispatch@sss.com', role: UserRole.Dispatch, rank: 'N/A', level: 1, certifications: ['Dispatch'] },
    { id: 'user-11', firstName: 'Kevin', lastName: 'Harris', email: 'client@sss.com', role: UserRole.Client, rank: 'N/A', level: 0, certifications: [] },
  ],
  clients: [
      { id: 'client-1', companyName: 'Downtown Mall', contactEmail: 'security@downtownmall.com', userId: 'user-11' },
      { id: 'client-2', companyName: 'TechCorp HQ', contactEmail: 'ops@techcorp.com', userId: null },
  ],
  missions: [],
  sites: [
    { id: 'site-1', clientId: 'client-1', name: 'Main Entrance', address: '123 Commerce St, Downtown' },
    { id: 'site-2', clientId: 'client-1', name: 'West Wing', address: '123 Commerce St, Downtown' },
    { id: 'site-3', clientId: 'client-1', name: 'Loading Bay', address: '125 Commerce St, Downtown (Rear)' },
    { id: 'site-4', clientId: 'client-2', name: 'TechCorp Main Lobby', address: '456 Innovation Drive' },
  ],
  alerts: [
    { id: 'alert-1', severity: 'High', message: 'Guard D. Clark missed hourly check-in at Downtown Mall.', time: '2 mins ago' },
    { id: 'alert-2', severity: 'Medium', message: 'New last-minute mission posted by TechCorp HQ.', time: '5 mins ago' },
    { id: 'alert-3', severity: 'Low', message: 'Guard C. Taylor is approaching 40-hour weekly limit.', time: '25 mins ago' },
  ],
  applications: [
    { id: 'app-1', type: 'New Guard', name: 'Laura Evans', status: 'Pending Background Check' },
    { id: 'app-2', type: 'New Client', name: 'Global Logistics Inc.', status: 'Pending Contract Review' },
    { id: 'app-3', type: 'New Supervisor', name: 'James White', status: 'Pending Interview' },
  ],
  approvals: [],
};

const DB_KEY = 'sss_db';

// --- Internal DB Functions ---
const readDB = (): Database => {
  const dbString = localStorage.getItem(DB_KEY);
  if (!dbString) {
    // If no DB, initialize and return it
    writeDB(initialData);
    return initialData;
  }
  // Dates are stored as strings in JSON, so we need to parse them back
  const db = JSON.parse(dbString);
  db.missions = db.missions.map((m: any) => ({
      ...m,
      startTime: new Date(m.startTime),
      endTime: new Date(m.endTime),
  }));
  return db;
};

const writeDB = (db: Database) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  // Dispatch a storage event so other tabs can update if needed
  window.dispatchEvent(new Event('storage'));
};

// --- Public API ---
export const initializeDB = () => {
  // Just calling readDB will initialize if it doesn't exist
  readDB();
};

export const getUserByEmail = (email: string): User | undefined => {
  const db = readDB();
  return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const getUserById = (id: string): User | undefined => {
    const db = readDB();
    return db.users.find(u => u.id === id);
}

export const getUsers = (roles?: UserRole[]): User[] => {
    const db = readDB();
    if (!roles) return db.users;
    return db.users.filter(u => roles.includes(u.role));
}

export const getMissions = (): Mission[] => {
    const db = readDB();
    return db.missions.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

export const getClients = (): Client[] => {
    const db = readDB();
    return db.clients;
}

export const getClientById = (id: string): Client | undefined => {
    const db = readDB();
    return db.clients.find(c => c.id === id);
}

export const getSites = (): Site[] => readDB().sites || [];
export const getAlerts = (): Alert[] => readDB().alerts || [];
export const getApplications = (): Application[] => readDB().applications || [];
export const getApprovals = (): Approval[] => readDB().approvals || [];


export const addMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>): Mission => {
    const db = readDB();
    const newMission: Mission = {
        ...missionData,
        id: `mission-${Date.now()}`,
        status: 'Open',
        claimedBy: null,
    };
    db.missions.push(newMission);
    writeDB(db);
    return newMission;
};

export const claimMission = (missionId: string, guardId: string): Mission | null => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'Open') {
        mission.status = 'Claimed';
        mission.claimedBy = guardId;
        writeDB(db);
        return mission;
    }
    return null;
}