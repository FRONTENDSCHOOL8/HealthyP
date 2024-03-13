import { ReactNode } from 'react';

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-red-500 text-sub absolute bottom-0">{children}</p>;
}
