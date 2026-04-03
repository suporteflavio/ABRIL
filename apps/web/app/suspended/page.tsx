export default function SuspendedPage() {
  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fef2f2', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: '#dc2626', fontSize: '2rem', marginBottom: '1rem' }}>Conta Suspensa</h1>
        <p style={{ color: '#374151', maxWidth: '400px' }}>
          Sua conta está temporariamente suspensa. Entre em contato com o suporte para reativar sua campanha.
        </p>
        <a href="/login" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#1a56db', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>
          Voltar ao Login
        </a>
      </div>
    </main>
  );
}
