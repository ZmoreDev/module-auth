// layouts/DefaultLayout.tsx
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <header style={{ background: '#ddd', padding: 10 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/dashboard">Dashboard</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
