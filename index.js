// This file is the new heart of the application, rebuilt without React.
// It manages state, renders all HTML content, and handles all user interactions.

import * as d from './database.js';
import { UserRole } from './types.js';
import { featureList, statList, levelList, testimonialList } from './content/homepageContent.js';

// --- ICONS (as functions returning SVG strings) ---
const Icons = {
    Shield: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" /></svg>`,
    User: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131-2.095z" /></svg>`,
    Logout: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>`,
    Menu: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`,
    X: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`,
    Home: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v9.75a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V10.5M9 21V12h6v9" /></svg>`,
    ClipboardList: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
    Calendar: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
    AcademicCap: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>`,
    PlusCircle: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    LocationMarker: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    CreditCard: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
    Cog: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    Users: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 10-5.292 0M21 21v-1a6 6 0 00-9-5.197" /></svg>`,
    ChartBar: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
    Briefcase: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.4-2.175 2.4H5.925c-1.21 0-2.175-1.087-2.175-2.4V14.15M16.5 6.375h-9a2.25 2.25 0 00-2.25 2.25v.151c0 .56.224 1.07.622 1.448l4.473 3.914c.48.42.96.634 1.448.634s.968-.214 1.448-.634l4.473-3.914c.398-.378.622-.888.622-1.448v-.151a2.25 2.25 0 00-2.25-2.25z" /></svg>`,
    CheckCircle: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    Eye: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    Map: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1.99 1.99 0 013 15.382V5.618a1.99 1.99 0 011.553-1.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1.99 1.99 0 0021 18.618V8.882a1.99 1.99 0 00-1.553-1.894L15 4m-6 8l6-3" /></svg>`,
    Bell: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 6.032l-1.42 1.42a.75.75 0 001.061 1.06l1.42-1.42A8.967 8.967 0 016 16.5v.75m6.357-3.418l.01.011.01.011M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    DocumentText: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`,
    Mail: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`,
    Trophy: (className = '') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.166 2.377a.75.75 0 0 1 .75 0L7.68 3.55a.75.75 0 0 1 .14 1.284l-1.033.725a.75.75 0 0 1-1.012-.063L4.5 4.123a.75.75 0 0 1 .666-1.746ZM18.834 2.377a.75.75 0 0 0-.75 0L16.32 3.55a.75.75 0 0 0-.14 1.284l1.033.725a.75.75 0 0 0 1.012-.063l1.273-1.373a.75.75 0 0 0-.666-1.746ZM11.25 4.5A.75.75 0 0 1 12 5.25v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 11.25 4.5Z" clip-rule="evenodd" /><path d="M6.31 9.47a.75.75 0 0 1 .94-.47l.812.271a.75.75 0 0 0 .94-.47l.812-1.354a.75.75 0 0 1 .63-.354h2.992a.75.75 0 0 1 .63.354l.812 1.354a.75.75 0 0 0 .94.47l.812-.271a.75.75 0 0 1 .94.47l.812 1.354a.75.75 0 0 1 0 .75l-.812 1.354a.75.75 0 0 1-.94.47l-.812-.271a.75.75 0 0 0-.94.47l-.812 1.354a.75.75 0 0 1-.63.354H9.78a.75.75 0 0 1-.63-.354l-.812-1.354a.75.75 0 0 0-.94-.47l-.812.271a.75.75 0 0 1-.94-.47l-.812-1.354a.75.75 0 0 1 0-.75l.812-1.354Z" /><path d="M5.25 15.75a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Z" /><path fill-rule="evenodd" d="M8.25 18a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></svg>`,
    Flag: (className = '') => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>`,
    ArrowUpTray: (className = '') => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>`,
    DocumentDuplicate: (className = '') => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>`,
    Truck: (className = '') => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${className}"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125V6.75a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6.75v10.5a1.125 1.125 0 001.125 1.125z" /></svg>`,
};

// --- GLOBAL STATE ---
// A single object to hold the application's state.
let state = {
    currentUser: null,
    users: [],
    missions: [],
    clients: [],
    sites: [],
    alerts: [],
    applications: [],
    approvals: [],
    contracts: [],
    hallOfFameEntries: [],
    systemSettings: null,
    incidentReports: [],
    vehicles: [],
    payrollRuns: [],
    promotions: [],
    appeals: [],
    isLoading: true,
    // UI State
    activeView: 'Dashboard',
    isLoginModalOpen: false,
    isApplicationModalOpen: false,
    applicationType: null,
    isMobileMenuOpen: false,
    // Add states for other modals as needed
    modalData: {}, // To hold data for the currently open modal
};

// --- RENDER FUNCTIONS ---
// These functions generate HTML strings. They do not interact with the DOM directly.

function renderHomePage() {
    return `
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
                        <a href="#about" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">About</a>
                        <a href="#contact" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Contact</a>
                        <button data-action="open-login" class="ml-4 px-4 py-2 rounded-md text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--border-primary-hover)] hover:text-[var(--accent-primary)] transition-colors">Portal Login</button>
                    </nav>
                    <div class="md:hidden">
                        <button data-action="toggle-mobile-menu" class="text-[var(--text-primary)]">
                            ${Icons.Menu('h-6 w-6')}
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" class="${state.isMobileMenuOpen ? '' : 'hidden'} md:hidden pt-2 pb-4 space-y-1">
                    <a href="#home" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                    <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                    <a href="#how-it-works" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                    <a href="#about" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">About</a>
                    <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Contact</a>
                    <button data-action="open-login" class="mt-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium border border-[var(--border-primary)] text-[var(--text-primary)]">Portal Login</button>
                </div>
            </div>
        </header>
        <main>
            <section id="home" class="text-center py-20 md:py-32 bg-[var(--bg-secondary)]">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)]">Professional Security Management Platform</h1>
                    <p class="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting businesses with certified security professionals through our comprehensive digital platform. Streamline operations, manage missions, and ensure safety with our all-in-one solution.</p>
                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <button data-action="open-application" data-type="Guard" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</button>
                        <button data-action="open-application" data-type="Client" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Hire Security</button>
                        <button data-action="open-application" data-type="Supervisor" class="px-6 py-3 rounded-md font-bold bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105 hover:border-[var(--accent-primary)]">Apply for Supervisor</button>
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
                <footer id="about" class="bg-[var(--accent-secondary)] text-white py-12">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div class="col-span-2 md:col-span-1">
                            <h4 class="font-bold">Signature Security Specialist</h4>
                            <p class="mt-2 text-sm opacity-70">Professional security management platform.</p>
                        </div>
                        <div><h4 class="font-bold">For Guards</h4><ul class="mt-2 space-y-1 text-sm opacity-70"><li><a href="#" data-action="open-application" data-type="Guard" class="hover:opacity-100">Apply as Guard</a></li><li><a href="#" data-action="open-application" data-type="Supervisor" class="hover:opacity-100">Apply as Supervisor</a></li><li><a href="#" data-action="open-login" class="hover:opacity-100">Portal Login</a></li></ul></div>
                        <div><h4 class="font-bold">For Clients</h4><ul class="mt-2 space-y-1 text-sm opacity-70"><li><a href="#" data-action="open-application" data-type="Client" class="hover:opacity-100">Apply as Client</a></li><li><a href="#" data-action="open-login" class="hover:opacity-100">Client Login</a></li></ul></div>
                        <div><h4 class="font-bold">Company</h4><ul class="mt-2 space-y-1 text-sm opacity-70"><li><a href="#" class="hover:opacity-100">About Us</a></li><li><a href="#" data-action="open-application" data-type="Operations" class="hover:opacity-100">Operations Careers</a></li><li><a href="#" data-action="open-application" data-type="Management" class="hover:opacity-100">Management Careers</a></li></ul></div>
                        <div><h4 class="font-bold">Legal</h4><ul class="mt-2 space-y-1 text-sm opacity-70"><li><a href="#" class="hover:opacity-100">Terms of Service</a></li><li><a href="#" class="hover:opacity-100">Privacy Policy</a></li></ul></div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-70">
                        <p>© ${new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
    `;
}

function renderLoginModal() {
    if (!state.isLoginModalOpen) return '';

    const sortedUsers = [...state.users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });
    
    return `
    <div id="login-modal-overlay" data-action="close-login" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div class="relative" data-action="modal-body">
            <div class="w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl p-6">
                <div class="text-center mb-6">
                    ${Icons.Shield('w-12 h-12 mx-auto text-[var(--accent-primary)] mb-2')}
                    <h1 class="text-2xl font-bold text-[var(--text-primary)]">SSS Portal</h1>
                    <p class="text-[var(--text-secondary)] mt-1">Select a profile to log in</p>
                </div>
                <div class="space-y-2 max-h-80 overflow-y-auto pr-2">
                    ${sortedUsers.map(user => `
                        <button data-action="login" data-email="${user.email}" class="w-full flex items-center text-left bg-[var(--bg-primary)] hover:bg-[var(--border-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] p-3 rounded-md transition-all duration-150 transform hover:border-[var(--border-primary-hover)]">
                            <div class="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                ${Icons.User('w-5 h-5 text-[var(--accent-primary)]')}
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
            <button data-action="close-login" class="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                ${Icons.X('w-8 h-8')}
            </button>
        </div>
    </div>
    `;
}

// --- SIDEBAR DATA & RENDER ---
const executiveRoles = [UserRole.Owner, UserRole.CoOwner, UserRole.DeputyChief, UserRole.Commander];
const operationsRoles = [UserRole.OperationsDirector, UserRole.OperationsManager, UserRole.Dispatch, UserRole.Secretary];
const fieldLeadershipRoles = [UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.LeadGuard];
const guardRole = [UserRole.Guard];
const fieldRoles = [...fieldLeadershipRoles, ...guardRole];
const allInternalRoles = [...executiveRoles, ...operationsRoles, ...fieldRoles];
const clientRole = [UserRole.Client];

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

function renderSidebar() {
    const { currentUser, activeView } = state;
    if (!currentUser) return '';
    
    const userRole = currentUser.role;

    const generatedHtml = sidebarStructure.map(group => {
        if (!group.roles.includes(userRole)) return '';

        const accessibleItems = group.items.filter(item => item.roles.includes(userRole));
        if (accessibleItems.length === 0) return '';
        
        const itemsHtml = accessibleItems.map(item => {
            const isActive = activeView === item.view;
            const activeClasses = 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-r-4 border-[var(--accent-primary)] font-bold';
            const inactiveClasses = 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]';
            return `
                <li>
                    <a href="#" data-action="navigate" data-view="${item.view}" class="flex items-center px-4 py-3 text-sm font-medium transition-colors ${isActive ? activeClasses : inactiveClasses}">
                        ${item.icon('w-6 h-6 mr-3 flex-shrink-0')}
                        <span>${item.name}</span>
                    </a>
                </li>
            `;
        }).join('');

        return `
            <div>
                <h3 class="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider">${group.title}</h3>
                <ul class="space-y-1">
                    ${itemsHtml}
                </ul>
            </div>
        `;
    }).join('');

    return `
        <div class="flex flex-col w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] h-full overflow-y-auto">
            <div class="flex items-center justify-center h-16 border-b border-[var(--border-primary)] flex-shrink-0 px-4">
                <div class="text-center">
                    <p class="font-bold text-md text-[var(--text-primary)]">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs text-[var(--text-secondary)]">${currentUser.role} - ${currentUser.rank}</p>
                </div>
            </div>
            <nav class="flex-1 py-4">
                ${generatedHtml}
            </nav>
        </div>
    `;
}

function renderDashboard() {
    return `
        <div class="relative h-screen md:flex overflow-hidden">
            <div class="hidden md:flex md:flex-shrink-0">
                ${renderSidebar()}
            </div>
            <div class="flex-1 flex flex-col w-full">
                <header class="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)] shadow-sm sticky top-0 z-20 w-full">
                  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                      <div class="flex items-center">
                        <button class="md:hidden text-[var(--text-secondary)] mr-4">
                            ${Icons.Menu('h-6 w-6')}
                        </button>
                        ${Icons.Shield('w-8 h-8 text-[var(--accent-primary)] mr-3')}
                        <h1 class="text-lg font-bold text-[var(--text-primary)] hidden sm:block">
                          Signature Security <span class="font-light text-[var(--accent-primary)]">Specialists</span>
                        </h1>
                      </div>
                      <button data-action="logout" class="flex items-center bg-transparent border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition">
                        ${Icons.Logout('w-5 h-5 md:mr-2')}
                        <span class="hidden md:block">Logout</span>
                      </button>
                    </div>
                  </div>
                </header>
                <main id="dashboard-content" class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    ${renderActiveView()}
                </main>
            </div>
        </div>
    `;
}

function renderActiveView() {
    // This would contain the logic from DashboardScreen.tsx's switch statement.
    return `
        <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
            <h2 class="text-2xl font-bold text-[var(--text-primary)]">Welcome, ${state.currentUser.firstName}!</h2>
            <p class="text-[var(--text-secondary)]">You are logged in as: <span class="font-semibold text-[var(--accent-primary)]">${state.currentUser.role}</span></p>
            <p class="mt-4">The ${state.activeView} view would be rendered here.</p>
            <p class="mt-2 text-sm text-[var(--text-secondary)]">Note: This is a simplified dashboard render. A full implementation would render the complete UI for the active view.</p>
        </div>
    `;
}


// --- MAIN RENDER & EVENT HANDLING ---
const root = document.getElementById('root');

function render() {
    if (!root) return;
    
    if (state.isLoading || (state.currentUser && !state.systemSettings)) {
        root.innerHTML = `<div class="min-h-screen bg-gray-100 flex items-center justify-center text-gray-700">Loading System...</div>`;
        return;
    }

    let html = '';
    if (state.currentUser) {
        html = renderDashboard();
    } else {
        html = renderHomePage();
        html += renderLoginModal();
        // html += renderApplicationModal(); // Add this if needed
    }
    root.innerHTML = html;
}

// --- EVENT HANDLERS ---
function handleLogout() {
    state.currentUser = null;
    render();
}

function handleOpenLoginModal() {
    state.isLoginModalOpen = true;
    render();
}

function handleCloseLoginModal() {
    state.isLoginModalOpen = false;
    render();
}

function handleLogin(email) {
    const user = d.getUserByEmail(email);
    if (user) {
        state.currentUser = user;
        loadDataAndRender();
    } else {
        alert('User not found.');
    }
}

function handleToggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    render();
}

