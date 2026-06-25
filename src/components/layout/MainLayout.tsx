import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from '../common/FloatingContact';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Removed pt-20 so hero sections go under the translucent header */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default MainLayout;
