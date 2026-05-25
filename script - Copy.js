// ============================================================
//  EXERCISE AI — script.js
//  Core app logic: filtering, calorie tracking, AI, local storage
// ============================================================

// ── SUPABASE CONFIG ─────────────────────────────────────────
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://YOUR_PROJECT_URL.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_PUBLIC_KEY';

// Initialize Supabase (optional — app works fully without it)
let supabaseClient = null;
try {
  if (SUPABASE_URL !== 'https://YOUR_PROJECT_URL.supabase.co') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.log('Supabase not configured — using local storage only.');
}

// ── ANTHROPIC AI CONFIG ─────────────────────────────────────
// This calls the Anthropic API to answer exercise questions
const AI_SYSTEM_PROMPT = `You are ExerciseAI, a knowledgeable fitness expert assistant.
You help users understand exercises, muscle groups, proper form, and calorie burning.
Be concise (2-4 sentences max), practical, and encouraging.
Always relate your answer back to specific exercises from this list when relevant.
Focus on muscles targeted, proper form tips, and calorie burning advice.`;

// ── STATE ────────────────────────────────────────────────────
let currentMuscle = 'all';
let currentSort   = 'name';
let todaySessions = [];
let workoutLog    = {};  // { "YYYY-MM-DD": [session, ...] }

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  renderExercises();
  populateLogSelect();
  updateCalorieRing();
  renderSessions();
  renderLog();
  bindEvents();
});

// ── EVENTS ───────────────────────────────────────────────────
function bindEvents() {
  // Nav tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Muscle filter
  document.querySelectorAll('.muscle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.muscle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMuscle = btn.dataset.muscle;
      renderExercises();
    });
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    currentSort = e.target.value;
    renderExercises();
  });

  // AI Ask
  document.getElementById('ai-ask-btn').addEventListener('click', askAI);
  document.getElementById('ai-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') askAI();
  });

  // Calorie tracker
  document.getElementById('log-exercise-select').addEventListener('change', updateCaloriePreview);
  document.getElementById('log-duration').addEventListener('input', updateCaloriePreview);
  document.getElementById('log-weight').addEventListener('input', updateCaloriePreview);
  document.getElementById('log-btn').addEventListener('click', logWorkout);
  document.getElementById('goal-input').addEventListener('input', updateCalorieRing);
  document.getElementById('clear-today-btn').addEventListener('click', clearToday);

  // Modal
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
}

// ── TAB SWITCHING ────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  if (tab === 'log') renderLog();
}

// ── EXERCISE RENDERING ───────────────────────────────────────
function getFilteredExercises() {
  let list = currentMuscle === 'all'
    ? [...EXERCISES]
    : EXERCISES.filter(e =>
        e.muscle === currentMuscle || e.secondary.includes(currentMuscle)
      );

  if (currentSort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'calories') {
    list.sort((a, b) => b.calsPer30 - a.calsPer30);
  } else if (currentSort === 'difficulty') {
    const order = { beginner: 0, intermediate: 1, advanced: 2 };
    list.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }

  return list;
}

function renderExercises() {
  const grid  = document.getElementById('exercise-grid');
  const count = document.getElementById('exercises-count');
  const list  = getFilteredExercises();

  count.textContent = `Showing ${list.length} exercise${list.length !== 1 ? 's' : ''}`;

  grid.innerHTML = list.map(ex => `
    <div class="exercise-card" onclick="openModal(${ex.id})">
      <div class="card-top">
        <span class="card-emoji">${ex.emoji}</span>
        <div class="card-badges">
          <span class="badge badge-${ex.difficulty}">${ex.difficulty}</span>
        </div>
      </div>
      <div class="card-name">${ex.name}</div>
      <div class="card-muscle">${capitalize(ex.muscle)}${ex.secondary.length ? ' + ' + ex.secondary.map(capitalize).join(', ') : ''}</div>
      <div class="card-stats">
        <div class="card-stat">
          <span class="card-stat-val">${ex.calsPer30}</span>
          <span class="card-stat-lbl">kcal/30min</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-val">${ex.sets.split('×')[0].trim()}</span>
          <span class="card-stat-lbl">sets</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-val">${ex.equipment.split(',')[0]}</span>
          <span class="card-stat-lbl">equip.</span>
        </div>
      </div>
      <button class="card-quick-log" onclick="quickLogFromCard(event, ${ex.id})">
        + Quick Log
      </button>
    </div>
  `).join('');
}

