import type { Metadata, Viewport } from 'next';
import { Orbitron, Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/navigation/Navbar';
import CustomCursor from '@/components/hud/CustomCursor';
import HudOverlay from '@/components/hud/HudOverlay';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AVINYA 2027 | Techno-Cultural Fest of IIIT Dharwad',
  description:
    'March 12, 13 & 14, 2027. Official Techno-Cultural Fest of IIIT Dharwad. 3 days of Dunes, Cyberpunk Pandemonium, and Carnival Night across 24 flagship cultural and technical events.',
  keywords: [
    'Avinya 2027',
    'IIIT Dharwad',
    'Techno-Cultural Fest',
    'Hack2Future',
    'Yukti 2.0',
    'Code Royale',
    'Battle of Bands',
    'Engineering College Fest Karnataka',
  ],
  authors: [{ name: 'IIIT Dharwad Fest Committee' }],
  openGraph: {
    title: 'AVINYA 2027 | IIIT Dharwad',
    description:
      'Enter the Odyssey. March 12-14, 2027. Experience The Last Outpost, The Pandemonium, and The Carnival Island.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#030407',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <body className="bg-avinya-void text-foreground font-grotesk antialiased selection:bg-avinya-cyan/30 selection:text-white min-h-screen relative overflow-x-hidden">
        {/* Subtle Ambient Noise and Vignette Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030407]/60 to-[#020305]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-avinya-cyan/5 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-avinya-magenta/5 rounded-full blur-[180px]" />
          <div className="absolute bottom-10 left-1/3 w-[26rem] h-[26rem] bg-avinya-gold/5 rounded-full blur-[160px]" />
        </div>

        {/* Smooth Scrolling Wrapper */}
        <SmoothScroll>
          {/* Custom Interactive Magnetic Cursor */}
          <CustomCursor />

          {/* Real-time Telemetry and Coordinates HUD */}
          <HudOverlay />

          {/* Floating Glassmorphic Pill Navbar */}
          <Navbar />

          {/* Main Viewport Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
