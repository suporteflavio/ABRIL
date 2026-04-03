import type { Metadata, Viewport } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Election SaaS',
  description: 'Multi-tenant election campaign management platform',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Election SaaS',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a56db',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
