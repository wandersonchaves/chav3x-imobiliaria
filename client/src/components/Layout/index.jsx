import { Header } from '../Header';

export const Layout = ({ wrapperClass, menuDoc, children }) => {
  return (
    <div className={wrapperClass}>
      <Header menuDoc={menuDoc} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
