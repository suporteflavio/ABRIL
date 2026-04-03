export default function RootPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a56db' }}>Painel Root</h1>
      <p style={{ color: '#6b7280' }}>Área restrita ao administrador global da plataforma.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        {['Tenants', 'Assinaturas', 'Auditoria', 'Sistema'].map((item) => (
          <div key={item} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#374151' }}>{item}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
