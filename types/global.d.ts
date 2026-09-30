declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, target: string, parameters?: Record<string, unknown>) => void;
    fbq?: (command: string, event: string, parameters?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  }
}

export {};