function handleOpenApplicationModal(type) {
    state.applicationType = type;
    state.isApplicationModalOpen = true;
    // For now, just show an alert as the modal isn't fully rendered.
    alert(`Application modal opened for: ${type}. A full implementation would show a form.`);
    state.isApplicationModalOpen = false; // Reset for simplicity
}

function handleNavigate(view) {
    state.activeView = view;
    render();
}


// Event Delegation
document.addEventListener('click', (e) => {
    let target = e.target.closest('[data-action]');
    if (!target) return;

    // For navigation links, prevent default link behavior
    if (target.tagName === 'A') {
        e.preventDefault();
    }

    const { action, type, email, view } = target.dataset;

    switch (action) {
        case 'logout':
            handleLogout();
            break;
        case 'open-login':
            handleOpenLoginModal();
            break;
        case 'close-login':
             // Only close if the overlay is clicked, not the modal body
            if (!e.target.closest('[data-action="modal-body"]')) {
                handleCloseLoginModal();
            }
            break;
        case 'login':
            handleLogin(email);
            break;
        case 'toggle-mobile-menu':
            handleToggleMobileMenu();
            break;
        case 'open-application':
            handleOpenApplicationModal(type);
            break;
        case 'navigate':
            handleNavigate(view);
            break;
        // ... add more delegated event handlers here
    }
});

// --- DATA & INITIALIZATION ---
function loadData() {
    state.users = d.getUsers();
    state.missions = d.getMissions();
    state.clients = d.getClients();
    state.sites = d.getSites();
    state.alerts = d.getAlerts();
    state.applications = d.getApplications();
    state.approvals = d.getApprovals();
    state.contracts = d.getContracts();
    state.hallOfFameEntries = d.getHallOfFameEntries();
    state.systemSettings = d.getSystemSettings();
    state.incidentReports = d.getIncidentReports();
    state.vehicles = d.getVehicles();
    state.payrollRuns = d.getPayrollRuns();
    state.promotions = d.getPromotions();
    state.appeals = d.getAppeals();
}

function loadDataAndRender() {
    state.isLoading = true;
    render();
    loadData();
    state.isLoading = false;
    render();
}

// --- App Start ---
function init() {
    d.initializeDB();
    
    // Add a storage event listener to keep tabs in sync (optional but good practice)
    window.addEventListener('storage', () => {
        // A simple reload is easiest for a non-framework app
        console.log('Database changed in another tab. Reloading for consistency.');
        location.reload();
    });

    loadDataAndRender();
}

// Wait for the DOM to be ready before starting the app.
document.addEventListener('DOMContentLoaded', init);
