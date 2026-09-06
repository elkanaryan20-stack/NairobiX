declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, target: string, parameters?: Record<string, unknown>) => void;
  }
}

export {};
