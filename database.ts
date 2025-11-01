import { UserRole, Ranks } from './types.js';
import { executiveRoles, canAlwaysApproveRoles, managementAndOpsRoles } from './constants.js';

// Define interfaces for the database structure to provide proper typing.
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    rank: string;
    level: number;
    certifications: string[];
    teamId: string | null;
    weeklyHours: number;
    performanceRating: number;
    needsUniform: boolean;
}

export interface Client {
    id: string;
    companyName: string;
    contactEmail: string;
    userId: string;
    teamId: string | null;
    whitelist: string[];
    blacklist: string[];
}

export interface Mission {
    id: string;
    title: string;
    clientId: string;
    siteId: string;
    contractId: string;
    requiredTrainingId: string;
    startTime: Date;
    endTime: Date;
    payRate: number;
    requiredGuards: number;
    requiredLevel: number;
    leadGuardId?: string;
    description: string;
    status: 'Open' | 'Claimed' | 'Active' | 'Completed' | 'Cancelled';
    claimedBy: string[];
    checkIns: { [userId: string]: { time: Date, verifiedBy?: string } };
    checkOuts: { [userId: string]: { time: Date, verifiedBy?: string } };
}

interface DB {
    users: User[];
    clients: Client[];
    missions: Mission[];
    sites: any[];
    contracts: any[];
    applications: any[];
    promotions: any[];
    siteApprovalRequests: any[];
    trainingModules: any[];
    trainingProgress: any[];
    payrollRuns: any[];
    payrollEntries: any[];
    alerts: any[];
    systemSettings: any;
    teams: any[];
    spotChecks: any[];
    uniformDeliveries: any[];
    leadGuardAssignments: any[];
}

