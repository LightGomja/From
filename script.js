
// const BASE = `https://cors-anywhere.herokuapp.com/https://gomja24.getgrist.com/api/docs/${DOC_ID}/tables`;
// const BASE = `https://gomja24.getgrist.com/api/docs/${DOC_ID}/tables`;

// const DOC_ID = 'gtGKiqrdhWXx.....';
// const API_KEY = '2a16785635552fed86c........';
// const BASE = `https://gomja24.getgrist.com/api/docs/gtGKiqrdhWXx......`;

// =============================================
// API CONFIG — key is hidden in Cloudflare Worker
// =============================================


const DOC_ID = 'gtGKiqrdhWXxAuim2H8BwU';
const API_KEY = '2a16785635fde61f552fed86c669207aef693d5b';
const BASE = 'https://fieldform.mishyalgomlightcommunication.workers.dev';

async function fetchAll(table) {
  try {
    const res = await fetch(`${BASE}/${encodeURIComponent(table)}/records`);
    if (!res.ok) throw new Error(`fetchAll(${table}) failed: ${res.status}`);
    const data = await res.json();
    return data.records || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function addRecord(table, fields) {
  try {
    const res = await fetch(`${BASE}/${encodeURIComponent(table)}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }] })
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`addRecord(${table}) failed: ${res.status} - ${errText}`);
    }
    const data = await res.json();
    return data.records[0].id;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function updateRecord(table, id, fields) {
  try {
    const res = await fetch(`${BASE}/${encodeURIComponent(table)}/records`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ id, fields }] })
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`updateRecord(${table}) failed: ${res.status} - ${errText}`);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// =============================================
// TRANSLATIONS
// =============================================
const T = {
  en: {
    appTitle: 'Field Ministry Tracker',
    appSubtitle: 'Church Visit & Partnership',
    fieldVisitTab: 'Field Visit',
    partnershipTab: 'Partnership',
    visitInfo: 'Visit Information',
    churchLocation: 'Church & Location',
    contactDetails: 'Contact Person Details',
    visitResults: 'Visit Results',
    partnershipInfo: 'Partnership Information',
    churchInfo: 'Church Information',
    groupsSection: 'Groups',
    fieldExecLabel: 'Field Executive Name',
    dateLabel: 'Date',
    visitTypeLabel: 'Visit Type',
    churchNameLabel: 'Church Name',
    districtLabel: 'District',
    vdcLabel: 'VDC / Municipality',
    villageLabel: 'Village / Area',
    provinceLabel: 'Province',
    demographicLabel: 'Demographic',
    contactPersonLabel: 'Contact Person',
    phoneLabel: 'Phone Number',
    roleLabel: 'Role',
    ageLabel: 'Age',
    genderLabel: 'Gender',
    numPeopleLabel: 'Number of People Met',
    timeSpentLabel: 'Time Spent',
    followupLabel: 'Follow-up Needed',
    nextActionLabel: 'Next Planned Action',
    ministryLabel: 'Ministries Promoted',
    responseLabel: 'People Response',
    testimonyLabel: 'Short Testimony / Story',
    prayerLabel: 'Prayer Requests',
    commentsLabel: 'Comments / Remarks',
    photoLabel: 'Photo / Audio Upload',
    travelPurposeLabel: 'Travel Purpose',
    submitVisit: 'Submit Field Visit',
    submitPartnership: 'Submit Partnership',
    savedSuccess: 'Saved Successfully!',
    partnershipSaved: 'Partnership Saved!',
    newVisit: 'New Visit',
    newPartnership: 'New Partnership',
    goPartnership: 'Partnership Form',
    goFieldVisit: 'Field Visit Form',
    addGroup: '+ Add Group',
    addMember: '+ Add Member',
    addContact: '+ Add Contact',
    removeContact: 'Remove',
    contactNum: n => `Contact Person #${n}`,
    groupLeader: 'Leader',
    memberName: 'Name',
    memberAge: 'Age',
    memberGender: 'Gender',
    groupType: 'Group Type',
    bookName: 'Book Name',
    dayOfMeeting: 'Day of Meeting',
    ministry: 'Ministry',
    groupLeaderName: 'Group Leader Name',
    groupLeaderPhone: 'Leader Phone',
    searchExec: 'Search staff name...',
    searchChurch: 'Search or type church name...',
    searchContact: 'Search or type name...',
    autoFilled: 'Auto-filled...',
    phonePh: '98XXXXXXXX',
    agePh: 'e.g. 30',
    travelPurposePh: 'Reason for visit...',
    ministryPh: 'Which ministries were shared...',
    testimonyPh: 'Share a brief testimony...',
    prayerPh: 'Prayer needs from this visit...',
    commentsPh: 'Any additional observations...',
    timeSpentPh: 'e.g. 2 hours',
    photoHint: 'Requires internet connection',
    provinceEg: 'e.g. Bagmati',
    districtEg: 'e.g. Kathmandu',
    villageEg: 'e.g. Balaju',
    visitBadge: n => `This is visit #${n} to this church`,
    groupBadge: n => `${n} group(s) already exist for this church`,
    newChurch: 'New church — will be created',
    usingExisting: name => `Using existing record: ${name}`,
    yes: 'Yes', no: 'No', maybe: 'Maybe',
    firstVisit: 'First Visit', followUp: 'Follow-up', partnershipVisit: 'Partnership Visit',
    pastor: 'Pastor', deacon: 'Deacon', member: 'Member', homeGroupLeader: 'Home Group Leader',
    male: 'Male', female: 'Female', other: 'Other',
    urbanArea: 'Urban Area', ruralArea: 'Rural Area', semiRuralArea: 'Semi Rural Area',
    neutral: 'Neutral', veryInterested: 'Very Interested', interested: 'Interested', notInterested: 'Not Interested',
    noAction: 'No Action', returnVisit: 'Return Visit', sendMaterials: 'Send Materials',
    prayerFollowup: 'Prayer Follow-up', inviteEvent: 'Invite to Event',
    homeGroup: 'Home Group', scriptureBook: 'Scripture Engagement Book',
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
    friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
    errorRequired: 'Please fill all required fields',
    saving: 'Saving...',
  },
  ne: {
    appTitle: 'फिल्ड मिनिस्ट्री ट्र्याकर',
    appSubtitle: 'चर्च भ्रमण र साझेदारी',
    fieldVisitTab: 'फिल्ड भ्रमण',
    partnershipTab: 'साझेदारी',
    visitInfo: 'भ्रमण जानकारी',
    churchLocation: 'चर्च र स्थान',
    contactDetails: 'सम्पर्क व्यक्तिको विवरण',
    visitResults: 'भ्रमण परिणाम',
    partnershipInfo: 'साझेदारी जानकारी',
    churchInfo: 'चर्च जानकारी',
    groupsSection: 'समूहहरू',
    fieldExecLabel: 'फिल्ड कार्यकारी नाम',
    dateLabel: 'मिति',
    visitTypeLabel: 'भ्रमण प्रकार',
    churchNameLabel: 'चर्चको नाम',
    districtLabel: 'जिल्ला',
    vdcLabel: 'गाविस / नगरपालिका',
    villageLabel: 'गाउँ / क्षेत्र',
    provinceLabel: 'प्रदेश',
    demographicLabel: 'जनसांख्यिकी',
    contactPersonLabel: 'सम्पर्क व्यक्ति',
    phoneLabel: 'फोन नम्बर',
    roleLabel: 'भूमिका',
    ageLabel: 'उमेर',
    genderLabel: 'लिंग',
    numPeopleLabel: 'भेटिएका मान्छेको संख्या',
    timeSpentLabel: 'बिताएको समय',
    followupLabel: 'फलोअप चाहिन्छ',
    nextActionLabel: 'अर्को योजना',
    ministryLabel: 'प्रवर्धित मिनिस्ट्री',
    responseLabel: 'मान्छेको प्रतिक्रिया',
    testimonyLabel: 'छोटो साक्षी / कथा',
    prayerLabel: 'प्रार्थना अनुरोध',
    commentsLabel: 'टिप्पणी / टिप्पणीहरू',
    photoLabel: 'फोटो / अडियो अपलोड',
    travelPurposeLabel: 'यात्राको उद्देश्य',
    submitVisit: 'फिल्ड भ्रमण पेश गर्नुहोस्',
    submitPartnership: 'साझेदारी पेश गर्नुहोस्',
    savedSuccess: 'सफलतापूर्वक सुरक्षित!',
    partnershipSaved: 'साझेदारी सुरक्षित!',
    newVisit: 'नयाँ भ्रमण',
    newPartnership: 'नयाँ साझेदारी',
    goPartnership: 'साझेदारी फारम',
    goFieldVisit: 'फिल्ड भ्रमण फारम',
    addGroup: '+ समूह थप्नुहोस्',
    addMember: '+ सदस्य थप्नुहोस्',
    addContact: '+ सम्पर्क थप्नुहोस्',
    removeContact: 'हटाउनुहोस्',
    contactNum: n => `सम्पर्क व्यक्ति #${n}`,
    groupLeader: 'नेता',
    memberName: 'नाम',
    memberAge: 'उमेर',
    memberGender: 'लिंग',
    groupType: 'समूह प्रकार',
    bookName: 'पुस्तकको नाम',
    dayOfMeeting: 'भेट्ने दिन',
    ministry: 'मिनिस्ट्री',
    groupLeaderName: 'समूह नेता नाम',
    groupLeaderPhone: 'नेताको फोन',
    searchExec: 'कर्मचारीको नाम खोज्नुहोस्...',
    searchChurch: 'चर्चको नाम खोज्नुहोस्...',
    searchContact: 'नाम खोज्नुहोस्...',
    autoFilled: 'स्वतः भरिन्छ...',
    phonePh: '९८XXXXXXXX',
    agePh: 'जस्तै ३०',
    travelPurposePh: 'भ्रमणको कारण...',
    ministryPh: 'कुन मिनिस्ट्री साझा गरियो...',
    testimonyPh: 'छोटो साक्षी लेख्नुहोस्...',
    prayerPh: 'यस भ्रमणका प्रार्थना आवश्यकताहरू...',
    commentsPh: 'थप टिप्पणीहरू...',
    timeSpentPh: 'जस्तै २ घण्टा',
    photoHint: 'इन्टरनेट आवश्यक छ',
    provinceEg: 'जस्तै बागमती',
    districtEg: 'जस्तै काठमाडौं',
    villageEg: 'जस्तै बालाजु',
    visitBadge: n => `यो यस चर्चमा ${n} औं भ्रमण हो`,
    groupBadge: n => `यस चर्चमा पहिले नै ${n} समूह छ`,
    newChurch: 'नयाँ चर्च — सिर्जना गरिनेछ',
    usingExisting: name => `अवस्थित रेकर्ड प्रयोग: ${name}`,
    yes: 'हो', no: 'होइन', maybe: 'सायद',
    firstVisit: 'पहिलो भ्रमण', followUp: 'फलोअप', partnershipVisit: 'साझेदारी भ्रमण',
    pastor: 'पास्टर', deacon: 'डिकन', member: 'सदस्य', homeGroupLeader: 'होम ग्रुप नेता',
    male: 'पुरुष', female: 'महिला', other: 'अन्य',
    urbanArea: 'सहरी क्षेत्र', ruralArea: 'ग्रामीण क्षेत्र', semiRuralArea: 'अर्ध ग्रामीण क्षेत्र',
    neutral: 'तटस्थ', veryInterested: 'धेरै रुचि', interested: 'रुचि', notInterested: 'रुचि छैन',
    noAction: 'कुनै कार्य छैन', returnVisit: 'फिर्ता भ्रमण', sendMaterials: 'सामग्री पठाउनुहोस्',
    prayerFollowup: 'प्रार्थना फलोअप', inviteEvent: 'कार्यक्रममा आमन्त्रण',
    homeGroup: 'होम ग्रुप', scriptureBook: 'शास्त्र संलग्नता पुस्तक',
    monday: 'सोमबार', tuesday: 'मंगलबार', wednesday: 'बुधबार', thursday: 'बिहिबार',
    friday: 'शुक्रबार', saturday: 'शनिबार', sunday: 'आइतबार',
    errorRequired: 'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्',
    saving: 'सुरक्षित हुँदैछ...',
  }
};

let lang = localStorage.getItem('fmtLang') || 'en';
let groupCount = 0;
let contactCount = 0;
let execCache = [], churchCache = [], contactCache = [];

const cacheMap = {
  'Staff': () => execCache,
  'Churches': () => churchCache,
  'Contacts': () => contactCache,
};

// =============================================
// LANGUAGE
// =============================================
function t(key, ...args) {
  const val = T[lang][key];
  if (typeof val === 'function') return val(...args);
  return val || key;
}

function toggleLang() {
  lang = lang === 'en' ? 'ne' : 'en';
  localStorage.setItem('fmtLang', lang);
  document.getElementById('langLabel').textContent = lang === 'en' ? 'NE' : 'EN';
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (T[lang][key] && typeof T[lang][key] === 'string') el.textContent = T[lang][key];
  });
  document.querySelectorAll('[data-t-ph]').forEach(el => {
    const key = el.getAttribute('data-t-ph');
    if (T[lang][key]) el.placeholder = T[lang][key];
  });
}

// =============================================
// GRIST API HELPERS
// =============================================
async function findOrCreate(table, fields, matchFn) {
  const cacheGetter = cacheMap[table];
  const cache = cacheGetter ? cacheGetter() : null;
  const all = (cache && cache.length > 0) ? cache : await fetchAll(table);

  const trimmedMatch = (r) => {
    const trimmed = {};
    Object.keys(r).forEach(k => {
      trimmed[k] = typeof r[k] === 'string' ? r[k].trim() : r[k];
    });
    return matchFn(trimmed);
  };

  const found = all.find(r => trimmedMatch(r.fields));
  if (found) return {
    id: found.id,
    existing: true,
    name: found.fields.Name || found.fields.Church_Name || found.fields.Full_Name
  };

  const trimmedFields = {};
  Object.keys(fields).forEach(k => {
    trimmedFields[k] = typeof fields[k] === 'string' ? fields[k].trim() : fields[k];
  });

  const id = await addRecord(table, trimmedFields);
  return { id, existing: false };
}

async function findOrUpdate(table, fields, matchFn) {
  const cacheGetter = cacheMap[table];
  const cache = cacheGetter ? cacheGetter() : null;
  const all = (cache && cache.length > 0) ? cache : await fetchAll(table);

  const trimmedMatch = (r) => {
    const trimmed = {};
    Object.keys(r).forEach(k => {
      trimmed[k] = typeof r[k] === 'string' ? r[k].trim() : r[k];
    });
    return matchFn(trimmed);
  };

  const found = all.find(r => trimmedMatch(r.fields));
  if (found) {
    await updateRecord(table, found.id, fields);
    return { id: found.id, existing: true };
  }

  const id = await addRecord(table, fields);
  return { id, existing: false };
}

// =============================================
// CACHE LOADING
// =============================================
async function loadCaches() {
  const [execs, churches, contacts] = await Promise.all([
    fetchAll('Staff'),
    fetchAll('Churches'),
    fetchAll('Contacts')
  ]);
  execCache = execs;
  churchCache = churches;
  contactCache = contacts;
}

// =============================================
// SEARCH FUNCTIONS
// =============================================
function searchExecs(inputId, resultsId, hiddenId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = execCache.filter(r => r.fields.Name && r.fields.Name.toLowerCase().includes(q));
  renderResults(results, matches, r => ({
    main: r.fields.Name,
  }), (r) => {
    document.getElementById(inputId).value = r.fields.Name;
    document.getElementById(hiddenId).value = r.id;
    results.classList.remove('open');
  });
}

function searchChurches(inputId, resultsId, hiddenId, prefix) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  clearChurchAutofill(prefix);
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = churchCache.filter(r => r.fields.Church_Name && r.fields.Church_Name.toLowerCase().includes(q));
  renderResults(results, matches, r => ({
    main: r.fields.Church_Name,
    sub: r.fields.Address || ''
  }), async (r) => {
    document.getElementById(inputId).value = r.fields.Church_Name;
    document.getElementById(hiddenId).value = r.id;
    results.classList.remove('open');
    autofillChurch(r.fields, prefix);
    await updateVisitBadge(r.id, prefix);

      if (prefix === 'fv') {
        const visitType = document.getElementById('fv-visittype').value;
        if (visitType !== 'First Visit') {
          document.getElementById('fv-contacts-container').innerHTML = '';
        contactCount = 0;
        await autofillPastor(r.id);
        }
      }
  }, q);
}

