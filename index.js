
import { 
    initializeDB, getUsers, getUserByEmail, getMissionById, claimMission, 
    missionCheckIn, missionCheckOut, addApplication, updateApplicationStatus,
    addMission, addContract, addSiteApprovalRequest, submitTraining,
    updateTrainingProgressStatus, updateContractStatus, addPromotion, updatePromotionStatus,
    createPayrollRun, approvePayrollRun, confirmPayment, updateById, addSpotCheck,
    updateSpotCheck, addSpotCheckSelfie, completeSpotCheck, markUniformSent, getSpotCheckByMissionId,
    getLeadGuardAssignment, updateClientGuardList, updateSiteApprovalStatus, getClients, getSystemSettings, updateSystemSettings, getUserById
} from './database.js';
import { App } from './App.js';
import { UserRole } from './types.js';

// --- START: MAIN APP LOGIC ---
const state = {
    currentUser: null,
    users: [],
    isLoading: true,
    activeView: 'Home',
    activeMissionId: null,
    selectedPayrollRunId: null,
    selectedModal: { type: null, id: null },
    isMobileMenuOpen: false,
};
const root = document.getElementById('root');

function render() {
    if (!root) return;
    root.innerHTML = App(state);
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
        { id: '#site-request-form', handler: handleSiteSubmit },
        { id: '#system-settings-form', handler: handleSystemSettingsSubmit },
        { id: '#user-details-form', handler: handleUserDetailsSubmit },
        { selector: '.spot-check-form', handler: handleSpotCheckSubmit },
    ];
    forms.forEach(formInfo => {
        if(formInfo.id) {
            const form = root.querySelector(formInfo.id);
            if (form) form.addEventListener('submit', formInfo.handler);
        } else if (formInfo.selector) {
            const forms = root.querySelectorAll(formInfo.selector);
            forms.forEach(form => form.addEventListener('submit', formInfo.handler));
        }
    });

    const addSiteCheckbox = root.querySelector('#add-site-checkbox');
    if (addSiteCheckbox) {
        addSiteCheckbox.addEventListener('change', (e) => {
            const newSiteFields = root.querySelector('#new-site-fields');
            if (newSiteFields) {
                newSiteFields.classList.toggle('hidden', !e.target.checked);
            }
        });
    }
}

function openModal(type, id = null) {
    state.selectedModal = { type, id };
    render();
}
function closeModal() {
    state.selectedModal = { type: null, id: null };
    render();
}

// --- Event Handlers ---
function handleLogin(email) {
    const user = getUserByEmail(email);
    if (user) {
        state.currentUser = user;
        state.activeView = 'Dashboard';
        closeModal();
    } else { alert('User not found.'); }
}
function handleLogout() {
    state.currentUser = null;
    state.activeView = 'Home';
    state.isMobileMenuOpen = false;
    render();
}
function handleNavigation(view) {
    state.activeView = view;
    state.activeMissionId = null;
    state.isMobileMenuOpen = false;
    render();
}

// --- Form Handlers ---
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        const element = form.elements[key];
        if (element && element.type === 'number') {
            data[key] = parseFloat(value) || 0;
        } else if (element && element.type === 'date') {
            const [year, month, day] = (value).split('-').map(Number);
            data[key] = new Date(Date.UTC(year, month - 1, day));
        } else if (element && element.type === 'datetime-local') {
             data[key] = new Date(value);
        } else if (element && element.type === 'checkbox') {
             data[key] = element.checked;
        } else {
            data[key] = value;
        }
    }
    return data;
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const type = form.dataset.type;
    const data = getFormData(form);
    addApplication({ type, data });
    alert(`Thank you for your application! We will review it shortly.`);
    state.activeView = 'Home';
    render();
}

function handlePostMission(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    data.clientId = state.currentUser ? getClients().find(c => c.userId === state.currentUser.id)?.id : null;
    if (data.clientId) {
        addMission(data);
        alert('Mission posted successfully!');
        state.activeView = 'MyMissions';
        render();
    } else {
        alert('Could not identify client. Please log in again.');
    }
}

function handleCreatePayroll(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    if (data.endDate < data.startDate) {
        alert('End date cannot be before start date.');
        return;
    }
    createPayrollRun(data.startDate, data.endDate);
    alert('Payroll run created successfully.');
    render();
}

function handlePromotionSubmit(e) {
    e.preventDefault();
    if(!state.currentUser) return;
    const data = getFormData(e.target);
    addPromotion({
        userId: state.currentUser.id,
        fromRole: state.currentUser.role,
        toRole: data.role,
        reason: data.reason
    });
    alert('Promotion application submitted.');
    render();
}