// ── MODAL ────────────────────────────────────────────────────
function openModal(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  document.getElementById('modal-content').innerHTML = `
    <span class="modal-emoji">${ex.emoji}</span>
    <div class="modal-name">${ex.name}</div>
    <div class="modal-muscle-tag">${capitalize(ex.muscle)}</div>
    <p class="modal-desc">${ex.description}</p>

    <div class="modal-row">
      <div class="modal-info-block">
        <div class="modal-info-label">Difficulty</div>
        <div class="modal-info-value">${capitalize(ex.difficulty)}</div>
      </div>
      <div class="modal-info-block">
        <div class="modal-info-label">Equipment</div>
        <div class="modal-info-value">${ex.equipment}</div>
      </div>
      <div class="modal-info-block">
        <div class="modal-info-label">Calories / 30 min</div>
        <div class="modal-info-value">${ex.calsPer30} kcal</div>
      </div>
      <div class="modal-info-block">
        <div class="modal-info-label">Recommended Volume</div>
        <div class="modal-info-value">${ex.sets}</div>
      </div>
    </div>

    <div class="modal-muscles">
      <div class="modal-muscles-title">Muscles Worked</div>
      <div class="muscle-row">
        <span class="muscle-row-label">Primary</span>
        <span class="muscle-row-value">${ex.muscles_detail.primary}</span>
      </div>
      <div class="muscle-row">
        <span class="muscle-row-label">Secondary</span>
        <span class="muscle-row-value">${ex.muscles_detail.secondary || 'None'}</span>
      </div>
    </div>

    <div class="modal-tip">
      <span>💡</span>
      <span><strong>Pro tip:</strong> ${ex.tip}</span>
    </div>

    <button class="modal-log-btn" onclick="quickLogFromModal(${ex.id})">
      + Log This Exercise
    </button>
  `;

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── AI FEATURE ────────────────────────────────────────────────
async function askAI() {
  const input   = document.getElementById('ai-input');
  const btn     = document.getElementById('ai-ask-btn');
  const spinner = document.getElementById('ai-spinner');
  const box     = document.getElementById('ai-response');
  const query   = input.value.trim();

  if (!query) { input.focus(); return; }

  btn.disabled = true;
  spinner.classList.remove('hidden');
  box.classList.remove('hidden');
  box.textContent = 'Thinking...';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: AI_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `${query}\n\nContext: Available exercises are: ${EXERCISES.map(e => e.name).join(', ')}`
          }
        ]
      })
    });

    const data = await response.json();
    const text = data.content?.map(c => c.text || '').join('') || 'No response received.';
    box.textContent = text;

  } catch (err) {
    box.textContent = '⚠️ AI unavailable right now. Check your connection and try again.';
    console.error('AI error:', err);
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
  }
}

// ── CALORIE TRACKER ───────────────────────────────────────────
function populateLogSelect() {
  const sel = document.getElementById('log-exercise-select');
  const sorted = [...EXERCISES].sort((a, b) => a.name.localeCompare(b.name));
  sel.innerHTML = '<option value="">Select exercise...</option>' +
    sorted.map(e => `<option value="${e.id}">${e.name} (${e.calsPer30} kcal/30min)</option>`).join('');
  updateCaloriePreview();
}

function updateCaloriePreview() {
  const exId     = parseInt(document.getElementById('log-exercise-select').value);
  const duration = parseInt(document.getElementById('log-duration').value) || 0;
  const weight   = parseInt(document.getElementById('log-weight').value) || 150;
  const preview  = document.getElementById('calories-preview');

  if (!exId) { preview.innerHTML = '≈ <strong>0</strong> kcal'; return; }

  const ex   = EXERCISES.find(e => e.id === exId);
  const cals = calculateCalories(ex, duration, weight);
  preview.innerHTML = `≈ <strong>${cals}</strong> kcal`;
}

