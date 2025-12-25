'use client';

import { ArrowRight } from 'lucide-react';

export interface SubtitlePart {
  text: string;
  emphasis?: boolean;
}

interface SubtitleChipProps {
  subtitle: SubtitlePart[] | string;
}

/**
 * Renders a subtitle with optional keyword emphasis.
 * Supports both string (legacy) and parts array (new) formats.
 */
export function SubtitleChip({ subtitle }: SubtitleChipProps) {
  // Backward compatibility: convert string to legacy component
  if (typeof subtitle === 'string') {
    return <LegacySubtitleChip subtitle={subtitle} />;
  }

  // New parts array implementation
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-sm">
      {subtitle.map((part, index) => {
        // Handle flow arrow indicators
        if (
          part.text === '➔' ||
          part.text === '→' ||
          part.text === ' ➔ ' ||
          part.text === ' → ' ||
          part.text === '->'
        ) {
          return (
            <ArrowRight
              key={index}
              className="w-4 h-4 text-blue-400 animate-pulse mx-0.5"
              style={{ animationDuration: '2s' }}
            />
          );
        }

        // Render text with optional emphasis
        return (
          <span
            key={index}
            className={part.emphasis ? 'text-blue-400 font-semibold' : 'text-gray-300 font-normal'}
          >
            {part.text}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Legacy component for backward compatibility with string subtitles
 */
function LegacySubtitleChip({ subtitle }: { subtitle: string }) {
  const hasFlowIndicator = /[→➔⟶➜]|->/.test(subtitle);

  if (!hasFlowIndicator) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-gray-300 text-sm">
        {subtitle}
      </div>
    );
  }

  // Parse flow text for legacy string format
  const arrowRegex = /([→➔⟶➜]|->)/g;
  const parts: Array<{ type: 'text' | 'arrow'; content: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = arrowRegex.exec(subtitle)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: subtitle.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'arrow', content: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < subtitle.length) {
    parts.push({ type: 'text', content: subtitle.slice(lastIndex) });
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-gray-300 text-sm">
      {parts.map((part, index) =>
        part.type === 'arrow' ? (
          <ArrowRight
            key={index}
            className="w-4 h-4 text-blue-400 animate-pulse"
            style={{ animationDuration: '2s' }}
          />
        ) : (
          <span key={index}>{part.content}</span>
        )
      )}
    </div>
  );
}
