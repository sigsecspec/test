import { UserRole } from './types';
import type { User, Mission, Client } from './types';

// Let's define the shape of our database
interface Database {
  users: User[];
  missions: Mission[];
  clients: Client[];
}

// Initial seed data
const initialData: Database = {
  users: [
    { id: 'user-1', firstName: 'Admin', lastName: 'Owner', email: 'owner@sss.com', role: UserRole.Owner, rank: 'Chief', level: 5, certifications: ['All'] },
    { id: 'user-2', firstName: 'Jane', lastName: 'Doe', email: 'coowner@sss.com', role: UserRole.CoOwner, rank: 'Asst. Chief', level: 5, certifications: ['All'] },
    { id: 'user-3', firstName: 'John', lastName: 'Smith', email: 'director@sss.com', role: UserRole.OperationsDirector, rank: 'Captain', level: 5, certifications: ['Management', 'Tactical'] },
    { id: 'user-4', firstName: 'Emily', lastName: 'Jones', email: 'manager@sss.com', role: UserRole.OperationsManager, rank: 'Lieutenant', level: 5, certifications: ['Management'] },
    { id: 'user-5', firstName: 'Robert', lastName: 'Brown', email: 'secretary@sss.com', role: UserRole.Secretary, rank: 'N/A', level: 1, certifications: ['Admin'] },
    { id: 'user-6', firstName: 'Mike', lastName: 'Davis', email: 'supervisor@sss.com', role: UserRole.Supervisor, rank: 'Sergeant', level: 4, certifications: ['Level 4', 'Supervision'] },
    { id: 'user-7', firstName: 'Sarah', lastName: 'Wilson', email: 'training@sss.com', role: UserRole.TrainingOfficer, rank: 'Corporal', level: 4, certifications: ['Level 4', 'Instructor'] },
    { id: 'user-8', firstName: 'David', lastName: 'Clark', email: 'leadguard@sss.com', role: UserRole.LeadGuard, rank: 'Private', level: 3, certifications: ['Level 3', 'Lead'] },
    { id: 'user-9', firstName: 'Chris', lastName: 'Taylor', email: 'guard@sss.com', role: UserRole.Guard, rank: 'Officer', level: 2, certifications: ['Level 2'] },
    { id: 'user-10', firstName: 'Jessica', lastName: 'Miller', email: 'dispatch@sss.com', role: UserRole.Dispatch, rank: 'N/A', level: 1, certifications: ['Dispatch'] },
    { id: 'user-11', firstName: 'Kevin', lastName: 'Harris', email: 'client@sss.com', role: UserRole.Client, rank: 'N/A', level: 0, certifications: [] },
  ],
  clients: [
      { id: 'client-1', companyName: 'Downtown Mall', contactEmail: 'security@downtownmall.com', userId: 'user-11' },
      { id: 'client-2', companyName: 'TechCorp HQ', contactEmail: 'ops@techcorp.com', userId: null },
  ],
  missions: [
      { id: 'mission-1', clientId: 'client-1', title: 'Weekend Mall Patrol', site: 'Downtown Mall - Main Entrance', startTime: new Date('2024-08-10T09:00:00Z'), endTime: new Date('2024-08-10T17:00:00Z'), payRate: 28, requiredLevel: 2, status: 'Open', claimedBy: null, description: 'Standard patrol duties for the main entrance and food court area. High visibility required.' },
      { id: 'mission-2', clientId: 'client-2', title: 'Corporate Lobby Security', site: 'TechCorp HQ - Lobby', startTime: new Date('2024-08-12T08:00:00Z'), endTime: new Date('2024-08-12T18:00:00Z'), payRate: 35, requiredLevel: 4, status: 'Open', claimedBy: null, description: 'Access control and monitoring for a high-traffic corporate lobby. Professional attire and demeanor essential.' },
      { id: 'mission-3', clientId: 'client-1', title: 'Night Watch - West Wing', site: 'Downtown Mall - West Wing', startTime: new Date('2024-08-10T22:00:00Z'), endTime: new Date('2024-08-11T06:00:00Z'), payRate: 32, requiredLevel: 3, status: 'Claimed', claimedBy: 'user-8', description: 'Overnight security patrol for the west wing stores. Regular check-ins required.' },
  ],
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