import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemStatement from './components/ProblemStatement';
import CaraKerja from './components/CaraKerja';
import DashboardDemo from './components/DashboardDemo';
import FiturUnggulan from './components/FiturUnggulan';
import DampakKontribusi from './components/DampakKontribusi';
import Footer from './components/Footer';

function AppContent() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background 0.35s, color 0.35s' }}>
      <Navbar />
      <main>
        <HeroSection />
        <div className="divider" style={{ margin: '0 32px' }} />
        <ProblemStatement />
        <div className="divider" style={{ margin: '0 32px' }} />
        <CaraKerja />
        <div className="divider" style={{ margin: '0 32px' }} />
        <DashboardDemo />
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
      <AppContent />
    </ThemeProvider>
  );
}
