export enum UserRole {
  // Management Hierarchy
  Owner = "Owner (Chief)",
  CoOwner = "Co-Owner (Asst. Chief)",
  DeputyChief = "Deputy Chief",
  Commander = "Commander",
  OperationsDirector = "Operations Director (Captain)",
  OperationsManager = "Operations Manager (Lieutenant)",
  Supervisor = "Supervisor (Sergeant)",
  TrainingOfficer = "Training Officer (Corporal)",
  LeadGuard = "Lead Guard (Private)",
  Guard = "Guard (Officer)",

  // Support Roles
  Dispatch = "Dispatch",
  Secretary = "Secretary",

  // External Roles
  Client = "Client",
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    rank: string;
    level: number;
    certifications: string[];
}

export interface Client {
    id: string;
    companyName: string;
    contactEmail: string;
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
}