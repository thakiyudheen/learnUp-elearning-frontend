declare namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': {
        src?: string;
        background?: string;
        speed?: string | number;
        style?: React.CSSProperties;
        loop?: boolean;
        className?: string;
        autoplay?: boolean;
        [key: string]: any; // Allow any other attributes
      };
    }
  }