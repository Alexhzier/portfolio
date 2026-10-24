import React from 'react';

export function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// LinkedIn Official Logo
export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#0A66C2">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

// Mobile / Phone Icon
export function MobileIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

// Email Icon
export function EmailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// Helper to resolve appropriate logo for social / contact links
export function SocialLogo({ platform, className = "w-4 h-4" }: { platform: string; className?: string }) {
  const lower = platform.toLowerCase();
  if (lower.includes('github')) {
    return <GithubIcon className={className} />;
  }
  if (lower.includes('linkedin')) {
    return <LinkedInIcon className={className} />;
  }
  if (lower.includes('phone') || lower.includes('mobile')) {
    return <MobileIcon className={className} />;
  }
  if (lower.includes('mail')) {
    return <EmailIcon className={className} />;
  }
  return null;
}

// 1. TypeScript Logo
export function TypeScriptIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M38.5 45.5H89.5V57H70V103H58V57H38.5V45.5ZM91 79.5C91 74.2 94.6 70.3 102 70.3C109.4 70.3 113.8 74.1 113.8 80.2V82.2H102.8C102.8 79.7 101.4 78.4 98.7 78.4C96 78.4 94.6 79.5 94.6 81.3C94.6 83.3 96.1 84.4 100.5 85.8L104.7 87.2C112.5 89.8 115 94.1 115 99.8C115 106.8 109.8 111.4 101.3 111.4C92.8 111.4 87.5 106.8 87.5 99.5V97.3H98.7C98.7 100.3 100.4 102 103.7 102C106.9 102 108.7 100.6 108.7 98.4C108.7 96.1 107.1 94.9 102.7 93.5L98.5 92.1C92.8 90.1 91 85.8 91 79.5Z"
        fill="white"
      />
    </svg>
  );
}

// 2. JavaScript Logo
export function JavaScriptIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="20" fill="#F7DF1E" />
      <path
        d="M28.5 102.5V46H40V92C40 98 36.5 102.5 28.5 102.5ZM60 78.5C60 72.8 64 68.5 72.5 68.5C81 68.5 86 72.8 86 79.5V81.5H74.5C74.5 78.5 72.8 77 69.8 77C66.8 77 65.2 78.2 65.2 80.2C65.2 82.5 67 83.8 71.8 85.2L76.5 86.8C85.5 89.8 88.5 94.5 88.5 100.8C88.5 108.5 82.5 113.5 73 113.5C63.5 113.5 57.5 108.5 57.5 100.5V98H69C69 101.2 70.8 103.2 74.5 103.2C78 103.2 80 101.5 80 99C80 96.5 78.2 95.2 73.2 93.8L68.5 92.2C62 90 60 85.5 60 78.5Z"
        fill="#000000"
      />
    </svg>
  );
}

// 3. Python Official Logo
export function PythonIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M63.4 12C37.3 12 39 23.3 39 23.3L39.1 35H64.2V38.6H28.7C12.7 38.6 12 55.4 12 55.4C12 72.2 25.4 71.5 25.4 71.5H35.3V58.7C35.3 43.6 47.9 43.8 47.9 43.8H65.8C78.4 43.8 79.5 33.6 79.5 33.6C79.5 17.5 67.2 12 63.4 12ZM51.3 19.3C54.6 19.3 57.3 22 57.3 25.3C57.3 28.6 54.6 31.3 51.3 31.3C48 31.3 45.3 28.6 45.3 25.3C45.3 22 48 19.3 51.3 19.3Z"
        fill="#3776AB"
      />
      <path
        d="M64.6 116C90.7 116 89 104.7 89 104.7L88.9 93H63.8V89.4H99.3C115.3 89.4 116 72.6 116 72.6C116 55.8 102.6 56.5 102.6 56.5H92.7V69.3C92.7 84.4 80.1 84.2 80.1 84.2H62.2C49.6 84.2 48.5 94.4 48.5 94.4C48.5 110.5 60.8 116 64.6 116ZM76.7 108.7C73.4 108.7 70.7 106 70.7 102.7C70.7 99.4 73.4 96.7 76.7 96.7C80 96.7 82.7 99.4 82.7 102.7C82.7 106 80 108.7 76.7 108.7Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

// 4. React Logo
export function ReactIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// 5. Next.js Logo
export function NextJsIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none">
      <circle cx="90" cy="90" r="88" fill="black" stroke="white" strokeWidth="4" />
      <path
        d="M149.5 148.5L78.8 55H63V125H74.5V72.2L138.8 156.4C142.7 154 146.3 151.4 149.5 148.5Z"
        fill="white"
      />
      <rect x="105" y="55" width="12" height="70" fill="white" />
    </svg>
  );
}

