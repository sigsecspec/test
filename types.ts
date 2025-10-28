export enum UserRole {
  // Executive
  Owner = "Owner",
  CoOwner = "Co-Owner",
  DeputyChief = "Deputy Chief", // Secretary
  Commander = "Commander", // Dispatch
  // Operations
  OperationsDirector = "Operations Director",
  OperationsManager = "Operations Manager",
  Dispatch = "Dispatch",
  Secretary = "Secretary",
  // Field
  Supervisor = "Supervisor",
  TrainingOfficer = "Training Officer",
  LeadGuard = "Lead Guard",
  Guard = "Guard",
  // External
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
    weeklyHours: number;
    performanceRating: number;
    teamId?: string; // Operations Team ID
}

export interface Client {
    id:string;
    companyName: string;
    contactEmail: string;
    userId: string | null;
    whitelist: string[]; // Array of Guard user IDs
    blacklist: string[]; // Array of Guard user IDs
    teamId?: string;
}

export type MissionStatus = 'Open' | 'Claimed' | 'Active' | 'AwaitingReport' | 'Completed' | 'Cancelled';

export interface Contract {
    id: string;
    clientId: string;
    title: string;
    status: 'Pending' | 'Active' | 'Completed' | 'Cancelled';
    startDate: Date;
    endDate: Date;
    totalBudget: number;
    companyCommission: number; // e.g., 0.07 for 7%
}

export interface Mission {
    id: string;
    clientId: string;
    contractId: string;
    title: string;
    site: string;
    description: string;
    startTime: Date;
    endTime: Date;
    payRate: number;
    requiredLevel: number;
    requiredTraining: string[]; // Array of training module IDs
    requiredGuards: number;
    status: MissionStatus;
    claimedBy: string[];
    checkIns: { guardId: string, time: Date, selfie?: string }[];
    checkOuts: { guardId: string, time: Date, selfie?: string }[];
    reports: { guardId: string, report: string, time: Date }[];
    clientRating?: number; // 1-5 stars
    incidentIds?: string[]; // IDs of related incidents
    teamId?: string;
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
  type: 'New Guard' | 'New Client' | 'New Supervisor' | 'New Operations' | 'New Management';
  name: string;
  status: ApplicationStatus;
  data: Partial<User & Client>;
  teamCode?: string;
}

export interface Approval {
  id: string;
  type: 'Promotion' | 'Overtime' | 'Training' | 'Contract';
  subject: string;
  details: string;
  requesterId: string;
}

// FIX: Simplified SpotCheck to match implementation in FieldOversight.tsx
export type SpotCheckStatus = 'Guard Present' | 'Guard Absent' | 'Uniform OK' | 'Issue Reported';

export interface SpotCheck {
    id: string;
    missionId: string;
    supervisorId: string;
    time: Date;
    status: SpotCheckStatus;
    notes: string;
}

export interface SystemSettings {
  companyName: string;
  payrollCycle: 'Weekly' | 'Bi-Weekly';
}

export interface HallOfFameEntry {
  id: string;
  month: string; // e.g., "August 2024"
  userId: string;
  award: string; // e.g., "Guard of the Month"
  reason: string;
}

export type IncidentType = 'Theft' | 'Medical' | 'Property Damage' | 'Trespassing' | 'Disturbance' | 'Other';
export type IncidentSeverity = 'Low' | 'Medium' | 'High';

export interface IncidentReport {
  id: string;
  missionId: string;
  reportedById: string;
  timestamp: Date;
  type: IncidentType;
  severity: IncidentSeverity;
  description: string;
}

export type VehicleStatus = 'Available' | 'In Use' | 'Maintenance';

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  status: VehicleStatus;
  assignedMissionId: string | null;
}

export type PayrollRunStatus = 'Pending' | 'Approved' | 'Paid';

export interface PayrollRun {
  id: string;
  startDate: Date;
  endDate: Date;
  status: PayrollRunStatus;
  totalAmount: number;
}

export interface PayrollEntry {
  id: string;
  payrollRunId: string;
  userId: string;
  missionId: string;
  hours: number;
  payRate: number;
  totalPay: number;
  paymentConfirmed: boolean;
}

export type PromotionStatus = 'Pending' | 'Approved' | 'Denied';

export interface Promotion {
  id: string;
  userId: string;
  toRole: UserRole.Supervisor | UserRole.TrainingOfficer;
  status: PromotionStatus;
  applicationText: string;
  dateApplied: Date;
}

export type AppealStatus = 'Pending' | 'Approved' | 'Denied';

export interface Appeal {
  id: string;
  userId: string;
  type: 'Application' | 'Training Retake';
  originalId: string; // ID of the Application or Training Module
  reason: string;
  status: AppealStatus;
  dateSubmitted: Date;
}

// Training System Types
export interface QuizQuestion {
    q: string;
    a: string;
}

export interface TrainingModule {
    id: string;
    title: string;
    type: 'guard' | 'lead-guard' | 'supervisor' | 'training-officer' | 'operations' | 'management';
    duration: string;
    content: string;
    quiz: QuizQuestion[];
}

export type UserTrainingStatus = 'Not Started' | 'Passed' | 'Failed' | 'Pending Approval';

export interface UserTrainingProgress {
    userId: string;
    moduleId: string;
    status: UserTrainingStatus;
    attempts: number;
}
