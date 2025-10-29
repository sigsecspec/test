export const UserRole = {
  // Executive
  Owner: "Owner",
  CoOwner: "Co-Owner",
  DeputyChief: "Deputy Chief",
  Commander: "Commander",
  // Operations
  OperationsDirector: "Operations Director",
  OperationsManager: "Operations Manager",
  Dispatch: "Dispatch",
  Secretary: "Secretary",
  // Field
  Supervisor: "Supervisor",
  TrainingOfficer: "Training Officer",
  LeadGuard: "Lead Guard",
  Guard: "Guard",
  // External
  Client: "Client",
};

export type Role = typeof UserRole[keyof typeof UserRole];

export interface User {
<<<<<<< HEAD
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  rank: string;
  level: number;
  certifications: string[];
  weeklyHours: number;
  performanceRating: number;
  teamId?: string;
=======
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    rank: string;
    level: number;
    certifications: string[];
    guardType?: GuardType;
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
}

export interface Client {
    id: string;
    companyName: string;
    contactEmail: string;
<<<<<<< HEAD
    userId: string;
    whitelist: string[];
    blacklist: string[];
}

export interface Site {
    id: string;
    clientId: string;
    name: string;
    address: string;
}

export interface Mission {
    id: string;
    title: string;
    clientId: string;
    siteId: string;
    contractId: string;
    startTime: Date;
    endTime: Date;
    payRate: number;
    requiredGuards: number;
    requiredLevel: number;
    requiredCerts: string[];
    description: string;
    status: 'Open' | 'Claimed' | 'Active' | 'AwaitingReport' | 'Completed' | 'Cancelled';
    claimedBy: string[];
    checkIns: { guardId: string; time: Date }[];
    checkOuts: { guardId: string; time: Date }[];
    reports: { guardId: string; report: string, time: Date }[];
    incidentIds: string[];
    clientRating?: number;
}

export interface Contract {
    id: string;
    title: string;
    clientId: string;
    startDate: Date;
    endDate: Date;
    totalBudget: number;
    status: 'Pending' | 'Active' | 'Expired' | 'Cancelled';
}

export interface Application {
    id: string;
    type: string;
    data: any;
    status: 'Pending' | 'Approved' | 'Denied';
}

export interface Alert {
    id: string;
    severity: 'Low' | 'Medium' | 'High';
    message: string;
    time: string;
    acknowledged: boolean;
}

export interface Approval {
    id: string;
    type: string;
    subject: string;
    details: string;
    requesterId: string;
}

export interface TrainingModule {
    id: string;
    title: string;
    type: 'guard' | 'lead-guard' | 'supervisor' | 'training-officer';
    duration: string;
    content: string;
    quiz: { q: string, a: string }[];
}

export interface UserTrainingProgress {
    userId: string;
    moduleId: string;
    status: 'Passed' | 'Failed' | 'Pending Approval' | 'Approved' | 'Denied';
    attempts: number;
=======
    userId: string | null; // Link to a user account if the client is also a user
}

export type MissionStatus = 'Open' | 'Claimed' | 'Completed' | 'Cancelled';

export interface Mission {
    id: string;
    clientId: string;
    title: string;
    site: string;
    description: string;
    startTime: Date;
    endTime: Date;
    payRate: number;
    requiredLevel: number;
    status: MissionStatus;
    claimedBy: string | null; // User ID of the guard
>>>>>>> parent of e6d8e88 (feat: Migrate to ES Modules for React dependencies)
}
