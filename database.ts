import { UserRole, Ranks } from './types.js';
import { executiveRoles, canAlwaysApproveRoles, managementAndOpsRoles, canCreateMissionsDirectly, canCreateMissionsForApproval, operationsRoles } from './constants.js';

const initialData = {
  users: [
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'M.White@SignatureSecuritySpecialist.com', role: UserRole.Owner, rank: Ranks[UserRole.Owner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 0, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-co', firstName: 'Ashley', lastName: 'Smith', email: 'A.Smith@SignatureSecuritySpecialist.com', role: UserRole.CoOwner, rank: Ranks[UserRole.CoOwner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    // Team 1
    { id: 'user-sec-1', firstName: 'Ahlya', lastName: 'Lyons', email: 'A.Lyons@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'J.Lyons@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.8, needsUniform: false, status: 'Active' },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 'T.Moreno@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.7, needsUniform: false, status: 'Active' },
    { id: 'user-sup-1', firstName: 'Super', lastName: 'Visor', email: 'supervisor@test.com', role: UserRole.Supervisor, rank: Ranks[UserRole.Supervisor], level: 3, certifications: [], teamId: 'team-1', weeklyHours: 20, performanceRating: 4.5, needsUniform: false, status: 'Active' },
    { id: 'user-guard-1', firstName: 'Test', lastName: 'Guard', email: 'guard@test.com', role: UserRole.Guard, rank: Ranks[UserRole.Guard], level: 1, certifications: [], teamId: 'team-1', weeklyHours: 10, performanceRating: 4.2, needsUniform: false, status: 'Active' },


    // Team 2
    { id: 'user-sec-2', firstName: 'Alison', lastName: 'Avancena', email: 'A.Avancena@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'B.Baker@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.8, needsUniform: false, status: 'Active' },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'R.Granum@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.7, needsUniform: false, status: 'Active' },
  ],
  clients: [],
  missions: [],
  sites: [],
  contracts: [],
  applications: [],
  promotions: [],
  siteApprovalRequests: [],
  trainingModules: [
      { id: 'tm-1', title: 'Bar Security', content: 'This module covers duties specific to bar and nightclub environments...', quiz: [{q: 'What is a key responsibility in a bar setting?', a: 'Monitoring patron intoxication levels'}]},
      { id: 'tm-2', title: 'Retail Security', content: 'This module covers loss prevention and customer service in a retail setting...', quiz: [{q: 'What does "LP" stand for?', a: 'Loss Prevention'}]},
      { id: 'tm-3', title: 'Standing Post', content: 'This module covers duties for a stationary security post, such as access control...', quiz: [{q: 'What is the primary function of a standing post?', a: 'Observe and report'}]},
      { id: 'tm-4', title: 'Level 2 - Pepper Spray', content: 'Proper use and legal implications of pepper spray...', quiz: [{q: 'What is the effective range of your issued spray?', a: '10-12 feet'}]},
      { id: 'tm-5', title: 'Level 3 - Taser', content: 'Taser operation and safety protocols...', quiz: [{q: 'What does Taser stand for?', a: "Thomas A. Swift's Electric Rifle"}]},
      { id: 'tm-6', title: 'Level 4 - Baton', content: 'Defensive baton techniques...', quiz: [{q: 'What is a primary target area?', a: 'Large muscle groups'}]},
      { id: 'tm-7', title: 'Level 5 - Armed', content: 'Firearm safety and use of force...', quiz: [{q: 'What is the most important rule of gun safety?', a: 'Treat every firearm as if it were loaded'}]},
      { id: 'tm-lead', title: 'Site Lead Training', content: 'Leadership, communication, and mission coordination...', quiz: [{q: 'Who must check in first on a mission?', a: 'The Site Lead'}]},
      { id: 'tm-to', title: 'Training Officer Training', content: 'Managing training programs and evaluating guards...', quiz: [{q: 'Who can deny a training submission?', a: 'Operations'}]},
      { id: 'tm-sup', title: 'Supervisor Training', content: 'Spot checks, quality assurance, and leadership...', quiz: [{q: 'How many spot checks are required per mission?', a: '3'}]},
      { id: 'tm-ops', title: 'Operations Training', content: 'Company vision, values, team management, and part-ownership responsibilities...', quiz: [{q: 'What is the core mission of SSS?', a: 'Protect with purpose and perform with excellence'}]},
      { id: 'tm-mgmt', title: 'Management Training', content: 'Administrative procedures, system management, and operational protocols...', quiz: [{q: 'Who has ultimate authority over the system?', a: 'Owner/Co-Owner'}]},
  ],
  trainingProgress: [],
  payrollRuns: [],
  payrollEntries: [],
  alerts: [
      { id: 'alert-1', severity: 'High', message: 'Unusual activity detected at Site Alpha. Supervisor review requested.' },
  ],
  systemSettings: {
      companyName: 'Signature Security Specialist',
      payrollCycle: 'Bi-Weekly',
      commissionRates: {
        'Retail (Standing)': 7,
        'Retail (Loss Prevention)': 8,
        'Bar/Nightclub': 12,
        'Event Security': 12,
        'Corporate Security': 8,
        'Residential Security': 7,
        'Construction Security': 9,
        'Medical/Healthcare': 10,
        'Armed Security': 15,
        'Emergency/Last-minute': 20,
      }
  },
  teams: [
      { id: 'team-1', name: 'Team Lyons', directorId: 'user-2' },
      { id: 'team-2', name: 'Team Baker', directorId: 'user-4' },
  ],
  spotChecks: [],
  uniformDeliveries: [],
  leadGuardAssignments: [],
  vehicles: [
    { id: 'v-1', make: 'Ford', model: 'Explorer', year: 2022, licensePlate: 'SSS-001', status: 'Active' },
    { id: 'v-2', make: 'Chevrolet', model: 'Tahoe', year: 2023, licensePlate: 'SSS-002', status: 'Active' },
    { id: 'v-3', make: 'Ford', model: 'Explorer', year: 2020, licensePlate: 'SEC-101', status: 'Decommissioned' },
  ],
  vehicleAssignments: [
      { id: 'va-1', vehicleId: 'v-1', assigneeId: 'user-3', assigneeType: 'User', startDate: new Date('2023-01-01'), endDate: null, status: 'Active'},
      { id: 'va-2', vehicleId: 'v-2', assigneeId: 'site-1', assigneeType: 'Site', startDate: new Date('2023-02-15'), endDate: null, status: 'Active'},
  ],
  appeals: [
      { id: 'appeal-1', missionId: 'mission-123', clientId: 'client-abc', reason: 'Guard was late and unprofessional.', status: 'Pending', createdAt: new Date() }
  ],
  changeRequests: [],
  actionLog: [
      { id: `log-${Date.now()}`, timestamp: new Date(), userId: 'user-1', actionType: 'SYSTEM_INITIALIZED', entityType: 'System', entityId: 'system-0', severity: 'Low', details: { description: 'Database was seeded with initial data.' } }
  ]
};
let _DB: any = {};
let _currentUser = null; // Store current user for logging

function logAction(
    actionType: string,
    entityType: string,
    entityId: string,
    severity: 'Low' | 'Medium' | 'High',
    details: object
) {
    if (!_currentUser) return; // Don't log if no user is acting
    const logEntry = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        userId: _currentUser.id,
        actionType,
        entityType,
        entityId,
        severity,
        details: { description: `${actionType} on ${entityType} (${entityId})`, ...details }
    };
    _DB.actionLog.push(logEntry);
}