function handleTrainingSubmit(e) {
    e.preventDefault();
    if(!state.currentUser || !state.selectedModal.id) return;
    const form = e.target;
    const answers = getFormData(form);
    const passed = submitTraining(state.currentUser.id, state.selectedModal.id, answers);
    if (passed === null) return; // Already attempted
    alert(passed ? 'Quiz submitted! Awaiting approval.' : 'Quiz failed. Please request a retake.');
    closeModal();
}

function handleContractSubmit(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    addContract(data);
    if (data.addSite && data.siteName && data.siteAddress) {
        addSiteApprovalRequest({
            clientId: data.clientId,
            siteName: data.siteName,
            siteAddress: data.siteAddress
        });
    }
    alert('Contract submitted for approval.');
    closeModal();
}

function handleSiteSubmit(e) {
    e.preventDefault();
    const data = getFormData(e.target);
    addSiteApprovalRequest(data);
    alert('New site submitted for approval.');
    closeModal();
}

function handleSystemSettingsSubmit(e) {
    e.preventDefault();
    if(!state.currentUser) return;
    const data = getFormData(e.target);
    const updates = {
        companyName: data.companyName,
        payrollCycle: data.payrollCycle,
    };

    if (state.currentUser.role === UserRole.Owner) {
        const commissionRates = { ...getSystemSettings().commissionRates };
        for (const key in data) {
            if (key.startsWith('commission-')) {
                const rateName = key.replace('commission-', '');
                if (commissionRates.hasOwnProperty(rateName)) {
                    commissionRates[rateName] = parseFloat(data[key]);
                }
            }
        }
        updates.commissionRates = commissionRates;
    }
    
    updateSystemSettings(updates);
    alert('Settings updated.');
    render();
}


function handleUserDetailsSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const userId = form.dataset.userId;
    if (!userId) return;
    
    const data = getFormData(form);
    const userToUpdate = getUserById(userId);
    if (!userToUpdate) return;

    const updates = {};
    
    // For all roles, these fields might be editable now
    if(data.firstName) updates.firstName = data.firstName;
    if(data.lastName) updates.lastName = data.lastName;

    // Internal roles have level and team
    if (userToUpdate.role !== UserRole.Client) {
        if(data.level) updates.level = parseInt(data.level, 10);
        if(data.teamId) updates.teamId = data.teamId;
    }

    if (Object.keys(updates).length > 0) {
        if(updateById('users', userId, updates)) {
            alert('User details updated.');
            state.users = getUsers();
            closeModal();
        } else {
            alert('Failed to update user.');
        }
    } else {
        closeModal(); // No changes made
    }
}

function handleSpotCheckSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const checkType = form.dataset.checkType;
    const spotCheckId = form.dataset.spotCheckId;
    if(!spotCheckId || !checkType) return;
    const data = getFormData(form);
    updateSpotCheck(spotCheckId, checkType, data);
    alert(`${checkType} check submitted.`);
    render();
}

