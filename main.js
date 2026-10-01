// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered:', reg.scope))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Render college steps from config
function renderCollegeSteps() {
    const container = document.getElementById('collegeSteps');
    if (!container || typeof CONFIG === 'undefined') return;

    container.innerHTML = CONFIG.collegeSteps.map((step, index) => `
        <div class="step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h3>${step.icon} ${step.title}</h3>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
}

// Initialize college map — Main Gate → Break Zone → D Block
function initCollegeMap() {
    if (typeof L === 'undefined' || typeof CONFIG === 'undefined') return;

    const { startPoint, breakzone, college } = CONFIG;

    const map = L.map('collegeMap').setView(
        [(startPoint.lat + college.lat) / 2, (startPoint.lng + college.lng) / 2],
        16
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Start marker — NGP Main Gate
    L.marker([startPoint.lat, startPoint.lng])
        .addTo(map)
        .bindPopup(`<b>${startPoint.name}</b><br>Starting Point`)
        .openPopup();

    // Break Zone marker
    L.marker([breakzone.lat, breakzone.lng])
        .addTo(map)
        .bindPopup(`<b>${breakzone.name}</b><br>Turn Left Here`);

    // D Block marker
    L.marker([college.lat, college.lng])
        .addTo(map)
        .bindPopup(`<b>${college.name}</b><br>Destination`);

    // Draw route line: Main Gate → Break Zone → D Block
    const routeCoords = [
        [startPoint.lat, startPoint.lng],
        [breakzone.lat, breakzone.lng],
        [college.lat, college.lng]
    ];

    L.polyline(routeCoords, {
        color: '#667eea',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);

    // Add arrow markers along the route
    const arrowIcon = L.divIcon({
        className: 'arrow-marker',
        html: '➤',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Arrows from Main Gate to Break Zone (straight)
    const latStep1 = (breakzone.lat - startPoint.lat) / 3;
    const lngStep1 = (breakzone.lng - startPoint.lng) / 3;
    for (let i = 1; i < 3; i++) {
        L.marker([startPoint.lat + latStep1 * i, startPoint.lng + lngStep1 * i], {
            icon: arrowIcon,
            interactive: false
        }).addTo(map);
    }

    // Arrows from Break Zone to D Block (left turn)
    const latStep2 = (college.lat - breakzone.lat) / 3;
    const lngStep2 = (college.lng - breakzone.lng) / 3;
    for (let i = 1; i < 3; i++) {
        L.marker([breakzone.lat + latStep2 * i, breakzone.lng + lngStep2 * i], {
            icon: arrowIcon,
            interactive: false
        }).addTo(map);
    }

    // Fit map to show all points
    map.fitBounds(routeCoords, { padding: [50, 50] });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCollegeSteps();
    initCollegeMap();
});
