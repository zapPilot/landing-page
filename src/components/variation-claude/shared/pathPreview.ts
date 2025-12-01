import { type RegimeId, regimeOrder, getRegimeIndex } from './regimeData';

export function getRegimePath(from: RegimeId, to: RegimeId): RegimeId[] {
  const fromIdx = getRegimeIndex(from);
  const toIdx = getRegimeIndex(to);

  if (fromIdx === toIdx) {
    return [from];
  }

  if (Math.abs(toIdx - fromIdx) === 1) {
    return [from, to]; // Adjacent, direct transition
  }

  // Build intermediate path
  const path: RegimeId[] = [];
  const direction = toIdx > fromIdx ? 1 : -1;

  for (let i = fromIdx; i !== toIdx + direction; i += direction) {
    if (i >= 0 && i < regimeOrder.length) {
      path.push(regimeOrder[i]);
    }
  }

  return path;
}

export async function animatePathPreview(
  path: RegimeId[],
  onStep: (regime: RegimeId, index: number) => void,
  delayMs = 500
): Promise<void> {
  return new Promise((resolve) => {
    path.forEach((regime, i) => {
      setTimeout(() => {
        onStep(regime, i);
        if (i === path.length - 1) {
          resolve();
        }
      }, i * delayMs);
    });
  });
}

export function getPathDescription(from: RegimeId, to: RegimeId): string {
  const path = getRegimePath(from, to);

  if (path.length === 1) {
    return 'Already there';
  }

  if (path.length === 2) {
    return 'Direct transition';
  }

  const intermediateCount = path.length - 2;
  return `Must pass through ${intermediateCount} regime${intermediateCount > 1 ? 's' : ''}`;
}
