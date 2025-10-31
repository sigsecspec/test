// --- CONSOLIDATED APPLICATION FILE ---
// This file contains all JavaScript logic for the application,
// refactored to a single-file architecture to resolve module loading errors.

// --- START: types.js ---
const UserRole = {
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

// --- START: constants.js ---
const executiveRoles = [UserRole.Owner, UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander];
const operationsRoles = [UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Dispatch, UserRole.Secretary];
const fieldLeadershipRoles = [UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard];
const guardRole = [UserRole.Guard];
const fieldRoles = [...fieldLeadershipRoles, ...guardRole];
const allInternalRoles = [...executiveRoles, ...operationsRoles, ...fieldRoles];
const clientRole = [UserRole.Client];

// --- START: Icons.js ---
const Icons = {
    Shield: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" /></svg>`,
    User: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131-2.095z" /></svg>`,
    Logout: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>`,
    Menu: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`,
    X: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`,
    Home: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v9.75a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V10.5M9 21V12h6v9" /></svg>`,
    ClipboardList: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
    Calendar: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
    AcademicCap: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>`,
    PlusCircle: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    LocationMarker: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    CreditCard: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
    Cog: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    Users: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 10-5.292 0M21 21v-1a6 6 0 00-9-5.197" /></svg>`,
    ChartBar: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
    Briefcase: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.4-2.175 2.4H5.925c-1.21 0-2.175-1.087-2.175-2.4V14.15M16.5 6.375h-9a2.25 2.25 0 00-2.25 2.25v.151c0 .56.224 1.07.622 1.448l4.473 3.914c.48.42.96.634 1.448.634s.968-.214 1.448-.634l4.473-3.914c.398-.378.622-.888.622-1.448v-.151a2.25 2.25 0 00-2.25-2.25z" /></svg>`,
    CheckCircle: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    Eye: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    Map: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1.99 1.99 0 013 15.382V5.618a1.99 1.99 0 011.553-1.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1.99 1.99 0 0021 18.618V8.882a1.99 1.99 0 00-1.553-1.894L15 4m-6 8l6-3" /></svg>`,
    Bell: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 6.032l-1.42 1.42a.75.75 0 001.061 1.06l1.42-1.42A8.967 8.967 0 016 16.5v.75m6.357-3.418l.01.011.01.011M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    DocumentText: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`,
    Mail: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`,
    Trophy: ({ className = '' }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.166 2.377a.75.75 0 0 1 .75 0L7.68 3.55a.75.75 0 0 1 .14 1.284l-1.033.725a.75.75 0 0 1-1.012-.063L4.5 4.123a.75.75 0 0 1 .666-1.746ZM18.834 2.377a.75.75 0 0 0-.75 0L16.32 3.55a.75.75 0 0 0-.14 1.284l1.033.725a.75.75 0 0 0 1.012-.063l1.273-1.373a.75.75 0 0 0-.666-1.746ZM11.25 4.5A.75.75 0 0 1 12 5.25v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 11.25 4.5Z" clip-rule="evenodd" /><path d="M6.31 9.47a.75.75 0 0 1 .94-.47l.812.271a.75.75 0 0 0 .94-.47l.812-1.354a.75.75 0 0 1 .63-.354h2.992a.75.75 0 0 1 .63.354l.812 1.354a.75.75 0 0 0 .94.47l.812-.271a.75.75 0 0 1 .94.47l.812 1.354a.75.75 0 0 1 0 .75l-.812 1.354a.75.75 0 0 1-.94.47l-.812-.271a.75.75 0 0 0-.94.47l-.812 1.354a.75.75 0 0 1-.63.354H9.78a.75.75 0 0 1-.63-.354l-.812-1.354a.75.75 0 0 0-.94-.47l-.812.271a.75.75 0 0 1-.94-.47l-.812-1.354a.75.75 0 0 1 0-.75l.812-1.354Z" /><path d="M5.25 15.75a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Z" /><path fill-rule="evenodd" d="M8.25 18a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></svg>`,
    Flag: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>`,
    ArrowUpTray: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>`,
    DocumentDuplicate: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>`,
    Truck: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125V6.75a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6.75v10.5a1.125 1.125 0 001.125 1.125z" /></svg>`,
};

// --- START: homepageContent.js ---
const featureList = [
    { title: "🛡️ For Guards", items: ["Browse and claim available missions", "Real-time earnings tracking", "Comprehensive training programs", "Performance tracking and ratings", "Direct communication with operations"] },
    { title: "👔 For Clients", items: ["Post security missions instantly", "Manage multiple locations", "Request specific lead guards", "Track mission performance", "Flexible payment options"] },
    { title: "👮 For Supervisors", items: ["Conduct spot checks and oversight", "Approve training certifications", "Work regular missions", "Team management tools", "Performance monitoring"] },
    { title: "📋 Mission Management", items: ["Real-time mission tracking", "GPS check-in verification", "Automated scheduling", "Multi-guard coordination", "Instant notifications"] },
    { title: "🎓 Training System", items: ["Multiple training types", "Interactive quizzes", "Certification tracking", "Field training coordination", "Progress monitoring"] },
    { title: "💰 Payment Processing", items: ["Automated pay calculation", "Real-time payment tracking", "Weekly payroll processing", "Overtime handling", "Transparent billing"] },
];
const statList = [ 
    { value: "500+", label: "Certified Guards" }, 
    { value: "1,200+", label: "Missions Completed" }, 
    { value: "98%", label: "Client Satisfaction" }, 
    { value: "24/7", label: "Support Available" } 
];

// --- START: database.js ---
const initialData = {
  users: [
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'M.White@SignatureSecuritySpecialist.com', role: UserRole.Owner, rank: 'CHF (Chief)', level: 5, certifications: ['All'], weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'J.Lyons@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-1' },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 'T.Moreno@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-1' },
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'B.Baker@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: 'CAP (Captain)', level: 5, certifications: ['Management', 'Tactical'], weeklyHours: 0, performanceRating: 4.8, teamId: 'team-2' },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'R.Granum@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: 'LT (Lieutenant)', level: 4, certifications: ['Management'], weeklyHours: 0, performanceRating: 4.7, teamId: 'team-2' },
  ],
  clients: [],
  missions: [],
  sites: [],
  contracts: [],
  applications: [],
  promotions: [],
  trainingModules: [
      { id: 'tm-1', title: 'Level 1 - Basic Security Procedures', content: 'This module covers the fundamental duties of a security officer...', quiz: [{q: 'What is the first step in an emergency?', a: 'Assess the situation'}]},
      { id: 'tm-2', title: 'Level 2 - Pepper Spray Certification', content: 'Proper use and legal implications of pepper spray...', quiz: [{q: 'What is the effective range of your issued spray?', a: '10-12 feet'}]},
  ],
  trainingProgress: [],
  payrollRuns: [],
  payrollEntries: [],
  alerts: [],
  systemSettings: {
      companyName: 'Signature Security Specialist',
      payrollCycle: 'Bi-Weekly',
  }
};
let _DB = {};
function save() {
  localStorage.setItem('sss_db', JSON.stringify(_DB));
  window.dispatchEvent(new Event('storage'));
}
function load() {
  const dbString = localStorage.getItem('sss_db');
  if (dbString) {
    try {
      const parsedDB = JSON.parse(dbString);
      const collectionsWithDates = ['missions', 'contracts', 'promotions', 'payrollRuns'];
      collectionsWithDates.forEach(collection => {
          if(parsedDB[collection]) {
              parsedDB[collection].forEach(item => {
                  if (item.startTime) item.startTime = new Date(item.startTime);
                  if (item.endTime) item.endTime = new Date(item.endTime);
                  if (item.startDate) item.startDate = new Date(item.startDate);
                  if (item.endDate) item.endDate = new Date(item.endDate);
                  if (item.submittedAt) item.submittedAt = new Date(item.submittedAt);
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
function initializeDB() {
  if (!load()) {
    console.log("No local DB found, seeding initial data.");
    _DB = JSON.parse(JSON.stringify(initialData));
    save();
  } else {
    console.log("Loaded DB from localStorage.");
  }
}
const getUsers = (roles = null) => {
    if (!roles) return _DB.users || [];
    return (_DB.users || []).filter(u => roles.includes(u.role));
};
const getUserById = (id) => (_DB.users || []).find(u => u.id === id);
const getUserByEmail = (email) => (_DB.users || []).find(u => u.email === email);
const getClients = () => _DB.clients || [];
const getMissions = () => _DB.missions || [];
const getSites = () => _DB.sites || [];
const getContracts = () => _DB.contracts || [];
const getApplications = (status = 'Pending') => (_DB.applications || []).filter(a => a.status === status);
const getTrainingModules = () => _DB.trainingModules || [];
const getUserTrainingProgress = (userId) => (_DB.trainingProgress || []).filter(p => p.userId === userId);
const getPendingTrainingApprovals = () => (_DB.trainingProgress || []).filter(p => p.status === 'Pending Approval');
const getApprovals = () => [];
const getSystemSettings = () => _DB.systemSettings || {};
const getAlerts = () => _DB.alerts || [];
const getPromotions = () => _DB.promotions || [];
const getPayrollRuns = () => (_DB.payrollRuns || []).sort((a,b) => new Date(b.endDate) - new Date(a.endDate));
const getPayrollEntriesForRun = (runId) => (_DB.payrollEntries || []).filter(e => e.runId === runId);
function addApplication({ type, data }) {
    const newApp = { id: `app-${Date.now()}`, type, data, status: 'Pending' };
    _DB.applications.push(newApp);
    save();
}
function updateApplicationStatus(appId, status) {
    const app = _DB.applications.find(a => a.id === appId);
    if (app) {
        app.status = status;
        if (status === 'Approved') {
            const newUser = {
                id: `user-${Date.now()}`,
                firstName: app.data.firstName || app.data.companyName.split(' ')[0],
                lastName: app.data.lastName || app.data.companyName.split(' ')[1] || 'Contact',
                email: app.data.email || app.data.contactEmail,
                role: app.type === 'New Guard' ? UserRole.Guard : (app.type === 'New Supervisor' ? UserRole.Supervisor : UserRole.Client),
                rank: app.type === 'New Guard' ? 'OFC (Officer)' : (app.type === 'New Supervisor' ? 'SGT (Sergeant)' : 'Client'),
                level: 1,
                certifications: [],
                weeklyHours: 0,
                performanceRating: 5.0
            };
            _DB.users.push(newUser);
            if(app.type === 'New Client') {
                const newClient = {
                    id: `client-${Date.now()}`,
                    companyName: app.data.companyName,
                    contactEmail: app.data.contactEmail,
                    userId: newUser.id,
                    whitelist: [],
                    blacklist: []
                };
                _DB.clients.push(newClient);
            }
        }
    }
    save();
}
function addMission(missionData) {
    const newMission = {
        ...missionData,
        id: `mission-${Date.now()}`,
        status: 'Open',
        claimedBy: [],
        checkIns: [],
        checkOuts: [],
    };
    _DB.missions.push(newMission);
    save();
}
function claimMission(missionId, userId) {
    const mission = _DB.missions.find(m => m.id === missionId);
    const user = getUserById(userId);
    if (!mission || !user) return { success: false, message: "Mission or user not found." };
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
function missionCheckIn(missionId, userId) {
    const mission = _DB.missions.find(m => m.id === missionId);
    if (mission && mission.claimedBy.includes(userId)) {
        if (!mission.checkIns.some(c => c.guardId === userId)) {
             mission.checkIns.push({ guardId: userId, time: new Date() });
             if (mission.status !== 'Active') {
                 mission.status = 'Active';
             }
             save();
        }
    }
}
function missionCheckOut(missionId, userId) {
    const mission = _DB.missions.find(m => m.id === missionId);
    if (mission && mission.checkIns.some(c => c.guardId === userId)) {
        if (!mission.checkOuts.some(c => c.guardId === userId)) {
            mission.checkOuts.push({ guardId: userId, time: new Date() });
            const allCheckedOut = mission.claimedBy.every(guardId => 
                mission.checkOuts.some(c => c.guardId === guardId)
            );
            if (allCheckedOut) {
                mission.status = 'AwaitingReport';
                setTimeout(() => {
                    const m = _DB.missions.find(m => m.id === missionId);
                    if (m) m.status = 'Completed';
                    save();
                }, 1000);
            }
            save();
        }
    }
}
function updateClientGuardList(clientId, guardId, listType, action) {
    const client = _DB.clients.find(c => c.id === clientId);
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
function submitTraining(userId, moduleId, answers) {
    const module = _DB.trainingModules.find(m => m.id === moduleId);
    if (!module) return false;
    let correct = 0;
    module.quiz.forEach((q, index) => {
        if (answers[`q-${index}`]?.toLowerCase() === q.a.toLowerCase()) {
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
function updateTrainingProgressStatus(progressId, status) {
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
        save();
    }
}
function addContract(contractData) {
    const newContract = { ...contractData, id: `contract-${Date.now()}`, status: 'Pending' };
    _DB.contracts.push(newContract);
    save();
}
function updateContractStatus(contractId, status) {
    const contract = _DB.contracts.find(c => c.id === contractId);
    if (contract) {
        contract.status = status;
        save();
    }
}
function addPromotion(promoData) {
    const newPromo = { ...promoData, id: `promo-${Date.now()}`, status: 'Pending', submittedAt: new Date() };
    _DB.promotions.push(newPromo);
    save();
}
function updatePromotionStatus(promoId, status) {
    const promo = _DB.promotions.find(p => p.id === promoId);
    if (promo) {
        promo.status = status;
        if (status === 'Approved') {
            const user = getUserById(promo.userId);
            if (user) {
                user.role = promo.toRole;
            }
        }
        save();
    }
}
function createPayrollRun(startDate, endDate) {
    const runId = `pr-${Date.now()}`;
    const run = { id: runId, startDate, endDate, status: 'Pending', totalAmount: 0, createdAt: new Date() };
    const paidMissionIds = _DB.payrollEntries.map(e => e.missionId);
    const missionsInPeriod = _DB.missions.filter(m => 
        m.status === 'Completed' &&
        m.endTime >= startDate &&
        m.endTime <= endDate &&
        !paidMissionIds.includes(m.id)
    );
    const guardPay = {};
    missionsInPeriod.forEach(mission => {
        mission.claimedBy.forEach(guardId => {
            const checkIn = mission.checkIns.find(c => c.guardId === guardId);
            const checkOut = mission.checkOuts.find(c => c.guardId === guardId);
            if (checkIn && checkOut) {
                const hours = (new Date(checkOut.time).getTime() - new Date(checkIn.time).getTime()) / (1000 * 60 * 60);
                const pay = hours * mission.payRate;
                if (!guardPay[guardId]) {
                    guardPay[guardId] = { totalHours: 0, totalPay: 0, missionIds: [] };
                }
                guardPay[guardId].totalHours += hours;
                guardPay[guardId].totalPay += pay;
                guardPay[guardId].missionIds.push(mission.id);
            }
        });
    });
    Object.keys(guardPay).forEach(userId => {
        const entry = {
            id: `pe-${Date.now()}-${userId}`,
            runId,
            userId,
            hours: guardPay[userId].totalHours,
            totalPay: guardPay[userId].totalPay,
            missionIds: guardPay[userId].missionIds,
            paymentConfirmed: false,
        };
        _DB.payrollEntries.push(entry);
        run.totalAmount += entry.totalPay;
    });
    _DB.payrollRuns.push(run);
    save();
}
function approvePayrollRun(runId) {
    const run = _DB.payrollRuns.find(r => r.id === runId);
    if (run && run.status === 'Pending') {
        run.status = 'Approved';
        save();
    }
}
function confirmPayment(entryId) {
    const entry = _DB.payrollEntries.find(e => e.id === entryId);
    if (entry) {
        entry.paymentConfirmed = true;
        const run = _DB.payrollRuns.find(r => r.id === entry.runId);
        const allPaid = _DB.payrollEntries
            .filter(e => e.runId === entry.runId)
            .every(e => e.paymentConfirmed);
        if (run && allPaid) {
            run.status = 'Paid';
        }
        save();
    }
}

// --- START: COMPONENTS ---
const HomePage = () => `
    <div id="home-page">
        <header class="sticky top-0 z-30 bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)]">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="font-bold text-lg text-[var(--text-primary)]">
                            <span>Signature</span> <span class="text-[var(--accent-primary)]">Security Specialist</span>
                        </div>
                    </div>
                    <nav class="hidden md:flex items-center space-x-1">
                        <a href="#home" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                        <a href="#features" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                        <a href="#how-it-works" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                        <button data-action="open-login" class="ml-4 px-4 py-2 rounded-md text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--border-primary-hover)] hover:text-[var(--accent-primary)] transition-colors">Portal Login</button>
                    </nav>
                    <div class="md:hidden">
                        <button data-action="toggle-mobile-menu" class="text-[var(--text-primary)]">
                           ${Icons.Menu({ className: "h-6 w-6" })}
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <section id="home" class="text-center py-20 md:py-32 bg-[var(--bg-secondary)]">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)]">Professional Security Management Platform</h1>
                    <p class="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting businesses with certified security professionals through our comprehensive digital platform. Streamline operations, manage missions, and ensure safety with our all-in-one solution.</p>
                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <button data-action="open-application" data-type="New Guard" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</button>
                        <button data-action="open-application" data-type="New Client" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Hire Security</button>
                        <button data-action="open-application" data-type="New Supervisor" class="px-6 py-3 rounded-md font-bold bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105 hover:border-[var(--accent-primary)]">Apply for Supervisor</button>
                    </div>
                </div>
            </section>
            <section class="py-16 bg-[var(--bg-primary)]">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        ${statList.map(stat => `<div class="text-center"><h2 class="text-4xl font-bold text-[var(--accent-primary)]">${stat.value}</h2><p class="mt-1 text-[var(--text-secondary)]">${stat.label}</p></div>`).join('')}
                    </div>
                </div>
            </section>
            <section id="features" class="py-20 bg-[var(--bg-secondary)]">
                 <div class="container mx-auto px-4">
                     <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold">Platform Features</h2><p class="mt-2 text-[var(--text-secondary)]">Everything you need to manage security operations efficiently</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         ${featureList.map(feature => `
                             <div class="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6">
                                 <h3 class="text-xl font-bold mb-4">${feature.title}</h3>
                                 <ul class="space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                                     ${feature.items.map(item => `<li>${item}</li>`).join('')}
                                 </ul>
                             </div>
                        `).join('')}
                    </div>
                </div>
            </section>
             <section id="how-it-works" class="py-20 bg-[var(--bg-primary)]">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold">How It Works</h2></div>
                    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 class="text-xl font-bold mb-4">For Security Guards</h3><ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your application and certifications</li><li><strong>Complete Training</strong> - Take required training modules</li><li><strong>Get Approved</strong> - Officers review your certifications</li><li><strong>Browse Missions</strong> - See available missions</li><li><strong>Claim & Work</strong> - Accept missions and start earning</li><li><strong>Get Paid</strong> - Receive payment after completion</li></ol></div>
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 class="text-xl font-bold mb-4">For Businesses</h3><ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your business information</li><li><strong>Get Verified</strong> - Complete verification process</li><li><strong>Set Up Contract</strong> - Create security contracts</li><li><strong>Post Missions</strong> - Create missions with requirements</li><li><strong>Guards Assigned</strong> - Certified guards accept missions</li><li><strong>Monitor Performance</strong> - Track missions and rate guards</li></ol></div>
                    </div>
                </div>
            </section>
            <footer id="contact" class="bg-[var(--accent-secondary)] text-white py-12">
                <div class="container mx-auto px-4">
                     <div class="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-70">
                        <p>© ${new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
`;

const LoginModal = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });
    return `
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
            <div class="relative">
                <div class="w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl p-6">
                    <div class="text-center mb-6">
                        ${Icons.Shield({ className: 'w-12 h-12 mx-auto text-[var(--accent-primary)] mb-2' })}
                        <h1 class="text-2xl font-bold text-[var(--text-primary)]">SSS Portal</h1>
                        <p class="text-[var(--text-secondary)] mt-1">Select a profile to log in</p>
                    </div>
                    <div class="space-y-2 max-h-80 overflow-y-auto pr-2">
                        ${sortedUsers.map(user => `
                            <button data-action="login" data-id="${user.email}" class="w-full flex items-center text-left bg-[var(--bg-primary)] hover:bg-[var(--border-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] p-3 rounded-md transition-all duration-150 transform hover:border-[var(--border-primary-hover)]">
                                <div class="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    ${Icons.User({ className: 'w-5 h-5 text-[var(--accent-primary)]' })}
                                </div>
                                <div class="flex-grow">
                                    <p class="font-bold text-sm">${user.firstName} ${user.lastName}</p>
                                    <p class="text-xs text-[var(--text-secondary)]">${user.role}</p>
                                </div>
                                <div class="ml-auto text-right flex-shrink-0">
                                    <span class="px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">Lvl ${user.level}</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button data-action="close-modal" class="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    ${Icons.X({ className: 'w-8 h-8' })}
                </button>
            </div>
        </div>
    `;
};

const ApplicationModal = ({ type }) => {
    const renderFormFields = (type) => {
        const inputStyles = "block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";
        if (type === 'New Guard' || type === 'New Supervisor') {
            return `
                <div class="grid grid-cols-2 gap-4">
                    <input name="firstName" placeholder="First Name" required class="${inputStyles}" />
                    <input name="lastName" placeholder="Last Name" required class="${inputStyles}" />
                </div>
                <input name="email" type="email" placeholder="Email Address" required class="${inputStyles}" />
                <input name="phone" type="tel" placeholder="Phone Number" required class="${inputStyles}" />
                <input type="hidden" name="role" value="${type === 'New Guard' ? UserRole.Guard : UserRole.Supervisor}" />
            `;
        }
        if (type === 'New Client') {
             return `
                <input name="companyName" placeholder="Company Name" required class="${inputStyles}" />
                <input name="contactEmail" type="email" placeholder="Contact Email" required class="${inputStyles}" />
                <input name="contactPhone" type="tel" placeholder="Contact Phone" required class="${inputStyles}" />
            `;
        }
        return '';
    }
    return `
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
            <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-md p-6 border border-[var(--border-primary)]">
                <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Application for ${type.replace('New ', '')}</h2>
                <form id="application-form" class="space-y-4">
                    ${renderFormFields(type)}
                    <div class="flex justify-end space-x-3 pt-4">
                         <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                         <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

const TrainingModal = ({ moduleId }) => {
    const module = getTrainingModules().find(m => m.id === moduleId);
    if (!module) return '';
    return `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl p-6 border border-[var(--border-primary)]">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">${module.title}</h2>
                <button data-action="close-modal" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="max-h-[70vh] overflow-y-auto pr-4">
                <p class="text-[var(--text-secondary)] mb-6">${module.content}</p>
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-4">Quiz</h3>
                <form id="training-form" class="space-y-4">
                    ${module.quiz.map((q, index) => `
                        <div>
                            <p class="font-semibold">${index + 1}. ${q.q}</p>
                            <input name="q-${index}" placeholder="Your Answer" required class="mt-2 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 bg-[var(--bg-primary)]" />
                        </div>
                    `).join('')}
                    <div class="flex justify-end pt-4">
                         <button type="submit" class="px-6 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};

const ContractModal = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return '';
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";
    return `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-lg p-6 border border-[var(--border-primary)]">
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Create New Contract</h2>
            <form id="contract-form" class="space-y-4">
                <input type="hidden" name="clientId" value="${client.id}" />
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Contract Title</label>
                    <input name="title" placeholder="e.g., Downtown Office Security" required class="${inputStyles}" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                        <input name="startDate" type="date" required class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                        <input name="endDate" type="date" required class="${inputStyles}" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Total Budget ($)</label>
                    <input name="totalBudget" type="number" min="0" step="100" placeholder="50000" required class="${inputStyles}" />
                </div>
                 <div class="flex justify-end space-x-3 pt-4">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit for Approval</button>
                </div>
            </form>
        </div>
    </div>
    `;
};

const Sidebar = ({ currentUser, activeView }) => {
    const sidebarStructure = [
        {
            title: 'Main',
            roles: [...allInternalRoles, ...clientRole],
            items: [
                { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard', roles: [...allInternalRoles, ...clientRole] },
                { name: 'My Profile', icon: Icons.User, view: 'MyProfile', roles: [...allInternalRoles, ...clientRole] },
            ]
        },
        {
            title: 'Guard Portal',
            roles: fieldRoles,
            items: [
                { name: 'Mission Board', icon: Icons.ClipboardList, view: 'MissionBoard', roles: fieldRoles },
                { name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions', roles: fieldRoles },
                { name: 'Training', icon: Icons.AcademicCap, view: 'Training', roles: fieldRoles },
                { name: 'Earnings', icon: Icons.CreditCard, view: 'Earnings', roles: fieldRoles },
                { name: 'Hall of Fame', icon: Icons.Trophy, view: 'HallOfFame', roles: fieldRoles },
                { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: fieldRoles },
            ]
        },
        {
            title: 'Client Portal',
            roles: clientRole,
            items: [
                { name: 'Post Mission', icon: Icons.PlusCircle, view: 'PostMission', roles: clientRole },
                { name: 'Active Missions', icon: Icons.Calendar, view: 'MyMissions', roles: clientRole },
                { name: 'My Sites', icon: Icons.LocationMarker, view: 'MySites', roles: clientRole },
                { name: 'My Contracts', icon: Icons.DocumentDuplicate, view: 'MyContracts', roles: clientRole },
                { name: 'Billing', icon: Icons.CreditCard, view: 'Billing', roles: clientRole },
                { name: 'Guard Roster', icon: Icons.Users, view: 'ClientGuardRoster', roles: clientRole },
            ]
        },
        {
            title: 'Field Leadership',
            roles: fieldLeadershipRoles,
            items: [
                { name: 'Field Oversight', icon: Icons.Eye, view: 'FieldOversight', roles: [UserRole.Supervisor] },
                { name: 'Training Approvals', icon: Icons.CheckCircle, view: 'TrainingApprovals', roles: [UserRole.Supervisor] },
                { name: 'Training Management', icon: Icons.AcademicCap, view: 'TrainingManagement', roles: [UserRole.TrainingOfficer] },
            ]
        },
        {
            title: 'Operations',
            roles: [...operationsRoles, ...executiveRoles],
            items: [
                { name: 'Mission Control', icon: Icons.Map, view: 'MissionControl', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Active Missions', icon: Icons.Flag, view: 'ActiveMissions', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Guard Management', icon: Icons.Users, view: 'GuardManagement', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...executiveRoles] },
                { name: 'Client Management', icon: Icons.Briefcase, view: 'ClientManagement', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Secretary, ...executiveRoles] },
                { name: 'Site Roster', icon: Icons.LocationMarker, view: 'SiteRoster', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...executiveRoles] },
                { name: 'Communications', icon: Icons.Mail, view: 'Communications', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Alerts', icon: Icons.Bell, view: 'Alerts', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Vehicle Management', icon: Icons.Truck, view: 'VehicleManagement', roles: [UserRole.OperationsManager, UserRole.Dispatch, ...executiveRoles] },
            ]
        },
        {
            title: 'Administration',
            roles: [...operationsRoles, ...executiveRoles],
            items: [
                { name: 'Applications', icon: Icons.DocumentText, view: 'Applications', roles: [UserRole.OperationsManager, UserRole.Secretary, ...executiveRoles] },
                { name: 'Approvals', icon: Icons.CheckCircle, view: 'Approvals', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...executiveRoles] },
                { name: 'Contract Approvals', icon: Icons.DocumentDuplicate, view: 'ContractApprovals', roles: [UserRole.OperationsDirector, UserRole.OperationsManager, ...executiveRoles] },
                { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: [UserRole.OperationsDirector, ...executiveRoles] },
                { name: 'Appeals', icon: Icons.Flag, view: 'Appeals', roles: [UserRole.OperationsDirector, ...executiveRoles] },
            ]
        },
        {
            title: 'Executive',
            roles: executiveRoles,
            items: [
                { name: 'Payroll', icon: Icons.CreditCard, view: 'Payroll', roles: [UserRole.OperationsDirector, ...executiveRoles] },
                { name: 'Analytics', icon: Icons.ChartBar, view: 'Analytics', roles: [UserRole.OperationsDirector, ...executiveRoles] },
                { name: 'Live Control', icon: Icons.Shield, view: 'LiveControl', roles: executiveRoles },
                { name: 'System Settings', icon: Icons.Cog, view: 'SystemSettings', roles: [UserRole.Owner, UserRole.CoOwner] },
            ]
        },
    ];
    return `
        <div class="flex flex-col w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] h-full overflow-y-auto">
            <div class="flex items-center justify-center h-16 border-b border-[var(--border-primary)] flex-shrink-0 px-4">
                <div class="text-center">
                    <p class="font-bold text-md text-[var(--text-primary)]">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs text-[var(--text-secondary)]">${currentUser.role} - ${currentUser.rank}</p>
                </div>
            </div>
            <nav class="flex-1 py-4">
                ${sidebarStructure.map((group) => {
                    if (!group.roles.includes(currentUser.role)) return '';
                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                    if (accessibleItems.length === 0) return '';
                    return `
                        <div>
                            <h3 class="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const activeClasses = 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-r-4 border-[var(--accent-primary)] font-bold';
                                    const inactiveClasses = 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]';
                                    return `
                                        <li>
                                            <a href="#" data-action="navigate" data-type="${item.view}" class="flex items-center px-4 py-3 text-sm font-medium transition-colors ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-6 h-6 mr-3 flex-shrink-0' })}
                                                <span>${item.name}</span>
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
            </nav>
        </div>
    `;
};

// --- START: VIEWS ---
const MissionBoard = ({ user }) => {
    const missions = getMissions();
    const clients = getClients();
    const availableMissions = missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));
    const MissionCard = ({ mission, user, client }) => {
        const isClaimedByUser = mission.claimedBy.includes(user.id);
        const isFull = mission.claimedBy.length >= mission.requiredGuards;
        const canClaim = !isClaimedByUser && !isFull && client && !client.blacklist.includes(user.id);
        const isBlacklisted = client && client.blacklist.includes(user.id);
        let buttonText = "Claim Mission";
        if (isClaimedByUser) buttonText = "Claimed";
        else if (isFull) buttonText = "Full";
        else if (isBlacklisted) buttonText = "Unavailable";
        return `
            <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${mission.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${mission.status}</span>
                    </div>
                    <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                    <div class="text-sm text-[var(--text-secondary)] mt-2 space-y-1">
                        <p><strong>Pay:</strong> <span class="text-[var(--text-primary)]">$${mission.payRate}/hr</span></p>
                        <p><strong>Time:</strong> <span class="text-[var(--text-primary)]">${mission.startTime.toLocaleString()} - ${mission.endTime.toLocaleString()}</span></p>
                        <p><strong>Required Level:</strong> <span class="text-[var(--text-primary)]">${mission.requiredLevel}+</span></p>
                    </div>
                </div>
                <div class="mt-4 flex justify-between items-center">
                    <p class="text-sm font-medium text-[var(--text-primary)]">${mission.claimedBy.length} / ${mission.requiredGuards} Guards</p>
                    <button data-action="claim-mission" data-id="${mission.id}" ${!canClaim ? 'disabled' : ''} class="px-4 py-2 text-sm font-bold rounded-md transition-colors ${canClaim ? 'bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]' : 'bg-[var(--border-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'}">${buttonText}</button>
                </div>
            </div>
        `;
    };
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-[var(--text-primary)]">Mission Board</h1>
                <p class="text-[var(--text-secondary)]">Available Missions: ${availableMissions.length}</p>
            </div>
            ${availableMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${availableMissions.map(mission => MissionCard({ mission, user, client: clients.find(c => c.id === mission.clientId) })).join('')}
                </div>
            ` : `
                <div class="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-sm">
                    ${Icons.ClipboardList({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                    <h2 class="mt-4 text-xl font-semibold text-[var(--text-primary)]">No Missions Available</h2>
                    <p class="mt-1 text-[var(--text-secondary)]">Check back later for new opportunities.</p>
                </div>
            `}
        </div>
    `;
};
const MyMissions = ({ user }) => {
    const allMissions = getMissions();
    let myMissions = [];
    if (user.role === UserRole.Client) {
        const client = getClients().find(c => c.userId === user.id);
        if (client) myMissions = allMissions.filter(m => m.clientId === client.id);
    } else {
        myMissions = allMissions.filter(m => m.claimedBy.includes(user.id));
    }
    const now = new Date();
    const categorizedMissions = {
        active: myMissions.filter(m => m.status === 'Active' || (m.startTime <= now && m.endTime > now && (m.status === 'Claimed'))).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        upcoming: myMissions.filter(m => m.startTime > now && (m.status === 'Claimed' || m.status === 'Open')).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        past: myMissions.filter(m => m.endTime <= now || m.status === 'Completed' || m.status === 'Cancelled' || m.status === 'AwaitingReport').sort((a,b) => b.startTime.getTime() - a.startTime.getTime()),
    };
    const MissionCard = ({ mission, user }) => {
        const isGuard = user.role !== UserRole.Client;
        const hasCheckedIn = mission.checkIns?.some(c => c.guardId === user.id);
        const hasCheckedOut = mission.checkOuts?.some(c => c.guardId === user.id);
        let actions = '';
        const now = new Date();
        const canCheckIn = now >= mission.startTime && now <= mission.endTime;
        if (isGuard && (mission.status === 'Active' || (mission.status === 'Claimed' && canCheckIn))) {
            if (!hasCheckedIn) {
                actions = `<button data-action="check-in" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-green-500 text-white hover:bg-green-600">Check In</button>`;
            } else if (!hasCheckedOut) {
                actions = `<button data-action="check-out" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-red-500 text-white hover:bg-red-600">Check Out</button>`;
            }
        }
        return `
            <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-[var(--text-primary)]">${mission.title}</p>
                        <p class="text-sm text-[var(--text-secondary)]">${mission.startTime.toLocaleString()}</p>
                        <span class="text-xs px-2 py-0.5 rounded-full ${mission.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${mission.status}</span>
                    </div>
                    <div class="flex-shrink-0">${actions}</div>
                </div>
            </div>
        `;
    };
    const MissionList = ({ title, missions, user }) => `
        <div>
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-3">${title}</h2>
            ${missions.length > 0 ? `
                <div class="space-y-3">
                    ${missions.map(mission => MissionCard({ mission, user })).join('')}
                </div>
            ` : `<p class="text-[var(--text-secondary)] italic">No missions in this category.</p>`}
        </div>
    `;
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Missions</h1>
            <div class="space-y-8">
                ${MissionList({ title: "Active Missions", missions: categorizedMissions.active, user })}
                ${MissionList({ title: "Upcoming Missions", missions: categorizedMissions.upcoming, user })}
                ${MissionList({ title: "Past Missions", missions: categorizedMissions.past, user })}
            </div>
        </div>
    `;
};
const Training = ({ user }) => {
    const modules = getTrainingModules();
    const progress = getUserTrainingProgress(user.id);
    const getModuleProgress = (moduleId) => progress.find(p => p.moduleId === moduleId);
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Center</h1>
            <div class="space-y-4">
                ${modules.map(module => {
                    const prog = getModuleProgress(module.id);
                    let statusColor = 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
                    let statusText = prog?.status || 'Not Started';
                    if (prog?.status === 'Approved') statusColor = 'bg-green-100 text-green-800';
                    if (prog?.status === 'Pending Approval') statusColor = 'bg-yellow-100 text-yellow-800';
                    if (prog?.status === 'Failed') statusColor = 'bg-red-100 text-red-800';
                    if (prog?.status === 'Denied') statusColor = 'bg-red-100 text-red-800';
                    return `
                        <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-4">
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg text-[var(--text-primary)]">${module.title}</h3>
                                <p class="text-sm text-[var(--text-secondary)]">${module.content}</p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                ${prog ? `<span class="px-3 py-1 text-sm font-semibold rounded-full ${statusColor}">${statusText}</span>` : `<button data-action="start-training" data-id="${module.id}" class="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-bold rounded-md hover:bg-[var(--accent-secondary-hover)]">Start Training</button>`}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};
const MyProfile = ({ user }) => `
    <div class="animate-in max-w-2xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Profile</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <div class="flex items-center space-x-4 mb-6">
                <div class="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-[var(--border-tertiary)] flex items-center justify-center">
                    ${Icons.User({ className: "w-10 h-10 text-[var(--text-secondary)]" })}
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-[var(--text-primary)]">${user.firstName} ${user.lastName}</h2>
                    <p class="text-[var(--text-secondary)]">${user.email}</p>
                </div>
            </div>
            <div class="space-y-4">
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Role:</span><span class="font-semibold text-[var(--text-primary)]">${user.role}</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Rank:</span><span class="font-semibold text-[var(--text-primary)]">${user.rank}</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Level:</span><span class="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">${user.level}</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Performance Rating:</span><span class="font-semibold text-green-600">${user.performanceRating.toFixed(2)} / 5.00</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Weekly Hours:</span><span class="font-semibold text-[var(--text-primary)]">${user.weeklyHours.toFixed(1)} / 40</span></div>
                <div>
                    <span class="font-medium text-[var(--text-secondary)]">Certifications:</span>
                    <div class="flex flex-wrap gap-2 mt-2">${user.certifications.map(cert => `<span class="px-2 py-1 text-xs bg-[var(--border-tertiary)] text-[var(--text-secondary)] rounded-md">${cert}</span>`).join('')}</div>
                </div>
            </div>
        </div>
    </div>
`;
const PostMission = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return `<div class="text-center p-8 bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-primary)]">Your client profile could not be loaded. Please contact support.</div>`;
    const sites = getSites().filter(s => s.clientId === client.id);
    const contracts = getContracts().filter(c => c.clientId === client.id && c.status === 'Active');
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";
    return `
        <div class="animate-in max-w-4xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Post a New Mission</h1>
            <form id="post-mission-form" class="bg-[var(--bg-secondary)] p-8 border border-[var(--border-primary)] rounded-lg shadow-md space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Contract</label><select name="contractId" required class="${inputStyles} bg-white"><option value="">Select a contract</option>${contracts.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Site</label><select name="siteId" required class="${inputStyles} bg-white"><option value="">Select a site</option>${sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="25" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="1" required class="${inputStyles}" /></div>
                </div>
                <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Description / Instructions</label><textarea name="description" rows="4" class="${inputStyles}"></textarea></div>
                <div class="text-right"><button type="submit" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--accent-secondary)] hover:bg-[var(--accent-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]">${Icons.PlusCircle({ className: "w-5 h-5 mr-2" })} Post Mission</button></div>
            </form>
        </div>
    `;
};
const MySites = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    const sites = client ? getSites().filter(s => s.clientId === client.id) : [];
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Sites</h1>
             <div class="space-y-4">
                ${sites.map(site => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><p class="font-bold text-[var(--text-primary)]">${site.name}</p><p class="text-sm text-[var(--text-secondary)]">${site.address}</p></div>`).join('')}
                 <button class="w-full text-center p-4 border-2 border-dashed border-[var(--border-secondary)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors">Add New Site</button>
            </div>
        </div>
    `;
};
const Billing = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Billing & Invoices</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">Clients will be able to view their invoices, payment history, and manage payment methods here.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const GuardManagement = ({ user }) => {
    const guards = getUsers(fieldRoles);
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Guard Management</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead><tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Name</th><th class="px-5 py-3 font-semibold">Rank</th><th class="px-5 py-3 font-semibold">Level</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold">Weekly Hours</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody>
                        ${guards.map(guard => `
                            <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p><p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${guard.email}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.rank}</td><td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.level}</td>
                                <td class="px-5 py-4 text-sm text-green-600 font-semibold">${guard.performanceRating.toFixed(2)}</td><td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${guard.weeklyHours.toFixed(1)}</td>
                                <td class="px-5 py-4 text-sm"><button class="text-[var(--accent-primary)] hover:underline font-semibold">View</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
const ClientManagement = ({ user }) => {
    const clients = getClients();
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Client Management</h1>
             <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead><tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact Email</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody>
                        ${clients.map(client => `
                            <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${client.companyName}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${client.contactEmail}</td>
                                <td class="px-5 py-4 text-sm"><button class="text-[var(--accent-primary)] hover:underline font-semibold">View Contracts</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
const MissionControl = ({ user }) => {
    const missions = getMissions();
    const statusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-800';
            case 'Claimed': return 'bg-blue-100 text-blue-800';
            case 'Active': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
        }
    };
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Mission Control</h1>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-x-auto border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead><tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Title</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold">Time</th><th class="px-5 py-3 font-semibold">Guards</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody>
                        ${missions.map(mission => `
                             <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap">${mission.title}</p></td>
                                <td class="px-5 py-4 text-sm"><span class="px-2 py-1 font-semibold rounded-full text-xs ${statusColor(mission.status)}">${mission.status}</span></td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${mission.startTime.toLocaleDateString()}</td>
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${mission.claimedBy.length}/${mission.requiredGuards}</td>
                                <td class="px-5 py-4 text-sm"><button class="text-[var(--accent-primary)] hover:underline font-semibold">Details</button></td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
const ActiveMissions = ({ user }) => {
    const activeMissions = getMissions().filter(m => m.status === 'Active');
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Active Missions</h1>
             ${activeMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${activeMissions.map(mission => {
                        const missionContent = mission.claimedBy.map(guardId => {
                            const guard = getUserById(guardId);
                            const checkedIn = mission.checkIns.some(c => c.guardId === guardId);
                            return `<div class="flex items-center text-sm text-[var(--text-secondary)]"><span class="w-3 h-3 rounded-full mr-2 ${checkedIn ? 'bg-green-500' : 'bg-[var(--text-secondary)]'}"></span> ${guard?.firstName} ${guard?.lastName}</div>`;
                        }).join('');
                        return `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><h3 class="font-bold text-[var(--text-primary)]">${mission.title}</h3><p class="text-sm text-[var(--text-secondary)]">${mission.endTime.toLocaleTimeString()} (End)</p><div class="mt-2">${missionContent}</div></div>`;
                    }).join('')}
                </div>
            ` : `<p class="text-[var(--text-secondary)]">No missions are currently active.</p>`}
        </div>
    `;
};
const Analytics = ({ user }) => {
    const stats = [{ title: "Total Missions Completed", value: "1,254", icon: Icons.ClipboardList }, { title: "Active Guards", value: "487", icon: Icons.Users }, { title: "Client Satisfaction", value: "4.8 / 5.0", icon: Icons.Trophy }, { title: "Monthly Revenue", value: "$125,480", icon: Icons.CreditCard }];
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Analytics Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${stats.map(stat => {
                    const Icon = stat.icon;
                    return `
                        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm flex items-center">
                            <div class="p-3 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mr-4">${Icon({ className: "w-6 h-6" })}</div>
                            <div><p class="text-sm text-[var(--text-secondary)]">${stat.title}</p><p class="text-2xl font-bold text-[var(--text-primary)]">${stat.value}</p></div>
                        </div>`;
                }).join('')}
            </div>
            <div class="mt-8 bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <h2 class="text-xl font-bold text-[var(--text-primary)] mb-4">More Analytics Coming Soon</h2>
                <p class="text-[var(--text-secondary)]">Detailed charts for mission trends, guard performance, and financial overviews will be available here.</p>
            </div>
        </div>
    `;
};
const Approvals = ({ user }) => {
    const approvals = getApprovals();
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Approval Queue</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm flex justify-between items-center"><div><p class="font-bold text-[var(--text-primary)]">${appr.subject}</p><p class="text-sm text-[var(--text-secondary)]">${appr.details}</p></div><div class="space-x-2"><button class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button><button class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button></div></div>`).join('') : `<p class="text-[var(--text-secondary)]">No items currently require approval.</p>`}
            </div>
        </div>
    `;
};
const SystemSettings = ({ user }) => {
    const settings = getSystemSettings();
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]";
    return `
         <div class="animate-in max-w-2xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">System Settings</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm space-y-4">
                <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Company Name</label><input type="text" value="${settings.companyName}" class="${inputStyles}"/></div>
                <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Payroll Cycle</label><select class="${inputStyles} bg-white"><option ${settings.payrollCycle === 'Weekly' ? 'selected' : ''}>Weekly</option><option ${settings.payrollCycle === 'Bi-Weekly' ? 'selected' : ''}>Bi-Weekly</option><option ${settings.payrollCycle === 'Monthly' ? 'selected' : ''}>Monthly</option></select></div>
                <div class="text-right"><button class="px-6 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-semibold rounded-md shadow-sm hover:bg-[var(--accent-secondary-hover)]">Save Settings</button></div>
            </div>
        </div>
    `;
};
const FieldOversight = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Field Oversight</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view will show a map of active missions and allow supervisors to initiate spot checks.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const TrainingApprovals = ({ user }) => {
    const approvals = getPendingTrainingApprovals();
    const users = getUsers();
    const modules = getTrainingModules();
    const getUser = (id) => users.find(u => u.id === id) || { firstName: 'Unknown', lastName: 'User' };
    const getModule = (id) => modules.find(m => m.id === id) || { title: 'Unknown Module' };
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Approvals</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-center"><div><p class="font-bold text-[var(--text-primary)]">${getUser(appr.userId).firstName} ${getUser(appr.userId).lastName}</p><p class="text-sm text-[var(--text-secondary)]">Completed: <span class="font-semibold">${getModule(appr.moduleId).title}</span></p><p class="text-xs text-[var(--text-secondary)]">Submitted: ${new Date(appr.submittedAt).toLocaleString()}</p></div><div class="space-x-2"><button data-action="approve-training" data-id="${appr.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button><button data-action="deny-training" data-id="${appr.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--text-secondary)]">No training submissions require approval.</p>`}
            </div>
        </div>
    `;
};
const TrainingManagement = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Management</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view will allow Training Officers to create and manage training modules and quizzes.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const SiteRoster = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Site Roster</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view will display a list of all client sites for management.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const LiveControl = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Control</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This executive dashboard will provide a real-time geographic and statistical overview of all active operations.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const Alerts = ({ user }) => {
    const alerts = getAlerts();
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">System Alerts</h1>
            <div class="space-y-4">
                ${alerts.length > 0 ? alerts.map(alert => `<div class="p-4 border-l-4 rounded-r-lg flex justify-between items-center ${alert.severity === 'High' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}"><div><p class="font-bold ${alert.severity === 'High' ? 'text-red-800' : 'text-yellow-800'}">${alert.severity} Priority</p><p class="text-sm text-gray-700">${alert.message}</p></div><button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">Acknowledge</button></div>`).join('') : `<p>No active alerts.</p>`}
            </div>
        </div>
    `;
};
const Applications = ({ user }) => {
    const applications = getApplications();
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">New Applications</h1>
            <div class="space-y-4">
                ${applications.length > 0 ? applications.map(app => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-center"><div><p class="font-bold text-lg text-[var(--text-primary)]">${app.data.firstName ? `${app.data.firstName} ${app.data.lastName}` : app.data.companyName}</p><p class="text-sm text-[var(--text-secondary)]">${app.type}</p></div><div class="space-x-2"><button data-action="approve-application" data-id="${app.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button><button data-action="deny-application" data-id="${app.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--text-secondary)]">No pending applications.</p>`}
            </div>
        </div>
    `;
};
const Communications = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Communications Hub</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This will be the central hub for messaging, announcements, and mission chats.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const Earnings = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Earnings & Payroll</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view will show detailed earnings reports, payment history, and payroll run information.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const ClientGuardRoster = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return `<div>Loading client data...</div>`;
    const allGuards = getUsers(fieldRoles);
    const clientMissions = getMissions().filter(m => m.clientId === client.id);
    const guardIds = new Set();
    clientMissions.forEach(mission => mission.claimedBy.forEach(guardId => guardIds.add(guardId)));
    const guardsWhoWorked = allGuards.filter(guard => guardIds.has(guard.id));
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Guard Roster</h1>
            <p class="text-[var(--text-secondary)] mb-6">Manage your preferred guards. Whitelisted guards get priority on your missions, while blacklisted guards cannot claim them.</p>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal">
                    <thead><tr class="bg-[var(--bg-primary)] text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Guard</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold text-center">Actions</th></tr></thead>
                    <tbody>
                        ${guardsWhoWorked.map(guard => {
                            const isWhitelisted = client.whitelist.includes(guard.id);
                            const isBlacklisted = client.blacklist.includes(guard.id);
                            return `
                                <tr class="border-b border-[var(--border-primary)] hover:bg-[var(--bg-primary)]">
                                    <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p><p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${guard.rank}</p></td>
                                    <td class="px-5 py-4 text-sm"><span class="font-semibold text-green-600">${guard.performanceRating.toFixed(2)} / 5.00</span></td>
                                    <td class="px-5 py-4 text-sm text-center space-x-2">
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="whitelist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isWhitelisted ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}">${isWhitelisted ? 'Whitelisted' : 'Whitelist'}</button>
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="blacklist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isBlacklisted ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-700 hover:bg-red-100'}">${isBlacklisted ? 'Blacklisted' : 'Blacklist'}</button>
                                    </td>
                                </tr>`;
                        }).join('')}
                    </tbody>
                </table>
                 ${guardsWhoWorked.length === 0 ? `<div class="text-center p-8"><p class="text-[var(--text-secondary)]">No guards have worked on your missions yet. Once they do, you can manage your roster here.</p></div>` : ''}
            </div>
        </div>
    `;
};
const HallOfFame = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Hall of Fame</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view will display leaderboards and recognize the 'Guard of the Month' based on performance metrics.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const Payroll = ({ user, selectedRunId }) => {
    const runs = getPayrollRuns();
    const users = getUsers(Object.values(UserRole));
    const selectedRun = runs.find(r => r.id === selectedRunId) || (runs.length > 0 ? runs[0] : null);
    const entries = selectedRun ? getPayrollEntriesForRun(selectedRun.id) : [];
    const getUserName = (id) => { const user = users.find(u => u.id === id); return user ? `${user.firstName} ${user.lastName}` : 'Unknown User'; }
    const getStatusPill = (status) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-blue-100 text-blue-800';
            case 'Paid': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Payroll Management</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <h2 class="text-lg font-bold text-[var(--text-primary)] mb-4">Create New Payroll Run</h2>
                        <form id="create-payroll-form" class="space-y-4">
                            <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label><input name="startDate" type="date" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" /></div>
                            <div><label class="block text-sm font-medium text-[var(--text-secondary)]">End Date</label><input name="endDate" type="date" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" /></div>
                            <button type="submit" class="w-full bg-[var(--accent-secondary)] text-white font-bold py-2 px-4 rounded-md hover:bg-[var(--accent-secondary-hover)] transition-colors">Create Run</button>
                        </form>
                    </div>
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <h2 class="text-lg font-bold text-[var(--text-primary)] mb-4">Payroll Runs</h2>
                         <ul class="space-y-2 max-h-96 overflow-y-auto">
                            ${runs.map(run => `<li data-action="select-payroll-run" data-id="${run.id}" class="p-3 rounded-md cursor-pointer transition-colors border ${selectedRun?.id === run.id ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]' : 'hover:bg-[var(--bg-primary)] border-transparent'}"><div class="flex justify-between items-center"><p class="font-semibold text-sm text-[var(--text-primary)]">${new Date(run.startDate).toLocaleDateString()} - ${new Date(run.endDate).toLocaleDateString()}</p><span class="px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusPill(run.status)}">${run.status}</span></div><p class="text-xs text-[var(--text-secondary)]">Total: $${run.totalAmount.toFixed(2)}</p></li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="lg:col-span-2 bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                    ${selectedRun ? `
                        <div>
                            <div class="flex justify-between items-center mb-4">
                                <div><h2 class="text-xl font-bold text-[var(--text-primary)]">Run Details</h2><p class="text-sm text-[var(--text-secondary)]">${new Date(selectedRun.startDate).toLocaleDateString()} - ${new Date(selectedRun.endDate).toLocaleDateString()}</p></div>
                                ${selectedRun.status === 'Pending' ? `<button data-action="approve-payroll-run" data-id="${selectedRun.id}" class="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Approve Run</button>`: ''}
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full">
                                    <thead><tr class="border-b-2 border-[var(--border-primary)]"><th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Guard</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Hours</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Total Pay</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Status</th></tr></thead>
                                    <tbody class="divide-y divide-[var(--border-primary)]">
                                        ${entries.map(entry => `<tr><td class="py-3 text-sm font-medium text-[var(--text-primary)]">${getUserName(entry.userId)}</td><td class="py-3 text-sm text-[var(--text-secondary)]">${entry.hours.toFixed(2)}</td><td class="py-3 text-sm text-[var(--text-secondary)]">$${entry.totalPay.toFixed(2)}</td><td class="py-3 text-sm">${selectedRun.status === 'Approved' && !entry.paymentConfirmed ? `<button data-action="confirm-payment" data-id="${entry.id}" class="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-blue-600">Mark as Paid</button>` : `<span class="px-2 py-0.5 text-xs font-semibold rounded-full ${entry.paymentConfirmed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${entry.paymentConfirmed ? 'Paid' : 'Unpaid'}</span>`}</td></tr>`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : `
                        <div class="flex items-center justify-center h-full text-center">
                            <div>${Icons.CreditCard({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}<h3 class="mt-4 text-lg font-semibold text-[var(--text-primary)]">Select a Payroll Run</h3><p class="text-[var(--text-secondary)]">Choose a run from the list to see its details.</p></div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
};
const VehicleManagement = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Vehicle Management</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view is for tracking the fleet of security vehicles, their maintenance schedules, and assignments.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const Promotions = ({ user }) => {
    const promotions = getPromotions();
    const users = getUsers(Object.values(UserRole));
    const isFieldRole = fieldRoles.includes(user.role);
    const isAdminRole = [...operationsRoles, ...executiveRoles].includes(user.role);
    const GuardPromotionView = (user, promotions) => {
        const existingApplication = promotions.find(p => p.userId === user.id && p.status === 'Pending');
        return `
            <div>
                <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Apply for Promotion</h1>
                ${existingApplication ? `
                    <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm text-center">
                        ${Icons.CheckCircle({ className: "w-12 h-12 mx-auto text-green-500 mb-4" })}
                        <h2 class="text-xl font-bold text-[var(--text-primary)]">Application Submitted</h2>
                        <p class="text-[var(--text-secondary)]">Your application for the role of <span class="font-semibold">${existingApplication.toRole}</span> is currently <span class="font-semibold">${existingApplication.status}</span>.</p>
                    </div>
                ` : `
                    <form id="promotion-form" class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm space-y-4">
                        <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Promote to Role</label><select name="role" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 bg-white focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"><option value="" disabled selected>Select a role</option><option value="${UserRole.TrainingOfficer}">Training Officer</option><option value="${UserRole.Supervisor}">Supervisor</option></select></div>
                        <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Reason for Application</label><textarea name="reason" required rows="5" class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" placeholder="Explain why you are a good fit for this role..."></textarea></div>
                        <div class="text-right"><button type="submit" class="bg-[var(--accent-secondary)] text-white font-bold py-2 px-6 rounded-md hover:bg-[var(--accent-secondary-hover)] transition-colors">Submit</button></div>
                    </form>
                `}
            </div>
        `;
    };
    const AdminPromotionView = (users, promotions) => {
        const getUserName = (id) => { const u = users.find(u => u.id === id); return u ? `${u.firstName} ${u.lastName}` : 'Unknown'; };
        const pendingPromotions = promotions.filter(p => p.status === 'Pending');
        return `
             <div>
                <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Promotion Applications</h1>
                 <div class="space-y-4">
                    ${pendingPromotions.length > 0 ? pendingPromotions.map(promo => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-center"><div><p class="font-bold text-lg text-[var(--text-primary)]">${getUserName(promo.userId)}</p><p class="text-sm text-[var(--text-secondary)]">Applying for: <span class="font-semibold text-[var(--text-primary)]">${promo.toRole}</span></p></div><div class="space-x-2"><button data-action="approve-promotion" data-id="${promo.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button><button data-action="deny-promotion" data-id="${promo.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button></div></div><p class="text-sm text-[var(--text-secondary)] mt-2 pt-2 border-t border-[var(--border-tertiary)]">${promo.reason}</p></div>`).join('') : `<p class="text-[var(--text-secondary)]">No pending promotion applications.</p>`}
                </div>
            </div>
        `;
    };
    let content = `<p>You do not have access to this view.</p>`;
    if (isAdminRole) content = AdminPromotionView(users, promotions);
    else if (isFieldRole) content = GuardPromotionView(user, promotions);
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">${content}</div>
    `;
};
const Appeals = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Appeals</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This view is for managing and reviewing appeals from guards and clients regarding applications, training, or other decisions.</p>
            <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
        </div>
    </div>
`;
const MyContracts = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    const contracts = client ? getContracts().filter(c => c.clientId === client.id) : [];
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Denied': return 'bg-red-100 text-red-800';
            default: return 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
        }
    };
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-[var(--text-primary)]">My Contracts</h1>
                <button data-action="open-contract-modal" class="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-bold rounded-md hover:bg-[var(--accent-secondary-hover)]">New Contract</button>
            </div>
             <div class="space-y-4">
                ${contracts.map(contract => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-start"><h3 class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</h3><span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}">${contract.status}</span></div><p class="text-sm text-[var(--text-secondary)]">Budget: $${contract.totalBudget.toLocaleString()}</p><p class="text-xs text-[var(--text-secondary)] opacity-70">Expires: ${contract.endDate.toLocaleDateString()}</p></div>`).join('')}
            </div>
        </div>
    `;
};
const ContractApprovals = ({ user }) => {
    const pendingContracts = getContracts().filter(c => c.status === 'Pending');
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Pending Contract Approvals</h1>
            <div class="space-y-4">
                ${pendingContracts.length > 0 ? pendingContracts.map(contract => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-center"><div><p class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</p><p class="text-sm text-[var(--text-secondary)]">Budget: $${contract.totalBudget.toLocaleString()}</p></div><div class="space-x-2"><button data-action="approve-contract" data-id="${contract.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button><button data-action="deny-contract" data-id="${contract.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--text-secondary)]">No contracts are pending approval.</p>`}
            </div>
        </div>
    `;
};

const views = { MissionBoard, MyMissions, Training, MyProfile, PostMission, MySites, Billing, GuardManagement, ClientManagement, MissionControl, ActiveMissions, Analytics, Approvals, SystemSettings, FieldOversight, TrainingApprovals, TrainingManagement, SiteRoster, LiveControl, Alerts, Applications, Communications, Earnings, ClientGuardRoster, HallOfFame, Payroll, VehicleManagement, Promotions, Appeals, MyContracts, ContractApprovals };

const renderActiveView = (view, user, state) => {
    const DashboardView = (user) => `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">Welcome back, ${user.firstName}!</h2>
                <p class="text-[var(--text-secondary)]">You are logged in as: <span class="font-semibold text-[var(--accent-primary)]">${user.role}</span></p>
                <p class="mt-4">Select an option from the sidebar to get started.</p>
            </div>
        </div>
    `;
    if (view === 'Dashboard') return DashboardView(user);
    const ViewComponent = views[view];
    return ViewComponent ? ViewComponent({ user, ...state }) : DashboardView(user);
};

const DashboardScreen = (state) => `
    <div class="relative h-screen md:flex overflow-hidden bg-[var(--bg-primary)]">
        <div id="sidebar" class="fixed inset-y-0 left-0 z-40 transform -translate-x-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0">
            ${Sidebar({ currentUser: state.currentUser, activeView: state.activeView })}
        </div>
        <div class="flex-1 flex flex-col w-full">
            <header class="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)] shadow-sm sticky top-0 z-20 w-full">
                <div class="mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <button data-action="toggle-mobile-menu" class="md:hidden text-[var(--text-secondary)] mr-4 p-2 rounded-md hover:bg-[var(--border-tertiary)]">
                                ${Icons.Menu({ className: 'h-6 w-6' })}
                            </button>
                            ${Icons.Shield({ className: 'w-8 h-8 text-[var(--accent-primary)] mr-3' })}
                            <h1 class="text-lg font-bold text-[var(--text-primary)] hidden sm:block">
                                Signature Security <span class="font-light text-[var(--accent-primary)]">Specialists</span>
                            </h1>
                        </div>
                        <button data-action="logout" class="flex items-center bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition">
                            ${Icons.Logout({ className: 'w-5 h-5 md:mr-2' })}
                            <span class="hidden md:block">Logout</span>
                        </button>
                    </div>
                </div>
            </header>
            <main id="dashboard-content" class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                ${renderActiveView(state.activeView, state.currentUser, state)}
            </main>
        </div>
    </div>
`;


// --- START: MAIN APP LOGIC ---
const state = {
    currentUser: null,
    users: [],
    isLoginModalOpen: false,
    isApplicationModalOpen: false,
    applicationType: null,
    isTrainingModalOpen: false,
    selectedTrainingModuleId: null,
    isContractModalOpen: false,
    isLoading: true,
    activeView: 'Dashboard',
    selectedPayrollRunId: null,
};
const root = document.getElementById('root');

function render() {
    if (!root) return;
    if (state.isLoading) {
        root.innerHTML = `<div class="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">Loading System...</div>`;
        return;
    }
    let modalHtml = '';
    if (state.isLoginModalOpen) modalHtml = LoginModal({ users: state.users });
    if (state.isApplicationModalOpen && state.applicationType) modalHtml = ApplicationModal({ type: state.applicationType });
    if (state.isTrainingModalOpen && state.selectedTrainingModuleId) modalHtml = TrainingModal({ moduleId: state.selectedTrainingModuleId });
    if (state.isContractModalOpen && state.currentUser) modalHtml = ContractModal({ user: state.currentUser });
    if (state.currentUser) {
        root.innerHTML = DashboardScreen({
            currentUser: state.currentUser,
            activeView: state.activeView,
            selectedPayrollRunId: state.selectedPayrollRunId,
        }) + modalHtml;
    } else {
        root.innerHTML = HomePage() + modalHtml;
    }
    attachFormEventListeners();
}

function attachFormEventListeners() {
    if (!root) return;
    const forms = [
        { id: '#application-form', handler: handleApplicationSubmit },
        { id: '#post-mission-form', handler: handlePostMission },
        { id: '#create-payroll-form', handler: handleCreatePayroll },
        { id: '#promotion-form', handler: handlePromotionSubmit },
        { id: '#training-form', handler: handleTrainingSubmit },
        { id: '#contract-form', handler: handleContractSubmit },
    ];
    forms.forEach(formInfo => {
        const form = root.querySelector(formInfo.id);
        if (form) form.addEventListener('submit', formInfo.handler);
    });
}

function handleLogin(email) {
    const user = getUserByEmail(email);
    if (user) {
        state.currentUser = user;
        state.activeView = 'Dashboard';
        closeAllModals();
    } else {
        alert('User not found.');
    }
}
function handleLogout() {
    state.currentUser = null;
    render();
}
function handleNavigation(view) {
    state.activeView = view;
    render();
    const contentArea = document.getElementById('dashboard-content');
    if(contentArea) contentArea.scrollTop = 0;
}
function handleClaimMission(missionId) {
    if (!state.currentUser) return;
    const result = claimMission(missionId, state.currentUser.id);
    alert(result.message);
    refreshAndRender();
}
function handleCheckIn(missionId) {
    if (!state.currentUser) return;
    missionCheckIn(missionId, state.currentUser.id);
    refreshAndRender();
}
function handleCheckOut(missionId) {
    if (!state.currentUser) return;
    missionCheckOut(missionId, state.currentUser.id);
    refreshAndRender();
}
function handleUpdateRoster(guardId, listType) {
    if (!state.currentUser) return;
    const client = getClients().find(c => c.userId === state.currentUser.id);
    if (client) {
        const list = client[listType] || [];
        const action = list.includes(guardId) ? 'remove' : 'add';
        updateClientGuardList(client.id, guardId, listType, action);
        refreshAndRender();
    }
}
function handleUpdateApplication(appId, status) {
    updateApplicationStatus(appId, status);
    alert(`Application ${status.toLowerCase()}.`);
    refreshAndRender();
}
function handleUpdateContract(contractId, status) {
    updateContractStatus(contractId, status);
    alert(`Contract ${status.toLowerCase()}.`);
    refreshAndRender();
}
function handleUpdatePromotion(promoId, status) {
    updatePromotionStatus(promoId, status);
    alert(`Promotion ${status.toLowerCase()}.`);
    refreshAndRender();
}
function handleUpdateTrainingStatus(progressId, status) {
    updateTrainingProgressStatus(progressId, status);
    alert(`Training submission has been ${status.toLowerCase()}.`);
    refreshAndRender();
}
function openLoginModal() {
    state.isLoginModalOpen = true;
    render();
}
function openApplicationModal(type) {
    state.applicationType = type;
    state.isApplicationModalOpen = true;
    render();
}
function openTrainingModal(moduleId) {
    state.selectedTrainingModuleId = moduleId;
    state.isTrainingModalOpen = true;
    render();
}
function openContractModal() {
    state.isContractModalOpen = true;
    render();
}
function closeAllModals() {
    state.isLoginModalOpen = false;
    state.isApplicationModalOpen = false;
    state.applicationType = null;
    state.isTrainingModalOpen = false;
    state.selectedTrainingModuleId = null;
    state.isContractModalOpen = false;
    render();
}
function handleApplicationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!state.applicationType) return;
    addApplication({ type: state.applicationType, data });
    alert('Application submitted successfully! It will be reviewed by operations.');
    closeAllModals();
}
function handlePostMission(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const client = getClients().find(c => c.userId === state.currentUser.id);
    if(!client) {
        alert("Could not find client profile.");
        return;
    }
    addMission({
        title: data.title, contractId: data.contractId, siteId: data.siteId, description: data.description,
        clientId: client.id, startTime: new Date(data.startTime), endTime: new Date(data.endTime),
        payRate: parseFloat(data.payRate), requiredGuards: parseInt(data.requiredGuards, 10), requiredLevel: parseInt(data.requiredLevel, 10),
    });
    alert('Mission posted successfully!');
    handleNavigation('MyMissions');
}
function handleCreatePayroll(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = new Date(formData.get('startDate'));
    const endDate = new Date(formData.get('endDate'));
    if (startDate >= endDate) {
        alert('Start date must be before end date.');
        return;
    }
    createPayrollRun(startDate, endDate);
    alert('Payroll run created.');
    refreshAndRender();
}
function handlePromotionSubmit(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    addPromotion({ userId: state.currentUser.id, toRole: data.role, reason: data.reason });
    alert('Promotion application submitted.');
    refreshAndRender();
}
function handleTrainingSubmit(e) {
    e.preventDefault();
    if (!state.currentUser || !state.selectedTrainingModuleId) return;
    const formData = new FormData(e.target);
    const answers = Object.fromEntries(formData.entries());
    const passed = submitTraining(state.currentUser.id, state.selectedTrainingModuleId, answers);
    if(passed) {
        alert('Quiz submitted! Your results are pending approval.');
    } else {
        alert('You did not pass the quiz. Please review the material and try again.');
    }
    closeAllModals();
}
function handleContractSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
     addContract({ clientId: data.clientId, title: data.title, startDate: new Date(data.startDate), endDate: new Date(data.endDate), totalBudget: parseFloat(data.totalBudget) });
    alert('New contract submitted for approval!');
    closeAllModals();
    handleNavigation('MyContracts');
}
function refreshData() {
    console.log("Refreshing application data...");
    state.users = getUsers();
    if (state.currentUser) {
        state.currentUser = getUserById(state.currentUser.id) || null;
    }
}
function refreshAndRender() {
    refreshData();
    render();
}
function initializeApp() {
    console.log("Initializing SSS App...");
    initializeDB();
    state.isLoading = true;
    render();
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;

        // This is the key fix: only trigger 'close-modal' if the click is on the backdrop itself,
        // not on a child element (like the modal content). This allows button clicks inside the
        // modal to bubble up and be handled correctly.
        if (action === 'close-modal' && e.target !== target) {
            return;
        }

        const id = target.dataset.id;
        const type = target.dataset.type;
        const actions = {
            'open-login': () => openLoginModal(),
            'open-application': () => openApplicationModal(type),
            'open-contract-modal': () => openContractModal(),
            'close-modal': () => closeAllModals(),
            'login': () => handleLogin(id),
            'logout': () => handleLogout(),
            'navigate': () => handleNavigation(type),
            'toggle-mobile-menu': () => document.getElementById('sidebar')?.classList.toggle('-translate-x-full'),
            'claim-mission': () => handleClaimMission(id),
            'check-in': () => handleCheckIn(id),
            'check-out': () => handleCheckOut(id),
            'update-roster': () => handleUpdateRoster(target.dataset.guardId, target.dataset.listType),
            'approve-application': () => handleUpdateApplication(id, 'Approved'),
            'deny-application': () => handleUpdateApplication(id, 'Denied'),
            'approve-contract': () => handleUpdateContract(id, 'Active'),
            'deny-contract': () => handleUpdateContract(id, 'Denied'),
            'approve-promotion': () => handleUpdatePromotion(id, 'Approved'),
            'deny-promotion': () => handleUpdatePromotion(id, 'Denied'),
            'start-training': () => openTrainingModal(id),
            'approve-training': () => handleUpdateTrainingStatus(id, 'Approved'),
            'deny-training': () => handleUpdateTrainingStatus(id, 'Denied'),
            'select-payroll-run': () => { state.selectedPayrollRunId = id; render(); },
            'approve-payroll-run': () => { if(id) approvePayrollRun(id); refreshAndRender(); },
            'confirm-payment': () => { if(id) confirmPayment(id); refreshAndRender(); },
        };
        if (actions[action]) actions[action]();
    });
    refreshData();
    state.isLoading = false;
    render();
    window.addEventListener('storage', () => {
        console.log('Database updated, refreshing data via storage event.');
        refreshAndRender();
    });
}

initializeApp();