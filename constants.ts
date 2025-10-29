import { UserRole } from './types';

export const executiveRoles = [UserRole.Owner, UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander];
export const operationsRoles = [UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Dispatch, UserRole.Secretary];
export const fieldLeadershipRoles = [UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard];
export const guardRole = [UserRole.Guard];
export const fieldRoles = [...fieldLeadershipRoles, ...guardRole];
export const allInternalRoles = [...executiveRoles, ...operationsRoles, ...fieldRoles];
export const clientRole = [UserRole.Client];
