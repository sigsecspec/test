

import { UserRole } from './types.js';

// Initial seed data
const initialData = {
  users: [
    // Owner
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'm.white@signaturesecurityspecialist.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 5.0 },
    
    // Team 1 Operations
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'j.lyons@signaturesecurityspecialist.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-1' },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 't.moreno@signaturesecurityspecialist.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-1' },
    
    // Team 2 Operations
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'b.baker@signaturesecurityspecialist.com', role: UserRole.Supervisor, rank: 'SGT (Sergeant)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-2' },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'r.granum@signaturesecurityspecialist.com', role: UserRole.TrainingOfficer, rank: 'CPL (Corporal)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-2' },
     // Guards
    { id: 'user-6', firstName: 'Frank', lastName: 'Castle', email: 'f.castle@guard.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 1, certifications: [], weeklyHours: 10, performanceRating: 4.5 },
    { id: 'user-7', firstName: 'Jessica', lastName: 'Jones', email: 'j.jones@guard.com', role: UserRole.Guard, rank: 'OFC (Officer)', level: 2, certifications: ['Level 1 - Basic Security', 'Level 2 - Pepper Spray'], weeklyHours: 25, performanceRating: 4.9 },
    // Client User
    { id: 'user-client-1', firstName: 'Stark', lastName: 'Industries', email: 'contact@stark.com', role: UserRole.Client, rank: 'Client', level: 0, certifications: [], weeklyHours: 0, performanceRating: 0 },

  ],
  clients: [
      { id: 'client-1', companyName: 'Stark Industries', contactEmail: 'contact@stark.com', userId: 'user-client-1', whitelist: [], blacklist: [] }
  ],
  missions: [],
  sites: [
    { id: 'site-1', clientId: 'client-1', name: 'Stark Tower Main Lobby', address: '200 Park Avenue, New York, NY' }
  ],
  contracts: [
    { id: 'contract-1', clientId: 'client-1', title: 'Stark Tower Security', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), totalBudget: 250000, status: 'Active' }
  ],
  alerts: [],
  applications: [
      {
        id: 'app-seed-1',
        type: 'New Guard',
        status: 'Pending',
        data: {
            firstName: 'Matt',
            lastName: 'Murdock',
            email: 'm.murdock@guard.com',
            phone: '555-0103',
            role: 'Guard'
        }
      }
  ],
  approvals: [],
  spotChecks: [],
  systemSettings: {
    companyName: 'Signature Security Specialists',
    payrollCycle: 'Bi-Weekly',
  },
  hallOfFame: [],
  incidentReports: [],
  vehicles: [],
  payrollRuns: [],
  payrollEntries: [],
  promotions: [],
  appeals: [],
  trainingModules: [
    { id: 'tm-1', title: 'Level 1 - Basic Security', type: 'guard', duration: '2 hours', content: 'Covers basic security procedures, customer service, incident reporting, and emergency response.', quiz: [{ q: 'What is the first step in an emergency?', a: 'Assess the situation' }] },
    { id: 'tm-2', title: 'Level 2 - Pepper Spray', type: 'guard', duration: '1.5 hours', content: 'Covers pepper spray usage, defensive tactics, and de-escalation.', quiz: [{ q: 'What is the effective range of pepper spray?', a: '10-15 feet' }] },
    { id: 'tm-3', title: 'Level 3 - Taser Certified', type: 'guard', duration: '3 hours', content: 'Covers Taser operation, use of force policies, and legal training.', quiz: [{ q: 'What does Taser stand for?', a: "Thomas A. Swift's Electric Rifle" }] },
    { id: 'tm-4', title: 'Level 4 - Baton Certified', type: 'guard', duration: '4 hours', content: 'Covers baton usage, comprehensive defensive tactics, and advanced use of force.', quiz: [{ q: 'What is the primary target area for a baton strike?', a: 'Large muscle groups' }] },
    { id: 'tm-5', title: 'Level 5 - Armed Security', type: 'guard', duration: '8 hours', content: 'Covers firearms proficiency, legal implications, and tactical training.', quiz: [{ q: 'What are the four universal firearm safety rules?', a: "Treat every firearm as if it's loaded; Never point a firearm at anything you are not willing to destroy; Keep your finger off the trigger until you are ready to shoot; Be sure of your target and what is beyond it." }] },
    { id: 'tm-lead-1', title: 'Lead Guard Principles', type: 'lead-guard', duration: '2 hours', content: 'Covers site leadership, team coordination, and client liaison.', quiz: [{ q: 'What is a key responsibility of a Lead Guard?', a: 'Client communication' }] },
    { id: 'tm-sup-1', title: 'Supervisor Training', type: 'supervisor', duration: '6 hours', content: 'Covers spot checks, quality assurance, and field oversight.', quiz: [{ q: 'How many spot checks are required per shift?', a: '3' }] },
    { id: 'tm-to-1', title: 'Training Officer Course', type: 'training-officer', duration: '4 hours', content: 'Covers training management and certification tracking.', quiz: [{ q: 'What is the main role of a Training Officer?', a: 'Manage guard training and certifications' }] },
  ],
  userTrainingProgress: [
      {id: 'utp-seed-1', userId: 'user-7', moduleId: 'tm-1', status: 'Pending Approval', score: 100, submittedAt: new Date()}
  ],
};