function logWorkout(exId, durationOverride) {
  const id       = exId || parseInt(document.getElementById('log-exercise-select').value);
  const duration = durationOverride || parseInt(document.getElementById('log-duration').value) || 30;
  const weight   = parseInt(document.getElementById('log-weight').value) || 150;

  if (!id) { showToast('Please select an exercise first'); return; }

  const ex      = EXERCISES.find(e => e.id === id);
  const cals    = calculateCalories(ex, duration, weight);
  const session = {
    id: Date.now(),
    exerciseId: ex.id,
    name: ex.name,
    emoji: ex.emoji,
    muscle: ex.muscle,
    duration,
    weight,
    calories: cals,
    date: todayKey(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  todaySessions.unshift(session);
  addToHistory(session);
  saveToStorage();
  updateCalorieRing();
  renderSessions();
  showToast(`✅ Logged ${ex.name} — ${cals} kcal burned!`);

  // Switch to tracker tab to see result
  switchTab('tracker');
}

function quickLogFromCard(event, id) {
  event.stopPropagation();
  logWorkout(id, 30);
}

function quickLogFromModal(id) {
  closeModal();
  logWorkout(id, 30);
}

function addToHistory(session) {
  if (!workoutLog[session.date]) workoutLog[session.date] = [];
  workoutLog[session.date].unshift(session);
}

function updateCalorieRing() {
  const goal    = parseInt(document.getElementById('goal-input').value) || 500;
  const burned  = todaySessions.reduce((sum, s) => sum + s.calories, 0);
  const pct     = Math.min(burned / goal, 1);
  const circ    = 502;
  const offset  = circ - (circ * pct);

  document.getElementById('ring-fill').style.strokeDashoffset = offset;
  document.getElementById('ring-burned').textContent = burned;
  document.getElementById('header-calories').textContent = `${burned} kcal`;
  document.getElementById('goal-progress-text').textContent =
    `${Math.round(pct * 100)}% of daily goal`;

  // Color ring by progress
  const fill = document.getElementById('ring-fill');
  if (pct >= 1) fill.style.stroke = '#00e5ff';
  else if (pct >= 0.5) fill.style.stroke = '#e8ff00';
  else fill.style.stroke = '#e8ff00';
}

function renderSessions() {
  const list = document.getElementById('sessions-list');
  if (!todaySessions.length) {
    list.innerHTML = '<div class="empty-state">No workouts logged yet today.</div>';
    return;
  }

  list.innerHTML = todaySessions.map(s => `
    <div class="session-item" id="session-${s.id}">
      <span class="session-emoji">${s.emoji}</span>
      <div class="session-info">
        <div class="session-name">${s.name}</div>
        <div class="session-meta">${s.duration} min · ${s.weight} lbs · ${s.time}</div>
      </div>
      <span class="session-cal">+${s.calories} kcal</span>
      <button class="session-del" onclick="deleteSession(${s.id})">✕</button>
    </div>
  `).join('');
}

function deleteSession(id) {
  todaySessions = todaySessions.filter(s => s.id !== id);
  if (workoutLog[todayKey()]) {
    workoutLog[todayKey()] = workoutLog[todayKey()].filter(s => s.id !== id);
    if (!workoutLog[todayKey()].length) delete workoutLog[todayKey()];
  }
  saveToStorage();
  updateCalorieRing();
  renderSessions();
}

function clearToday() {
  if (!todaySessions.length) return;
  todaySessions = [];
  delete workoutLog[todayKey()];
  saveToStorage();
  updateCalorieRing();
  renderSessions();
  showToast('Today\'s sessions cleared');
}

// ── LOG TAB ───────────────────────────────────────────────────
function renderLog() {
  const allSessions = Object.values(workoutLog).flat();

  // Stats
  document.getElementById('total-sessions').textContent = allSessions.length;
  document.getElementById('total-calories').textContent =
    allSessions.reduce((s, w) => s + w.calories, 0).toLocaleString();
  document.getElementById('total-minutes').textContent =
    allSessions.reduce((s, w) => s + w.duration, 0).toLocaleString();

  // Top exercise
  const freq = {};
  allSessions.forEach(s => freq[s.name] = (freq[s.name] || 0) + 1);
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('fav-exercise').textContent = top ? top[0].split(' ')[0] : '—';

  // History by day
  const histList = document.getElementById('history-list');
  const dates = Object.keys(workoutLog).sort((a, b) => b.localeCompare(a));

  if (!dates.length) {
    histList.innerHTML = '<div class="empty-state">No workout history yet. Start logging!</div>';
    return;
  }

  histList.innerHTML = dates.map(date => {
    const sessions = workoutLog[date];
    const dayTotal = sessions.reduce((s, w) => s + w.calories, 0);
    const label    = date === todayKey() ? 'Today' : formatDate(date);

    return `
      <div class="history-day">
        <div class="history-day-header">
          <span class="history-date">${label}</span>
          <span class="history-day-cal">${dayTotal} kcal</span>
        </div>
        <div class="history-sessions">
          ${sessions.map(s => `
            <div class="history-session">
              <span>${s.emoji}</span>
              <span style="flex:1;font-size:14px">${s.name}</span>
              <span style="font-size:12px;color:var(--text3)">${s.duration}min</span>
              <span style="font-family:var(--font-mono);font-size:13px;color:var(--accent);margin-left:12px">${s.calories} kcal</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ── STORAGE ───────────────────────────────────────────────────
function saveToStorage() {
  try {
    localStorage.setItem('exerciseai_log', JSON.stringify(workoutLog));
    localStorage.setItem('exerciseai_today_key', todayKey());
  } catch (e) { console.warn('Storage unavailable'); }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('exerciseai_log');
    const savedKey = localStorage.getItem('exerciseai_today_key');
    if (saved) workoutLog = JSON.parse(saved);

    // Load today's sessions if stored today
    if (savedKey === todayKey() && workoutLog[todayKey()]) {
      todaySessions = [...workoutLog[todayKey()]];
    } else {
      todaySessions = [];
    }
  } catch (e) { console.warn('Could not load storage'); }
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();

  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ── UTILS ─────────────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().split('T')[0];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
