import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RazorMind — AI Revenue Agent',
  description: 'An autonomous AI agent that finds, executes, and measures merchant revenue opportunities.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}