function searchContacts(inputId, resultsId, hiddenId, phoneId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = contactCache.filter(r => r.fields.Name && r.fields.Name.toLowerCase().includes(q));
  renderResults(results, matches, r => ({
    main: r.fields.Name,
    sub: r.fields.Phone || ''
  }), (r) => {
    const cc = inputId.replace('fv-contact-', '');
    document.getElementById(inputId).value = r.fields.Name || '';
    document.getElementById(hiddenId).value = r.id;
    if (phoneId && document.getElementById(phoneId)) {
      document.getElementById(phoneId).value = r.fields.Phone || '';
    }
    const ageEl = document.getElementById(`fv-age-${cc}`);
    if (ageEl && r.fields.Age) ageEl.value = r.fields.Age;
    const genderEl = document.getElementById(`fv-gender-${cc}`);
    if (genderEl && r.fields.Gender) genderEl.value = r.fields.Gender;
    const roleEl = document.getElementById(`fv-role-${cc}`);
    if (roleEl && !roleEl.disabled && r.fields.Role) roleEl.value = r.fields.Role;

    results.classList.remove('open');
  });
}

function renderResults(container, items, labelFn, onSelect, query = '') {
  container.innerHTML = '';
  if (items.length === 0 && query) {
    const div = document.createElement('div');
    div.className = 'search-item new-item';
    div.textContent = t('newChurch');
    container.appendChild(div);
  }
  items.slice(0, 6).forEach(r => {
    const div = document.createElement('div');
    div.className = 'search-item';
    const lbl = labelFn(r);
    div.innerHTML = `<div>${lbl.main}</div>${lbl.sub ? `<div class="sub">${lbl.sub}</div>` : ''}`;
    div.onclick = () => onSelect(r);
    container.appendChild(div);
  });
  container.classList.toggle('open', container.children.length > 0);
}

