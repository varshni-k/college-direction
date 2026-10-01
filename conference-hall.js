// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered:', reg.scope))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Show offline notice when offline
function updateOnlineStatus() {
    const notice = document.getElementById('offlineNotice');
    if (!navigator.onLine) {
        notice.classList.add('show');
    } else {
        notice.classList.remove('show');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Render conference hall steps from config
function renderConferenceSteps() {
    const container = document.getElementById('conferenceSteps');
    if (!container || typeof CONFIG === 'undefined') return;

    container.innerHTML = CONFIG.conferenceSteps.map((step, index) => `
        <div class="step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h3>${step.icon} ${step.title}</h3>
                <p>${step.description}</p>
                <div class="arrow-indicator">${step.icon} ${step.title}</div>
            </div>
        </div>
    `).join('');
}

// Initialize conference hall map — Indoor map of D Block
function initConferenceMap() {
    if (typeof L === 'undefined' || typeof CONFIG === 'undefined') return;

    const { college, conferenceHall } = CONFIG;

    // Zoom into D Block area for indoor view
    const map = L.map('conferenceMap').setView(
        [college.lat, college.lng],
        18
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // D Block Entrance marker
    L.marker([college.lat, college.lng])
        .addTo(map)
        .bindPopup(`<b>${college.name}</b><br>Ground Floor`)
        .openPopup();

    // AV Hall marker (2nd floor)
    L.marker([conferenceHall.lat, conferenceHall.lng])
        .addTo(map)
        .bindPopup(`<b>${conferenceHall.name}</b><br>2nd Floor`);

    // Draw route within building
    const routeCoords = [
        [college.lat, college.lng],
        [conferenceHall.lat, conferenceHall.lng]
    ];

    L.polyline(routeCoords, {
        color: '#f5576c',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);

    // Add arrow markers
    const arrowIcon = L.divIcon({
        className: 'arrow-marker',
        html: '➤',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    const latStep = (conferenceHall.lat - college.lat) / 3;
    const lngStep = (conferenceHall.lng - college.lng) / 3;
    for (let i = 1; i < 3; i++) {
        L.marker([college.lat + latStep * i, college.lng + lngStep * i], {
            icon: arrowIcon,
            interactive: false
        }).addTo(map);
    }

    // Fit map
    map.fitBounds(routeCoords, { padding: [50, 50] });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderConferenceSteps();
    initConferenceMap();
});