const DB_KEY = 'sss_db';

// --- Internal DB Functions ---
const readDB = () => {
  try {
    const dbString = localStorage.getItem(DB_KEY);
    if (!dbString) {
      writeDB(initialData);
      return initialData;
    }
    const db = JSON.parse(dbString);
    // Date hydration
    db.missions = (db.missions || []).map((m) => ({
        ...m,
        startTime: new Date(m.startTime),
        endTime: new Date(m.endTime),
        checkIns: (m.checkIns || []).map((ci) => ({ ...ci, time: new Date(ci.time) })),
        checkOuts: (m.checkOuts || []).map((co) => ({ ...co, time: new Date(co.time) })),
        reports: (m.reports || []).map((r) => ({ ...r, time: new Date(r.time) })),
    }));
     db.spotChecks = (db.spotChecks || []).map((sc) => ({ ...sc, time: new Date(sc.time) }));
     db.incidentReports = (db.incidentReports || []).map((ir) => ({ ...ir, timestamp: new Date(ir.timestamp) }));
     db.payrollRuns = (db.payrollRuns || []).map((pr) => ({ ...pr, startDate: new Date(pr.startDate), endDate: new Date(pr.endDate) }));
     db.promotions = (db.promotions || []).map((p) => ({ ...p, dateApplied: new Date(p.dateApplied) }));
     db.appeals = (db.appeals || []).map((a) => ({ ...a, dateSubmitted: new Date(a.dateSubmitted) }));
     db.contracts = (db.contracts || []).map((c) => ({ ...c, startDate: new Date(c.startDate), endDate: new Date(c.endDate) }));
     db.userTrainingProgress = (db.userTrainingProgress || []).map((utp) => ({...utp, submittedAt: utp.submittedAt ? new Date(utp.submittedAt) : null}));
    return db;
  } catch (error) {
    console.error("Error reading from DB, resetting:", error);
    writeDB(initialData);
    return initialData;
  }
};

const writeDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event('storage'));
};

// --- Public API ---
export const initializeDB = () => { readDB(); };
export const getUserByEmail = (email) => readDB().users.find(u => u.email.toLowerCase() === email.toLowerCase());
export const getUserById = (id) => readDB().users.find(u => u.id === id);
export const getUsers = (roles) => {
    const db = readDB();
    if (!roles || roles.length === 0) return db.users;
    return db.users.filter(u => roles.includes(u.role));
};
export const getMissions = () => readDB().missions.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
export const getClients = () => readDB().clients;
export const getClientById = (id) => readDB().clients.find(c => c.id === id);
export const getSites = () => readDB().sites || [];
export const getAlerts = () => readDB().alerts.filter(a => !a.acknowledged) || [];
export const getApplications = () => readDB().applications.filter(a => a.status === 'Pending') || [];
export const getApprovals = () => readDB().approvals || [];
export const getSpotChecksForMission = (missionId) => readDB().spotChecks.filter(sc => sc.missionId === missionId);
export const getHallOfFameEntries = () => readDB().hallOfFame || [];
export const getSystemSettings = () => readDB().systemSettings;
export const getIncidentReports = () => readDB().incidentReports || [];
export const getVehicles = () => readDB().vehicles || [];
export const getPayrollRuns = () => readDB().payrollRuns.sort((a, b) => b.startDate.getTime() - a.startDate.getTime()) || [];
export const getPayrollEntriesForRun = (runId) => readDB().payrollEntries.filter(p => p.payrollRunId === runId) || [];
export const getPromotions = () => readDB().promotions || [];
export const getAppeals = () => readDB().appeals || [];
export const getContracts = () => readDB().contracts;

export const getTrainingModules = () => readDB().trainingModules || [];
export const getUserTrainingProgress = (userId) => {
    const db = readDB();
    return (db.userTrainingProgress || []).filter(p => p.userId === userId);
};
export const getPendingTrainingApprovals = () => {
    const db = readDB();
    return (db.userTrainingProgress || []).filter(p => p.status === 'Pending Approval');
}

