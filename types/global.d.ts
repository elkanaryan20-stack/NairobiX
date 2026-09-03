declare global {
  interface Window {
    botpressWebChat?: {
      open?: () => void;
      toggle?: () => void;
      setVisibility?: (visible: boolean) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
