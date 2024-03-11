import { ReactNode } from 'react';

type FooterProps = {
  children: ReactNode;
};

const Footer = ({ children }: FooterProps): JSX.Element => {
  return <div className="fixed bottom-0 w-full z-10 bg-white pt-14pxr px-14pxr pb-48pxr max-w-1300pxr">{children}</div>;
};

export default Footer;
