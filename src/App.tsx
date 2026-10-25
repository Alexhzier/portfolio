import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { PersonalInfoEducation } from './components/PersonalInfoEducation';
import { Timeline } from './components/Timeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleCopyEmail = (email: string) => {
    showToast(`Copied to clipboard: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-500/30 selection:text-violet-200">
      {/* Interactive Entry Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Pill Header */}
      <Navbar
        onOpenContact={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <Hero onCopyEmail={handleCopyEmail} />

        {/* Bento Grid Showcase */}
        <BentoGrid />

        {/* Personal Information & Education */}
        <PersonalInfoEducation />

        {/* Chronological Experience Timeline */}
        <Timeline />

        {/* Contact Section */}
        <ContactSection onNotify={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