export const submitTraining = (userId, moduleId, answers) => {
    const db = readDB();
    const module = db.trainingModules.find(m => m.id === moduleId);
    if (!module) return;
    const passed = module.quiz.every((q, index) => answers[`q-${index}`]);

    let progress = db.userTrainingProgress.find(p => p.userId === userId && p.moduleId === moduleId);
    if (!progress) {
        progress = { id: `utp-${Date.now()}`, userId, moduleId };
        db.userTrainingProgress.push(progress);
    }
    progress.status = passed ? 'Pending Approval' : 'Failed';
    progress.score = passed ? 100 : 0;
    progress.submittedAt = new Date();
    writeDB(db);
    return passed;
};

export const updateTrainingProgressStatus = (progressId, status) => {
    const db = readDB();
    const progress = db.userTrainingProgress.find(p => p.id === progressId);
    if(progress) {
        progress.status = status;
        if (status === 'Approved') {
            const user = db.users.find(u => u.id === progress.userId);
            const module = db.trainingModules.find(m => m.id === progress.moduleId);
            if(user && module) {
                if(!user.certifications.includes(module.title)) {
                    user.certifications.push(module.title);
                }
                const levelMatch = module.title.match(/Level (\d+)/);
                if (levelMatch) {
                    const newLevel = parseInt(levelMatch[1], 10);
                    if (user.level < newLevel) user.level = newLevel;
                }
            }
        }
    }
    writeDB(db);
};

export const addContract = (contractData) => {
    const db = readDB();
    const newContract = { ...contractData, id: `contract-${Date.now()}`, status: 'Pending' };
    db.contracts.push(newContract);
    db.approvals.push({ id: `appr-${Date.now()}`, type: 'Contract', subject: `New Contract: ${contractData.title}`, details: `Client ID: ${contractData.clientId}`, requesterId: 'system' });
    writeDB(db);
};

export const updateContractStatus = (contractId, status) => {
    const db = readDB();
    const contract = db.contracts.find(c => c.id === contractId);
    if (contract) { contract.status = status; writeDB(db); }
};

export const addApplication = (appData) => {
    const db = readDB();
    const newApplication = { ...appData, id: `app-${Date.now()}`, status: 'Pending' };
    db.applications.push(newApplication);
    writeDB(db);
};

export const addMission = (missionData) => {
    const db = readDB();
    const newMission = { ...missionData, id: `mission-${Date.now()}`, status: 'Open', claimedBy: [], checkIns: [], checkOuts: [], reports: [], incidentIds: [] };
    db.missions.push(newMission);
    writeDB(db);
    return newMission;
};

export const claimMission = (missionId, guardId) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    const guard = db.users.find(u => u.id === guardId);
    const client = db.clients.find(c => c.id === mission?.clientId);

    if (!mission || !guard ) return { success: false, message: "Invalid data." };
    if (mission.status !== 'Open') return { success: false, message: "Mission is not available." };
    if (mission.claimedBy.length >= mission.requiredGuards) return { success: false, message: "All slots for this mission are filled." };
    if (mission.claimedBy.includes(guardId)) return { success: false, message: "You have already claimed this mission." };
    if (client && client.blacklist && client.blacklist.includes(guardId)) return { success: false, message: "You are blacklisted by this client." };

    mission.claimedBy.push(guardId);
    if (mission.claimedBy.length === mission.requiredGuards) { mission.status = 'Claimed'; }
    
    writeDB(db);
    return { success: true, message: "Mission claimed!" };
};

export const updateApplicationStatus = (applicationId, status) => {
    const db = readDB();
    const application = db.applications.find(a => a.id === applicationId);
    if (!application) return;
    
    application.status = status;
    if (status === 'Approved') {
        const data = application.data;
        if (application.type === 'New Guard' || application.type === 'New Supervisor') {
            const id = `user-${Date.now()}`;
            db.users.push({ id, firstName: data.firstName, lastName: data.lastName, email: data.email, role: data.role, rank: data.role === UserRole.Supervisor ? 'SGT (Sergeant)' : 'OFC (Officer)', level: 1, certifications: [], weeklyHours: 0, performanceRating: 0 });
        } else if (application.type === 'New Client') {
            const clientId = `client-${Date.now()}`;
            const userId = `user-${Date.now() + 1}`;
            db.users.push({ id: userId, firstName: data.companyName, lastName: 'Client', email: data.contactEmail, role: UserRole.Client, rank: 'Client', level: 0, certifications: [], weeklyHours: 0, performanceRating: 0 });
            db.clients.push({ id: clientId, companyName: data.companyName, contactEmail: data.contactEmail, userId: userId, whitelist: [], blacklist: [] });
        }
    }
    writeDB(db);
};

export const missionCheckIn = (missionId, guardId) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && (mission.status === 'Claimed' || mission.status === 'Active')) {
        if (!mission.checkIns) mission.checkIns = [];
        if (mission.checkIns.length === 0) mission.status = 'Active';
        if (!mission.checkIns.some(c => c.guardId === guardId)) {
            mission.checkIns.push({ guardId, time: new Date() });
            writeDB(db);
        }
    }
};

