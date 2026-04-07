import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { SecondaryNav } from './components/SecondaryNav';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}