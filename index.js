
import * as db from './database.js';
import { UserRole } from './types.js';
import { HomePage } from './components/HomePage.js';
import { DashboardScreen } from './components/DashboardScreen.js';
import { LoginModal } from './components/LoginModal.js';
import { ApplicationModal } from './components/ApplicationModal.js';

// --- State Management ---
const state = {
    currentUser: null,
    users: [],
    isLoginModalOpen: false,
    isApplicationModalOpen: false,
    applicationType: null,
    isLoading: true,
    activeView: 'Dashboard',
    selectedPayrollRunId: null,
};

let root = document.getElementById('root');

// --- Rendering Engine ---
function render() {
    if (state.isLoading) {
        root.innerHTML = `<div class="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">Loading System...</div>`;
        return;
    }

    let modalHtml = '';
    if (state.isLoginModalOpen) {
        modalHtml = LoginModal({
            users: state.users,
        });
    }
    if (state.isApplicationModalOpen && state.applicationType) {
        modalHtml = ApplicationModal({
            type: state.applicationType,
        });
    }

    if (state.currentUser) {
        root.innerHTML = DashboardScreen({
            currentUser: state.currentUser,
            activeView: state.activeView,
            selectedPayrollRunId: state.selectedPayrollRunId,
        }) + modalHtml;
    } else {
        root.innerHTML = HomePage({}) + modalHtml;
    }
    
    // After rendering, attach event listeners
    attachEventListeners();
}

// --- Event Handling using Delegation ---
function attachEventListeners() {
    // Remove previous listeners by cloning and replacing the root element.
    const newRoot = root.cloneNode(true);
    if (root.parentNode) {
        root.parentNode.replaceChild(newRoot, root);
    }
    root = newRoot; // IMPORTANT: Update the root reference to the new element in the DOM

    root.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;
        const type = target.dataset.type;

        switch(action) {
            case 'open-login':
                openLoginModal();
                break;
            case 'open-application':
                openApplicationModal(type);
                break;
            case 'close-modal':
                closeAllModals();
                break;
            case 'login':
                handleLogin(id); // id is email
                break;
            case 'logout':
                handleLogout();
                break;
            case 'navigate':
                handleNavigation(type); // type is view name
                break;
            case 'toggle-mobile-menu':
                document.getElementById('sidebar')?.classList.toggle('-translate-x-full');
                break;
            case 'claim-mission':
                handleClaimMission(id);
                break;
            case 'check-in':
                handleCheckIn(id);
                break;
            case 'check-out':
                handleCheckOut(id);
                break;
            case 'update-roster':
                handleUpdateRoster(target.dataset.guardId, target.dataset.listType);
                break;
            case 'approve-application':
                handleUpdateApplication(id, 'Approved');
                break;
            case 'deny-application':
                handleUpdateApplication(id, 'Denied');
                break;
            case 'approve-contract':
                handleUpdateContract(id, 'Active');
                break;
            case 'deny-contract':
                 handleUpdateContract(id, 'Denied');
                break;
            case 'approve-promotion':
                handleUpdatePromotion(id, 'Approved');
                break;
            case 'deny-promotion':
                 handleUpdatePromotion(id, 'Denied');
                break;
            case 'select-payroll-run':
                state.selectedPayrollRunId = id;
                render();
                break;
            case 'approve-payroll-run':
                db.approvePayrollRun(id);
                refreshAndRender();
                break;
            case 'confirm-payment':
                db.confirmPayment(id);
                refreshAndRender();
                break;
        }
    });

    const appForm = root.querySelector('#application-form');
    if (appForm) {
        appForm.addEventListener('submit', handleApplicationSubmit);
    }
    
    const postMissionForm = root.querySelector('#post-mission-form');
    if (postMissionForm) {
        postMissionForm.addEventListener('submit', handlePostMission);
    }

    const payrollForm = root.querySelector('#create-payroll-form');
    if (payrollForm) {
        payrollForm.addEventListener('submit', handleCreatePayroll);
    }

    const promotionForm = root.querySelector('#promotion-form');
    if (promotionForm) {
        promotionForm.addEventListener('submit', handlePromotionSubmit);
    }
}


// --- Actions ---

function handleLogin(email) {
    const user = db.getUserByEmail(email);
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
    const result = db.claimMission(missionId, state.currentUser.id);
    alert(result.message);
    refreshAndRender();
}

function handleCheckIn(missionId) {
    if (!state.currentUser) return;
    db.missionCheckIn(missionId, state.currentUser.id);
    refreshAndRender();
}

function handleCheckOut(missionId) {
    if (!state.currentUser) return;
    db.missionCheckOut(missionId, state.currentUser.id);
    refreshAndRender();
}

function handleUpdateRoster(guardId, listType) {
    const client = db.getClients().find(c => c.userId === state.currentUser.id);
    if (client) {
        const list = client[listType];
        const action = list.includes(guardId) ? 'remove' : 'add';
        db.updateClientGuardList(client.id, guardId, listType, action);
        refreshAndRender();
    }
}

function handleUpdateApplication(appId, status) {
    db.updateApplicationStatus(appId, status);
    alert(`Application ${status.toLowerCase()}.`);
    refreshAndRender();
}

function handleUpdateContract(contractId, status) {
    db.updateContractStatus(contractId, status);
    alert(`Contract ${status.toLowerCase()}.`);
    refreshAndRender();
}

function handleUpdatePromotion(promoId, status) {
    db.updatePromotionStatus(promoId, status);
    alert(`Promotion ${status.toLowerCase()}.`);
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

function closeAllModals() {
    state.isLoginModalOpen = false;
    state.isApplicationModalOpen = false;
    render();
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    db.addApplication({ type: state.applicationType, data });
    alert('Application submitted successfully! It will be reviewed by operations.');
    closeAllModals();
}

function handlePostMission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const client = db.getClients().find(c => c.userId === state.currentUser.id);
    if(!client) {
        alert("Could not find client profile.");
        return;
    }
    db.addMission({
        ...data,
        clientId: client.id,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        payRate: parseFloat(data.payRate),
        requiredGuards: parseInt(data.requiredGuards, 10),
        requiredLevel: parseInt(data.requiredLevel, 10),
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
    db.createPayrollRun(startDate, endDate);
    alert('Payroll run created.');
    refreshAndRender();
}

function handlePromotionSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    db.addPromotion({
        userId: state.currentUser.id,
        toRole: data.role,
        reason: data.reason
    });
    alert('Promotion application submitted.');
    refreshAndRender();
}


function refreshData() {
    console.log("Refreshing application data...");
    state.users = db.getUsers(); // Get all users
    if (state.currentUser) {
        state.currentUser = db.getUserById(state.currentUser.id);
    }
}

function refreshAndRender() {
    refreshData();
    render();
}


// --- Initialization ---
function initializeApp() {
    console.log("Initializing SSS App...");
    db.initializeDB();
    state.isLoading = true;
    render(); // Show loading screen

    refreshData();
    state.isLoading = false;
    render(); // Render the main app

    window.addEventListener('storage', () => {
        console.log('Database updated, refreshing data via storage event.');
        refreshAndRender();
    });
}

// Start the app
initializeApp();