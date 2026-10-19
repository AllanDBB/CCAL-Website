/* eslint-disable @next/next/no-img-element */
export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <img src="/Logo.svg" alt="" width={56} height={56} />
      <div style={{ lineHeight: 1.15 }}>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Colegio Científico de Alajuela</div>
        <div style={{ fontSize: 14, opacity: 0.7 }}>Panel de contenido</div>
      </div>
    </div>
  );
}
