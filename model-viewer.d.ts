import { CSSProperties, ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'rotation-per-second'?: string;
        'interaction-prompt'?: string;
        'interaction-prompt-threshold'?: string;
        'disable-zoom'?: boolean | string;
        'disable-pan'?: boolean | string;
        'disable-tap'?: boolean | string;
        exposure?: string;
        'environment-image'?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        style?: CSSProperties;
        className?: string;
        children?: ReactNode;
      };
    }
  }
}

export {};

