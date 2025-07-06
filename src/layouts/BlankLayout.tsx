// layouts/BlankLayout.tsx
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function BlankLayout({ children }: Props) {
  return <div>{children}</div>;
}
