"use client";

export default function HomePage() {
  return (
    <main
      style={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", margin: "0", color: "#1a202c" }}>
          Welcome to Magnus
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#4a5568" }}>
          Your smart internal management dashboard
        </p>
      </section>

      <section style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p style={{ fontWeight: "600", fontSize: "1rem", color: "#2d3748" }}>
          🚀 Focused on helping you manage employees, data and tasks efficiently.
        </p>
        <p style={{ fontSize: "0.95rem", color: "#2d3748" }}>
          Want to streamline your work process? Magnus gives you the tools to
          create, search and organize — all in one place.
        </p>
      </section>

      <section
        style={{
          background: "white",
          padding: "1.2rem 1.5rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          borderLeft: "5px solid #3182ce",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <p>
          You manage your <strong>organization faster</strong> with Magnus.
          Create employee records, search for insights, and handle internal data
          like a pro.
        </p>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "1rem 1.5rem",
          borderRadius: "8px",
          borderLeft: "5px solid #d69e2e",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <p style={{ backgroundColor: "yellow", fontWeight: "600" }}>
          ⚠️ Get the most out of Magnus — keep your records organized and always
          updated for smarter decisions.
        </p>
      </section>
    </main>
  );
}