function autofillChurch(fields, prefix) {
  if (prefix === 'fv') {
    const provEl = document.getElementById('fv-province');
    if (provEl) provEl.value = fields.Province || '';
    setVal('fv-district', fields.District || '');
    setVal('fv-vdc', fields.Municipality || '');
    setVal('fv-village', fields.Tole_Village || '');
    setVal('fv-demographic', fields.Demographic || '');
  } else {
    setVal('cp-province', fields.Province || '');
    setVal('cp-district', fields.District || '');
    setVal('cp-vdc', fields.Municipality || '');
    setVal('cp-village', fields.Tole_Village || '');
  }
}

function clearChurchAutofill(prefix) {
  if (prefix === 'fv') {
    ['fv-district', 'fv-vdc', 'fv-village', 'fv-province'].forEach(id => setVal(id, ''));
    document.getElementById('fv-visit-badge').classList.remove('show');
  } else {
    ['cp-province', 'cp-district', 'cp-vdc', 'cp-village'].forEach(id => setVal(id, ''));
    document.getElementById('cp-visit-badge').classList.remove('show');
  }
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

async function handleVisitTypeChange() {
  const visitType = document.getElementById('fv-visittype').value;
  const isFirstVisit = visitType === 'First Visit';
  const locationFields = ['fv-district', 'fv-vdc', 'fv-village', 'fv-province'];

  locationFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isFirstVisit) {
      el.removeAttribute('readonly');
      el.placeholder = '';
    } else {
      el.setAttribute('readonly', 'readonly');
      el.placeholder = t('autoFilled');
    }
  });

  document.getElementById('fv-contacts-container').innerHTML = '';
  contactCount = 0;

  if (!isFirstVisit) {
    const churchId = document.getElementById('fv-church-id').value;
    if (churchId) {
      await autofillPastor(parseInt(churchId));
    } else {
      addContact(true, false);
    }
  } else {
    addContact(true, false);
  }
}

