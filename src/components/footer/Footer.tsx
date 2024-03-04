const Footer = ({ children }): JSX.Element => {
  return (
    <div className="fixed bottom-0 w-full bg-white pt-14pxr px-14pxr pb-48pxr">
      {children}
    </div>
  );
};

export default Footer;
