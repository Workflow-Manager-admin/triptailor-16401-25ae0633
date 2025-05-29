import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * MainContainer is the primary dashboard and navigation shell for the TripTailor app.
 * It integrates all top-level features: profile, itinerary, map, preferences modal, etc.
 * Color theme: Primary (#1976D2), Secondary (#43A047), Accent (#FFB300), Light theme.
 */
function MainContainer() {
  // Sidebar navigation state
  const [activeSection, setActiveSection] = useState("itinerary");
  // Modal visibility (e.g., preferences/edit profile)
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Demo user data and itinerary (stubbed)
  const [userProfile, setUserProfile] = useState({
    name: "Alex Traveler",
    budget: 1500,
    dates: "2024-08-15 to 2024-08-20",
    interests: ["Museums", "Food", "Hiking"]
  });

  const [itinerary, setItinerary] = useState([
    {
      day: 1,
      date: "2024-08-15",
      destination: "Barcelona",
      activities: [
        { time: "10:00", name: "Gothic Quarter Walk" },
        { time: "13:00", name: "Tapas Lunch" },
        { time: "15:00", name: "Picasso Museum" }
      ],
      accommodation: "City Hotel Barcelona"
    },
    {
      day: 2,
      date: "2024-08-16",
      destination: "Barcelona",
      activities: [
        { time: "09:00", name: "Park Güell" },
        { time: "12:00", name: "Beach Leisure" },
        { time: "18:00", name: "Flamenco Show" }
      ],
      accommodation: "City Hotel Barcelona"
    }
  ]);

  // Stub: simple budget usage calc
  const usedBudget = 900;
  const remainingBudget = userProfile.budget - usedBudget;

  // Handlers
  const handleSidebarClick = section => setActiveSection(section);
  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  // Stubbed map area - replace with live map integration in future
  const MapStub = () => (
    <div style={styles.mapStub}>
      <div style={{ color: "#1976D2", fontWeight: 600, marginBottom: 10 }}>
        🗺️ Interactive Map (preview)
      </div>
      <div style={{ color: "#888" }}>
        Map of trip destinations and activities will appear here.
      </div>
    </div>
  );

  // Sidebar entries
  const sidebarItems = [
    { key: "profile", icon: "👤", label: "Profile" },
    { key: "itinerary", icon: "🗂️", label: "Itinerary" },
    { key: "map", icon: "🗺️", label: "Map" },
    { key: "preferences", icon: "⚙️", label: "Preferences" }
  ];

  // --- UI Components ---
  function Sidebar() {
    return (
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={{ color: "#1976D2", fontWeight: 700, marginRight: 8 }}>
            TT
          </span>
          TripTailor
        </div>
        <nav>
          {sidebarItems.map(item => (
            <div
              key={item.key}
              style={{
                ...styles.sidebarItem,
                background:
                  activeSection === item.key
                    ? "rgba(25, 118, 210, 0.09)"
                    : "transparent",
                color:
                  activeSection === item.key
                    ? "#1976D2"
                    : "#333"
              }}
              onClick={() => {
                if (item.key === "profile" || item.key === "preferences") {
                  openProfileModal();
                  setActiveSection("itinerary"); // focus returns to itinerary
                } else {
                  handleSidebarClick(item.key);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={item.label}
            >
              <span style={{ marginRight: 10 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  function DashboardHeader() {
    return (
      <header style={styles.header}>
        <div style={styles.headerTitle}>
          {activeSection === "map"
            ? "Trip Map"
            : activeSection === "itinerary"
            ? "Your Itinerary"
            : "TripTailor"}
        </div>
        <div style={styles.headerUser}>
          <span style={{ color: "#1976D2", fontWeight: 600, marginRight: 6 }}>
            {userProfile.name}
          </span>
          <button style={styles.editBtn} onClick={openProfileModal}>
            Edit Profile
          </button>
        </div>
      </header>
    );
  }

  function ItineraryView() {
    if (!itinerary || itinerary.length === 0) {
      return (
        <div style={styles.sectionPlaceholder}>
          <span style={{ color: "#aaa" }}>No itinerary generated yet.</span>
        </div>
      );
    }
    return (
      <div>
        {/* Timeline-style for each day */}
        <div style={styles.timelineWrap}>
          {itinerary.map(day => (
            <div key={day.day} style={styles.timelineDay}>
              <div style={styles.timelineDate}>
                <span style={{ fontWeight: 600, color: "#1976D2" }}>
                  Day {day.day}:
                </span>{" "}
                {day.date} – {day.destination}
              </div>
              <ul style={styles.timelineList}>
                {day.activities.map((act, i) => (
                  <li key={i} style={styles.timelineActivity}>
                    <span style={styles.activityTime}>{act.time}</span>{" "}
                    <span style={styles.activityName}>{act.name}</span>
                  </li>
                ))}
              </ul>
              <div style={styles.timelineAccom}>
                <span style={{ color: "#43A047" }}>🏨</span>{" "}
                <span style={{ color: "#555" }}>{day.accommodation}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Budget SlimBar */}
        <div style={styles.budgetBar}>
          <div
            style={{
              ...styles.budgetFill,
              width: `${Math.min(100, (usedBudget / userProfile.budget) * 100)}%`
            }}
          />
          <div style={styles.budgetText}>
            Used: ${usedBudget} / ${userProfile.budget} &nbsp;
            <span
              style={{
                color: remainingBudget < 0 ? "#D32F2F" : "#43A047"
              }}
            >
              ({remainingBudget >= 0 ? `Remaining: $${remainingBudget}` : "Over Budget"})
            </span>
          </div>
        </div>
        {/* Edit/Generate Actions */}
        <div style={{ marginTop: 18, textAlign: "right" }}>
          <button
            style={{ ...styles.editBtn, background: "#FFB300", color: "#fff" }}
          >
            Edit Itinerary
          </button>
          <button style={styles.primaryBtn}>Regenerate</button>
        </div>
      </div>
    );
  }

  function MapView() {
    return <MapStub />;
  }

  // -- Modal for Preferences/Profile --
  function ProfileModal() {
    if (!showProfileModal) return null;
    return (
      <div style={styles.modalBackdrop} onClick={closeProfileModal}>
        <div
          style={styles.modal}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div style={styles.modalHeader}>
            <span style={{ fontWeight: 600, fontSize: 18 }}>
              Edit Profile & Preferences
            </span>
            <button style={styles.closeModalBtn} onClick={closeProfileModal}>
              ×
            </button>
          </div>
          <div style={{ marginTop: 12 }}>
            {/* Example: User profile form */}
            <label style={styles.profileLabel}>
              Name:
              <input
                type="text"
                value={userProfile.name}
                onChange={e =>
                  setUserProfile({ ...userProfile, name: e.target.value })
                }
                style={styles.profileInput}
              />
            </label>
            <label style={styles.profileLabel}>
              Budget ($):
              <input
                type="number"
                value={userProfile.budget}
                min={0}
                onChange={e =>
                  setUserProfile({ ...userProfile, budget: Number(e.target.value) })
                }
                style={styles.profileInput}
              />
            </label>
            <label style={styles.profileLabel}>
              Trip Dates:
              <input
                type="text"
                value={userProfile.dates}
                onChange={e =>
                  setUserProfile({ ...userProfile, dates: e.target.value })
                }
                style={styles.profileInput}
              />
            </label>
            <label style={styles.profileLabel}>
              Interests:
              <input
                type="text"
                value={userProfile.interests.join(", ")}
                onChange={e =>
                  setUserProfile({
                    ...userProfile,
                    interests: e.target.value.split(",").map(s => s.trim())
                  })
                }
                style={styles.profileInput}
              />
            </label>
            <div style={{ textAlign: "right", marginTop: 10 }}>
              <button style={styles.primaryBtn} onClick={closeProfileModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main layout render ---
  return (
    <div style={styles.appShell}>
      <Sidebar />
      <div style={styles.mainSection}>
        <DashboardHeader />
        <div style={styles.contentRow}>
          <div style={styles.leftCol}>
            {activeSection === "itinerary" && <ItineraryView />}
            {activeSection === "map" && <MapView />}
            {/* Additional dashboard content can go here */}
          </div>
          <div style={styles.rightCol}>
            <MapStub />
          </div>
        </div>
      </div>
      <ProfileModal />
    </div>
  );
}

// --- Inline CSS-in-JS theme (modularity & custom color pallette) ---
const styles = {
  appShell: {
    display: "flex",
    minHeight: "100vh",
    background: "#f7fbfe",
    color: "#23272f",
    fontFamily: "'Inter','Roboto','Arial',sans-serif",
  },
  sidebar: {
    width: 200,
    background: "#fff",
    borderRight: "1px solid #E3E7ED",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "30px 0",
    minHeight: "100vh",
    boxShadow: "2px 0 8px 0 rgba(25,118,210,0.03)",
    zIndex: 5
  },
  sidebarLogo: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1976D2",
    alignSelf: "center",
    marginBottom: 32,
    letterSpacing: 0.5,
    display: "flex",
    alignItems: "center"
  },
  sidebarItem: {
    padding: "14px 36px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 16,
    borderRadius: "0 30px 30px 0",
    marginBottom: 2,
    transition: "background 0.15s, color 0.15s"
  },
  mainSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  header: {
    padding: "22px 34px 18px 34px",
    borderBottom: "1px solid #e6e6e6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9fcff"
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 24,
    color: "#1976D2"
  },
  headerUser: {
    fontWeight: 400,
    fontSize: 15,
    display: "flex",
    alignItems: "center"
  },
  editBtn: {
    marginLeft: 10,
    background: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "7px 14px",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.16s"
  },
  primaryBtn: {
    background: "#1976D2",
    color: "#fff",
    border: "none",
    marginLeft: 16,
    borderRadius: 5,
    padding: "9px 21px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.18s"
  },
  sectionPlaceholder: {
    padding: 60,
    textAlign: "center",
    color: "#adb7c5"
  },
  contentRow: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "stretch"
  },
  leftCol: {
    flex: 1.7,
    padding: "26px 42px 0 42px"
  },
  rightCol: {
    flex: 1.1,
    padding: "28px 12px 0 10px"
  },
  timelineWrap: {
    borderLeft: "3px solid #1976D2",
    paddingLeft: 24,
    marginBottom: 30
  },
  timelineDay: {
    marginBottom: 26
  },
  timelineDate: {
    fontSize: 17,
    marginBottom: 5
  },
  timelineList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  timelineActivity: {
    fontSize: 15,
    marginBottom: 4,
    display: "flex",
    alignItems: "center"
  },
  activityTime: {
    fontWeight: 500,
    color: "#1976D2",
    background: "#E3F1FD",
    padding: "1px 7px",
    borderRadius: 5,
    fontSize: 13,
    marginRight: 7
  },
  activityName: {
    fontWeight: 400,
    color: "#333"
  },
  timelineAccom: {
    fontSize: 14,
    marginTop: 7,
    marginLeft: 6
  },
  budgetBar: {
    margin: "18px 0",
    height: 20,
    width: "96%",
    background: "#ECEFF1",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
  },
  budgetFill: {
    background: "linear-gradient(90deg,#1976D2 60%,#43A047)",
    height: "100%",
    borderRadius: 10,
    transition: "width 0.4s"
  },
  budgetText: {
    position: "absolute",
    width: "100%",
    left: 0,
    top: 0,
    height: "100%",
    textAlign: "center",
    lineHeight: "20px",
    color: "#1976D2",
    fontWeight: 500,
    fontSize: 14
  },
  mapStub: {
    width: "100%",
    minHeight: 200,
    borderRadius: 16,
    background:
      "linear-gradient(120deg, #e3f0fc 30%, #f8fbe2 100%)",
    color: "#aaa",
    boxShadow: "0 2px 8px 0 rgba(25,118,210,0.03)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 24,
    marginTop: 12
  },
  modalBackdrop: {
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 2000,
    width: "100vw",
    height: "100vh",
    background: "rgba(31,51,80,0.19)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    background: "#fffffe",
    minWidth: 320,
    maxWidth: 350,
    borderRadius: 13,
    boxShadow: "0 3px 36px 0 rgba(25,118,210,0.10)",
    padding: "20px 24px",
    position: "relative"
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eff0f3",
    paddingBottom: 7
  },
  closeModalBtn: {
    fontWeight: 700,
    fontSize: 22,
    color: "#1976D2",
    background: "none",
    border: "none",
    cursor: "pointer",
    lineHeight: 0.6
  },
  profileLabel: {
    display: "block",
    fontSize: 15,
    color: "#1976D2",
    margin: "12px 0 5px 0",
    fontWeight: 500
  },
  profileInput: {
    width: "100%",
    padding: "8px 10px",
    fontSize: 15,
    background: "#f6fafd",
    border: "1px solid #aec7ec",
    borderRadius: 5,
    marginTop: 3,
    marginBottom: 3
  }
};

export default MainContainer;