export const missionCheckOut = (missionId, guardId) => {
    const db = readDB();
    const mission = db.missions.find(m => m.id === missionId);
    if (mission && mission.status === 'Active' && mission.checkIns.some(c => c.guardId === guardId) && !mission.checkOuts?.some(c => c.guardId === guardId)) {
        if(!mission.checkOuts) mission.checkOuts = [];
        mission.checkOuts.push({ guardId, time: new Date() });
        if (mission.checkOuts.length >= mission.claimedBy.length) mission.status = 'AwaitingReport';
        writeDB(db);
    }
};

export const updateClientGuardList = (clientId, guardId, listType, action) => {
    const db = readDB();
    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    if (!client.whitelist) client.whitelist = [];
    if (!client.blacklist) client.blacklist = [];

    const otherList = listType === 'whitelist' ? client.blacklist : client.whitelist;
    const list = client[listType];

    if (action === 'add') {
        const indexInOther = otherList.indexOf(guardId);
        if (indexInOther > -1) otherList.splice(indexInOther, 1);
        if (!list.includes(guardId)) list.push(guardId);
    } else if (action === 'remove') {
        const indexInList = list.indexOf(guardId);
        if (indexInList > -1) list.splice(indexInList, 1);
    }
    
    writeDB(db);
};

export const createPayrollRun = (startDate, endDate) => {
    const db = readDB();
    const runId = `pr-${Date.now()}`;
    const missionsInPeriod = db.missions.filter(m => 
        m.status === 'Completed' && 
        m.checkOuts && m.checkOuts.length > 0 && 
        new Date(m.checkOuts[0].time) >= startDate && 
        new Date(m.checkOuts[0].time) <= endDate
    );
    
    let totalAmount = 0;
    const newEntries = [];

    missionsInPeriod.forEach(mission => {
        mission.checkOuts.forEach(checkout => {
            const checkin = mission.checkIns.find(ci => ci.guardId === checkout.guardId);
            if (!checkin) return;
            
            const alreadyProcessed = db.payrollEntries.some(e => e.missionId === mission.id && e.userId === checkout.guardId);
            if (alreadyProcessed) return;

            const hours = (new Date(checkout.time).getTime() - new Date(checkin.time).getTime()) / 3600000;
            const totalPay = hours * mission.payRate;
            totalAmount += totalPay;
            newEntries.push({
                id: `pe-${mission.id}-${checkout.guardId}`,
                payrollRunId: runId, userId: checkout.guardId, missionId: mission.id,
                hours, payRate: mission.payRate, totalPay, paymentConfirmed: false,
            });
        })
    });

    if (newEntries.length === 0) {
        alert("No completed missions found in the selected date range to create a payroll run.");
        return;
    }

    const newRun = { id: runId, startDate, endDate, status: 'Pending', totalAmount };
    db.payrollRuns.push(newRun);
    db.payrollEntries.push(...newEntries);
    writeDB(db);
};

export const approvePayrollRun = (runId) => {
    const db = readDB();
    const run = db.payrollRuns.find(r => r.id === runId);
    if (run && run.status === 'Pending') { run.status = 'Approved'; writeDB(db); }
};

export const confirmPayment = (entryId) => {
    const db = readDB();
    const entry = db.payrollEntries.find(e => e.id === entryId);
    if(entry) { entry.paymentConfirmed = true; }
    const run = db.payrollRuns.find(r => r.id === entry?.payrollRunId);
    if(run && run.status === 'Approved') {
      const allConfirmed = db.payrollEntries.filter(e => e.payrollRunId === run.id).every(e => e.paymentConfirmed);
      if(allConfirmed) { run.status = 'Paid'; }
    }
    writeDB(db);
};

export const addPromotion = (promotionData) => {
    const db = readDB();
    const newPromotion = { ...promotionData, id: `promo-${Date.now()}`, status: 'Pending', dateApplied: new Date() };
    db.promotions.push(newPromotion);
    writeDB(db);
};

export const updatePromotionStatus = (promotionId, status) => {
    const db = readDB();
    const promotion = db.promotions.find(p => p.id === promotionId);
    if (promotion) {
        promotion.status = status;
        if (status === 'Approved') {
            const user = db.users.find(u => u.id === promotion.userId);
            if (user) {
                user.role = promotion.toRole;
                if(promotion.toRole === UserRole.Supervisor) user.rank = 'SGT (Sergeant)';
                if(promotion.toRole === UserRole.TrainingOfficer) user.rank = 'CPL (Corporal)';
            }
        }
    }
    writeDB(db);
};