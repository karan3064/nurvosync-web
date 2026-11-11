import { useState } from 'react';

interface FigureImageProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  aspect?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

// Renders the real image once it exists at `src`; until then, shows a
// labeled placeholder instead of a broken-image icon. Swapping in the
// real file at the same path upgrades it automatically, no code change.
export default function FigureImage({
  src,
  alt,
  caption,
  className = '',
  aspect = 'aspect-[4/3]',
  width = 800,
  height = 600,
  priority = false,
}: FigureImageProps) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className={className}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full object-cover border border-hairline ${aspect}`}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className={`w-full border border-dashed border-hairline bg-surface flex items-center justify-center p-6 text-center ${aspect}`}>
          <span className="spec-label">Image pending — {src}</span>
        </div>
      )}
      {caption && <figcaption className="spec-label mt-2">{caption}</figcaption>}
    </figure>
  );
}
