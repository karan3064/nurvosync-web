import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        bg-surface rounded border border-hairline
        ${hover ? 'transition-colors duration-200 hover:border-ink' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
