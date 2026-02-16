export default function Loading() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Cargando solicitudes...</h1>

      <div style={{ marginTop: 30 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={skeletonRow} />
        ))}
      </div>
    </main>
  );
}

const skeletonRow: React.CSSProperties = {
  height: 20,
  marginBottom: 12,
  borderRadius: 4,
  background: "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
  backgroundSize: "200% 100%",
  animation: "shine 1.5s infinite"
};