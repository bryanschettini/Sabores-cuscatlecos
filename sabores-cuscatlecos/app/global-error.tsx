"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui", textAlign: "center", padding: "4rem 1rem", background: "#fbf4e6" }}>
        <h1>Algo salió mal</h1>
        <p>Ocurrió un error inesperado en la aplicación.</p>
        <button onClick={reset} style={{ marginTop: 16, padding: "8px 20px", borderRadius: 999 }}>
          Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
