import { UserRole } from './types';

interface TestUser {
  password: string;
  role: UserRole;
}

export const TEST_USERS: { [email: string]: TestUser } = {
  'owner@sss.com': { password: 'demo123', role: UserRole.Owner },
  'coowner@sss.com': { password: 'demo123', role: UserRole.CoOwner },
  'director@sss.com': { password: 'demo123', role: UserRole.OperationsDirector },
  'manager@sss.com': { password: 'demo123', role: UserRole.OperationsManager },
  'secretary@sss.com': { password: 'demo123', role: UserRole.Secretary },
  'supervisor@sss.com': { password: 'demo123', role: UserRole.Supervisor },
  'guard@sss.com': { password: 'demo123', role: UserRole.FlexOfficer },
  'dispatch@sss.com': { password: 'demo123', role: UserRole.Dispatch },
  'client@sss.com': { password: 'demo123', role: UserRole.Client },
  'training@sss.com': { password: 'demo123', role: UserRole.TrainingOfficer },
};