async function updateVisitBadge(churchId, prefix) {
  try {
    const visits = await fetchAll('Field_Visit');
    const count = visits.filter(r => r.fields.Church === churchId).length;
    if (prefix === 'fv') {
      document.getElementById('fv-visit-count').textContent = t('visitBadge', count + 1);
      document.getElementById('fv-visit-badge').classList.add('show');
    } else {
      const groups = await fetchAll('Groups');
      const gCount = groups.filter(r => r.fields.Church === churchId).length;
      document.getElementById('cp-group-count').textContent = t('groupBadge', gCount);
      document.getElementById('cp-visit-badge').classList.add('show');
    }
  } catch (e) { }
}

async function autofillPastor(churchId) {
  try {
    const id = parseInt(churchId);
    const church = churchCache.find(r => r.id === id);

    if (church && church.fields.Pastor_Name) {
      const pastorId = parseInt(church.fields.Pastor_Name);
      const pastor = contactCache.find(r => r.id === pastorId);

      if (pastor) {
        addContact(true, true, {
          id: pastor.id,
          name: pastor.fields.Name || '',
          phone: pastor.fields.Phone || ''
        });
        return;
      }
    }
    addContact(true, true, null);

  } catch (e) {
    console.error('autofillPastor error:', e);
    addContact(true, false);
  }
}

