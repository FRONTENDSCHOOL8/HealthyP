import { ReactNode } from 'react';

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-red-500 text-sub-em absolute bottom-[-1.3125rem]">{children}</p>;
}