function save() {
  localStorage.setItem('sss_db', JSON.stringify(_DB));
  window.dispatchEvent(new Event('storage'));
}

function load() {
  const dbString = localStorage.getItem('sss_db');
  if (dbString) {
    try {
      const parsedDB = JSON.parse(dbString);
      const collectionsWithDates = ['missions', 'contracts', 'promotions', 'payrollRuns', 'applications', 'trainingProgress', 'spotChecks', 'uniformDeliveries', 'siteApprovalRequests', 'appeals', 'vehicleAssignments', 'actionLog', 'changeRequests'];
      collectionsWithDates.forEach(collection => {
          if(parsedDB[collection]) {
              (parsedDB)[collection].forEach((item: any) => {
                  if (item.startTime) item.startTime = new Date(item.startTime);
                  if (item.endTime) item.endTime = new Date(item.endTime);
                  if (item.startDate) item.startDate = new Date(item.startDate);
                  if (item.endDate) item.endDate = new Date(item.endDate);
                  if (item.submittedAt) item.submittedAt = new Date(item.submittedAt);
                  if (item.createdAt) item.createdAt = new Date(item.createdAt);
                  if (item.time) item.time = new Date(item.time);
                  if (item.sentAt) item.sentAt = new Date(item.sentAt);
                  if (item.receivedAt) item.receivedAt = new Date(item.receivedAt);
                  if (item.timestamp) item.timestamp = new Date(item.timestamp);
                  if (item.reviewedAt) item.reviewedAt = new Date(item.reviewedAt);
              });
          }
      });
      _DB = parsedDB;
      return true;
    } catch (e) {
      console.error("Failed to parse DB from localStorage. It might be corrupted. Resetting DB.", e);
      localStorage.removeItem('sss_db'); // Clear corrupted data
      return false;
    }
  }
  return false;
}

export function initializeDB() {
  if (!load()) {
    console.log("No local DB found, seeding initial data.");
    _DB = JSON.parse(JSON.stringify(initialData));
    save();
  } else {
    console.log("Loaded DB from localStorage.");
  }
}

