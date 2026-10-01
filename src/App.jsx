import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider, useRole } from './context/RoleContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemStatement from './components/ProblemStatement';
import CaraKerja from './components/CaraKerja';
import DashboardDemo from './components/DashboardDemo';
import PortalMasyarakat from './components/PortalMasyarakat';
import FiturUnggulan from './components/FiturUnggulan';
import DampakKontribusi from './components/DampakKontribusi';
import Footer from './components/Footer';

function AppContent() {
  const { activeRole } = useRole();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background 0.35s, color 0.35s' }}>
      <Navbar />
      <main>
        <HeroSection />

        <div className="divider" style={{ margin: '0 32px' }} />

        {/* Separated Dashboards based on Active Role (Tanpa Login) */}
        {activeRole === 'pemerintah' ? (
          <>
            <DashboardDemo />
          </>
        ) : (
          <>
            <PortalMasyarakat />
            <div className="divider" style={{ margin: '0 32px' }} />
            <CaraKerja />
          </>
        )}

        <div className="divider" style={{ margin: '0 32px' }} />
        <FiturUnggulan />
        <div className="divider" style={{ margin: '0 32px' }} />
        <DampakKontribusi />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <AppContent />
      </RoleProvider>
    </ThemeProvider>
  );
}
