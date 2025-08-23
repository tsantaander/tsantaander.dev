// Type definitions for View Transitions API
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
      finished: Promise<void>;
      skipTransition: () => void;
    };
  }
}

export {}; // This file needs to be a module.
