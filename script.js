grist.ready({ requiredAccess: 'full' });

// Global caches for references
let cache = { staff: [], churches: [], contacts: [] };

async function loadCaches() {
    cache.staff = await grist.docApi.fetchTable('Staff');
    cache.churches = await grist.docApi.fetchTable('Churches');
    cache.contacts = await grist.docApi.fetchTable('Contacts');
}

// Helper: Add Record to Grist
async function addRecord(table, fields) {
    const result = await grist.docApi.applyUserActions([['AddRecord', table, null, fields]]);
    return result.retValues[0];
}

// Helper: Get selected checkboxes for Choice List
function getChoiceList(containerId) {
    const checked = document.querySelectorAll(`#${containerId} input:checked`);
    return ["L", ...Array.from(checked).map(el => el.value)];
}

// --- SUBMIT FIELD VISIT ---
async function submitFieldVisit() {
    try {
        const staffId = document.getElementById('fv-staff-search').dataset.id;
        const churchId = document.getElementById('fv-church-search').dataset.id;
        
        if (!staffId || !churchId) return alert("Please select Staff and Church from the list");

        // 1. Create the Field Visit
        const visitFields = {
            Date: document.getElementById('fv-date').value,
            Staff: parseInt(staffId),
            Church: parseInt(churchId),
            Visit_Type: document.getElementById('fv-type').value,
            Time_Spent_Minutes: parseInt(document.getElementById('fv-duration').value) || 0,
            Ministry_Promoted: getChoiceList('fv-ministry-options'),
            // Other fields like Testimony, Prayer_Request can be added here
        };

        const newVisitId = await addRecord('Field_Visits', visitFields);

        // 2. Create Visit_Contacts for every person met
        const contactRows = document.querySelectorAll('.fv-contact-row');
        for (let row of contactRows) {
            const cId = row.querySelector('.contact-select').value;
            if (cId) {
                await addRecord('Visit_Contacts', {
                    Visit: newVisitId,
                    Contact: parseInt(cId)
                });
            }
        }

        alert("Visit and Attendance Logged Successfully!");
        location.reload();
    } catch (err) {
        console.error(err);
        alert("Error saving visit: " + err.message);
    }
}

// --- SUBMIT PARTNERSHIP ---
async function submitPartnership() {
    try {
        const churchFields = {
            Name: document.getElementById('cp-church-name').value,
            Paster_Name: document.getElementById('cp-pastor').value,
            Province: document.getElementById('cp-province').value,
            District: document.getElementById('cp-district').value,
            Tole_Village: document.getElementById('cp-village').value,
            Partnership_Status: 'Partner',
            Partnership_Date: new Date().toISOString().split('T')[0],
            Status: 'Active'
        };

        await addRecord('Churches', churchFields);
        alert("Church Registered as Partner!");
        location.reload();
    } catch (err) {
        alert("Error: " + err.message);
    }
}

// --- UI HELPERS ---
function switchTab(n) {
    document.querySelectorAll('.tab, .page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab')[n-1].classList.add('active');
    document.getElementById(`page${n}`).classList.add('active');
}

function addContactField() {
    const container = document.getElementById('fv-contacts-container');
    const div = document.createElement('div');
    div.className = 'fv-contact-row field';
    
    let options = '<option value="">-- Select Person --</option>';
    for(let i=0; i < cache.contacts.id.length; i++) {
        options += `<option value="${cache.contacts.id[i]}">${cache.contacts.Name[i]}</option>`;
    }
    
    div.innerHTML = `<select class="contact-select">${options}</select>`;
    container.appendChild(div);
}

// Search/Autocomplete Logic for Staff and Churches
function setupAutocomplete(inputId, resultsId, tableKey) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);

    input.addEventListener('input', () => {
        const val = input.value.toLowerCase();
        results.innerHTML = '';
        if (!val) { results.style.display = 'none'; return; }

        const matches = [];
        const data = cache[tableKey];
        for(let i=0; i < data.id.length; i++) {
            if (data.Name[i].toLowerCase().includes(val)) {
                matches.push({ id: data.id[i], name: data.Name[i] });
            }
        }

        if (matches.length > 0) {
            results.style.display = 'block';
            matches.forEach(m => {
                const item = document.createElement('div');
                item.textContent = m.name;
                item.onclick = () => {
                    input.value = m.name;
                    input.dataset.id = m.id;
                    results.style.display = 'none';
                };
                results.appendChild(item);
            });
        }
    });
}

// Init
window.onload = async () => {
    await loadCaches();
    setupAutocomplete('fv-staff-search', 'fv-staff-results', 'staff');
    setupAutocomplete('fv-church-search', 'fv-church-results', 'churches');
    document.getElementById('fv-date').value = new Date().toISOString().split('T')[0];
};
