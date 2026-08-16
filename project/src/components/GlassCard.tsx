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
        bg-white rounded-2xl border border-gray-200 shadow-sm
        ${hover ? 'transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
