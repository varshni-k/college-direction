// ============================================================
//  CONFIGURATION FILE — NGP Campus, Coimbatore
// ============================================================

const CONFIG = {
    // NGP Main Gate
    startPoint: {
        lat: 11.062110,
        lng: 77.036967,
        name: "NGP Main Gate"
    },

    // Break Zone
    breakzone: {
        lat: 11.062203,
        lng: 77.033612,
        name: "Break Zone"
    },

    // D Block Entrance
    college: {
        lat: 11.061113,
        lng: 77.033656,
        name: "D Block Entrance"
    },

    // AV Hall (Conference Hall)
    conferenceHall: {
        lat: 11.060883,
        lng: 77.033813,
        name: "AV Hall"
    },

    // Steps from Main Gate to D Block
    collegeSteps: [
        {
            title: "Start from NGP Main Gate",
            description: "Enter through the NGP main gate.",
            icon: "🚪"
        },
        {
            title: "Walk Straight to Break Zone",
            description: "From the main gate, walk straight to reach the Break Zone.",
            icon: "⬆️"
        },
        {
            title: "Turn Left at Break Zone",
            description: "From Break Zone, turn left and walk straight to reach D Block entrance.",
            icon: "⬅️"
        },
        {
            title: "D Block Entrance",
            description: "You have arrived at D Block entrance!",
            icon: "🏫"
        }
    ],

    // Steps from D Block to AV Hall (Conference Hall) — Indoor Map
    conferenceSteps: [
        {
            title: "From D Block Entrance",
            description: "Enter D Block through the main entrance.",
            icon: "🚪"
        },
        {
            title: "Go to 2nd Floor",
            description: "Take the stairs or lift to the 2nd floor.",
            icon: "⬆️"
        },
        {
            title: "Turn Left",
            description: "On the 2nd floor, turn left.",
            icon: "⬅️"
        },
        {
            title: "AV Hall",
            description: "The AV Hall is right there. You have arrived!",
            icon: "🏢"
        }
    ]
};
