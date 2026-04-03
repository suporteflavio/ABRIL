'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: string;
}

export default function SelectTenantPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setTenants(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const selectTenant = (tenant: Tenant) => {
    localStorage.setItem('current_tenant_id', tenant.id);
    if (tenant.status === 'SUSPENDED') {
      router.push('/suspended');
    } else {
      router.push('/admin');
    }
  };

  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '480px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1a56db' }}>Selecionar Campanha</h1>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Carregando...</p>
        ) : tenants.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhuma campanha disponível</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tenants.map((tenant) => (
              <li key={tenant.id} style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => selectTenant(tenant)}
                  style={{ width: '100%', padding: '1rem', textAlign: 'left', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontWeight: 500 }}>{tenant.name}</span>
                  <span style={{ fontSize: '0.75rem', color: tenant.status === 'ACTIVE' ? '#16a34a' : '#dc2626' }}>{tenant.status}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
