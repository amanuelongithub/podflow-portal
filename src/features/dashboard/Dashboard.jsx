import React from "react";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Users</h3>
          <p>120</p>
        </div>

        <div style={styles.card}>
          <h3>Creators</h3>
          <p>45</p>
        </div>

        <div style={styles.card}>
          <h3>Revenue</h3>
          <p>$2,340</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  cards: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Dashboard;
