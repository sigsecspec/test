import { UserRole } from './types';

// This data is now only used to generate the preview login buttons.
// The complete user data is managed in `database.ts`.
interface TestUser {
  role: UserRole;
}

export const TEST_USERS: { [email: string]: TestUser } = {
  'owner@sss.com': { role: UserRole.Owner },
  'coowner@sss.com': { role: UserRole.CoOwner },
  'director@sss.com': { role: UserRole.OperationsDirector },
  'manager@sss.com': { role: UserRole.OperationsManager },
  'secretary@sss.com': { role: UserRole.Secretary },
  'supervisor@sss.com': { role: UserRole.Supervisor },
  'training@sss.com': { role: UserRole.TrainingOfficer },
  'leadguard@sss.com': { role: UserRole.LeadGuard },
  'guard@sss.com': { role: UserRole.Guard },
  'dispatch@sss.com': { role: UserRole.Dispatch },
  'client@sss.com': { role: UserRole.Client },
};