// =============================================
// CONTACTS (Field Visit — multiple)
// =============================================
function addContact(isFirst = false, isFollowUp = false, pastorData = null) {
  contactCount++;
  const cc = contactCount;
  const container = document.getElementById('fv-contacts-container');
  const div = document.createElement('div');
  div.className = 'group-card';
  div.id = `contact-card-${cc}`;

  const nameVal = (isFirst && isFollowUp && pastorData) ? pastorData.name : '';
  const phoneVal = (isFirst && isFollowUp && pastorData) ? pastorData.phone : '';
  const idVal = (isFirst && isFollowUp && pastorData) ? pastorData.id : '';
  const isAutoFilled = isFirst && isFollowUp && pastorData;

  div.innerHTML = `
    <div class="group-card-header">
      <span>${t('contactNum', cc)}</span>
      ${cc > 1 ? `<button class="remove-btn" onclick="removeContact(${cc})">×</button>` : ''}
    </div>
    <div class="group-card-body">
      <div class="field">
        <label>${t('contactPersonLabel')} ${cc === 1 ? '<span class="req">*</span>' : ''}</label>
        <div class="search-wrapper">
          <input type="text" id="fv-contact-${cc}"
            placeholder="${t('searchContact')}"
            value="${nameVal}"
            oninput="searchContacts('fv-contact-${cc}','fv-contact-results-${cc}','fv-contact-id-${cc}','fv-phone-${cc}')"
            autocomplete="off"
            ${isAutoFilled ? 'readonly' : ''}/>
          <input type="hidden" id="fv-contact-id-${cc}" value="${idVal}"/>
          <div class="search-results" id="fv-contact-results-${cc}"></div>
        </div>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('phoneLabel')}</label>
          <input type="tel" id="fv-phone-${cc}"
            placeholder="${t('phonePh')}"
            value="${phoneVal}"
            ${isAutoFilled ? 'readonly' : ''}/>
        </div>
        <div class="field">
          <label>${t('roleLabel')}</label>
          <select id="fv-role-${cc}" ${isFirst ? 'disabled' : ''}>
            <option value="Pastor" selected>Pastor</option>
            ${!isFirst ? `
            <option value="Elder">Elder</option>
            <option value="Deacon">Deacon</option>
            <option value="Leader">Leader</option>
            <option value="Member">Member</option>` : ''}
          </select>
        </div>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('ageLabel')}</label>
          <select id="fv-age-${cc}">
            <option value="13-20">13-20</option>
            <option value="21-30">21-30</option>
            <option value="31-40">31-40</option>
            <option value="41-49">41-49</option>
            <option value="50+">50+</option>
          </select>
        </div>
        <div class="field">
          <label>${t('genderLabel')}</label>
          <select id="fv-gender-${cc}">
            <option value="Male">${t('male')}</option>
            <option value="Female">${t('female')}</option>
          </select>
        </div>
      </div>
    </div>
  `;
  container.appendChild(div);
}

function removeContact(cc) {
  const el = document.getElementById(`contact-card-${cc}`);
  if (el) el.remove();
}

// =============================================
// GROUPS (Partnership Form)
// =============================================
function addGroup() {
  groupCount++;
  const gc = groupCount;
  const container = document.getElementById('cp-groups-container');
  const div = document.createElement('div');
  div.className = 'group-card';
  div.id = `group-${gc}`;
  div.innerHTML = `
    <div class="group-card-header">
      <span>${t('groupsSection')} #${gc}</span>
      <button class="remove-btn" onclick="removeGroup(${gc})">×</button>
    </div>
    <div class="group-card-body">
      <div class="field">
        <label>${t('groupType')}</label>
        <select id="g${gc}-type">
          <option value="Home Group">${t('homeGroup')}</option>
          <option value="Scripture Engagement Book">${t('scriptureBook')}</option>
        </select>
      </div>
      <div class="field">
        <label>${t('bookName')}</label>
        <input type="text" id="g${gc}-book" placeholder="Book being studied..."/>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('dayOfMeeting')}</label>
          <select id="g${gc}-day">
            <option value="Sunday">${t('sunday')}</option>
            <option value="Monday">${t('monday')}</option>
            <option value="Tuesday">${t('tuesday')}</option>
            <option value="Wednesday">${t('wednesday')}</option>
            <option value="Thursday">${t('thursday')}</option>
            <option value="Friday">${t('friday')}</option>
            <option value="Saturday">${t('saturday')}</option>
          </select>
        </div>
        <div class="field">
          <label>${t('ministry')}</label>
          <input type="text" id="g${gc}-ministry" placeholder="Ministry focus..."/>
        </div>
      </div>
      <div style="margin-top:8px;">
        <div style="font-size:12px;font-weight:600;color:#374151;margin-bottom:6px;">👥 ${t('addMember').replace('+ ', 'Members')}</div>
        <div style="display:grid;grid-template-columns:1fr 100px 80px 120px;gap:4px;margin-bottom:4px;">
          <div class="member-label">${t('memberName')}</div>
          <div class="member-label">${t('phoneLabel')}</div>
          <div class="member-label">${t('memberGender')}</div>
          <div class="member-label">${t('groupLeader')}</div>
        </div>
        <div id="g${gc}-members"></div>
        <button class="add-member-btn" onclick="addMember(${gc})">${t('addMember')}</button>
      </div>
    </div>
  `;
  container.appendChild(div);
  addMember(gc);
}