// 6. Tailwind CSS Logo
export function TailwindIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

// 7. PostgreSQL Logo
export function PostgresIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="11" fill="#336791" />
      <path
        d="M16.5 8.5C15.8 7.5 14.2 7 12.5 7C10.5 7 9 7.8 8 9.2C7 10.6 7 12.5 7 14.5C7 16.5 8 18 10 18.5C11.5 19 13.5 18.5 14.5 17.5L13.5 16C12.8 16.6 11.5 17 10.5 16.8C9.2 16.5 8.5 15.5 8.5 14.2H16.8C16.9 12.5 17.2 9.5 16.5 8.5ZM8.5 12.5C8.5 11 9.2 8.5 12.2 8.5C14.2 8.5 15 10.5 15.2 12.5H8.5Z"
        fill="white"
      />
    </svg>
  );
}

// 8. Supabase Logo
export function SupabaseIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 109 113" className={className} fill="none">
      <path
        d="M65.4 112.5C62.4 114.7 58.1 112.7 58.5 108.9L64.4 56.6H7.9C2.4 56.6 -1 50.8 1.4 45.9L43.8 0.5C46.8 -1.7 51.1 0.3 50.7 4.1L44.8 56.4H101.3C106.8 56.4 110.2 62.2 107.8 67.1L65.4 112.5Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

// 9. Claude / AI Sparkle Logo
export function ClaudeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#D97706" strokeWidth="2">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#F59E0B" fillOpacity="0.2" />
    </svg>
  );
}

// 10. Highcharts / Analytics Logo
export function HighchartsIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#8B5CF6" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-3 3" />
    </svg>
  );
}

// 11. Hardware / Sensor Chip Logo
export function HardwareChipIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A78BFA" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

// 12. Neural Network / Deep Learning Logo
export function BrainNetworkIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <line x1="8.5" y1="11" x2="15.5" y2="6" />
      <line x1="8.5" y1="13" x2="15.5" y2="18" />
    </svg>
  );
}

// 13. Map / Leaflet Cartography Logo
export function MapCompassIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

// 14. Accessibility (A11y / WCAG) Logo
export function AccessibilityIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16" />
      <path d="M12 8v8" />
      <path d="M8 20l4-4 4 4" />
    </svg>
  );
}

// 15. Vercel Logo
export function VercelIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2L23 21H1L12 2Z" fill="white" />
    </svg>
  );
}

// Helper to resolve appropriate logo component based on skill name
export function TechLogo({ name, className = "w-3.5 h-3.5" }: { name: string; className?: string }) {
  const lower = name.toLowerCase();

  if (lower.includes('typescript')) {
    return <TypeScriptIcon className={className} />;
  }
  if (lower.includes('javascript')) {
    return <JavaScriptIcon className={className} />;
  }
  if (lower.includes('python')) {
    return <PythonIcon className={className} />;
  }
  if (lower.includes('react')) {
    return <ReactIcon className={className} />;
  }
  if (lower.includes('next.js')) {
    return <NextJsIcon className={className} />;
  }
  if (lower.includes('tailwind')) {
    return <TailwindIcon className={className} />;
  }
  if (lower.includes('postgres')) {
    return <PostgresIcon className={className} />;
  }
  if (lower.includes('supabase')) {
    return <SupabaseIcon className={className} />;
  }
  if (lower.includes('highcharts') || lower.includes('recharts')) {
    return <HighchartsIcon className={className} />;
  }
  if (lower.includes('vercel') || lower.includes('ai sdk')) {
    return <VercelIcon className={className} />;
  }
  if (lower.includes('claude') || lower.includes('nlp')) {
    return <ClaudeIcon className={className} />;
  }
  if (lower.includes('cnn') || lower.includes('deep learning')) {
    return <BrainNetworkIcon className={className} />;
  }
  if (lower.includes('leaflet') || lower.includes('map') || lower.includes('gis')) {
    return <MapCompassIcon className={className} />;
  }
  if (lower.includes('wcag') || lower.includes('accessibility') || lower.includes('a11y')) {
    return <AccessibilityIcon className={className} />;
  }
  if (lower.includes('digitalpersona') || lower.includes('dpurunet') || lower.includes('hardware')) {
    return <HardwareChipIcon className={className} />;
  }

  return <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />;
}