export const setCurrentUserForDB = (user: any) => {
    _currentUser = user;
}

export const getCollection = (name: string) => _DB[name] || [];

export const getUsers = (roles: string[] | null = null) => {
    if (!roles) return getCollection('users');
    return (getCollection('users')).filter((u: any) => roles.includes(u.role));
};

export const getUserById = (id: string) => (getCollection('users')).find((u: any) => u.id === id);
export const getUserByEmail = (email: string) => (getCollection('users')).find((u: any) => u.email === email);
export const getClients = () => getCollection('clients');
export const getClientById = (id: string) => (getCollection('clients')).find((c: any) => c.id === id);

export const getMissions = (teamId: string | null = null) => {
    const missions = getCollection('missions');
    if (!teamId) return missions;
    return missions.filter((m: any) => {
        const client = getClientById(m.clientId);
        return client && client.teamId === teamId;
    });
};

export const getMissionsForUser = (userId: string) => {
    return getCollection('missions').filter((m: any) => m.claimedBy.includes(userId))
        .sort((a: any, b: any) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
}

export const getMissionById = (id: string) => (getCollection('missions')).find((m: any) => m.id === id);
export const getSites = () => getCollection('sites');
export const getSiteById = (id: string) => getCollection('sites').find((s: any) => s.id === id);
export const getContracts = () => getCollection('contracts');
export const getApplications = (status = 'Pending') => getCollection('applications').filter((a: any) => a.status === status);
export const getTrainingModules = () => getCollection('trainingModules');
export const getUserTrainingProgress = (userId: string) => getCollection('trainingProgress').filter((p: any) => p.userId === userId);

export const getPendingTrainingApprovals = (teamId: string | null = null) => {
    const pending = getCollection('trainingProgress').filter((p: any) => p.status === 'Pending Approval');
    if (!teamId) return pending;
    return pending.filter((p: any) => {
        const user = getUserById(p.userId);
        return user && user.teamId === teamId;
    });
};

export const getSystemSettings = () => getCollection('systemSettings');
export const getAlerts = () => getCollection('alerts');
export const getPromotions = () => getCollection('promotions');
export const getPayrollRuns = () => getCollection('payrollRuns').sort((a: any, b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
export const getPayrollEntriesForRun = (runId: string) => getCollection('payrollEntries').filter((e: any) => e.runId === runId);

export const getMissionsForSpotCheck = (supervisorId: string) => {
    const supervisor = getUserById(supervisorId);
    if (!supervisor) return [];
    return getMissions(supervisor.teamId).filter((m: any) => m.status === 'Active' && !m.claimedBy.includes(supervisorId));
};

export const getSpotCheckByMissionId = (missionId: string) => getCollection('spotChecks').find((sc: any) => sc.missionId === missionId);
export const getLeadGuardAssignment = (missionId: string) => getCollection('leadGuardAssignments').find((lg: any) => lg.missionId === missionId);

export const getPendingSiteApprovals = (teamId: string | null = null) => {
    const pending = getCollection('siteApprovalRequests').filter((r: any) => r.status === 'Pending');
    if (!teamId) return pending;
    return pending.filter((r: any) => {
        const client = getClientById(r.clientId);
        return client && client.teamId === teamId;
    });
};

export const getVehicleById = (id: string) => getCollection('vehicles').find((v: any) => v.id === id);
export const getVehicleAssignments = (vehicleId: string) => (getCollection('vehicleAssignments')).filter((a: any) => a.vehicleId === vehicleId);
export const getActionLog = () => (getCollection('actionLog')).sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime());
export const getActionLogEntryById = (id: string) => (getCollection('actionLog')).find((entry: any) => entry.id === id);
export const getActionLogForEntity = (entityId: string) => {
    return (getCollection('actionLog'))
        .filter((log: any) => log.entityId === entityId)
        .sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const getPendingChangeRequests = (teamId: string | null | undefined = null) => {
    const pending = (getCollection('changeRequests')).filter((r: any) => r.status === 'Pending');
    if (teamId === null || teamId === undefined) return pending; // For execs who see all
    return pending.filter((r: any) => {
        const targetUser = getUserById(r.entityId);
        // Assuming changes are only for users for now. This can be expanded.
        if (r.entityType === 'users' && targetUser) {
            return targetUser.teamId === teamId;
        }
        return false; // Or handle other entity types
    });
};

export function updateById(collectionName: string, id: string, updates: any) {
    const collection = _DB[collectionName];
    if (!collection) return false;
    const item = collection.find((i: any) => i.id === id);
    if (item) {
        const before = { ...item };
        Object.assign(item, updates);
        
        // SIDE EFFECTS
        if (collectionName === 'users' && updates.hasOwnProperty('teamId')) {
            const user = item;
            if (user.role === UserRole.Client) {
                const client = (_DB.clients).find((c: any) => c.userId === user.id);
                if (client) {
                    client.teamId = updates.teamId;
                }
            }
        }

        logAction('UPDATE', collectionName, id, 'Low', { before, after: item });
        save();
        return true;
    }
    return false;
}

export function updateSystemSettings(updates: any) {
    const before = { ..._DB.systemSettings };
    _DB.systemSettings = { ..._DB.systemSettings, ...updates };
    logAction('UPDATE', 'systemSettings', 'system-0', 'Medium', { before, after: _DB.systemSettings });
    save();
    return true;
}

export function addApplication({ type, data }: { type: string, data: any }) {
    const newApp = { id: `app-${Date.now()}`, type, data, status: 'Pending', submittedAt: new Date() };
    _DB.applications.push(newApp);
    logAction('CREATE', 'applications', newApp.id, 'Low', { after: newApp });
    save();
}

function addSite(siteData: any) {
    const newSite = { ...siteData, id: `site-${Date.now()}` };
    _DB.sites.push(newSite);
    logAction('CREATE', 'sites', newSite.id, 'Low', { after: newSite });
    save();
}

export function createSite(siteData: any, user: any) {
    if (!executiveRoles.includes(user.role)) {
        alert("You don't have permission to create sites directly.");
        return false;
    }
    const newSite = { 
        id: `site-${Date.now()}`,
        clientId: siteData.clientId,
        name: siteData.siteName,
        address: siteData.siteAddress,
    };
    _DB.sites.push(newSite);
    logAction('CREATE_MANUAL', 'sites', newSite.id, 'High', { after: newSite, description: `Site manually created by ${user.role}` });
    save();
    return true;
}

export function addSiteApprovalRequest(requestData: any) {
    const newRequest = { ...requestData, id: `sar-${Date.now()}`, status: 'Pending', submittedAt: new Date() };
    _DB.siteApprovalRequests.push(newRequest);
    logAction('CREATE', 'siteApprovalRequests', newRequest.id, 'Low', { after: newRequest });
    save();
}

export function updateSiteApprovalStatus(requestId: string, status: string) {
    const request = _DB.siteApprovalRequests.find((r: any) => r.id === requestId);
    if (request) {
        request.status = status;
        if (status === 'Approved') {
            logAction('APPROVE', 'siteApprovalRequests', requestId, 'Low', { after: request });
            addSite({
                clientId: request.clientId,
                name: request.siteName,
                address: request.siteAddress
            });
        } else {
             logAction('DENY', 'siteApprovalRequests', requestId, 'Medium', { after: request });
        }
        _DB.siteApprovalRequests = _DB.siteApprovalRequests.filter((r: any) => r.id !== requestId);
    }
    save();
}

export function updateApplicationStatus(appId: string, status: string, teamId: string | null = null) {
    const app = _DB.applications.find((a: any) => a.id === appId);
    if (app) {
        app.status = status;
        if (status === 'Approved') {
            logAction('APPROVE', 'applications', appId, 'Medium', { after: app });
            const roleMap: { [key: string]: string } = { 'New Guard': UserRole.Guard, 'New Supervisor': UserRole.Supervisor, 'New Client': UserRole.Client, 'New Training Officer': UserRole.TrainingOfficer, 'New Operations': UserRole.OperationsManager, 'New Management': UserRole.Secretary };
            const role = roleMap[app.type];
            if (!role) return;

            let assignedTeamId = app.data.teamCode || teamId;
            if (!assignedTeamId && role !== UserRole.Client && !executiveRoles.includes(role)) {
                const teamCounts = _DB.teams.map((t: any) => ({ id: t.id, count: _DB.users.filter((u: any) => u.teamId === t.id).length }));
                if (teamCounts.length > 0) {
                    assignedTeamId = teamCounts.sort((a: any, b: any) => a.count - b.count)[0].id;
                }
            }
            
            const newUser = {
                id: `user-${Date.now()}`,
                firstName: app.data.firstName || app.data.companyName.split(' ')[0],
                lastName: app.data.lastName || app.data.companyName.split(' ')[1] || 'Contact',
                email: app.data.email || app.data.contactEmail,
                role: role,
                rank: Ranks[role as keyof typeof Ranks],
                level: 1,
                certifications: [],
                teamId: assignedTeamId,
                weeklyHours: 0,
                performanceRating: 5.0,
                needsUniform: (role !== UserRole.Client),
                status: 'Active',
            };
            _DB.users.push(newUser);
             logAction('CREATE', 'users', newUser.id, 'Medium', { after: newUser, description: `User created from approved application ${appId}` });
            if(role === UserRole.Client) {
                const newClient = {
                    id: `client-${Date.now()}`,
                    companyName: app.data.companyName,
                    contactEmail: app.data.contactEmail,
                    userId: newUser.id,
                    teamId: assignedTeamId,
                    whitelist: [],
                    blacklist: []
                };
                _DB.clients.push(newClient);
                logAction('CREATE', 'clients', newClient.id, 'Medium', { after: newClient, description: `Client created from approved application ${appId}` });
                 if (app.data.siteName && app.data.siteAddress) {
                    addSite({
                        clientId: newClient.id,
                        name: app.data.siteName,
                        address: app.data.siteAddress,
                    });
                }
            }
        } else {
            logAction('DENY', 'applications', appId, 'Medium', { after: app });
        }
        _DB.applications = _DB.applications.filter((a: any) => a.id !== appId);
    }
    save();
}

export function addUser(userData: any) {
    const { role, email, firstName, lastName, teamId, companyName } = userData;

    if (_DB.users.find((u: any) => u.email === email)) {
        alert('A user with this email already exists.');
        return false;
    }

    const newUser = {
        id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        role,
        rank: Ranks[role as keyof typeof Ranks],
        level: 1,
        certifications: [],
        teamId: teamId || null,
        weeklyHours: 0,
        performanceRating: 5.0,
        needsUniform: (role !== UserRole.Client),
        status: 'Active',
    };
    _DB.users.push(newUser);
    logAction('CREATE_MANUAL', 'users', newUser.id, 'Medium', { after: newUser, description: `User manually created by ${_currentUser.role}` });

    if(role === UserRole.Client) {
        const newClient = {
            id: `client-${Date.now()}`,
            companyName: companyName,
            contactEmail: email,
            userId: newUser.id,
            teamId: teamId || null,
            whitelist: [],
            blacklist: []
        };
        _DB.clients.push(newClient);
        logAction('CREATE_MANUAL', 'clients', newClient.id, 'Medium', { after: newClient, description: `Client manually created by ${_currentUser.role}` });
    }
    save();
    return true;
}

export function addMission(missionData: any, user: any) {
    const missionId = `mission-${Date.now()}`;
    const canCreateDirectly = canCreateMissionsDirectly.includes(user.role);
    
    // Supervisors create for approval, clients also create for approval
    const requiresApproval = canCreateMissionsForApproval.includes(user.role) || user.role === UserRole.Client;

    const newMission = {
        ...missionData,
        id: missionId,
        status: (requiresApproval && !canCreateDirectly) ? 'Pending Approval' : 'Open',
        claimedBy: [],
        checkIns: {},
        checkOuts: {},
    };

    _DB.missions.push(newMission);
     logAction('CREATE', 'missions', newMission.id, 'Low', { after: newMission });
    _DB.alerts.push({
        id: `alert-${Date.now()}`,
        severity: 'Info',
        message: `New mission "${newMission.title}" created. ${newMission.status === 'Pending Approval' ? 'Requires operations approval.' : ''}`,
    });
    if(missionData.leadGuardId) {
        assignLeadGuard(missionId, missionData.leadGuardId);
    }
    save();
}

export function claimMission(missionId: string, userId: string) {
    const mission = getMissionById(missionId);
    const user = getUserById(userId);
    const client = mission ? getClientById(mission.clientId) : undefined;
    const userProgress = getUserTrainingProgress(userId);
    const requiredTraining = mission ? getTrainingModules().find((tm: any) => tm.id === mission.requiredTrainingId) : undefined;
    const hasTraining = mission ? userProgress.some((p: any) => p.moduleId === mission.requiredTrainingId && p.status === 'Approved') : false;

    if (!mission || !user || !client) return { success: false, message: "Mission, user, or client not found." };
    if (client.blacklist.includes(userId)) return { success: false, message: "You are blacklisted for this client." };
    if (requiredTraining && !hasTraining) return { success: false, message: `You need to complete "${requiredTraining.title}" training.` };
    if (mission.claimedBy.includes(userId)) return { success: false, message: "You have already claimed this mission." };
    if (mission.claimedBy.length >= mission.requiredGuards) return { success: false, message: "This mission is already full." };
    if (user.level < mission.requiredLevel) return { success: false, message: "You do not meet the required level for this mission."};
    
    mission.claimedBy.push(userId);
    if (mission.claimedBy.length >= mission.requiredGuards) {
        mission.status = 'Claimed';
    }
    logAction('CLAIM', 'missions', missionId, 'Low', { description: `User ${userId} claimed mission.` });
    save();
    return { success: true, message: "Mission claimed successfully!" };
}

export function missionCheckIn(missionId: string, userId: string, isLead = false, guardToCheckIn: string | null = null) {
    const mission = getMissionById(missionId);
    if (!mission || !mission.claimedBy.includes(userId)) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) {
        if (mission.checkIns[userId] && guardToCheckIn && !mission.checkIns[guardToCheckIn]) {
            mission.checkIns[guardToCheckIn] = { time: new Date(), verifiedBy: userId };
        }
    } else {
        if (leadAssignment && !isUserTheLead && !mission.checkIns[leadAssignment.userId]) {
            alert('The Site Lead must check in first.');
            return;
        }
        if (!mission.checkIns[userId]) {
             mission.checkIns[userId] = { time: new Date() };
             if (mission.status !== 'Active') {
                 mission.status = 'Active';
             }
        }
    }
    save();
}

export function missionCheckOut(missionId: string, userId: string, isLead = false, guardToCheckOut: string | null = null) {
    const mission = getMissionById(missionId);
    if (!mission || !mission.checkIns[userId]) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) {
        if (guardToCheckOut && !mission.checkOuts[guardToCheckOut]) {
            mission.checkOuts[guardToCheckOut] = { time: new Date(), verifiedBy: userId };
        }
    } else {
         if (isUserTheLead) {
             const allOthersOut = mission.claimedBy.every((id: string) => id === userId || mission.checkOuts[id]);
             if (!allOthersOut) {
                 alert('You must check out all other guards before checking yourself out.');
                 return;
             }
         }
        if (!mission.checkOuts[userId]) {
            mission.checkOuts[userId] = { time: new Date() };
            const allCheckedOut = mission.claimedBy.every((guardId: string) => mission.checkOuts[guardId]);
            if (allCheckedOut) {
                mission.status = 'Completed';
            }
        }
    }
    save();
}

export function updateClientGuardList(clientId: string, guardId: string, listType: 'whitelist' | 'blacklist', action: 'add' | 'remove') {
    const client = getClientById(clientId);
    if (!client) return;
    const otherList = listType === 'whitelist' ? 'blacklist' : 'whitelist';
    if (action === 'add' && client[otherList].includes(guardId)) {
        client[otherList] = client[otherList].filter((id: string) => id !== guardId);
    }
    const list = client[listType];
    const index = list.indexOf(guardId);
    if (action === 'add' && index === -1) {
        list.push(guardId);
    } else if (action === 'remove' && index > -1) {
        list.splice(index, 1);
    }
    save();
}

export function submitTraining(userId: string, moduleId: string, answers: any) {
    const module = getTrainingModules().find((m: any) => m.id === moduleId);
    if (!module) return false;

    const existingAttempt = _DB.trainingProgress.find((p: any) => p.userId === userId && p.moduleId === moduleId);
    if (existingAttempt) {
        alert("You have already attempted this quiz. Request a retake from a Training Officer or Supervisor.");
        return null;
    }

    let correct = 0;
    module.quiz.forEach((q: any, index: number) => {
        if (answers[`q-${index}`]?.toLowerCase().trim() === q.a.toLowerCase().trim()) {
            correct++;
        }
    });
    const passed = (correct / module.quiz.length) >= 0.8;
    const progress = {
        id: `tp-${Date.now()}`,
        userId,
        moduleId,
        status: passed ? 'Pending Approval' : 'Failed',
        submittedAt: new Date(),
        score: (correct / module.quiz.length) * 100,
    };
    
    _DB.trainingProgress.push(progress);
    save();
    return passed;
}

export function updateTrainingProgressStatus(progressId: string, status: string) {
    const progress = _DB.trainingProgress.find((p: any) => p.id === progressId);
    if (progress) {
        progress.status = status;
        if (status === 'Approved') {
            const user = getUserById(progress.userId);
            const module = getTrainingModules().find((m: any) => m.id === progress.moduleId);
            if (user && module && !user.certifications.includes(module.title)) {
                user.certifications.push(module.title);
            }
        }
        if (status === 'Retake Requested') {
            _DB.trainingProgress = _DB.trainingProgress.filter((p: any) => p.id !== progressId);
        }
    }
    save();
}

export function addContract(contractData: any, status = 'Pending') {
    const newContract = { ...contractData, id: `contract-${Date.now()}`, status };
    _DB.contracts.push(newContract);
    logAction('CREATE', 'contracts', newContract.id, 'Medium', { after: newContract });
    save();
}

export function updateContractStatus(contractId: string, status: string, user: any) {
    if (!user) return false;
    const canApprove = canAlwaysApproveRoles.includes(user.role);
    const canReview = managementAndOpsRoles.includes(user.role);
    const contract = _DB.contracts.find((c: any) => c.id === contractId);
    if (!contract) return false;

    if (status === 'Ready for Review') {
        if ((canReview || canApprove) && contract.status === 'Pending') {
            return updateById('contracts', contractId, { status: 'Ready for Review' });
        }
    } else if (status === 'Active' || status === 'Denied') {
        if (canApprove && (contract.status === 'Pending' || contract.status === 'Ready for Review')) {
            return updateById('contracts', contractId, { status });
        }
    }
    
    return false;
}

export function addPromotion(promoData: any) {
    const newPromo = { ...promoData, id: `promo-${Date.now()}`, status: 'Pending Ops Approval', submittedAt: new Date() };
    _DB.promotions.push(newPromo);
    logAction('CREATE', 'promotions', newPromo.id, 'Medium', { after: newPromo });
    save();
}

export function updatePromotionStatus(promoId: string, decision: string, currentUser: any) {
    const promo = _DB.promotions.find((p: any) => p.id === promoId);
    if (!promo) return;

    const before = { ...promo };

    if (decision === 'Denied') {
        promo.status = 'Denied';
        logAction('DENY', 'promotions', promoId, 'Medium', { before, after: promo, description: `Promotion denied by ${currentUser.role}` });
        save();
        return;
    }

    // Handle Approval
    const isOps = [...operationsRoles, ...executiveRoles].includes(currentUser.role);
    const isOwner = executiveRoles.includes(currentUser.role);

    if (promo.status === 'Pending Ops Approval' && isOps) {
        promo.status = 'Pending Owner Approval';
        logAction('APPROVE_OPS', 'promotions', promoId, 'Medium', { before, after: promo, description: `Ops approval by ${currentUser.firstName}` });
    } else if (promo.status === 'Pending Owner Approval' && isOwner) {
        promo.status = 'Approved';
        logAction('APPROVE_OWNER', 'promotions', promoId, 'High', { before, after: promo, description: `Final approval by ${currentUser.firstName}` });
        updateById('users', promo.userId, { role: promo.toRole, rank: Ranks[promo.toRole as keyof typeof Ranks], needsUniform: true });
    } else {
        console.warn(`User ${currentUser.id} (${currentUser.role}) does not have permission to approve promotion ${promoId} in its current state (${promo.status}).`);
        return; // Don't save if no valid action was taken
    }
    save();
}

export function createPayrollRun(startDate: Date, endDate: Date) {
    const runId = `pr-${Date.now()}`;
    const run = { id: runId, startDate, endDate, status: 'Pending', totalAmount: 0, createdAt: new Date() };
    const paidMissionIds = _DB.payrollEntries.map((e: any) => e.missionIds).flat();
    const missionsInPeriod = _DB.missions.filter((m: any) => 
        m.status === 'Completed' &&
        new Date(m.endTime) >= startDate &&
        new Date(m.endTime) <= endDate &&
        !paidMissionIds.includes(m.id)
    );
    const guardPay: { [key: string]: any } = {};
    missionsInPeriod.forEach((mission: any) => {
        mission.claimedBy.forEach((guardId: string) => {
            const checkIn = mission.checkIns[guardId];
            const checkOut = mission.checkOuts[guardId];
            if (checkIn && checkOut) {
                const hours = (new Date(checkOut.time).getTime() - new Date(checkIn.time).getTime()) / (1000 * 60 * 60);
                const pay = hours * mission.payRate;
                if (!guardPay[guardId]) guardPay[guardId] = { totalHours: 0, totalPay: 0, missionIds: [] };
                guardPay[guardId].totalHours += hours;
                guardPay[guardId].totalPay += pay;
                if (!guardPay[guardId].missionIds.includes(mission.id)) {
                    guardPay[guardId].missionIds.push(mission.id);
                }
            }
        });
    });
    Object.keys(guardPay).forEach(userId => {
        const entry = {
            id: `pe-${Date.now()}-${userId}`, runId, userId,
            hours: guardPay[userId].totalHours, totalPay: guardPay[userId].totalPay,
            missionIds: guardPay[userId].missionIds, paymentConfirmed: false,
        };
        _DB.payrollEntries.push(entry);
        run.totalAmount += entry.totalPay;
    });
    _DB.payrollRuns.push(run);
    save();
}

export function approvePayrollRun(runId: string) {
    updateById('payrollRuns', runId, { status: 'Approved' });
}

export function confirmPayment(entryId: string) {
    updateById('payrollEntries', entryId, { paymentConfirmed: true });
    const entry = _DB.payrollEntries.find((e: any) => e.id === entryId);
    if(entry) {
        const allPaid = _DB.payrollEntries
            .filter((e: any) => e.runId === entry.runId)
            .every((e: any) => e.paymentConfirmed);
        if (allPaid) {
            updateById('payrollRuns', entry.runId, { status: 'Paid' });
        }
    }
}

export function addSpotCheck(supervisorId: string, missionId: string) {
    const existing = getSpotCheckByMissionId(missionId);
    if(existing) {
        alert("A spot check for this mission is already in progress.");
        return;
    }
    const newSpotCheck = {
        id: `sc-${Date.now()}`,
        supervisorId,
        missionId,
        status: 'InProgress',
        startTime: new Date(),
        checks: { start: null, mid: null, end: null },
        finalReport: null,
        selfies: { start: null, end: null },
    };
    _DB.spotChecks.push(newSpotCheck);
    save();
}

export function updateSpotCheck(spotCheckId: string, checkType: 'start' | 'mid' | 'end', checkData: any) {
    const spotCheck = _DB.spotChecks.find((sc: any) => sc.id === spotCheckId);
    if(spotCheck) {
        spotCheck.checks[checkType] = checkData;
        save();
    }
}

export function addSpotCheckSelfie(spotCheckId: string, type: 'start' | 'end', imageData: any) {
    const spotCheck = _DB.spotChecks.find((sc: any) => sc.id === spotCheckId);
    if (spotCheck) {
        updateById('spotChecks', spotCheckId, { selfies: { ...spotCheck.selfies, [type]: imageData } });
    }
}

export function completeSpotCheck(spotCheckId: string, report: string) {
    const spotCheck = _DB.spotChecks.find((sc: any) => sc.id === spotCheckId);
    if(spotCheck && spotCheck.checks.start && spotCheck.checks.mid && spotCheck.checks.end) {
        updateById('spotChecks', spotCheckId, { finalReport: report, status: 'Completed', endTime: new Date() });
    } else {
        alert("All three checks must be completed before submitting the final report.");
    }
}

export function assignLeadGuard(missionId: string, userId: string) {
    _DB.leadGuardAssignments = _DB.leadGuardAssignments.filter((lg: any) => lg.missionId !== missionId);
    const assignment = { id: `lg-${Date.now()}`, missionId, userId };
    _DB.leadGuardAssignments.push(assignment);
    save();
}

export const getNeedsUniformUsers = (teamId: string | null = null) => {
    const users = _DB.users.filter((u: any) => u.needsUniform);
    if(!teamId) return users;
    return users.filter((u: any) => u.teamId === teamId);
}

export function markUniformSent(userId: string) {
    const user = getUserById(userId);
    if(user && user.needsUniform) {
        const delivery = {
            id: `ud-${Date.now()}`,
            userId,
            sentAt: new Date(),
            receivedAt: null,
        };
        _DB.uniformDeliveries.push(delivery);
        user.needsUniform = false;
        save();
    }
}

export function confirmUniformReceived(userId: string) {
    const delivery = _DB.uniformDeliveries.find((d: any) => d.userId === userId && d.receivedAt === null);
    if(delivery) {
        delivery.receivedAt = new Date();
        save();
    }
}

export function suspendUser(userId: string) {
    const user = getUserById(userId);
    if(user) {
        const before = {...user};
        user.status = 'Suspended';
        logAction('SUSPEND', 'users', userId, 'Medium', { before, after: user });
        save();
        return true;
    }
    return false;
}

export function terminateUser(userId: string) {
    const user = getUserById(userId);
    if(user) {
        const before = {...user};
        user.status = 'Terminated';
        logAction('TERMINATE', 'users', userId, 'High', { before, after: user });
        save();
        return true;
    }
    return false;
}

export function deleteById(collectionName: string, id: string) {
    const collection = _DB[collectionName];
    if (!collection) return false;
    const index = collection.findIndex((i: any) => i.id === id);
    if (index > -1) {
        const item = collection[index];
        logAction('DELETE_PERMANENT', collectionName, id, 'High', { before: item });
        collection.splice(index, 1);
        save();
        return true;
    }
    return false;
}

export function approveMission(missionId: string) {
    logAction('APPROVE', 'missions', missionId, 'Low', { description: "Mission status changed to Open" });
    return updateById('missions', missionId, { status: 'Open' });
}

export function denyMission(missionId: string) {
    logAction('DENY', 'missions', missionId, 'Medium', { description: "Mission status changed to Cancelled" });
    return updateById('missions', missionId, { status: 'Cancelled' });
}

export function addChangeRequest(proposerId: string, entityType: string, entityId: string, proposedChanges: any) {
    const newRequest = {
        id: `cr-${Date.now()}`,
        proposerId,
        entityType,
        entityId,
        proposedChanges,
        status: 'Pending',
        createdAt: new Date(),
    };
    (_DB.changeRequests).push(newRequest);
    logAction('PROPOSE_CHANGE', 'changeRequests', newRequest.id, 'Medium', { after: newRequest });
    save();
}

export function updateChangeRequestStatus(requestId: string, status: string, reviewerId: string) {
    const request = (_DB.changeRequests).find((r: any) => r.id === requestId);
    if (request && request.status === 'Pending') {
        const before = { ...request };
        request.status = status;
        request.reviewedBy = reviewerId;
        request.reviewedAt = new Date();

        if (status === 'Approved') {
            logAction('APPROVE_CHANGE', 'changeRequests', requestId, 'Medium', { before, after: request });
            // Apply the changes
            updateById(request.entityType, request.entityId, request.proposedChanges);
        } else {
            logAction('REJECT_CHANGE', 'changeRequests', requestId, 'Medium', { before, after: request });
        }
        save();
        return true;
    }
    return false;
}
