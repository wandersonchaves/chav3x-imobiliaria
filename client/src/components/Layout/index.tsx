import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = ({ wrapperClass, menuDoc, children }: any) => {
  return (
    <div className={wrapperClass}>
      <Header menuDoc={menuDoc} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
