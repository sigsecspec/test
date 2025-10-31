
// --- CONSOLIDATED APPLICATION FILE ---
// This file contains all JavaScript logic for the application,
// refactored and expanded to be fully functional based on the owner's plan.

// --- START: types.js ---
const UserRole = {
    // Executive
    Owner: "Owner",                 // CHF
    CoOwner: "Co-Owner",            // ASST CHF
    // Management
    Secretary: "Secretary",         // DPT CHF
    Dispatch: "Dispatch",           // CMD
    // Operations
    OperationsDirector: "Operations Director", // CAP
    OperationsManager: "Operations Manager", // LT
    // Field Leadership
    Supervisor: "Supervisor",       // SGT
    TrainingOfficer: "Training Officer", // CPL
    SiteLead: "Site Lead",          // PVT
    // Field
    Guard: "Guard",                 // OFC
    // External
    Client: "Client",
};

const Ranks = {
    [UserRole.Owner]: "CHF (Chief)",
    [UserRole.CoOwner]: "ASST CHF (Assistant Chief)",
    [UserRole.Secretary]: "DPT CHF (Deputy Chief)",
    [UserRole.Dispatch]: "CMD (Commander)",
    [UserRole.OperationsDirector]: "CAP (Captain)",
    [UserRole.OperationsManager]: "LT (Lieutenant)",
    [UserRole.Supervisor]: "SGT (Sergeant)",
    [UserRole.TrainingOfficer]: "CPL (Corporal)",
    [UserRole.SiteLead]: "PVT (Private)",
    [UserRole.Guard]: "OFC (Officer)",
    [UserRole.Client]: "Client",
};