const initialData: DB = {
  users: [
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'M.White@SignatureSecuritySpecialist.com', role: UserRole.Owner, rank: Ranks[UserRole.Owner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 0, performanceRating: 5.0, needsUniform: false },
    { id: 'user-co', firstName: 'Ashley', lastName: 'Smith', email: 'A.Smith@SignatureSecuritySpecialist.com', role: UserRole.CoOwner, rank: Ranks[UserRole.CoOwner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 40, performanceRating: 5.0, needsUniform: false },
    // Team 1
    { id: 'user-sec-1', firstName: 'Ahlya', lastName: 'Lyons', email: 'A.Lyons@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 40, performanceRating: 5.0, needsUniform: false },
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'J.Lyons@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.8, needsUniform: false },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 'T.Moreno@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.7, needsUniform: false },
    // Team 2
    { id: 'user-sec-2', firstName: 'Alison', lastName: 'Avancena', email: 'A.Avancena@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 40, performanceRating: 5.0, needsUniform: false },
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'B.Baker@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.8, needsUniform: false },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'R.Granum@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.7, needsUniform: false },
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
};
let _DB: DB = {} as DB;

function save() {
  localStorage.setItem('sss_db', JSON.stringify(_DB));
  window.dispatchEvent(new Event('storage'));
}

function load() {
  const dbString = localStorage.getItem('sss_db');
  if (dbString) {
    try {
      const parsedDB = JSON.parse(dbString);
      const collectionsWithDates = ['missions', 'contracts', 'promotions', 'payrollRuns', 'applications', 'trainingProgress', 'spotChecks', 'uniformDeliveries', 'siteApprovalRequests'];
      collectionsWithDates.forEach(collection => {
          if(parsedDB[collection]) {
              (parsedDB as any)[collection].forEach((item: any) => {
                  if (item.startTime) item.startTime = new Date(item.startTime);
                  if (item.endTime) item.endTime = new Date(item.endTime);
                  if (item.startDate) item.startDate = new Date(item.startDate);
                  if (item.endDate) item.endDate = new Date(item.endDate);
                  if (item.submittedAt) item.submittedAt = new Date(item.submittedAt);
                  if (item.createdAt) item.createdAt = new Date(item.createdAt);
                  if (item.time) item.time = new Date(item.time);
                  if (item.sentAt) item.sentAt = new Date(item.sentAt);
                  if (item.receivedAt) item.receivedAt = new Date(item.receivedAt);
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

export const getCollection = (name: keyof DB) => _DB[name] || [];

export const getUsers = (roles: string[] | null = null): User[] => {
    if (!roles) return getCollection('users') as User[];
    return (getCollection('users') as User[]).filter(u => roles.includes(u.role));
};

export const getUserById = (id: string) => (getCollection('users') as User[]).find(u => u.id === id);
export const getUserByEmail = (email: string) => (getCollection('users') as User[]).find(u => u.email === email);
export const getClients = (): Client[] => getCollection('clients') as Client[];
export const getClientById = (id: string) => (getCollection('clients') as Client[]).find(c => c.id === id);

export const getMissions = (teamId: string | null = null): Mission[] => {
    const missions = getCollection('missions') as Mission[];
    if (!teamId) return missions;
    return missions.filter(m => {
        const client = getClientById(m.clientId);
        return client && client.teamId === teamId;
    });
};

export const getMissionById = (id: string) => (getCollection('missions') as Mission[]).find(m => m.id === id);
export const getSites = () => getCollection('sites');
export const getSiteById = (id: string) => getCollection('sites').find(s => s.id === id);
export const getContracts = () => getCollection('contracts');
export const getApplications = (status = 'Pending') => getCollection('applications').filter(a => a.status === status);
export const getTrainingModules = () => getCollection('trainingModules');
export const getUserTrainingProgress = (userId: string) => getCollection('trainingProgress').filter(p => p.userId === userId);

export const getPendingTrainingApprovals = (teamId: string | null = null) => {
    const pending = getCollection('trainingProgress').filter(p => p.status === 'Pending Approval');
    if (!teamId) return pending;
    return pending.filter(p => {
        const user = getUserById(p.userId);
        return user && user.teamId === teamId;
    });
};

export const getSystemSettings = () => getCollection('systemSettings');
export const getAlerts = () => getCollection('alerts');
export const getPromotions = () => getCollection('promotions');
export const getPayrollRuns = () => getCollection('payrollRuns').sort((a: any,b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
export const getPayrollEntriesForRun = (runId: string) => getCollection('payrollEntries').filter(e => e.runId === runId);

export const getMissionsForSpotCheck = (supervisorId: string) => {
    const supervisor = getUserById(supervisorId);
    if (!supervisor) return [];
    return getMissions(supervisor.teamId).filter(m => m.status === 'Active' && !m.claimedBy.includes(supervisorId));
};

export const getSpotCheckByMissionId = (missionId: string) => getCollection('spotChecks').find(sc => sc.missionId === missionId);
export const getLeadGuardAssignment = (missionId: string) => getCollection('leadGuardAssignments').find(lg => lg.missionId === missionId);

export const getPendingSiteApprovals = (teamId: string | null = null) => {
    const pending = getCollection('siteApprovalRequests').filter(r => r.status === 'Pending');
    if (!teamId) return pending;
    return pending.filter(r => {
        const client = getClientById(r.clientId);
        return client && client.teamId === teamId;
    });
};

export function updateById(collectionName: keyof Omit<DB, 'systemSettings'>, id: string, updates: object) {
    const collection = _DB[collectionName] as any[];
    if (!collection) return false;
    const item = collection.find(i => i.id === id);
    if (item) {
        Object.assign(item, updates);
        save();
        return true;
    }
    return false;
}

export function updateSystemSettings(updates: object) {
    _DB.systemSettings = { ..._DB.systemSettings, ...updates };
    save();
    return true;
}

export function addApplication({ type, data }: { type: string, data: any }) {
    const newApp = { id: `app-${Date.now()}`, type, data, status: 'Pending', submittedAt: new Date() };
    _DB.applications.push(newApp);
    save();
}

function addSite(siteData: any) {
    const newSite = { ...siteData, id: `site-${Date.now()}` };
    _DB.sites.push(newSite);
    save();
}

export function addSiteApprovalRequest(requestData: any) {
    const newRequest = { ...requestData, id: `sar-${Date.now()}`, status: 'Pending', submittedAt: new Date() };
    _DB.siteApprovalRequests.push(newRequest);
    save();
}

export function updateSiteApprovalStatus(requestId: string, status: string) {
    const request = _DB.siteApprovalRequests.find(r => r.id === requestId);
    if (request) {
        request.status = status;
        if (status === 'Approved') {
            addSite({
                clientId: request.clientId,
                name: request.siteName,
                address: request.siteAddress
            });
        }
        _DB.siteApprovalRequests = _DB.siteApprovalRequests.filter(r => r.id !== requestId);
    }
    save();
}

export function updateApplicationStatus(appId: string, status: string, teamId: string | null = null) {
    const app = _DB.applications.find(a => a.id === appId);
    if (app) {
        app.status = status;
        if (status === 'Approved') {
            const roleMap: { [key: string]: string } = { 'New Guard': UserRole.Guard, 'New Supervisor': UserRole.Supervisor, 'New Client': UserRole.Client, 'New Training Officer': UserRole.TrainingOfficer, 'New Operations': UserRole.OperationsManager, 'New Management': UserRole.Secretary };
            const role = roleMap[app.type];
            if (!role) return;

            let assignedTeamId = app.data.teamCode || teamId;
            if (!assignedTeamId && role !== UserRole.Client && !executiveRoles.includes(role)) {
                const teamCounts = _DB.teams.map(t => ({ id: t.id, count: _DB.users.filter(u => u.teamId === t.id).length }));
                if (teamCounts.length > 0) {
                    assignedTeamId = teamCounts.sort((a, b) => a.count - b.count)[0].id;
                }
            }
            
            const newUser: User = {
                id: `user-${Date.now()}`,
                firstName: app.data.firstName || app.data.companyName.split(' ')[0],
                lastName: app.data.lastName || app.data.companyName.split(' ')[1] || 'Contact',
                email: app.data.email || app.data.contactEmail,
                role: role,
                rank: Ranks[role],
                level: 1,
                certifications: [],
                teamId: assignedTeamId,
                weeklyHours: 0,
                performanceRating: 5.0,
                needsUniform: (role !== UserRole.Client),
            };
            _DB.users.push(newUser);
            if(role === UserRole.Client) {
                const newClient: Client = {
                    id: `client-${Date.now()}`,
                    companyName: app.data.companyName,
                    contactEmail: app.data.contactEmail,
                    userId: newUser.id,
                    teamId: assignedTeamId,
                    whitelist: [],
                    blacklist: []
                };
                _DB.clients.push(newClient);
                 if (app.data.siteName && app.data.siteAddress) {
                    addSite({
                        clientId: newClient.id,
                        name: app.data.siteName,
                        address: app.data.siteAddress,
                    });
                }
            }
        }
        _DB.applications = _DB.applications.filter(a => a.id !== appId);
    }
    save();
}

export function addMission(missionData: any) {
    const missionId = `mission-${Date.now()}`;
    const newMission: Mission = {
        ...missionData,
        id: missionId,
        status: 'Open',
        claimedBy: [],
        checkIns: {},
        checkOuts: {},
    };
    _DB.missions.push(newMission);
    _DB.alerts.push({
        id: `alert-${Date.now()}`,
        severity: 'Info',
        message: `New mission "${newMission.title}" created. Requires supervisor assignment.`,
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
    const requiredTraining = mission ? getTrainingModules().find(tm => tm.id === mission.requiredTrainingId) : undefined;
    const hasTraining = mission ? userProgress.some(p => p.moduleId === mission.requiredTrainingId && p.status === 'Approved') : false;

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
             const allOthersOut = mission.claimedBy.every(id => id === userId || mission.checkOuts[id]);
             if (!allOthersOut) {
                 alert('You must check out all other guards before checking yourself out.');
                 return;
             }
         }
        if (!mission.checkOuts[userId]) {
            mission.checkOuts[userId] = { time: new Date() };
            const allCheckedOut = mission.claimedBy.every(guardId => mission.checkOuts[guardId]);
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
        client[otherList] = client[otherList].filter(id => id !== guardId);
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

export function submitTraining(userId: string, moduleId: string, answers: { [key: string]: string }) {
    const module = getTrainingModules().find(m => m.id === moduleId);
    if (!module) return false;

    const existingAttempt = _DB.trainingProgress.find(p => p.userId === userId && p.moduleId === moduleId);
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
    const progress = _DB.trainingProgress.find(p => p.id === progressId);
    if (progress) {
        progress.status = status;
        if (status === 'Approved') {
            const user = getUserById(progress.userId);
            const module = getTrainingModules().find(m => m.id === progress.moduleId);
            if (user && module && !user.certifications.includes(module.title)) {
                user.certifications.push(module.title);
            }
        }
        if (status === 'Retake Requested') {
            _DB.trainingProgress = _DB.trainingProgress.filter(p => p.id !== progressId);
        }
    }
    save();
}

export function addContract(contractData: any) {
    const newContract = { ...contractData, id: `contract-${Date.now()}`, status: 'Pending' };
    _DB.contracts.push(newContract);
    save();
}

export function updateContractStatus(contractId: string, status: 'Active' | 'Denied' | 'Ready for Review', user: User) {
    if (!user) return false;
    const canApprove = canAlwaysApproveRoles.includes(user.role);
    const canReview = managementAndOpsRoles.includes(user.role);
    const contract = _DB.contracts.find(c => c.id === contractId);
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
    const newPromo = { ...promoData, id: `promo-${Date.now()}`, status: 'Pending', submittedAt: new Date() };
    _DB.promotions.push(newPromo);
    save();
}

export function updatePromotionStatus(promoId: string, status: string) {
    const promo = _DB.promotions.find(p => p.id === promoId);
    if (promo) {
        promo.status = status;
        if (status === 'Approved') {
            updateById('users', promo.userId, { role: promo.toRole, rank: Ranks[promo.toRole], needsUniform: true });
        }
    }
    save();
}

export function createPayrollRun(startDate: Date, endDate: Date) {
    const runId = `pr-${Date.now()}`;
    const run = { id: runId, startDate, endDate, status: 'Pending', totalAmount: 0, createdAt: new Date() };
    const paidMissionIds = _DB.payrollEntries.map(e => e.missionIds).flat();
    const missionsInPeriod = _DB.missions.filter(m => 
        m.status === 'Completed' &&
        new Date(m.endTime) >= startDate &&
        new Date(m.endTime) <= endDate &&
        !paidMissionIds.includes(m.id)
    );
    const guardPay: { [userId: string]: { totalHours: number, totalPay: number, missionIds: string[] } } = {};
    missionsInPeriod.forEach(mission => {
        mission.claimedBy.forEach(guardId => {
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
    const entry = _DB.payrollEntries.find(e => e.id === entryId);
    if(entry) {
        const allPaid = _DB.payrollEntries
            .filter(e => e.runId === entry.runId)
            .every(e => e.paymentConfirmed);
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
    const spotCheck = _DB.spotChecks.find(sc => sc.id === spotCheckId);
    if(spotCheck) {
        spotCheck.checks[checkType] = checkData;
        save();
    }
}

export function addSpotCheckSelfie(spotCheckId: string, type: 'start' | 'end', imageData: string) {
    const spotCheck = _DB.spotChecks.find(sc => sc.id === spotCheckId);
    if (spotCheck) {
        updateById('spotChecks', spotCheckId, { selfies: { ...spotCheck.selfies, [type]: imageData } });
    }
}

export function completeSpotCheck(spotCheckId: string, report: string) {
    const spotCheck = _DB.spotChecks.find(sc => sc.id === spotCheckId);
    if(spotCheck && spotCheck.checks.start && spotCheck.checks.mid && spotCheck.checks.end) {
        updateById('spotChecks', spotCheckId, { finalReport: report, status: 'Completed', endTime: new Date() });
    } else {
        alert("All three checks must be completed before submitting the final report.");
    }
}

export function assignLeadGuard(missionId: string, userId: string) {
    _DB.leadGuardAssignments = _DB.leadGuardAssignments.filter(lg => lg.missionId !== missionId);
    const assignment = { id: `lg-${Date.now()}`, missionId, userId };
    _DB.leadGuardAssignments.push(assignment);
    save();
}

export const getNeedsUniformUsers = (teamId: string | null = null) => {
    const users = _DB.users.filter(u => u.needsUniform);
    if(!teamId) return users;
    return users.filter(u => u.teamId === teamId);
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
    const delivery = _DB.uniformDeliveries.find(d => d.userId === userId && d.receivedAt === null);
    if(delivery) {
        delivery.receivedAt = new Date();
        save();
    }
}