// --- Main Event Listener ---
function attachEventListeners() {
    root.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const id = target.getAttribute('data-id');
        
        const actionMap = {
            'login': () => id && handleLogin(id),
            'logout': () => handleLogout(),
            'navigate': () => handleNavigation(target.getAttribute('data-type')),
            'open-login': () => openModal('Login'),
            'open-mobile-menu': () => { state.isMobileMenuOpen = true; render(); },
            'close-modal': closeModal,
            'close-modal-backdrop': (e) => { if (!e.target.closest('[data-modal-content]')) closeModal(); },
            'close-mobile-menu': (e) => { if (!e.target.closest('[data-menu-panel]')) { state.isMobileMenuOpen = false; render(); }},
            'back-to-home': () => { state.activeView = 'Home'; render(); },
            
            'claim-mission': () => {
                if(!id || !state.currentUser) return;
                const result = claimMission(id, state.currentUser.id);
                alert(result.message);
                if (result.success) render();
            },
            'start-training': () => openModal('Training', id),
            'request-retake-info': () => alert('Please contact a Supervisor or Training Officer to request a retake for this module.'),
            'start-mission': () => {
                if(!id || !state.currentUser) return;
                const mission = getMissionById(id);
                if (!mission) return;
                const leadAssignment = getLeadGuardAssignment(id);
                const isLead = leadAssignment && leadAssignment.userId === state.currentUser.id;
                
                if (!isLead && leadAssignment && !mission.checkIns[leadAssignment.userId]) {
                    alert('The Site Lead must check in first.');
                    return;
                }
                
                missionCheckIn(id, state.currentUser.id);
                state.activeMissionId = id;
                render();
            },
            'view-mission-dashboard': () => {
                state.activeMissionId = id;
                render();
            },
            'exit-mission-dashboard': () => {
                state.activeMissionId = null;
                render();
            },
            'mission-checkout': () => {
                 if(!id || !state.currentUser) return;
                 const mission = getMissionById(id);
                 if (mission) {
                    const leadAssignment = getLeadGuardAssignment(id);
                    const isLead = leadAssignment && leadAssignment.userId === state.currentUser.id;
                    if(isLead){
                         const allOthersOut = mission.claimedBy.every(gid => gid === state.currentUser.id || mission.checkOuts[gid]);
                         if (!allOthersOut) {
                             alert('You must check out all other guards before checking yourself out.');
                             return;
                         }
                    }
                    missionCheckOut(id, state.currentUser.id);
                    const allCheckedOut = mission.claimedBy.every(guardId => mission.checkOuts[guardId]);
                    if (allCheckedOut) {
                        alert("Mission complete!");
                        state.activeMissionId = null;
                    } else {
                        alert("Checked out successfully.");
                    }
                    render();
                 }
            },
            'lead-checkin': () => {
                if(!state.currentUser) return;
                const { missionId, guardId } = target.dataset;
                missionCheckIn(missionId, state.currentUser.id, true, guardId);
                render();
            },
            'lead-checkout': () => {
                if(!state.currentUser) return;
                const { missionId, guardId } = target.dataset;
                missionCheckOut(missionId, state.currentUser.id, true, guardId);
                render();
            },
            
            'open-contract-modal': () => openModal('Contract'),
            'open-site-modal': () => openModal('Site'),
            'update-roster': () => {
                if(!state.currentUser) return;
                const { guardId, listType } = target.dataset;
                const client = getClients().find(c => c.userId === state.currentUser.id);
                if(!client) return;
                const list = client[listType];
                const action = list.includes(guardId) ? 'remove' : 'add';
                updateClientGuardList(client.id, guardId, listType, action);
                render();
            },
            
            'approve-application': () => { updateApplicationStatus(id, 'Approved'); render(); },
            'deny-application': () => { updateApplicationStatus(id, 'Denied'); render(); },
            'approve-training': () => { updateTrainingProgressStatus(id, 'Approved'); render(); },
            'deny-training': () => { updateTrainingProgressStatus(id, 'Denied'); render(); },
            'request-retake': () => { updateTrainingProgressStatus(id, 'Retake Requested'); render(); },
            'approve-contract': () => { if(state.currentUser && updateContractStatus(id, 'Active', state.currentUser)) render(); },
            'deny-contract': () => { if(state.currentUser && updateContractStatus(id, 'Denied', state.currentUser)) render(); },
            'review-contract': () => { if(state.currentUser && updateContractStatus(id, 'Ready for Review', state.currentUser)) render(); },
            'approve-promotion': () => { updatePromotionStatus(id, 'Approved'); render(); },
            'deny-promotion': () => { updatePromotionStatus(id, 'Denied'); render(); },
            'select-payroll-run': () => { state.selectedPayrollRunId = id; render(); },
            'approve-payroll-run': () => { approvePayrollRun(id); render(); },
            'confirm-payment': () => { confirmPayment(id); render(); },
            'open-user-details': () => openModal('UserDetails', id),
            'open-mission-details': () => openModal('MissionDetails', id),
            'start-spot-check': () => {
                if(!id || !state.currentUser) return;
                addSpotCheck(state.currentUser.id, id);
                state.activeMissionId = id;
                render();
            },
            'complete-spot-check': () => {
                if(!id) return;
                const report = root.querySelector('#final-spot-report')?.value || 'No report submitted.';
                completeSpotCheck(id, report);
                state.activeMissionId = null;
                alert('Spot check completed and submitted.');
                render();
            },
            'mark-uniform-sent': () => { markUniformSent(id); render(); },
            'approve-site': () => { updateSiteApprovalStatus(id, 'Approved'); render(); },
            'deny-site': () => { updateSiteApprovalStatus(id, 'Denied'); render(); },
        };
        
        if (actionMap[action]) {
            e.preventDefault();
            actionMap[action](e);
        }
    });

    root.addEventListener('change', (e) => {
        const target = e.target;
        if (target.matches('#start-selfie') || target.matches('#end-selfie')) {
            if (state.activeMissionId) {
                const spotCheck = getSpotCheckByMissionId(state.activeMissionId);
                if (spotCheck) {
                    const type = target.id.includes('start') ? 'start' : 'end';
                    addSpotCheckSelfie(spotCheck.id, type, 'image_data_placeholder');
                    render();
                }
            }
        }
    });
}

function main() {
    initializeDB();
    state.users = getUsers();
    state.isLoading = false;
    render();
    attachEventListeners();
}

window.addEventListener('storage', () => {
    initializeDB(); 
    state.users = getUsers();
    if(state.currentUser) {
        state.currentUser = getUserById(state.currentUser.id) || null;
    }
    render();
});

main();