// --- START: constants.js ---
const executiveRoles = [UserRole.Owner, UserRole.CoOwner];
const managementRoles = [UserRole.Secretary, UserRole.Dispatch];
const operationsRoles = [UserRole.OperationsDirector, UserRole.OperationsManager];
const fieldLeadershipRoles = [UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.SiteLead];
const guardRole = [UserRole.Guard];
const fieldRoles = [...fieldLeadershipRoles, ...guardRole];
const allInternalRoles = [...executiveRoles, ...managementRoles, ...operationsRoles, ...fieldRoles];
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
    Camera: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>`,
    ChevronDown: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`,
    ChatBubbleLeftRight: ({ className = '' }) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a5.25 5.25 0 01-4.756-4.756l.537-3.722c.094-1.133.957-1.98 2.097-1.98h4.286c.969 0 1.813.616 2.097 1.5zM4.5 18.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a5.25 5.25 0 01-4.756-4.756l.537-3.722c.094-1.133.957-1.98 2.097-1.98h4.286c.969 0 1.813.616 2.097 1.5z" /></svg>`,
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
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'M.White@SignatureSecuritySpecialist.com', role: UserRole.Owner, rank: Ranks[UserRole.Owner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 0, performanceRating: 5.0 },
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'J.Lyons@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.8 },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 'T.Moreno@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.7 },
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'B.Baker@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.8 },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'R.Granum@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.7 },
    { id: 'guard-1', firstName: 'John', lastName: 'Doe', email: 'j.doe@example.com', role: UserRole.Guard, rank: Ranks[UserRole.Guard], level: 2, certifications: ['Level 1 - Basic Security', 'Level 2 - Pepper Spray'], teamId: 'team-1', weeklyHours: 15, performanceRating: 4.5 },
    { id: 'supervisor-1', firstName: 'Jane', lastName: 'Smith', email: 'j.smith@example.com', role: UserRole.Supervisor, rank: Ranks[UserRole.Supervisor], level: 4, certifications: ['All'], teamId: 'team-1', weeklyHours: 30, performanceRating: 4.9 },
    { id: 'guard-2', firstName: 'Peter', lastName: 'Jones', email: 'p.jones@example.com', role: UserRole.Guard, rank: Ranks[UserRole.Guard], level: 1, certifications: ['Level 1 - Basic Security'], teamId: 'team-2', weeklyHours: 5, performanceRating: 4.2 },
    { id: 'secretary-1', firstName: 'Susan', lastName: 'Adams', email: 's.adams@example.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: null, weeklyHours: 40, performanceRating: 5.0 },
    { id: 'dispatch-1', firstName: 'Mike', lastName: 'Johnson', email: 'm.johnson@example.com', role: UserRole.Dispatch, rank: Ranks[UserRole.Dispatch], level: 5, certifications: ['All'], teamId: null, weeklyHours: 40, performanceRating: 5.0 },
    { id: 'client-1', firstName: 'Acme', lastName: 'Corp', email: 'contact@acme.com', role: UserRole.Client, rank: 'Client', level: 0, certifications: [], teamId: 'team-1' },
    { id: 'to-1', firstName: 'Chris', lastName: 'Green', email: 'c.green@example.com', role: UserRole.TrainingOfficer, rank: Ranks[UserRole.TrainingOfficer], level: 3, certifications: ['All'], teamId: 'team-1', weeklyHours: 10, performanceRating: 4.8 },
  ],
  clients: [
      { id: 'client-acme', userId: 'client-1', companyName: 'Acme Corp', contactEmail: 'contact@acme.com', teamId: 'team-1', whitelist: [], blacklist: [] }
  ],
  missions: [],
  sites: [
      { id: 'site-1', clientId: 'client-acme', name: 'Acme Corp HQ', address: '123 Main St, Anytown, USA' }
  ],
  contracts: [
    { id: 'contract-1', clientId: 'client-acme', title: 'Acme Corp HQ Security', startDate: new Date('2023-01-01'), endDate: new Date('2024-12-31'), totalBudget: 50000, status: 'Active' }
  ],
  applications: [],
  promotions: [],
  trainingModules: [
      { id: 'tm-1', title: 'Level 1 - Basic Security', content: 'This module covers the fundamental duties of a security officer...', quiz: [{q: 'What is the first step in an emergency?', a: 'Assess the situation'}]},
      { id: 'tm-2', title: 'Level 2 - Pepper Spray', content: 'Proper use and legal implications of pepper spray...', quiz: [{q: 'What is the effective range of your issued spray?', a: '10-12 feet'}]},
      { id: 'tm-3', title: 'Level 3 - Taser', content: 'Taser operation and safety protocols...', quiz: [{q: 'What does Taser stand for?', a: 'Thomas A. Swift\'s Electric Rifle'}]},
      { id: 'tm-4', title: 'Level 4 - Baton', content: 'Defensive baton techniques...', quiz: [{q: 'What is a primary target area?', a: 'Large muscle groups'}]},
      { id: 'tm-5', title: 'Level 5 - Armed', content: 'Firearm safety and use of force...', quiz: [{q: 'What is the most important rule of gun safety?', a: 'Treat every firearm as if it were loaded'}]},
      { id: 'tm-lead', title: 'Site Lead Training', content: 'Leadership, communication, and mission coordination...', quiz: [{q: 'Who must check in first on a mission?', a: 'The Site Lead'}]},
      { id: 'tm-to', title: 'Training Officer Training', content: 'Managing training programs and evaluating guards...', quiz: [{q: 'Who can deny a training submission?', a: 'Operations'}]},
      { id: 'tm-sup', title: 'Supervisor Training', content: 'Spot checks, quality assurance, and leadership...', quiz: [{q: 'How many spot checks are required per mission?', a: '3'}]},
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
  },
  teams: [
      { id: 'team-1', name: 'Team Lyons', directorId: 'user-2' },
      { id: 'team-2', name: 'Team Baker', directorId: 'user-4' },
  ],
  spotChecks: [],
  uniformDeliveries: [],
  leadGuardAssignments: [],
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
      const collectionsWithDates = ['missions', 'contracts', 'promotions', 'payrollRuns', 'applications', 'trainingProgress', 'spotChecks'];
      collectionsWithDates.forEach(collection => {
          if(parsedDB[collection]) {
              parsedDB[collection].forEach(item => {
                  if (item.startTime) item.startTime = new Date(item.startTime);
                  if (item.endTime) item.endTime = new Date(item.endTime);
                  if (item.startDate) item.startDate = new Date(item.startDate);
                  if (item.endDate) item.endDate = new Date(item.endDate);
                  if (item.submittedAt) item.submittedAt = new Date(item.submittedAt);
                  if (item.createdAt) item.createdAt = new Date(item.createdAt);
                  if (item.time) item.time = new Date(item.time);
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
const getMissions = (teamId = null) => {
    if (!teamId) return _DB.missions || [];
    return (_DB.missions || []).filter(m => {
        const client = _DB.clients.find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    });
};
const getSites = () => _DB.sites || [];
const getContracts = () => _DB.contracts || [];
const getApplications = (status = 'Pending') => (_DB.applications || []).filter(a => a.status === status);
const getTrainingModules = () => _DB.trainingModules || [];
const getUserTrainingProgress = (userId) => (_DB.trainingProgress || []).filter(p => p.userId === userId);
const getPendingTrainingApprovals = (teamId = null) => {
    const pending = (_DB.trainingProgress || []).filter(p => p.status === 'Pending Approval');
    if (!teamId) return pending;
    return pending.filter(p => {
        const user = getUserById(p.userId);
        return user && user.teamId === teamId;
    });
};
const getSystemSettings = () => _DB.systemSettings || {};
const getAlerts = () => _DB.alerts || [];
const getPromotions = () => _DB.promotions || [];
const getPayrollRuns = () => (_DB.payrollRuns || []).sort((a,b) => new Date(b.endDate) - new Date(a.endDate));
const getPayrollEntriesForRun = (runId) => (_DB.payrollEntries || []).filter(e => e.runId === runId);
const getMissionsForSpotCheck = (supervisorId) => {
    const supervisor = getUserById(supervisorId);
    if (!supervisor) return [];
    return getMissions(supervisor.teamId).filter(m => m.status === 'Active' && !m.claimedBy.includes(supervisorId));
};
const getSpotCheckByMissionId = (missionId) => _DB.spotChecks.find(sc => sc.missionId === missionId);
const getLeadGuardAssignment = (missionId) => _DB.leadGuardAssignments.find(lg => lg.missionId === missionId);

function addApplication({ type, data }) {
    const newApp = { id: `app-${Date.now()}`, type, data, status: 'Pending', submittedAt: new Date() };
    _DB.applications.push(newApp);
    save();
}
function updateApplicationStatus(appId, status, teamId = null) {
    const app = _DB.applications.find(a => a.id === appId);
    if (app) {
        app.status = status;
        if (status === 'Approved') {
            const roleMap = { 'New Guard': UserRole.Guard, 'New Supervisor': UserRole.Supervisor, 'New Client': UserRole.Client, 'New Training Officer': UserRole.TrainingOfficer };
            const role = roleMap[app.type];
            if (!role) return;

            // Assign to a team
            let assignedTeamId = app.data.teamCode || teamId;
            if (!assignedTeamId && role !== UserRole.Client) {
                // Default assignment logic: assign to team with fewest members
                const teamCounts = _DB.teams.map(t => ({ id: t.id, count: _DB.users.filter(u => u.teamId === t.id).length }));
                if (teamCounts.length > 0) {
                    assignedTeamId = teamCounts.sort((a, b) => a.count - b.count)[0].id;
                }
            }
            
            const newUser = {
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
            }
        }
        _DB.applications = _DB.applications.filter(a => a.id !== appId); // Remove from pending
    }
    save();
}
function addMission(missionData) {
    const newMission = {
        ...missionData,
        id: `mission-${Date.now()}`,
        status: 'Open',
        claimedBy: [],
        checkIns: {},
        checkOuts: {},
    };
    _DB.missions.push(newMission);
    save();
}
function claimMission(missionId, userId) {
    const mission = _DB.missions.find(m => m.id === missionId);
    const user = getUserById(userId);
    const client = _DB.clients.find(c => c.id === mission.clientId);
    const userProgress = getUserTrainingProgress(userId);
    const requiredTraining = _DB.trainingModules.find(tm => tm.id === mission.requiredTrainingId);
    const hasTraining = userProgress.some(p => p.moduleId === mission.requiredTrainingId && p.status === 'Approved');

    if (!mission || !user || !client) return { success: false, message: "Mission, user, or client not found." };
    if (client.blacklist.includes(userId)) return { success: false, message: "You are blacklisted for this client." };
    if (!hasTraining) return { success: false, message: `You need to complete "${requiredTraining.title}" training.` };
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
function missionCheckIn(missionId, userId, isLead = false, guardToCheckIn = null) {
    const mission = _DB.missions.find(m => m.id === missionId);
    if (!mission || !mission.claimedBy.includes(userId)) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) { // Lead checking in another guard
        if (mission.checkIns[userId] && guardToCheckIn && !mission.checkIns[guardToCheckIn]) {
            mission.checkIns[guardToCheckIn] = { time: new Date() };
        }
    } else { // Regular or initial lead check-in
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
function missionCheckOut(missionId, userId, isLead = false, guardToCheckOut = null) {
    const mission = _DB.missions.find(m => m.id === missionId);
    if (!mission || !mission.checkIns[userId]) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) { // Lead checking out another guard
        if (guardToCheckOut && !mission.checkOuts[guardToCheckOut]) {
            mission.checkOuts[guardToCheckOut] = { time: new Date() };
        }
    } else { // Regular or final lead check-out
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
    const existingAttempt = _DB.trainingProgress.find(p => p.userId === userId && p.moduleId === moduleId);
    if(existingAttempt){
      alert("You have already attempted this quiz. Request a retake from a Training Officer.");
      return;
    }

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
        if (status === 'Retake Requested') {
            _DB.trainingProgress = _DB.trainingProgress.filter(p => p.id !== progressId);
        }
    }
    save();
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
                user.rank = Ranks[promo.toRole];
                user.needsUniform = true; // Flag for uniform distribution
            }
        }
    }
    save();
}
function createPayrollRun(startDate, endDate) {
    const runId = `pr-${Date.now()}`;
    const run = { id: runId, startDate, endDate, status: 'Pending', totalAmount: 0, createdAt: new Date() };
    const paidMissionIds = _DB.payrollEntries.map(e => e.missionId);
    const missionsInPeriod = _DB.missions.filter(m => 
        m.status === 'Completed' &&
        new Date(m.endTime) >= startDate &&
        new Date(m.endTime) <= endDate &&
        !paidMissionIds.includes(m.id)
    );
    const guardPay = {};
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
                guardPay[guardId].missionIds.push(mission.id);
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
function addSpotCheck(supervisorId, missionId) {
    const existing = _DB.spotChecks.find(sc => sc.missionId === missionId);
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
        finalReport: null
    };
    _DB.spotChecks.push(newSpotCheck);
    save();
}
function updateSpotCheck(spotCheckId, checkType, checkData) {
    const spotCheck = _DB.spotChecks.find(sc => sc.id === spotCheckId);
    if(spotCheck) {
        spotCheck.checks[checkType] = checkData;
        save();
    }
}
function completeSpotCheck(spotCheckId, report) {
    const spotCheck = _DB.spotChecks.find(sc => sc.id === spotCheckId);
    if(spotCheck && spotCheck.checks.start && spotCheck.checks.mid && spotCheck.checks.end) {
        spotCheck.finalReport = report;
        spotCheck.status = 'Completed';
        spotCheck.endTime = new Date();
        save();
    } else {
        alert("All three checks must be completed before submitting the final report.");
    }
}
function assignLeadGuard(missionId, userId) {
    const assignment = {
        id: `lg-${Date.now()}`,
        missionId,
        userId,
    };
    _DB.leadGuardAssignments.push(assignment);
    save();
}
function getNeedsUniformUsers(teamId = null) {
    const users = _DB.users.filter(u => u.needsUniform);
    if(!teamId) return users;
    return users.filter(u => u.teamId === teamId);
}
function markUniformSent(userId) {
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
function confirmUniformReceived(userId) {
    const delivery = _DB.uniformDeliveries.find(d => d.userId === userId && d.receivedAt === null);
    if(delivery) {
        delivery.receivedAt = new Date();
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
                        <button data-action="navigate" data-type="GuardApplication" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</button>
                        <button data-action="navigate" data-type="ClientApplication" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Hire Security</button>
                        <button data-action="navigate" data-type="OperationsApplication" class="px-6 py-3 rounded-md font-bold bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105 hover:border-[var(--accent-primary)]">Join Operations</button>
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
                                    ${user.role !== UserRole.Client ? `<span class="px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">Lvl ${user.level}</span>` : ''}
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
                <input name="teamCode" placeholder="Team Code (Optional)" class="${inputStyles}" />
                <input type="hidden" name="role" value="${type === 'New Guard' ? UserRole.Guard : UserRole.Supervisor}" />
            `;
        }
        if (type === 'New Client') {
             return `
                <input name="companyName" placeholder="Company Name" required class="${inputStyles}" />
                <input name="contactEmail" type="email" placeholder="Contact Email" required class="${inputStyles}" />
                <input name="contactPhone" type="tel" placeholder="Contact Phone" required class="${inputStyles}" />
                <input name="teamCode" placeholder="Team Code (Optional)" class="${inputStyles}" />
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
                <div class="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
                    <p class="font-bold">Audio Version</p>
                    <p class="text-sm">An audio player for the training content would appear here.</p>
                </div>
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-4">Quiz</h3>
                <p class="text-sm text-red-600 mb-4 font-semibold">You only get one attempt at this quiz. If you fail, you must request a retake from a Training Officer or Supervisor.</p>
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
    const isSupervisor = currentUser.role === UserRole.Supervisor;
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
            roles: [UserRole.Supervisor, UserRole.TrainingOfficer],
            items: [
                { name: 'Field Oversight', icon: Icons.Eye, view: 'FieldOversight', roles: [UserRole.Supervisor] },
                { name: 'Training Management', icon: Icons.AcademicCap, view: 'TrainingManagement', roles: [UserRole.Supervisor, UserRole.TrainingOfficer] },
            ]
        },
        {
            title: 'Operations',
            roles: [...operationsRoles, ...executiveRoles, ...managementRoles],
            items: [
                { name: 'Mission Control', icon: Icons.Map, view: 'MissionControl', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
                { name: 'Active Missions', icon: Icons.Flag, view: 'ActiveMissions', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
                { name: 'Guard Management', icon: Icons.Users, view: 'GuardManagement', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Client Management', icon: Icons.Briefcase, view: 'ClientManagement', roles: [...operationsRoles, UserRole.Secretary, ...executiveRoles] },
                { name: 'Site Roster', icon: Icons.LocationMarker, view: 'SiteRoster', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Communications', icon: Icons.Mail, view: 'Communications', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
                { name: 'Alerts', icon: Icons.Bell, view: 'Alerts', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
                { name: 'Vehicle Management', icon: Icons.Truck, view: 'VehicleManagement', roles: [...operationsRoles, UserRole.Dispatch, ...executiveRoles] },
            ]
        },
        {
            title: 'Administration',
            roles: [...operationsRoles, ...executiveRoles, ...managementRoles],
            items: [
                { name: 'Applications', icon: Icons.DocumentText, view: 'Applications', roles: [UserRole.OperationsManager, UserRole.Secretary, ...executiveRoles] },
                { name: 'Contract Approvals', icon: Icons.DocumentDuplicate, view: 'ContractApprovals', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: [UserRole.OperationsDirector, ...executiveRoles] },
                { name: 'Appeals', icon: Icons.Flag, view: 'Appeals', roles: [UserRole.OperationsDirector, ...executiveRoles] },
                { name: 'Uniform Distribution', icon: Icons.Truck, view: 'UniformDistribution', roles: [UserRole.Secretary, ...operationsRoles, ...executiveRoles]},
            ]
        },
        {
            title: 'Executive',
            roles: executiveRoles,
            items: [
                { name: 'Team Management', icon: Icons.Users, view: 'TeamManagement', roles: executiveRoles },
                { name: 'Payroll', icon: Icons.CreditCard, view: 'Payroll', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Analytics', icon: Icons.ChartBar, view: 'Analytics', roles: [...operationsRoles, ...executiveRoles] },
                { name: 'Live Control', icon: Icons.Shield, view: 'LiveControl', roles: executiveRoles },
                { name: 'System Settings', icon: Icons.Cog, view: 'SystemSettings', roles: executiveRoles },
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
    const missions = getMissions(user.teamId);
    const clients = getClients();
    const trainingProgress = getUserTrainingProgress(user.id);
    const allTrainingModules = getTrainingModules();
    const availableMissions = missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));
    
    const MissionCard = ({ mission, user, client }) => {
        const isClaimedByUser = mission.claimedBy.includes(user.id);
        const isFull = mission.claimedBy.length >= mission.requiredGuards;
        const isBlacklisted = client && client.blacklist.includes(user.id);
        const requiredTraining = allTrainingModules.find(tm => tm.id === mission.requiredTrainingId);
        const userTraining = trainingProgress.find(p => p.moduleId === mission.requiredTrainingId);

        let status;
        let buttonText;
        let canClaim = false;

        if (isClaimedByUser) {
            status = 'Claimed';
            buttonText = 'Claimed';
        } else if (isFull) {
            status = 'Full';
            buttonText = 'Full';
        } else if (isBlacklisted) {
            status = 'Unavailable';
            buttonText = 'Unavailable';
        } else if (!userTraining) {
            status = 'Training Required';
            buttonText = 'Go to Training';
        } else if (userTraining.status === 'Pending Approval') {
            status = 'Training Pending';
            buttonText = 'Pending';
        } else if (userTraining.status === 'Failed') {
            status = 'Training Failed';
            buttonText = 'Retake';
        } else if (userTraining.status === 'Approved') {
            status = 'Available';
            buttonText = 'Claim Mission';
            canClaim = true;
        } else {
            status = 'Unavailable';
            buttonText = 'Unavailable';
        }
        
        const actionButton = () => {
             if (status === 'Training Required' || status === 'Training Failed') {
                return `<button data-action="navigate" data-type="Training" class="px-4 py-2 text-sm font-bold rounded-md transition-colors bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/80">${buttonText}</button>`;
            }
            return `<button data-action="claim-mission" data-id="${mission.id}" ${!canClaim ? 'disabled' : ''} class="px-4 py-2 text-sm font-bold rounded-md transition-colors ${canClaim ? 'bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]' : 'bg-[var(--border-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'}">${buttonText}</button>`;
        }

        return `
            <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${status}</span>
                    </div>
                    <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                    <div class="text-sm text-[var(--text-secondary)] mt-2 space-y-1">
                        <p><strong>Pay:</strong> <span class="text-[var(--text-primary)]">$${mission.payRate}/hr</span></p>
                        <p><strong>Time:</strong> <span class="text-[var(--text-primary)]">${new Date(mission.startTime).toLocaleString()} - ${new Date(mission.endTime).toLocaleString()}</span></p>
                        <p><strong>Training:</strong> <span class="text-[var(--text-primary)]">${requiredTraining?.title || 'N/A'}</span></p>
                    </div>
                </div>
                <div class="mt-4 flex justify-between items-center">
                    <p class="text-sm font-medium text-[var(--text-primary)]">${mission.claimedBy.length} / ${mission.requiredGuards} Guards</p>
                    ${actionButton()}
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
        active: myMissions.filter(m => m.status === 'Active').sort((a,b) => new Date(a.startTime) - new Date(b.startTime)),
        upcoming: myMissions.filter(m => new Date(m.startTime) > now && (m.status === 'Claimed' || m.status === 'Open')).sort((a,b) => new Date(a.startTime) - new Date(b.startTime)),
        past: myMissions.filter(m => new Date(m.endTime) <= now || m.status === 'Completed' || m.status === 'Cancelled').sort((a,b) => new Date(b.startTime) - new Date(a.startTime)),
    };
    const MissionCard = ({ mission, user }) => {
        const isGuard = !clientRole.includes(user.role);
        const hasCheckedIn = mission.checkIns && mission.checkIns[user.id];
        const hasCheckedOut = mission.checkOuts && mission.checkOuts[user.id];
        let actions = '';
        const now = new Date();
        const canCheckIn = now >= new Date(mission.startTime) && now <= new Date(mission.endTime);
        const canStartMission = new Date() >= new Date(mission.startTime);

        if (isGuard) {
             if(mission.status === 'Active') {
                actions = `<button data-action="view-mission-dashboard" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-blue-500 text-white hover:bg-blue-600">Open Dashboard</button>`;
            } else if (canStartMission && mission.status !== 'Completed' && mission.status !== 'Cancelled') {
                actions = `<button data-action="start-mission" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-green-500 text-white hover:bg-green-600">Start Mission</button>`;
            }
        }
        return `
            <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-[var(--text-primary)]">${mission.title}</p>
                        <p class="text-sm text-[var(--text-secondary)]">${new Date(mission.startTime).toLocaleString()}</p>
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
                ${modules.filter(module => !module.title.includes('Training Officer') && !module.title.includes('Supervisor')).map(module => { // Filter out special trainings
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
                                <p class="text-sm text-[var(--text-secondary)]">${module.content.substring(0, 100)}...</p>
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
                ${user.role !== UserRole.Client ? `
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Level:</span><span class="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">${user.level}</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Performance Rating:</span><span class="font-semibold text-green-600">${user.performanceRating.toFixed(2)} / 5.00</span></div>
                <div class="flex justify-between items-center"><span class="font-medium text-[var(--text-secondary)]">Weekly Hours:</span><span class="font-semibold text-[var(--text-primary)]">${user.weeklyHours.toFixed(1)} / 40</span></div>
                <div>
                    <span class="font-medium text-[var(--text-secondary)]">Certifications:</span>
                    <div class="flex flex-wrap gap-2 mt-2">${user.certifications.length > 0 ? user.certifications.map(cert => `<span class="px-2 py-1 text-xs bg-[var(--border-tertiary)] text-[var(--text-secondary)] rounded-md">${cert}</span>`).join('') : 'None'}</div>
                </div>
                `: ''}
            </div>
        </div>
    </div>
`;
const PostMission = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return `<div class="text-center p-8 bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-primary)]">Your client profile could not be loaded. Please contact support.</div>`;
    const sites = getSites().filter(s => s.clientId === client.id);
    const contracts = getContracts().filter(c => c.clientId === client.id && c.status === 'Active');
    const trainingModules = getTrainingModules().filter(m => !m.title.includes("Officer") && !m.title.includes("Supervisor") && !m.title.includes("Lead"));
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";
    return `
        <div class="animate-in max-w-4xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Post a New Mission</h1>
            <form id="post-mission-form" class="bg-[var(--bg-secondary)] p-8 border border-[var(--border-primary)] rounded-lg shadow-md space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Contract</label><select name="contractId" required class="${inputStyles} bg-white"><option value="">Select a contract</option>${contracts.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Site</label><select name="siteId" required class="${inputStyles} bg-white"><option value="">Select a site</option>${sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Training</label><select name="requiredTrainingId" required class="${inputStyles} bg-white"><option value="">Select Training</option>${trainingModules.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="25" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--text-secondary)]">Assign Site Lead</label><select name="leadGuardId" class="${inputStyles} bg-white"><option value="">Optional: Select a Lead Guard</option>${getUsers(fieldRoles).map(g => `<option value="${g.id}">${g.firstName} ${g.lastName}</option>`).join('')}</select></div>
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
            <p class="text-[var(--text-primary)]">Clients can view their invoices, payment history, and manage payment methods here.</p>
        </div>
    </div>
`;
const GuardManagement = ({ user }) => {
    const teamId = [UserRole.Owner, UserRole.CoOwner, UserRole.Secretary, UserRole.Dispatch].includes(user.role) ? null : user.teamId;
    const guards = getUsers(fieldRoles).filter(g => teamId ? g.teamId === teamId : true);
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
    const teamId = [UserRole.Owner, UserRole.CoOwner, UserRole.Secretary, UserRole.Dispatch].includes(user.role) ? null : user.teamId;
    const clients = getClients().filter(c => teamId ? c.teamId === teamId : true);
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
    const teamId = [UserRole.Owner, UserRole.CoOwner, UserRole.Secretary, UserRole.Dispatch].includes(user.role) ? null : user.teamId;
    const missions = getMissions().filter(m => {
        if (!teamId) return true;
        const client = getClients().find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    });

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
                                <td class="px-5 py-4 text-sm text-[var(--text-secondary)]">${new Date(mission.startTime).toLocaleDateString()}</td>
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
    const teamId = [UserRole.Owner, UserRole.CoOwner, UserRole.Secretary, UserRole.Dispatch].includes(user.role) ? null : user.teamId;
    const activeMissions = getMissions().filter(m => {
        if (m.status !== 'Active') return false;
        if (!teamId) return true;
        const client = getClients().find(c => c.id === m.clientId);
        return client && client.teamId === teamId;
    });
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Active Missions</h1>
             ${activeMissions.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${activeMissions.map(mission => {
                        const missionContent = mission.claimedBy.map(guardId => {
                            const guard = getUserById(guardId);
                            const checkedIn = mission.checkIns && mission.checkIns[guardId];
                            return `<div class="flex items-center text-sm text-[var(--text-secondary)]"><span class="w-3 h-3 rounded-full mr-2 ${checkedIn ? 'bg-green-500' : 'bg-[var(--text-secondary)]'}"></span> ${guard?.firstName} ${guard?.lastName}</div>`;
                        }).join('');
                        return `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><h3 class="font-bold text-[var(--text-primary)]">${mission.title}</h3><p class="text-sm text-[var(--text-secondary)]">${new Date(mission.endTime).toLocaleTimeString()} (End)</p><div class="mt-2">${missionContent}</div></div>`;
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
                <h2 class="text-xl font-bold text-[var(--text-primary)] mb-4">Mission Completion Trends</h2>
                <p class="text-[var(--text-secondary)]">A chart showing mission trends over time would be displayed here.</p>
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
const FieldOversight = ({ user }) => {
    const missions = getMissionsForSpotCheck(user.id);
    return `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Field Oversight</h1>
        <p class="text-[var(--text-secondary)] mb-4">Select an active mission to begin a spot check.</p>
         ${missions.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${missions.map(mission => {
                    const client = getClients().find(c => c.id === mission.clientId);
                    return `
                    <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                            <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                            <p class="text-sm text-[var(--text-secondary)] mt-1">Guards on mission: ${mission.claimedBy.length}</p>
                        </div>
                        <div class="mt-4">
                            <button data-action="start-spot-check" data-id="${mission.id}" class="w-full px-4 py-2 text-sm font-bold rounded-md transition-colors bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]">Start Spot Check</button>
                        </div>
                    </div>`
                }).join('')}
            </div>
        ` : `<div class="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-sm">
                ${Icons.Eye({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                <h2 class="mt-4 text-xl font-semibold text-[var(--text-primary)]">No Missions to Supervise</h2>
                <p class="mt-1 text-[var(--text-secondary)]">There are currently no active missions on your team that require supervision.</p>
            </div>`
        }
    </div>`;
};
const TrainingManagement = ({ user }) => {
    const approvals = getPendingTrainingApprovals(user.teamId);
    const users = getUsers();
    const modules = getTrainingModules();
    const getUser = (id) => users.find(u => u.id === id) || { firstName: 'Unknown', lastName: 'User' };
    const getModule = (id) => modules.find(m => m.id === id) || { title: 'Unknown Module' };
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Management</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `<div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm"><div class="flex justify-between items-center"><div><p class="font-bold text-[var(--text-primary)]">${getUser(appr.userId).firstName} ${getUser(appr.userId).lastName}</p><p class="text-sm text-[var(--text-secondary)]">Completed: <span class="font-semibold">${getModule(appr.moduleId).title}</span> (Score: ${appr.score}%)</p><p class="text-xs text-[var(--text-secondary)]">Submitted: ${new Date(appr.submittedAt).toLocaleString()}</p></div><div class="space-x-2"><button data-action="approve-training" data-id="${appr.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button><button data-action="request-retake" data-id="${appr.id}" class="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm font-semibold hover:bg-yellow-600">Request Retake</button><button data-action="deny-training" data-id="${appr.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--text-secondary)]">No training submissions require approval on your team.</p>`}
            </div>
        </div>
    `;
};
const SiteRoster = ({ user }) => {
     const sites = getSites();
     return `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">All Client Sites</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
             <ul class="divide-y divide-[var(--border-primary)]">
                ${sites.map(site => `<li class="py-2"><p class="font-semibold text-[var(--text-primary)]">${site.name}</p><p class="text-sm text-[var(--text-secondary)]">${site.address}</p></li>`).join('')}
             </ul>
        </div>
    </div>
    `;
};
const LiveControl = ({ user }) => `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Control</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <p class="text-[var(--text-primary)]">This executive dashboard provides a real-time geographic and statistical overview of all active operations.</p>
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
            <p class="text-[var(--text-primary)]">This is the central hub for messaging, announcements, and mission chats.</p>
        </div>
    </div>
`;
const Earnings = ({ user }) => {
    const payrollEntries = _DB.payrollEntries.filter(e => e.userId === user.id);
    const payrollRuns = _DB.payrollRuns;
    return `
    <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Earnings & Payroll</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-[var(--text-primary)] mb