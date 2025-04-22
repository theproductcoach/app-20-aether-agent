interface ItineraryResultProps {
  itinerary: { day: string; plan: string }[];
  totalCost: string;
  agentThoughts: string[];
  onPlanAnother: () => void;
}

export default function ItineraryResult({
  itinerary,
  totalCost,
  agentThoughts,
  onPlanAnother,
}: ItineraryResultProps) {
  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "rgba(10, 21, 32, 0.8)",
        borderRadius: "8px",
        border: "1px solid rgba(144, 224, 239, 0.2)",
        color: "#e1e1e1",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
          background:
            "linear-gradient(45deg, rgb(72, 202, 228), rgb(144, 224, 239))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textAlign: "center",
        }}
      >
        Your AI-Powered Itinerary
      </h2>

      <div style={{ marginBottom: "2rem" }}>
        {itinerary.map(({ day, plan }, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                color: "rgb(144, 224, 239)",
                marginBottom: "0.5rem",
                fontSize: "1.25rem",
              }}
            >
              {day}
            </h3>
            <p style={{ lineHeight: "1.6" }}>{plan}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "rgba(72, 202, 228, 0.1)",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            color: "rgb(144, 224, 239)",
            marginBottom: "0.5rem",
          }}
        >
          Total Cost Estimate
        </h3>
        <p style={{ fontSize: "1.25rem" }}>{totalCost}</p>
      </div>

      <div>
        <h3
          style={{
            color: "rgb(144, 224, 239)",
            marginBottom: "1rem",
          }}
        >
          How the AI Planned This
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "2rem",
          }}
        >
          {agentThoughts.map((thought, index) => (
            <li
              key={index}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                backgroundColor: "rgba(72, 202, 228, 0.05)",
                borderRadius: "4px",
                fontSize: "0.95rem",
              }}
            >
              {thought}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onPlanAnother}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "rgba(72, 202, 228, 0.15)",
          color: "rgb(144, 224, 239)",
          border: "1px solid rgba(144, 224, 239, 0.3)",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(72, 202, 228, 0.25)";
          e.currentTarget.style.borderColor = "rgba(144, 224, 239, 0.5)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(72, 202, 228, 0.15)";
          e.currentTarget.style.borderColor = "rgba(144, 224, 239, 0.3)";
          e.currentTarget.style.transform = "none";
        }}
      >
        Plan Another Trip
      </button>
    </section>
  );
}
