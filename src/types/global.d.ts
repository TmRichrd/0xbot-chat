export {};

declare global {
  interface Window {
    copyCodeToClipboard: (button: HTMLElement) => void;
  }
}