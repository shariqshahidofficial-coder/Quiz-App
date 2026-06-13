const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const worldGrid = document.getElementById('world-grid');
const themeToggle = document.getElementById('theme-toggle');
const alarmTimeInput = document.getElementById('alarm-time');
const addAlarmBtn = document.getElementById('add-alarm');
const alarmList = document.getElementById('alarm-list');
const alarmOverlay = document.getElementById('alarm-overlay');
const dismissAlarmBtn = document.getElementById('dismiss-alarm');

// Configuration
const CITIES = [
    { name: 'LONDON', timezone: 'Europe/London' },
    { name: 'NEW YORK', timezone: 'America/New_York' },
    { name: 'TOKYO', timezone: 'Asia/Tokyo' },
    { name: 'DUBAI', timezone: 'Asia/Dubai' },
    { name: 'SYDNEY', timezone: 'Australia/Sydney' }
];

let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
let isDarkMode = true;

// Initialize
function init() {
    updateLocalTime();
    updateWorldClocks();
    renderAlarms();
    
    setInterval(() => {
        updateLocalTime();
        updateWorldClocks();
        checkAlarms();
    }, 1000);

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    addAlarmBtn.addEventListener('click', addAlarm);
    dismissAlarmBtn.addEventListener('click', () => {
        alarmOverlay.classList.add('hidden');
    });
}

function updateLocalTime() {
    const now = new Date();
    
    // Time
    timeDisplay.textContent = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
}

function updateWorldClocks() {
    worldGrid.innerHTML = '';
    const now = new Date();

    CITIES.forEach(city => {
        const timeStr = now.toLocaleTimeString('en-US', {
            timeZone: city.timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });

        const card = document.createElement('div');
        card.className = 'world-card';
        card.innerHTML = `
            <div class="city">${city.name}</div>
            <div class="time">${timeStr}</div>
        `;
        worldGrid.appendChild(card);
    });
}

function addAlarm() {
    const time = alarmTimeInput.value;
    if (!time) return;

    if (alarms.includes(time)) {
        alert('Alarm already exists for this time.');
        return;
    }

    alarms.push(time);
    alarms.sort();
    localStorage.setItem('alarms', JSON.stringify(alarms));
    renderAlarms();
    alarmTimeInput.value = '';
}

function deleteAlarm(time) {
    alarms = alarms.filter(a => a !== time);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    renderAlarms();
}

function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach(time => {
        const li = document.createElement('li');
        li.className = 'alarm-item';
        li.innerHTML = `
            <span>${time}</span>
            <button class="delete-btn" onclick="deleteAlarm('${time}')">[ DELETE ]</button>
        `;
        alarmList.appendChild(li);
    });
}

function checkAlarms() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).substring(0, 8); // Format: HH:MM:SS

    // We check for exact match including seconds or just HH:MM
    // The input type="time" usually gives HH:MM. If we want seconds precision, we need step="1"
    const currentTimeHM = currentTime.substring(0, 5); // HH:MM

    if (alarms.includes(currentTime) || alarms.includes(currentTimeHM)) {
        triggerAlarm();
        // To prevent multiple triggers in same minute/second, we could remove or flag it
        // For simplicity, we just show the overlay.
    }
}

function triggerAlarm() {
    alarmOverlay.classList.remove('hidden');
    // Play a basic system beep if possible (some browsers block auto-audio)
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, context.currentTime);
        oscillator.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.5);
    } catch (e) {
        console.log("Audio play failed: ", e);
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
}

// Attach deleteAlarm to window so it's accessible from inline onclick
window.deleteAlarm = deleteAlarm;

init();
