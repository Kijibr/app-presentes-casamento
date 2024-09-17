export const breakpointSizes = {
  xxs: { min: 1, max: 319.98 },
  xs: { min: 320, max: 743.98 },
  sm: { min: 744, max: 1279.98 },
  md: { min: 1280, max: 1511.98 },
  lg: { min: 1512, max: 1727.98 },
  xl: { min: 1728, max: Number.MAX_SAFE_INTEGER }
};

type SizeMap = {
  [breakpoint: string]: {
    min?: number;
    max: number;
  };
};

export function buildMediaQueryUp(sizes: SizeMap) {
  return Object.entries(sizes).reduce(
    (acc: Record<string, string>, [label, val]) => {
      const minWidth = val.min;

      if (minWidth) {
        acc[label] = `@media (min-width: ${minWidth}px)`;
      }

      return acc;
    },
    {}
  ); //acima de lg, usa valor min
}

export function buildMediaQueryDown(sizes: SizeMap) {
  return Object.entries(sizes).reduce(
    (acc: Record<string, string>, [label, val]) => {
      const maxWidth = val.max;

      acc[label] = `@media (max-width: ${maxWidth}px)`;

      return acc;
    },
    {}
  ); //abaixo de lg, usa valor max
}

export function buildMediaQueryOnly(sizes: SizeMap) {
  return Object.entries(sizes).reduce(
    (acc: Record<string, string>, [label, val]) => {
      if (val.min && val.max) {
        acc[
          label
        ] = `@media (min-width: ${val.min}px) and (max-width: ${val.max}px)`;
      }

      return acc;
    },
    {}
  );
}

type MediaQueries = { [breakpoint in keyof typeof breakpointSizes]: string };

export const mediaQueryUp = buildMediaQueryUp(breakpointSizes) as MediaQueries;
export const mediaQueryDown = buildMediaQueryDown(breakpointSizes) as MediaQueries;
export const mediaQueryOnly = buildMediaQueryOnly(breakpointSizes) as MediaQueries;

export default breakpointSizes;