function removeGroup(gc) {
  const el = document.getElementById(`group-${gc}`);
  if (el) el.remove();
}

let memberCount = 0;
function addMember(gc) {
  memberCount++;
  const mc = memberCount;
  const container = document.getElementById(`g${gc}-members`);
  const row = document.createElement('div');
  row.className = 'member-row';
  row.id = `member-${gc}-${mc}`;
  row.innerHTML = `
    <div>
      <input type="text" id="m${gc}-${mc}-name" placeholder="${t('memberName')}"/>
    </div>
    <div>
      <input type="tel" id="m${gc}-${mc}-phone" placeholder="${t('phonePh')}"/>
    </div>
    <div>
      <select id="m${gc}-${mc}-gender">
        <option value="Male">${t('male')}</option>
        <option value="Female">${t('female')}</option>
      </select>
    </div>
    <div>
      <select id="m${gc}-${mc}-role">
        <option value="Member">Member</option>
        <option value="Leader">Leader</option>
        <option value="Second Leader">2nd Leader</option>
      </select>
    </div>
  `;
  container.appendChild(row);
}

// =============================================
// FIELD VISIT SUBMIT
// =============================================
async function submitFieldVisit() {
  const exec = document.getElementById('fv-exec').value.trim();
  const church = document.getElementById('fv-church').value.trim();
  const date = document.getElementById('fv-date').value;

  const contacts = [];
  document.querySelectorAll('[id^="contact-card-"]').forEach(card => {
    const cc = card.id.replace('contact-card-', '');
    const name = document.getElementById(`fv-contact-${cc}`)?.value.trim();
    if (name) {
      contacts.push({
        name,
        id: document.getElementById(`fv-contact-id-${cc}`)?.value || '',
        phone: document.getElementById(`fv-phone-${cc}`)?.value || '',
        role: document.getElementById(`fv-role-${cc}`)?.value || 'Member',
        age: document.getElementById(`fv-age-${cc}`)?.value || '',
        gender: document.getElementById(`fv-gender-${cc}`)?.value || 'Male',
      });
    }
  });

  // Follow-up and Meeting must select existing church and contact
  const visitType = document.getElementById('fv-visittype').value;
  const churchId = document.getElementById('fv-church-id').value;
  if (visitType !== 'First Visit' && !churchId) {
    alert('Please select an existing church from the search for Follow-up or Meeting visits.');
    return;
  }

  if (!exec || !church || contacts.length === 0 || !date) {
    alert(t('errorRequired'));
    return;
  }

  const btn = document.getElementById('fv-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>${t('saving')}`;

  const formData = {
    execName: exec,
    execId: document.getElementById('fv-exec-id')?.value || '',
    churchName: church,
    churchId: document.getElementById('fv-church-id')?.value || '',
    contacts,
    date,
    visittype: document.getElementById('fv-visittype')?.value || '',
    district: document.getElementById('fv-district')?.value || '',
    vdc: document.getElementById('fv-vdc')?.value || '',
    village: document.getElementById('fv-village')?.value || '',
    province: document.getElementById('fv-province')?.value || '',
    demographic: document.getElementById('fv-demographic')?.value || '',
    numpeople: document.getElementById('fv-numpeople')?.value || '',
    followup: document.getElementById('fv-followup')?.value || '',
    nextaction: document.getElementById('fv-nextaction')?.value || '',
    ministry: document.getElementById('fv-ministry')?.value || '',
    testimony: document.getElementById('fv-testimony')?.value || '',
    prayer: document.getElementById('fv-prayer')?.value || '',
    comments: document.getElementById('fv-comments')?.value || '',
  };

  try {
    const visitNum = await processFieldVisit(formData);
    showFVSuccess(church, visitNum);
  } catch (e) {
    alert('Error saving: ' + e.message);
  }

  btn.disabled = false;
  btn.innerHTML = `<span data-t="submitVisit">${t('submitVisit')}</span>`;
}

async function processFieldVisit(d) {
  let execId = d.execId;
  if (!execId) {
    const r = await findOrCreate('Staff',
      { Name: d.execName },
      f => f.Name.trim() === d.execName.trim()
    );
    execId = r.id;
  }
  execId = parseInt(execId);

  let churchId = d.churchId;
  const isNewChurch = !churchId;
  if (!churchId) {
    const r = await findOrCreate('Churches',
      {
        Church_Name: d.churchName,
        Province: d.province,
        District: d.district,
        Municipality: d.vdc,
        Tole_Village: d.village,
        Demographic: d.demographic,
        Assigned_Staff: execId
      },
      f => f.Church_Name.trim() === d.churchName.trim()
    );
    churchId = r.id;
  }
  churchId = parseInt(churchId);

  const contacts = d.contacts || [];
  let primaryContactId = null;
  for (const c of contacts) {
    let cId = c.id;
    if (!cId) {
      const r = await findOrUpdate('Contacts',
        {
          Name: c.name,
          Phone: c.phone,
          Role: c.role,
          Age: c.age || null,
          Gender: c.gender,
          Church: churchId
        },
        f => f.Name.trim() === c.name.trim()
      );
      cId = r.id;
    } else {
      await updateRecord('Contacts', parseInt(cId), {
        Phone: c.phone,
        Role: c.role,
        Age: c.age || null,
        Gender: c.gender
      });
      cId = parseInt(cId);
    }
    if (!primaryContactId) primaryContactId = parseInt(cId);
  }

  if (isNewChurch && primaryContactId) {
    await updateRecord('Churches', churchId, {
      Pastor_Name: primaryContactId
    });
  }

  const visits = await fetchAll('Field_Visit');
  const visitNum = visits.filter(r => r.fields.Church === churchId).length + 1;

  const dateNum = Math.floor((new Date(d.date + 'T00:00:00Z').getTime() / 86400000) + 25569);

  const ministry = Array.from(document.querySelectorAll('input[name="fv-ministry"]:checked'))
    .map(cb => cb.value)
    .join(', ');

  await addRecord('Field_Visit', {
    Date: d.date,
    Staff: execId,
    Church: churchId,
    Visit_Type: d.visittype,
    Number_of_People: parseInt(d.numpeople) || 0,
    Ministry_Promoted: ministry,
    Testimony: d.testimony,
    Prayer_Request: d.prayer,
    Comments: d.comments
  });


// Save testimony if filled
const testName = document.getElementById('fv-test-name')?.value.trim();
const testAddress = document.getElementById('fv-test-address')?.value.trim();
const testBackground = document.getElementById('fv-test-background')?.value;
const testStory = document.getElementById('fv-testimony')?.value.trim();

if (testName && testStory) {
  await addRecord('Testimony', {
    Name: testName,
    Location: testAddress || '',
    Background: testBackground || '',
    Story: testStory,
  });
}

  await loadCaches();
  return visitNum;
}

function showFVSuccess(churchName, visitNum) {
  document.getElementById('fv-form').style.display = 'none';
  document.getElementById('fv-submit-area').style.display = 'none';
  document.getElementById('fv-success-msg').textContent = `${churchName} — ${t('visitBadge', visitNum)}`;
  document.getElementById('fv-success').classList.add('show');
}

function resetFieldVisit() {
  document.getElementById('fv-form').style.display = '';
  document.getElementById('fv-submit-area').style.display = '';
  document.getElementById('fv-success').classList.remove('show');
  document.getElementById('fv-exec').value = '';
  document.getElementById('fv-exec-id').value = '';
  document.getElementById('fv-church').value = '';
  document.getElementById('fv-church-id').value = '';
  document.getElementById('fv-district').value = '';
  document.getElementById('fv-vdc').value = '';
  document.getElementById('fv-village').value = '';
  document.getElementById('fv-numpeople').value = '';
  document.getElementById('fv-prayer').value = '';
  document.getElementById('fv-comments').value = '';
  document.getElementById('fv-visittype').value = 'First Visit';
  document.getElementById('fv-visit-badge').classList.remove('show');

  const provEl = document.getElementById('fv-province');
  if (provEl) provEl.value = '';

  const demEl = document.getElementById('fv-demographic');
  if (demEl) demEl.value = 'Urban Area';

  document.querySelectorAll('input[name="fv-ministry"]')
    .forEach(cb => cb.checked = false);

  document.getElementById('fv-contacts-container').innerHTML = '';
  contactCount = 0;

  setToday('fv-date');
  handleVisitTypeChange();
}

// =============================================
// PARTNERSHIP SUBMIT
// =============================================
async function submitPartnership() {
  const exec = document.getElementById('cp-exec').value.trim();
  const church = document.getElementById('cp-church').value.trim();
  const date = document.getElementById('cp-date').value;

  if (!exec || !church || !date) {
    alert(t('errorRequired'));
    return;
  }

  const btn = document.getElementById('cp-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>${t('saving')}`;

  const groups = [];
  document.querySelectorAll('[id^="group-"]').forEach(gc => {
  const gcId = gc.id.replace('group-', '');
  const members = [];
  gc.querySelectorAll('[id^="member-"]').forEach(mr => {
    const parts = mr.id.split('-');
    const g = parts[1], m = parts[2];
    const name = document.getElementById(`m${g}-${m}-name`)?.value.trim();
    if (name) {
      members.push({
        name,
        phone: document.getElementById(`m${g}-${m}-phone`)?.value.trim() || '',
        gender: document.getElementById(`m${g}-${m}-gender`)?.value || 'Male',
        role: document.getElementById(`m${g}-${m}-role`)?.value || 'Member'
      });
    }
  });
  groups.push({
    type: document.getElementById(`g${gcId}-type`)?.value,
    bookname: document.getElementById(`g${gcId}-book`)?.value.trim(),
    day: document.getElementById(`g${gcId}-day`)?.value,
    ministry: document.getElementById(`g${gcId}-ministry`)?.value.trim(),
    members
  });
});

  const formData = {
    execName: exec,
    execId: document.getElementById('cp-exec-id').value,
    churchName: church,
    churchId: document.getElementById('cp-church-id').value,
    province: document.getElementById('cp-province').value,
    district: document.getElementById('cp-district').value,
    vdc: document.getElementById('cp-vdc').value,
    village: document.getElementById('cp-village').value,
    date,
    groups
  };

  try {
    await processPartnership(formData);
    showCPSuccess(church, groups.length);
  } catch (e) {
    alert('Error saving: ' + e.message);
  }

  btn.disabled = false;
  btn.innerHTML = `<span data-t="submitPartnership">${t('submitPartnership')}</span>`;
}

async function processPartnership(d) {
  let execId = d.execId;
  if (!execId) {
    const r = await findOrCreate('Staff',
      { Name: d.execName },
      f => f.Name === d.execName
    );
    execId = r.id;
  }

let churchId = d.churchId;
if (!churchId) {
  const r = await findOrCreate('Churches',
    {
      Church_Name: d.churchName,
      Province: d.province,
      District: d.district,
      Municipality: d.vdc,
      Tole_Village: d.village,
      Partnership_Status: 'Active',
      Partnership_date: Math.floor((new Date(d.date + 'T00:00:00Z').getTime() / 86400000) + 25569),
      Assigned_Staff: parseInt(execId)
    },
    f => f.Church_Name.trim() === d.churchName.trim()
  );
  churchId = r.id;
}
churchId = parseInt(churchId);

for (const g of d.groups) {
  const gr = await findOrCreate('Groups',
    {
      Church: churchId,
      Group_type: g.type,
      Book_Name: g.bookname,
      Meeting_Day: g.day,
      Started_Date: d.date,
      Status: 'Active',
      Assigned_Staff: parseInt(execId)
    },
    f => f.Church === churchId && f.Group_type === g.type
  );
  const groupId = gr.id;

  let leaderId = null;

  for (const m of g.members) {
    const mr = await findOrCreate('Contacts',
      { Name: m.name, Phone: m.phone || '', Age: null, Gender: m.gender, Church: parseInt(churchId) },
      f => f.Name === m.name && f.Church === parseInt(churchId)
    );

    await findOrCreate('Group_Members',
      { Group: ['L', groupId], Member_Name: mr.id, Role: m.role, Joined_Date: d.date },
      f => (Array.isArray(f.Group) ? f.Group.includes(groupId) : f.Group === groupId) && f.Member_Name === mr.id
    );

    if (m.role === 'Leader') leaderId = mr.id;
  }

  if (leaderId) {
    await updateRecord('Groups', groupId, {
      Leader: leaderId
    });
  }
}
  await loadCaches();
}

function showCPSuccess(churchName, groupCount) {
  document.getElementById('cp-form').style.display = 'none';
  document.getElementById('cp-submit-area').style.display = 'none';
  document.getElementById('cp-success-msg').textContent = `${churchName} — ${groupCount} group(s) saved`;
  document.getElementById('cp-success').classList.add('show');
}

function resetPartnership() {
  document.getElementById('cp-form').style.display = '';
  document.getElementById('cp-submit-area').style.display = '';
  document.getElementById('cp-success').classList.remove('show');
  document.getElementById('cp-exec').value = '';
  document.getElementById('cp-exec-id').value = '';
  document.getElementById('cp-church').value = '';
  document.getElementById('cp-church-id').value = '';
  setVal('cp-province', '');
  setVal('cp-district', '');
  setVal('cp-vdc', '');
  setVal('cp-village', '');
  document.getElementById('cp-groups-container').innerHTML = '';
  document.getElementById('cp-visit-badge').classList.remove('show');
  groupCount = 0;
  memberCount = 0;
  setToday('cp-date');
}

// =============================================
// TESTIMONY SUBMIT
// =============================================
async function submitTestimony() {
  const name = document.getElementById('fv-test-name')?.value.trim();
  const story = document.getElementById('fv-test-story')?.value.trim();

  if (!name || !story) {
    alert('Please fill Name and Testimony fields.');
    return;
  }

  const btn = document.getElementById('ts-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>${t('saving')}`;

  try {
    await addRecord('Testimony', {
      Name: name,
      Location: document.getElementById('fv-test-address')?.value.trim() || '',
      Background: document.getElementById('fv-test-background')?.value || '',
      Story: story,
    });

    document.getElementById('ts-form').style.display = 'none';
    document.getElementById('ts-submit-area').style.display = 'none';
    document.getElementById('ts-success-msg').textContent = `${name} — testimony saved!`;
    document.getElementById('ts-success').classList.add('show');

  } catch (e) {
    alert('Error saving: ' + e.message);
  }

  btn.disabled = false;
  btn.innerHTML = 'Submit Testimony';
}

function resetTestimony() {
  document.getElementById('ts-form').style.display = '';
  document.getElementById('ts-submit-area').style.display = '';
  document.getElementById('ts-success').classList.remove('show');
  const nameEl = document.getElementById('fv-test-name');
  if (nameEl) nameEl.value = '';
  const addressEl = document.getElementById('fv-test-address');
  if (addressEl) addressEl.value = '';
  const bgEl = document.getElementById('fv-test-background');
  if (bgEl) bgEl.value = '';
  const storyEl = document.getElementById('fv-test-story');
  if (storyEl) storyEl.value = '';
}

// =============================================
// TAB SWITCHING
// =============================================
function switchTab(n) {
  document.getElementById('tab1').classList.toggle('active', n === 1);
  document.getElementById('tab2').classList.toggle('active', n === 2);
  document.getElementById('tab3').classList.toggle('active', n === 3);
  document.getElementById('page1').classList.toggle('active', n === 1);
  document.getElementById('page2').classList.toggle('active', n === 2);
  document.getElementById('page3').classList.toggle('active', n === 3);
}

// =============================================
// INIT
// =============================================
function setToday(id) {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById(id).value = today;
  document.getElementById(id).max = today;
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) {
    document.querySelectorAll('.search-results').forEach(r => r.classList.remove('open'));
  }
});

async function init() {
  setToday('fv-date');
  setToday('cp-date');
  applyTranslations();
  if (lang === 'ne') document.getElementById('langLabel').textContent = 'EN';
  await loadCaches();
  handleVisitTypeChange();
}

init();
