export default function LoadingState() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "3rem 2rem",
        backgroundColor: "rgba(10, 21, 32, 0.8)",
        borderRadius: "8px",
        border: "1px solid rgba(144, 224, 239, 0.2)",
        color: "#e1e1e1",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "1.25rem",
          color: "rgb(144, 224, 239)",
          marginBottom: "1.5rem",
        }}
      >
        Planning your perfect trip...
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "rgb(72, 202, 228)",
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
