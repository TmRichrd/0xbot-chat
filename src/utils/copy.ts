export function setupCopyHandler() {
  window.copyCodeToClipboard = (button: HTMLElement) => {
    const codeBlock = button.closest('.code-block-element');
    if (!codeBlock) return;
    
    const code = codeBlock.querySelector('code')?.textContent || '';
    navigator.clipboard.writeText(code)
      .then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
}