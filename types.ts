export enum UserRole {
  // Management Hierarchy
  Owner = "Owner",
  CoOwner = "Co-Owner",
  DeputyChief = "Deputy Chief",
  Commander = "Commander",
  OperationsDirector = "Operations Director",
  OperationsManager = "Operations Manager",
  Supervisor = "Supervisor",
  TrainingOfficer = "Training Officer",
  LeadGuard = "Lead Guard",
  Guard = "Guard",

  // Support Roles
  Dispatch = "Dispatch",
  Secretary = "Secretary",

  // External Roles
  Client = "Client",
}

export type GuardType = 'Seasonal' | 'Flex' | 'Base';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    rank: string;
    level: number;
    certifications: string[];
    guardType?: GuardType;
    weeklyHours: number;
    performanceRating: number; // Average of client ratings
}

export interface Client {
    id:string;
    companyName: string;
    contactEmail: string;
    userId: string | null;
    whitelist: string[]; // Array of Guard user IDs
    blacklist: string[]; // Array of Guard user IDs
}

export type MissionStatus = 'Open' | 'Claimed' | 'Active' | 'AwaitingReport' | 'Completed' | 'Cancelled';

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
    checkInTime?: Date;
    checkOutTime?: Date;
    report?: string;
    clientRating?: number; // 1-5 stars
}

export interface Site {
  id: string;
  clientId: string;
  name: string;
  address: string;
}

export interface Alert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  message: string;
  time: string;
  acknowledged: boolean;
}

export type ApplicationStatus = 'Pending' | 'Approved' | 'Denied';

export interface Application {
  id: string;
  type: 'New Guard' | 'New Client' | 'New Supervisor';
  name: string;
  status: ApplicationStatus;
  data: Partial<User & Client>;
}

export interface Approval {
  id: string;
  type: 'Promotion' | 'Overtime' | 'Training';
  subject: string;
  details: string;
  requesterId: string;
}

export interface SpotCheck {
    id: string;
    missionId: string;
    supervisorId: string;
    time: Date;
    status: 'Guard Present' | 'Guard Absent' | 'Uniform OK' | 'Issue Reported';
    notes: string;
}
